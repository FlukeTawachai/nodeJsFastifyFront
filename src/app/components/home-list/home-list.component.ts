import { Component } from '@angular/core';
import { HomeService } from './../../services/home/home.service';
import { ApiResponse, CustomerInfo, Home } from '../../models/homeModel';

@Component({
  selector: 'app-home-list',
  templateUrl: './home-list.component.html',
  styleUrl: './home-list.component.css',
})
export class HomeListComponent {
  homeList: any = [];
  customerList: any = [];
  constructor(private homeServices: HomeService) {}
  ngOnInit(): void {
    // this.homeServices.getHomeAll().subscribe((home) => {
    //   // console.log('home', home);
    //   if (home) {
    //     let data = home as ApiResponse;
    //     this.homeList = data.result as Home[];

    //     // console.log('homeList', this.homeList);
    //   }
    // });
    this.homeServices.getCustomerAll().subscribe((customer) => {
      if (customer) {
        let data = customer as ApiResponse;
        this.customerList = data.result as CustomerInfo[];

        // console.log('customer', data);
      }
    });
  }

  delete(data: any, i: any) {
    console.log(data);
    if (window.confirm('Do you want to delete this Customer?')) {
      this.homeServices.deleteCustomer(data).subscribe((res) => {
        this.customerList.splice(i, 1);
      });
    }
  }
}
