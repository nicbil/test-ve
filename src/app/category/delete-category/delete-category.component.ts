import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CategoryService } from '../category.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import {ICategory} from '../category.model';

@Component({
  selector: 'app-delete-category',
  templateUrl: './delete-category.component.html',
  styleUrls: ['./delete-category.component.scss']
})
export class DeleteCategoryComponent implements OnInit {
  public deleteCategoryForm: FormGroup = this.formBuilder.group({
    category: [null]
  });
  private idCategory!: number;
  constructor(
    public categoryService: CategoryService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  public ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.idCategory = params.id;
    });
  }

  public get f(): any { return this.deleteCategoryForm.controls; }

  public getCategories(): ICategory[] {
    return this.categoryService.getCategories.filter(p => p.id !== +this.idCategory);
  }

  public deleteCategory(): void {
    if (!Number.isInteger(this.f.category.value)) {
      this.categoryService.deleteCategory(this.idCategory)
        .subscribe(
          data => {
            this.openSnackBar('Deleted', '');
            this.router.navigate(['/category']);
          },
          error => {
            this.openSnackBar(error.error.message, '');
          });
    } else {
      this.categoryService.reassignCategory(this.idCategory, this.f.category.value)
        .subscribe(
          data => {
            this.openSnackBar('Deleted', '');
            this.router.navigate(['/category']);
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
