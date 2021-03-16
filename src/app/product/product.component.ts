import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CategoryService } from '../category/category.service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IProducts } from '../product/product.model';
import {ProductService} from './product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  private today = new Date();
  public currentDate = new Date(new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate()));
  public addProductForm: FormGroup = this.formBuilder.group({
    name: [null, [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(40)
    ]],
    price: [null, [
      Validators.required,
      Validators.min(1)
    ]],
    date: new FormControl(this.currentDate),
    categoryId: [null, Validators.required]
  });
  constructor(
    private formBuilder: FormBuilder,
    public categoryService: CategoryService,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
    public productService: ProductService
  ) {}

  public ngOnInit(): void {
  }

  public get name(): any { return this.addProductForm.get('name'); }

  public get f(): any { return this.addProductForm.controls; }

  public addProduct(): void {
    if (this.addProductForm?.invalid) {
      return;
    }

    this.productService.addProduct(this.addProductForm.value)
      .subscribe(
        data => {
          this.addProductForm.reset();
          this.openSnackBar('Added', '');
        },
        error => {
          this.openSnackBar(error.error.message, '');
        });
  }

  public deleteProduct(product: IProducts): void {
    this.productService.deleteProduct(product)
      .subscribe(
        data => {
          this.openSnackBar('Deleted', '');
        },
        error => {
          this.openSnackBar(error.error.message, '');
        });
  }

  private openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 2000
    });
  }
}
