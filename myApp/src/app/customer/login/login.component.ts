import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  loginForm: any;

  constructor(private fb: FormBuilder, private service: CustomerService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loginCustomer();
  }
  loginCustomer() {
    this.loginForm = new FormGroup({
      "email": new FormControl(null, [Validators.required, Validators.email, Validators.pattern(this.emailRegex)]),
      "password": new FormControl(null, [Validators.required, Validators.minLength(4)])
    })
  }
  onLogin() {
    console.log(this.loginForm.value);

    this.service.login(this.loginForm.value).subscribe(
      (res: any) => {
        this.loginForm.reset();
        localStorage.setItem("token", JSON.stringify(res.token))
        this.toastr.success("login success!")
      }
    ),(error) => {
      this.toastr.error("you are not registered!");
    }
  }
}
