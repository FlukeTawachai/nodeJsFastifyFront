import { Component, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HomeService } from '../../services/home/home.service';
import { ApiResponse, Home } from '../../models/homeModel';

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
  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private activatedRoute: ActivatedRoute,
    private homeServices: HomeService
  ) {
    this.homeForm = this.formBuilder.group({
      cPROJ_CODE: [''],
      cADDR_NO: [''],
      iNO_OF_CAR: [''],
      cCREATE_BY: ['TEST'],
      cSTATUS: ['Y'],
    });
    this.project = this.activatedRoute.snapshot.paramMap.get('project');
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.homeServices.getHome(this.project, this.id).subscribe((home) => {
      if (home) {
        let data = home as ApiResponse;
        let homeData = data.result as Home[];
        this.homeForm = this.formBuilder.group({
          cPROJ_CODE: [
            { value: homeData[0].cPROJ_CODE, disabled: true },
            Validators.required,
          ],
          cADDR_NO: [
            { value: homeData[0].cADDR_NO, disabled: true },
            Validators.required,
          ],
          iNO_OF_CAR: [homeData[0].iNO_OF_CAR],
          cSTATUS: ['Y'],
          cCREATE_BY: ['UPDATE'],
        });
      }
    });
  }

  onSubmit(): any {
    this.homeServices.updateHome(this.homeForm.value).subscribe(
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
