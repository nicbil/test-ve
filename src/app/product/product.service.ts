import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { IProducts } from './product.model';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private products: IProducts[] = [{
    id: 0,
    name: 'Potato',
    price: 1,
    date: '',
    categoryId: 1
  }];

  public get getProducts(): IProducts[] {
    return this.products;
  }

  public getProduct(id: number): IProducts | undefined {
    return this.products.find(p => Number(p.id) === Number(id));
  }

  public checkCategory(categoryId: number): boolean {
    return !!this.products.find(p => p.categoryId === categoryId);
  }

  public addProduct(product: IProducts): Observable<{}> {
    product.id = this.ID;
    this.products.push(product);
    return this.ok();
  }

  public editProduct(product: IProducts): Observable<{}> {
    const foundIndex = this.products.findIndex(p => p.id === Number(product.id));
    if (foundIndex) {
      this.products[foundIndex] = product;
    } else {
      this.error('Update error');
    }
    return this.ok();
  }

  public deleteProduct(product: IProducts): Observable<{}> {
    this.products = this.products.filter(p => p.id !== product.id);
    return this.ok();
  }

  private ok(body?: object): Observable<{}> {
    return of(new HttpResponse({ status: 200, body }));
  }

  private error(message: string): Observable<never> {
    return throwError({ error: { message } });
  }

  private get ID(): number {
    return new Date().getUTCMilliseconds();
  }
}
