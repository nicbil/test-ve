import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { ICategory } from './category.model';
import { ProductService } from './../product/product.service';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  private categories: ICategory[] = [{
    id: 0,
    name: 'Fruit'
  }, {
    id: 1,
    name: 'Vegetables',
  }, {
    id: 2,
    name: 'Test'
  }];

  constructor(private productService: ProductService) {}

  public createCategory(newCategory: string): Observable<{}> {
    const category = this.categories.find(x => x.name === newCategory);
    if (category) {
      return this.error('Category "' + newCategory + '" already exists');
    } else {
      this.categories.push({
        id: this.ID,
        name: newCategory
      });
      return this.ok();
    }
  }

  public deleteCategory(id: number): Observable<{}> {
    this.categories = this.categories.filter(x => x.id !== Number(id));
    return this.ok();
  }

  public editCategory(category: ICategory): Observable<{}> {
    this.categories.find(x => {
      if (x.id === Number(category.id)) {
        x.name = category.name;
      }
    });
    return this.ok();
  }

  public get getCategories(): ICategory[] {
    return this.categories;
  }

  public reassignCategory(id: number, newIdCategory: number): Observable<{}> {
    this.productService.getProducts.map(x => {
      if (x.categoryId === +id) {
        x.categoryId = newIdCategory;
      }
    });
    this.categories = this.categories.filter(p => p.id !== Number(id));
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
