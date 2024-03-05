import { Component, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HomeService } from '../../services/home/home.service';
import { ApiResponse, CustomerInfo, Home } from '../../models/homeModel';

@Component({
  selector: 'app-home-edit',
  templateUrl: './home-edit.component.html',
  styleUrl: './home-edit.component.css',
})
export class HomeEditComponent {
  project: any;
  id: any;
  status = [
    { value: 'Y', title: 'Active' },
    { value: 'N', title: 'inactive' },
  ];
  homeForm: FormGroup;

  req: any;
  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private activatedRoute: ActivatedRoute,
    private homeServices: HomeService
  ) {
    this.homeForm = this.formBuilder.group({
      custId: [''],
      firstName: [''],
      lastName: [''],
      phone: [''],
    });
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.homeServices.getCustomer(this.project, this.id).subscribe((home) => {
      if (home) {
        let data = home as ApiResponse;
        let dataList = data.result as CustomerInfo[];
        this.req = {
          custId: [dataList[0].custId],
          firstName: [dataList[0].firstName],
          lastName: [dataList[0].lastName],
          phone: [dataList[0].phone],
        };
        this.homeForm = this.formBuilder.group({
          custId: [{ value: this.req.custId, disabled: true }],
          firstName: [this.req.firstName],
          lastName: [this.req.lastName],
          phone: [this.req.phone],
        });
      }
    });
  }

  onSubmit(): any {
    this.req.firstName = this.homeForm.value.firstName;
    this.req.lastName = this.homeForm.value.lastName;
    this.req.phone = this.homeForm.value.phone;
    // console.log('onSubmit', this.req);
    this.homeServices.updateCustomer(this.req).subscribe(
      () => {
        console.log('Data update successfully');
        this.ngZone.run(() => this.router.navigateByUrl('/Home-list'));
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
