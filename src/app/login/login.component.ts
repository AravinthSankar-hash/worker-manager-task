import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { LoginService } from "../login.service";
import { AlertComponent } from "../alert/alert.component";

@Component({ templateUrl: 'login.component.html', styleUrls: ['login.component.css'] })
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private _loginService: LoginService,
    private router: Router,
    private alerts: AlertComponent,
  ) {
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this._loginService.validateUser(this.loginForm.value)
      .subscribe((response: any) => {
        let message = "";
        if (response[0].isActive) {
          this._loginService.userToken = response[0].token;
          if (response[0].isActive) {
            if (response[0].role === "worker") {
              this.router.navigate(['/worker']);
            } else {
              this.router.navigate(['/home']);
            }
          }
          message = "Registration Succesful";
        } else {
          message = response[0].data;
        }
        this.alerts.openSnackBar(message, "CLOSE");
      });
  }
}