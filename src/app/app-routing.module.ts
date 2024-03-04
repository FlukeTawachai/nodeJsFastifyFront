import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeListComponent } from './components/home-list/home-list.component';
import { HomeAddComponent } from './components/home-add/home-add.component';
import { HomeEditComponent } from './components/home-edit/home-edit.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'Home-list' },
  { path: 'Home-list', component: HomeListComponent },
  { path: 'Home-add', component: HomeAddComponent },
  { path: 'Home-edit/:project/:id', component: HomeEditComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
