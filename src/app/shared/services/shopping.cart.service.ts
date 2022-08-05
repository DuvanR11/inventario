import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Product } from "src/app/pages/products/interfaces/product.interface";

@Injectable(
  {
    providedIn: "root",
  }
)

export class ShoppingCartService {
  products: Product[] = []
  private cartSubject = new BehaviorSubject<Product[]>([]);
  private totalSubject = new BehaviorSubject<number>(0);
  private quatitySubject = new BehaviorSubject<number>(0);

  get cartAction$(): Observable<Product[]> {
    return this.cartSubject.asObservable();
  }

  get totalAction$(): Observable<number> {
    return this.totalSubject.asObservable();
  }

  get quatityAction$(): Observable<number> {
    return this.quatitySubject.asObservable();
  }


  updateCart(product: Product): void{
    this.addTocart(product);
    this.calcTotal();
    this.quatityProduct();
  }

  resetCart(): void {
    this.cartSubject.next([]);
    this.totalSubject.next(0);
    this.quatitySubject.next(0);
    this.products = [];
  }

  private addTocart(product : Product):void {
    const isProductInCart = this.products.find(({id})=>id == product.id);
    if (isProductInCart){
      isProductInCart.qty += 1
    }else{
      this.products.push({...product, qty:1});
    }
    this.cartSubject.next(this.products);
  }

  private calcTotal(): void{
    const total = this.products.reduce((total, product) => total += (product.price * product.qty), 0);
    this.totalSubject.next(total);
  }

  private quatityProduct(): void {
    const quatity = this.products.reduce((total, product) => total += product.qty, 0);
    this.quatitySubject.next(quatity);
  }
}
