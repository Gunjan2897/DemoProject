import { Component,Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AdminServiceService } from '../admin-service.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-create-products',
  templateUrl: './create-products.component.html',
  styleUrls: ['./create-products.component.css']
})
export class CreateProductsComponent implements OnInit {
  CreateProdForm: FormGroup;
  images: any;
 
  category:any;
  constructor(private fb:FormBuilder,private service:AdminServiceService, @Inject(MAT_DIALOG_DATA) public dataid: any) { }

  ngOnInit(): void {
    this.CreateProdForm = new FormGroup({
      "productName": new FormControl(null, [Validators.required]),
      "categoryName": new FormControl(null, [Validators.required]),
      "price": new FormControl(null, [Validators.required]),
      "productImage": new FormControl(null, [Validators.required]),
      "Description" : new FormControl(null, [Validators.required])
    });
    this.getCategory(); 
    if (this.dataid.dataKey) {
      this.setform(this.dataid.dataKey)
    }
  }
  
  //set formvalue in dialogBox......
  setform(data) {
    if (data.length > 0) {
      this.CreateProdForm.patchValue({
        productName: data[0].productName,
        categoryName:data[0].categoryName,
        price:data[0].price, 
        Description:data[0].Description
      });
    }
  }

  //getting all categories into dropdown when we are creating new Products.....
  getCategory(){
    this.service.getAll().subscribe(
      res=>{
        this.category=res;
        console.log(this.category);
        
      }
    )
  }
  
  //choose images file.....
  selectImage(event){
    if(event.target.files.length>0){
      const file = event.target.files[0];
      this.images=file;
     
      
    }
  }

  onSubmit(){
    if(this.dataid.dataKey.length>0){
      let control = this.CreateProdForm.controls
      const formData=new FormData();
      formData.append("productName",control['productName'].value);
      formData.append("categoryName",control['categoryName'].value);
      formData.append("price",control['price'].value)
      formData.append('productImage',this.images);
      formData.append("Description",control['Description'].value)
      
      this.service.updateProducts(this.dataid.dataKey[0]._id,formData).subscribe(
        res=>{  
          this.CreateProdForm.reset();
        }
      )
    }else
    {
      let control = this.CreateProdForm.controls
      const formData=new FormData();
      formData.append("productName",control['productName'].value);
      formData.append("categoryName",control['categoryName'].value);
      formData.append("price",control['price'].value)
      formData.append('productImage',this.images);
      formData.append("Description",control['Description'].value)

      // console.log(this.CreateProdForm.value.categoryName);
      // console.log(this.CreateProdForm.controls);
      this.service.createNewProducts(formData).subscribe(
        res=>{  
          this.CreateProdForm.reset();
        }
      )

    }
   
  }
}
