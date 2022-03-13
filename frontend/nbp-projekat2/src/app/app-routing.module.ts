import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StoreComponent } from './components/store/store.component';    // Add your component here
import { ProfileComponent } from './components/profile/profile.component';  // Add your component here

//This is my case 
const routes: Routes = [
    {
        path: '',
        component: StoreComponent
    },
    {
        path: 'profile',
        component: ProfileComponent
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }