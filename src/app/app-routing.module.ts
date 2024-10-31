import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/Login/login.component';
import { RegisterComponent } from './Components/Register/register.component';
import { HomeComponent } from './Components/home/home.component';
import { ModifyUserComponent } from './Components/modify-user/modify-user.component';

const routes: Routes = [
{path: 'login', component: LoginComponent},
{path: 'register', component: RegisterComponent},
{path: 'home', component: HomeComponent},
{path: 'modify-user', component: ModifyUserComponent},
{path: '', redirectTo: '/home', pathMatch: 'full'},  
{path: '**', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
