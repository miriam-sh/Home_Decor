import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductInStock } from '../../Classes/ProductInStock';
import { ProductService } from '../../Services/product.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ShekelPipe } from '../../ShekelPipe';
import { CartService } from '../../Services/Cart.service';
import { ProductOrderedPrivate } from '../../Classes/ProductOrderedPrivate';
import { Location } from '@angular/common';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [FormsModule, CommonModule, ShekelPipe],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  // פרמטרים

  productInStock: ProductInStock = new ProductInStock();
  selectedQuantity: number = 0;

  // אתחול

  constructor(
    private activatedR: ActivatedRoute,
    private productS: ProductService,
    public cartS: CartService,
    public location: Location
  ) { }

  ngOnInit(): void {
    this.activatedR.params.subscribe(params => {
      const id = +params['id'];
      this.productS.GetById(id).subscribe(p => {
        this.productInStock = new ProductInStock(p.id, p.product, p.quantity);            
        this.selectedQuantity = this.productInStock.currentQuantity > 0 ? 1 : 0;
      });
    });
  }

  // פונקציות

  increaseQuantity() {
    if (this.selectedQuantity < (this.productInStock.currentQuantity)) {
      this.selectedQuantity++;
    }
  }

  decreaseQuantity() {
    if (this.selectedQuantity > 1) {
      this.selectedQuantity--;
    }
  }

  addToCart(imageElement: HTMLImageElement) {
    const cart = document.getElementById('cart');

    const imageRect = imageElement.getBoundingClientRect();
    const cartRect = cart!.getBoundingClientRect();
    const clone = imageElement.cloneNode(true) as HTMLImageElement;
    clone.classList.add('fly-image');
    clone.style.left = imageRect.left + 'px';
    clone.style.top = imageRect.top + 'px';
    clone.style.width = imageRect.width + 'px';
    clone.style.height = imageRect.height + 'px';

    document.body.appendChild(clone);

    const translateX = cartRect.left - imageRect.left - 200;
    const translateY = cartRect.top - imageRect.top - 200;
    const scale = 0.1;

    requestAnimationFrame(() => {
      clone.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
      clone.style.opacity = '0.5';
    });

    setTimeout(() => {
      clone.remove();
    }, 500)

    setTimeout(() => {
      this.cartS.addToCart(new ProductOrderedPrivate(0, this.productInStock!, this.selectedQuantity))
    }, 250)

    setTimeout(() => {
      this.location.back()
    }, 800)

  }

}
