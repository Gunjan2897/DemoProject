import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../customer.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  CustomerForm: FormGroup;
  images: any;
  customers: any;

  constructor(private service: CustomerService,private toastr:ToastrService) { }
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


  ngOnInit(): void {
    this.createCustomer();
  }
  createCustomer() {
    this.CustomerForm = new FormGroup({
      "firstName": new FormControl(null, [Validators.required, Validators.maxLength(10)]),
      "lastName": new FormControl(null, [Validators.required, Validators.maxLength(10)]),
      "email": new FormControl(null, [Validators.required, Validators.email, Validators.pattern(this.emailRegex)]),
      "password": new FormControl(null, [Validators.required, Validators.minLength(4)]),
      "customerImage": new FormControl(null, [Validators.required]),
      "role": new FormControl(null, [Validators.required]),
      "phone": new FormControl(null, [Validators.required]),
      "address": new FormControl(null, [Validators.required]),
      "city": new FormControl(null, [Validators.required]),
      "state": new FormControl(null, [Validators.required]),
      "country": new FormControl(null, [Validators.required]),
      "zip": new FormControl(null, [Validators.required]),

    })

  }

  //choose images file.....
  selectImage(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.images = file;


    }
  }

  prepareForm() {

    const formData = new FormData();
    formData.append("firstName", this.CustomerForm.value.firstName);
    formData.append("lastName", this.CustomerForm.value.lastName);
    formData.append("email", this.CustomerForm.value.email);
    formData.append("password", this.CustomerForm.value.password);
    formData.append('customerImage', this.images);
    formData.append("role", this.CustomerForm.value.role);
    formData.append("phone", this.CustomerForm.value.phone);
    formData.append("address", this.CustomerForm.value.address);
    formData.append("city", this.CustomerForm.value.city);
    formData.append("state", this.CustomerForm.value.state);
    formData.append("country", this.CustomerForm.value.country);
    formData.append("zip", this.CustomerForm.value.zip);
    return formData
  }
  onSubmit() {
    console.log(this.CustomerForm.value);

    this.customers = this.prepareForm();

    this.service.newCustomer(this.customers).subscribe(
      res => { 
        this.CustomerForm.reset(); 
        this.toastr.success("registered successfully!");
      }
    )
  }
}
