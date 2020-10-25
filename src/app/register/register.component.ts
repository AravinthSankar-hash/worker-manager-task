import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { RegisterService } from "../register.service";
import { AlertComponent } from "../alert/alert.component";

@Component({ templateUrl: 'register.component.html', styleUrls: ["register.component.css"] })
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  roles = ["worker", "manager"];

  constructor(
    private formBuilder: FormBuilder,
    private _regService: RegisterService,
    private router: Router,
    private alerts: AlertComponent,
  ) {
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['', [Validators.required]]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls;}

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    this.loading = true;
    this.registerForm.value.role = this.registerForm.value.role.toLowerCase();
    this._regService.saveUser(this.registerForm.value)
    .subscribe( () => {
      this.loading = false;
      this.router.navigate(['/login']);
      this.alerts.openSnackBar("Registration Succesful", "CLOSE");
    });
  }
}