import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


const baseUrl="http://localhost:8080/api";
@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {
 
  constructor(public http:HttpClient) { }

//category Part....
  getAll(){
    return this.http.get(baseUrl+'/get');    //get all Categories
  }
  createNewCate(data){
    return this.http.post(baseUrl+'/create',data);    //create new Category..
  }
  removeCategory(id){
    return this.http.delete(baseUrl+'/delete/'+id)    //Remove Category...
  }
  updateCategory(id,data){
    return this.http.put(baseUrl+'/update/'+id,data);  // Update Category......
  }
  //end......

//Products part...
  getAllProduct(){
    return this.http.get(baseUrl+'/getProd');   //get all Products....
  }
  createNewProducts(data){
    return this.http.post(baseUrl+'/createProduct',data);   //create new Products.....
  }
  removeProducts(id){
    return this.http.delete(baseUrl+'/deleteProd/'+id);   //Remove Products.....
  }
  updateProducts(id,data){
    return this.http.put(baseUrl+'/updateProd/'+id,data);  //update Products......
  }
  //end.........

}
