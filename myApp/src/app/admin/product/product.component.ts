import { Component, OnInit,AfterViewInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialogConfig} from "@angular/material/dialog"
import { MatDialog } from '@angular/material/dialog';
import { MatFormField } from '@angular/material/form-field';
import { ActivatedRoute, Router } from '@angular/router';
import {MatSort}from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { AdminServiceService } from '../admin-service.service';
import { CreateProductsComponent } from '../create-products/create-products.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  dataSource: any=[];
  prodDataSource: MatTableDataSource<any>;
  category: any;
  searchKey: string;

  constructor(private service:AdminServiceService,private route:ActivatedRoute,private dialog:MatDialog) { }
  displayedProducts=["productName","categoryName","price","productImage","Description","actions"]
  @ViewChild(MatPaginator) paginator:MatPaginator;
  @ViewChild(MatSort) sort:MatSort;

  ngOnInit(): void {
    this.getProducts();
  }
  
  //sorting....
  customSort(event){
     this.prodDataSource.sort=this.sort;  
  }

  //getting all Products....
 getProducts(){
   this.service.getAllProduct().subscribe(
     data=>{
       this.dataSource=data
     
       this.prodDataSource=new MatTableDataSource(this.dataSource)   //for using MatetrialTable..
      //  this.prodDataSource.sort=this.sort;                           //for sorting Products...
        this.prodDataSource.paginator=this.paginator;                  //for Pagination .....
     }
     , error => {
       console.log(error);
     }
   )
 }

  //for search clear button...
  onSearchClear(){
    this.searchKey="";
    this.applyFilter();
  }
  //for searching ...
  applyFilter(){
    this.prodDataSource.filter=this.searchKey.trim().toLowerCase();
  }

  //Remove Products...
  DeleteProducts(id){
    if(confirm("are you sure")){
      this.service.removeProducts(id).subscribe(
        res=>{this.ngOnInit();}
      )
    }
  }

 onCreateProduct(prod_id?){
  let data=this.dataSource.filter(resp=>resp._id===prod_id)
  this.dialog.open(CreateProductsComponent,{
    width: '550px',
    height: '400px',
    data: {
      dataKey: data
    }
  });
 }
}
