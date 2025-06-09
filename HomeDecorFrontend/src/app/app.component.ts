import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from "../Comps/nav/nav.component";
import { FooterComponent } from "../Comps/footer/footer.component";
import { CartService } from '../Services/Cart.service';
import { ProductInStock } from '../Classes/ProductInStock';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'HomeDecor';

  constructor(private cartS:CartService) {}
  ngOnInit(): void {
    ProductInStock.cartS = this.cartS
  }
}
