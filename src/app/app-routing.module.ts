import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component'; 
import { RegisterComponent } from './components/register/register.component';
import { AddClientComponent } from './components/add-client/add-client.component';
import { ClientDetailsComponent } from './components/client-details/client-details.component';
import { ClientsComponent } from './components/clients/clients.component';
import { EditClientComponent } from './components/edit-client/edit-client.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SettingsComponent } from './components/settings/settings.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AuthGuard } from './guards/auth.guard';
import { RegisterGuard } from './guards/register.guard';

const routes:Routes=[

  {path:'' ,component:DashboardComponent},
  {path:'login' ,component:LoginComponent},
  {path:'register' ,component:RegisterComponent},
  {path:'client/add' ,component:AddClientComponent},
  {path:'client/edit/:id' ,component:EditClientComponent},
  {path:'client/:id' ,component:ClientDetailsComponent},
  {path:'settings' ,component:SettingsComponent},
  {path:'**' ,component:NotFoundComponent},

  /*
  AUTHGUARDI EKLE SONRASINDA VE FİREBASEİ ADMİN GİRİŞİNİ DÜZENLE
  {path:'' ,component:DashboardComponent , canActivate:[AuthGuard]},
  {path:'login' ,component:LoginComponent},
  {path:'register' ,component:RegisterComponent,canActivate:[RegisterGuard]},
  {path:'client/add' ,component:AddClientComponent, canActivate:[AuthGuard]},
  {path:'client/edit/:id' ,component:EditClientComponent, canActivate:[AuthGuard]},
  {path:'client/:id' ,component:ClientDetailsComponent, canActivate:[AuthGuard]},
  {path:'settings' ,component:SettingsComponent, canActivate:[AuthGuard]},
  {path:'**' ,component:NotFoundComponent},
  */



];

@NgModule({
  exports:[RouterModule],
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  providers:[AuthGuard,RegisterGuard]
})
export class AppRoutingModule { }


//not:guard servistir ve servisler providera eklenir.