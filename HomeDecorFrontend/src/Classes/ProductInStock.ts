import { CartService } from "../Services/Cart.service";
import { Product } from "./Product";

export class ProductInStock {

    static cartS: CartService

    constructor(public id?: number,
        public product?: Product,
        public quantity?: number
    ) { }

    get currentQuantity()
    {
        
        // console.log(this.quantity);
        // console.log(this.id);
        console.log(this);
        
        
        
        return this.quantity! - ProductInStock.cartS.getQuantityForSKU(this.product?.sku!)
    }

    getCurrentQuantit()
    {
        
        // console.log(this.quantity);
        // console.log(this.id);
        // console.log(this);
        
        
        
        return this.quantity! - ProductInStock.cartS.getQuantityForSKU(this.product?.sku!)
    }
}