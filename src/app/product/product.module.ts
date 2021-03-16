import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product.component';
import { RouterModule } from '@angular/router';
import { MenuModule } from '../menu/menu.module';
import { CoreModule } from '../core/core.module';
import { EditProductComponent } from './edit-product/edit-product.component';
import { AuthGuard } from '../login/auth.guard';

@NgModule({
  declarations: [ProductComponent, EditProductComponent],
  imports: [
    CommonModule,
    [RouterModule.forRoot([
      { path: 'product', component: ProductComponent, canActivate: [AuthGuard] },
      { path: 'edit-product/:id', component: EditProductComponent, canActivate: [AuthGuard] }
    ])],
    CoreModule,
    MenuModule
  ]
})
export class ProductModule { }
