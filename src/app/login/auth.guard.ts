import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private authenticationService: AuthenticationService,
    public router: Router
  ) {}

  canActivate(): boolean {
    const currentUser = this.authenticationService.currentUserValue;
    if (currentUser && currentUser.id !== undefined) {
      return true;
    }
    this.router.navigate(['login']);
    return false;
  }
}
