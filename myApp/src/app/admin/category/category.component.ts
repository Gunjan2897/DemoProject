import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminServiceService } from '../admin-service.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialogConfig} from "@angular/material/dialog"
import { MatDialog } from '@angular/material/dialog';
import { MatFormField } from '@angular/material/form-field'
import { CreateCategoriesComponent } from '../create-categories/create-categories.component';
import { ActivatedRoute, Router } from '@angular/router';
import {MatSort}from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  dataSource:any=[];
  cateDataSource:MatTableDataSource<any>
  searchKey:string;
  constructor(private route:ActivatedRoute,private router:Router, private service: AdminServiceService,private dialog:MatDialog) { }
  displayedCategories=["Title","Status","actions"]
  @ViewChild(MatSort) sort:MatSort;
  @ViewChild(MatPaginator) paginator:MatPaginator;

  ngOnInit(): void {
    this.getAllCategories();
  }
  Sort(event){
    //for sorting categories...
   this.cateDataSource.sort=this.sort; 
 }

  //getting all categories.....
  getAllCategories() {
    this.service.getAll().subscribe(
      data => {
        this.dataSource = data;
        this.cateDataSource=new MatTableDataSource(this.dataSource)   //for using MatetrialTable..        
        this.cateDataSource.paginator=this.paginator;                  //for Pagination .....
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
    this.cateDataSource.filter=this.searchKey.trim().toLowerCase();
  }


  //delete Categories...
  RemoveCate(id){
    //console.log(id);
    
    if(confirm("are you sure")){
      this.service.removeCategory(id).subscribe(

        res=>{this.ngOnInit();}
      )
    }
    
  }
  
  // dialogbox for creating new Categories...
  onCreate(cat_id?){

     let data=this.dataSource.filter(resp=>resp._id===cat_id)
   // console.log(data);
    
    this.dialog.open(CreateCategoriesComponent,{
      width: '330px',
      height: '400px',
      data: {
        dataKey: data
      }
    });
}
}
