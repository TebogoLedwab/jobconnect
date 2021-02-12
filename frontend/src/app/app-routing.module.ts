import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardpageComponent } from './pages/dashboardpage/dashboardpage.component';
import { EditpageComponent } from './pages/editpage/editpage.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { ProfilepageComponent } from './pages/profilepage/profilepage.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  { path: 'home', component: HomepageComponent },
  { path: 'dash', component: DashboardpageComponent, canActivate: [ AuthGuard ] },
  { path: 'profile/:_id', component: ProfilepageComponent, canActivate: [ AuthGuard ] },
  { path: 'dash/profile', component: EditpageComponent, canActivate: [ AuthGuard ] },
  { path: '**', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
