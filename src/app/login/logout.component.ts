import { Component } from '@angular/core';
import { AuthenticationService } from './authentication.service';

@Component({
  template: ``
})
export class LogoutComponent {
  constructor(
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.logout();
  }
}
