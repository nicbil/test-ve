import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';
import { CoreModule } from '../core/core.module';
import { LogoutComponent } from './logout.component';

@NgModule({
  declarations: [
    LoginComponent,
    LogoutComponent
  ],
  imports: [
    CoreModule,
    CommonModule,
    [RouterModule.forRoot([
      { path: 'login', component: LoginComponent },
      { path: 'logout', component: LogoutComponent }
    ])]
  ]
})
export class LoginModule { }
