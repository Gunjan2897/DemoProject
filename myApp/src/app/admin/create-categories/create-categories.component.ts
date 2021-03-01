import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminServiceService } from '../admin-service.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-create-categories',
  templateUrl: './create-categories.component.html',
  styleUrls: ['./create-categories.component.css']
})
export class CreateCategoriesComponent implements OnInit {
  CreateForm: any;

  constructor(private fb: FormBuilder, private router: Router, private service: AdminServiceService, @Inject(MAT_DIALOG_DATA) public dataid: any) { }

  ngOnInit(): void {
    this.CreateForm = new FormGroup({
      "title": new FormControl(null, [Validators.required]),
      "status": new FormControl(null, [Validators.required])
    })
    console.log(this.dataid);
    if (this.dataid.dataKey) {
      this.setform(this.dataid.dataKey)
    }
  }
  //set formvalue in dialogBox......
  setform(data) {
    if (data.length > 0) {
      this.CreateForm.patchValue({
        title: data[0].title,
        status: data[0].status
      });
    }
  }

  onSubmit() {
    if (this.dataid.dataKey.length > 0) {
     
      //for updating the category....  
      this.service.updateCategory(this.dataid.dataKey[0]._id, this.CreateForm.value).subscribe(
        res => { this.CreateForm.reset(); }
      )

    } else {
      //for creating New category...
      this.service.createNewCate(this.CreateForm.value).subscribe(
        res => { this.CreateForm.reset(); }

      )
    }
  }
}
