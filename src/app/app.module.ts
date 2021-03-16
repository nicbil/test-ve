import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { CategoryModule } from './category/category.module';
import { LoginModule } from './login/login.module';
import { ProductModule } from './product/product.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    [RouterModule.forRoot([
      { path: '**', redirectTo: 'category' }
    ])],
    CategoryModule,
    LoginModule,
    ProductModule,
    NoopAnimationsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
