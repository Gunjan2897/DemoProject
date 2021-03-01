import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AdminServiceService } from 'src/app/admin/admin-service.service';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  category: any;
  products: any;
  items: any;
  cart: any;
  data: any;
  cartitem: any;



  constructor(private service: AdminServiceService, private custService: CustomerService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getCategory();
    this.getProducts();
    this.addCartItem();
  }
  //get all categories for customers....
  getCategory() {
    this.service.getAll().subscribe(
      res => {
        this.category = res;
        // console.log(this.category);

      }
    )

  }
  //get all products by selecting categories...
  getProducts() {
    this.service.getAllProduct().subscribe(
      res => {
        this.products = res;
        // console.log(this.products);

      }
    )
  }
  //select category.....
  onSelect(title) {
    // console.log(title);

    this.items = this.products.filter(
      res => res.categoryName == title
    )
    //  console.log(this.items);


  }
  addCartItem() {
    this.custService.getCartItems().subscribe(
      res => {
        this.cartitem = res;
        //  console.log(this.cartitem);
      }

    )
  }
  //on click addtocart...
  addCart(id) {
    // console.log(id);
    this.data = { productId: id }
    this.custService.saveCart(this.data).subscribe(
      res => {
        //   console.log(res);
        this.toastr.success("item Added!")

      })

  }

}
