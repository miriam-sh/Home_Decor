import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CartService } from '../../Services/Cart.service';
import { Order } from '../../Classes/Order';
import { ProductOrderedPublic } from '../../Classes/ProductOrderedPublic';
import { Location } from '@angular/common';

@Component({
  selector: 'pay',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.css']
})
export class PayComponent implements OnInit, AfterViewInit {

  // פרמטרים

  theForm: FormGroup = new FormGroup({})

  // אתחול

  constructor(private router: Router,
    public cartS: CartService,
    private elementR: ElementRef,
    public location: Location
  ) { }

  ngOnInit(): void {
    if (this.cartS.cartItems.length == 0)
      this.location.back()
    this.theForm = new FormGroup({
      email: new FormControl(null, [Validators.required, this.checkEmail.bind(this)]),
      firstName: new FormControl(null, [Validators.required]),
      lastName: new FormControl(null, [Validators.required]),
      phone: new FormControl(null, [Validators.required, this.checkPhone.bind(this)]),
      creditCardNumber: new FormControl(null, [Validators.required, this.checkCreditCardNumber.bind(this)]),
      tz: new FormControl(null, [Validators.required, this.checkTz.bind(this)]),
      creditCartValidationDate: new FormControl(null, [Validators.required, this.checkCreditCartValidationDate.bind(this)]),
      cvv: new FormControl(null, [Validators.required, this.checkCvv.bind(this)])
    })
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      const yOffset = window.innerHeight * 0.3;
      const y = this.elementR.nativeElement.getBoundingClientRect().top + window.scrollY - yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    });
  }

  // פונקציות

  get Gemail() {
    return this.theForm.controls['email']
  }
  get GfirstName() {
    return this.theForm.controls['firstName']
  }
  get GlastName() {
    return this.theForm.controls['lastName']
  }
  get Gphone() {
    return this.theForm.controls['phone']
  }
  get GcreditCardNumber() {
    return this.theForm.controls['creditCardNumber']
  }
  get Gtz() {
    return this.theForm.controls['tz']
  }
  get GcreditCartValidationDate() {
    return this.theForm.controls['creditCartValidationDate']
  }
  get Gcvv() {
    return this.theForm.controls['cvv']
  }

  checkEmail(e: AbstractControl) {
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(e.value))
      return { 'invalidEmail': true }
    return null
  }

  checkPhone(e: AbstractControl) {
    if (!/^0?(([23489]{1}\d{7})|[5]{1}[012345689]\d{7})$/.test(e.value))
      return { 'invalidPhone': true }
    return null
  }

  checkCreditCardNumber(e: AbstractControl) {
    if (!/^\d*$/.test(e.value))
      return { 'invalidCreditCardNumber': true }
    if (e.value && e.value.length < 16)
      return { 'shortCreditCardNumber': true }
    return null
  }

  checkTz(e: AbstractControl) {
    if (!/^\d*$/.test(e.value))
      return { 'notDigits': true }
    if (e.value.length < 9)
      return { 'shortTz': true }

    let sum = 0;
    for (let i = 0; i < 9; i++) {
      const digit = parseInt(e.value[i], 10);
      const multiplied = digit * (i % 2 === 0 ? 1 : 2);
      sum += multiplied > 9 ? multiplied - 9 : multiplied;
    }

    if (sum % 10 != 0)
      return { 'invalidTz': true }


    return null
  }

  checkCvv(e: AbstractControl) {
    if (!/^\d*$/.test(e.value))
      return { 'invalidCvv': true }
    if (e.value && e.value.length < 3)
      return { 'shortCvv': true }
    return null
  }

  checkCreditCartValidationDate(e: AbstractControl) {
    if (!e.value)
      return null
    const now: Date = new Date()
    const choice = new Date(e.value)
    if (now > choice)
      return { 'dateInPast': true }
    return null
  }

  save(orderButton: HTMLButtonElement) {

    if(this.theForm.invalid)
    {
      this.theForm.markAllAsTouched()
      return
    }
    const toSend: Order =
      new Order(
        0,
        new Date(),
        this.GfirstName.value,
        this.Gphone.value,
        this.GlastName.value,
        this.Gemail.value,
        this.cartS.cartItems.map(p => new ProductOrderedPublic(p.id, p.product.product!.sku!, p.quantity))
      )

    orderButton.innerText = "שולח בקשה..."
    orderButton.style.cursor = "wait"

    this.cartS.AddOrder(toSend).subscribe(oSucc => {
      console.log(oSucc);
      // orderButton.innerHTML = '<i class="fa-solid fa-cart-shopping"></i> ההזמנה בוצעה בהצלחה '

      setTimeout(() => {
        orderButton.style.cursor = "auto"

        orderButton.innerText = "ההזמנה בוצעה בהצלחה!!! 🛒"
      }, 1000)

      setTimeout(() => {
        this.router.navigate([''])
        this.cartS.clearCart()
      }, 2000)
    }, oFail => {
      console.log(oFail);
    })

  }




  // isBefore(d1: String, d2: Date) {

  //   const parts: Array<number> = d1.split("-").map(p => parseInt(p))

  //   if (parts[0] == d2.getFullYear()) {
  //     // צריך לבדוק מה קורה עם החודש
  //     if (parts[1] == 5)
  //       return parts[2] < d2.getDate() ? true : false
  //     return parts[1] < 5 ? true : false
  //   }
  //   return parts[0] < d2.getFullYear() ? true : false

  // }

}
