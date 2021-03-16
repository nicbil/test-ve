import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticationService } from './authentication.service';

@Component({
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm = this.formBuilder.group({
    username: ['test', Validators.required],
    password: ['test', Validators.required]
  });
  public error = '';
  private returnUrl: string | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams?.returnUrl;
  }

  get f(): any { return this.loginForm.controls; }

  public login(): void {
    if (this.loginForm?.invalid) {
      return;
    }

    this.authenticationService.login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['/category']);
        },
        error => {
          this.error = error.error.message;
        });
  }
}
