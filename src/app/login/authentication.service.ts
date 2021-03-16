import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { IUser } from './login.model';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private users: IUser[] = [{
    id: 0,
    username: 'test',
    password: 'test'
  }];
  private currentUserSubject: BehaviorSubject<IUser>;
  public currentUser: Observable<IUser>;

  constructor(
    private router: Router
  ) {
    const currentUserStore = localStorage.getItem('currentUser');
    let currentUser = {};
    if (currentUserStore != null) {
      currentUser = JSON.parse(currentUserStore);
    }
    this.currentUserSubject = new BehaviorSubject<IUser>(currentUser);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): IUser {
    return this.currentUserSubject.value;
  }

  public login(username: string, password: string): Observable<IUser> {
    const user: IUser | undefined = this.users.find(x => x.username === username && x.password === password);
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.currentUserSubject.next(user);
      return this.ok();
    } else {
      return this.error('Username "' + username + '" does not found');
    }
  }

  public logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next({});
    this.router.navigate(['/']);
  }

  private ok(body?: object): Observable<any> {
    return of(new HttpResponse({ status: 200, body }));
  }

  private error(message: string): Observable<never> {
    return throwError({ error: { message } });
  }
}
