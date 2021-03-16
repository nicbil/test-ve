import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CategoryService } from './../category.service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ICategory } from '../category.model';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit {
  public editCategoryForm: FormGroup = this.formBuilder.group({
    category: [null, Validators.required]
  });
  private idCategory!: number;
  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  public ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.idCategory = params.id;
      this.setCategory();
    });
  }

  public get f(): any { return this.editCategoryForm.controls; }

  public editCategory(): void {
    if (this.editCategoryForm?.invalid) {
      return;
    }

    this.categoryService.editCategory({ id: this.idCategory, name: this.f.category.value })
      .subscribe(
        data => {
          this.openSnackBar('Saved', '');
        },
        error => {
          this.openSnackBar(error.error.message, '');
        });
  }

  private setCategory(): void {
    const category: ICategory | undefined = this.categoryService.getCategories.find(p => p.id === +this.idCategory);
    this.editCategoryForm.setValue({ category: category?.name});
  }

  private openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 2000
    });
  }
}
