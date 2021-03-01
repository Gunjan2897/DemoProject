import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartlist: any;

  constructor(private custservice:CustomerService ,private toastr:ToastrService) { }

  ngOnInit(): void {
    this.custservice.getCartItems().subscribe(
      res=>{this.cartlist=res;console.log(this.cartlist);
      }
    )
  }
//Remove cartItem...
removeCart(id){
  if(confirm("are you sure")){
    this.custservice.removeCartItems(id).subscribe(
      res=>{this.ngOnInit();this.toastr.success("item Deleted!")}
    )
  }
}
}
