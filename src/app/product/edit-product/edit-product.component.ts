import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../../category/category.service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {
  private today = new Date();
  public currentDate = new Date(new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate()));
  public editProductForm: FormGroup = this.formBuilder.group({
    name: [null, [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(40)
    ]],
    price: [null, [
      Validators.required,
      Validators.min(1)
    ]],
    date: [null],
    categoryId: [null, Validators.required]
  });
  private productId: number;
  constructor(
    private formBuilder: FormBuilder,
    public categoryService: CategoryService,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
    private productService: ProductService
  ) {}

  public ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.productId = params.id;
      this.setProduct();
    });
  }

  public get name(): any { return this.editProductForm.get('name'); }

  public editProduct(): void {
    if (this.editProductForm?.invalid) {
      return;
    }

    const product = Object.assign({id: this.productId}, this.editProductForm.value);
    this.productService.editProduct(product)
      .subscribe(
        data => {
          this.openSnackBar('Updated', '');
        },
        error => {
          this.openSnackBar(error.error.message, '');
        });
  }

  private setProduct(): void {
    const product = this.productService.getProduct(this.productId);
    if (product) {
      const newProduct = Object.assign({}, product);
      delete newProduct.id;
      this.editProductForm.setValue(newProduct);
    }
  }

  private openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 2000
    });
  }
}
