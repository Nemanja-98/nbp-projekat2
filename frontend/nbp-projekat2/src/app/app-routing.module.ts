import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StoreComponent } from './components/store/store.component';    // Add your component here
import { ProfileComponent } from './components/profile/profile.component';  // Add your component here
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

//This is my case 
const routes: Routes = [
    {
        path: '',
        component: StoreComponent
    },
    {
        path: 'profile',
        component: ProfileComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }