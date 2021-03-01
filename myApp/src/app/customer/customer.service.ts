import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


const baseUrl="http://localhost:8080/api";
@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http:HttpClient) { }
  
  //register new customer in to database......
  newCustomer(data){
    return this.http.post(baseUrl+'/customer',data);
  }
  //login customer...
  login(data){
     return this.http.post(baseUrl+'/login',data);
  }

  //cart
  //save cart...
  saveCart(data){
    return this.http.post(baseUrl+'/save',data);
  }
 // retrive cartitems.....
  getCartItems(){
    return this.http.get(baseUrl+'/getcart');
  }
  //remove cartitems........
  removeCartItems(id){
    return this.http.delete(baseUrl+'/del/'+id);
  }
}
