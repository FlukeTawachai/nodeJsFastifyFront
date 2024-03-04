import { Component } from '@angular/core';
import { HomeService } from './../../services/home/home.service';
import { ApiResponse, Home } from '../../models/homeModel';

@Component({
  selector: 'app-home-list',
  templateUrl: './home-list.component.html',
  styleUrl: './home-list.component.css',
})
export class HomeListComponent {
  homeList: any = [];
  constructor(private homeServices: HomeService) {}
  ngOnInit(): void {
    this.homeServices.getHomeAll().subscribe((home) => {
      // console.log('home', home);
      if (home) {
        let data = home as ApiResponse;
        this.homeList = data.result as Home[];

        // console.log('homeList', this.homeList);
      }
    });
  }

  delete(data: any, i: any) {
    console.log(data);
    if (window.confirm('Do you want to delete this Home?')) {
      this.homeServices.deleteHome(data).subscribe((res) => {
        this.homeList.splice(i, 1);
      });
    }
  }
}
