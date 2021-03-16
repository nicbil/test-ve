import { NgModule } from '@angular/core';
import { CategoryComponent } from './category.component';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { MenuModule } from '../menu/menu.module';
import { CoreModule } from '../core/core.module';
import { EditCategoryComponent } from './edit-category/edit-category.component';
import { DeleteCategoryComponent } from './delete-category/delete-category.component';
import { AuthGuard } from './../login/auth.guard';

@NgModule({
  declarations: [
    CategoryComponent,
    EditCategoryComponent,
    DeleteCategoryComponent
  ],
  imports: [
    BrowserModule,
    [RouterModule.forRoot([
      { path: 'category', component: CategoryComponent, canActivate: [AuthGuard] },
      { path: 'edit-category/:id', component: EditCategoryComponent, canActivate: [AuthGuard] },
      { path: 'delete-category/:id', component: DeleteCategoryComponent, canActivate: [AuthGuard] }
    ])],
    CoreModule,
    MenuModule
  ]
})
export class CategoryModule { }
