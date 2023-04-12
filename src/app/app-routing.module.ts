import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';



import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { SignupComponent } from './components/signup/signup.component';
import { AuthGuard } from './core/services/auth.guard';

const routes: Routes = [
  {path:"" , redirectTo:'home' , pathMatch:'full'},
  {path:"home" , canActivate:[AuthGuard],component:HomeComponent , title:'home'},
  {path:"login" , component:LoginComponent , title:'login'},
  {path:"singup" , component:SignupComponent , title:'singup'},
  {path:"**" , component:NotfoundComponent , title:'404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes , {useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
