import { Component, NgZone } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { HomeService } from '../../services/home/home.service';

@Component({
  selector: 'app-home-add',
  templateUrl: './home-add.component.html',
  styleUrl: './home-add.component.css'
})
export class HomeAddComponent {
  homeForm : FormGroup;
  constructor(
    public formBuilder:FormBuilder,
    private router:Router,
    private ngZone:NgZone,
    private homeServices: HomeService
  ) { 
    this.homeForm = this.formBuilder.group({
      cPROJ_CODE:[''],
      cADDR_NO:[''],
      iNO_OF_CAR:[''],
      cCREATE_BY: ['TEST']
    })
  }

  onSubmit():any{
    this.homeServices.addHome(this.homeForm.value)
    .subscribe(()=>{
      console.log("Data added successfully");
      this.ngZone.run(()=> this.router.navigateByUrl('/Home-list'))
    },(err)=>{
      console.log(err);
    })
  }
}
