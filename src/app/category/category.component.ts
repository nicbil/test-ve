import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from './category.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ICategory } from './category.model';
import { Router } from '@angular/router';
import { ProductService } from '../product/product.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent {
  public createCategoryForm: FormGroup = this.formBuilder.group({
    category: [null, Validators.required]
  });

  constructor(
    public categoryService: CategoryService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    private productService: ProductService
  ) { }

  public get f(): any { return this.createCategoryForm.controls; }

  public createCategory(): void {
    if (this.createCategoryForm?.invalid) {
      return;
    }

    this.categoryService.createCategory(this.f.category.value)
      .subscribe(
        data => {
          this.createCategoryForm.reset();
          this.openSnackBar('Added', '');
        },
        error => {
          this.openSnackBar(error.error.message, '');
        });
  }

  public deleteCategory(category: ICategory): void {
    if (this.productService.checkCategory(category.id)) {
      this.router.navigate(['/delete-category/' + category.id]);
    } else {
      this.categoryService.deleteCategory(category.id)
        .subscribe(
          data => {
            this.openSnackBar('Deleted', '');
          },
          error => {
            this.openSnackBar(error.error.message, '');
          });
    }
  }

  private openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 2000
    });
  }
}
