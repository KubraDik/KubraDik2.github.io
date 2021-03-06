import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'flash-messages-angular';
import { Client } from 'src/app/modules/Client';
import { SettingsService } from 'src/app/services/settings.service';
//import { auth } from 'firebase/app';
//import firebase from 'firebase/app';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn:boolean;
  loggedInUser:string;
  showRegister:boolean;

  constructor(
  private authService:AuthService,
  private router:Router,
  private flashMessage:FlashMessagesService,
  private settingsService:SettingsService

  ) { }

  ngOnInit(): void {
    this.authService.getAuth().subscribe(auth=>{
      if(auth){
        this.isLoggedIn=true;//giriş yaptıysak bu işlemi yaparız
        this.loggedInUser=auth.email;
      }else{
        this.isLoggedIn=false;
      }
    });


    this.showRegister=this.settingsService.getSettings().allowRegistration;

  }

  onLogoutClick(){
    this.authService.logout();
    this.flashMessage.show('You are now logged auth',{
      cssClass:'alert-success',timeout:4000
    });
    this.router.navigate(['/login']);
  }

}
