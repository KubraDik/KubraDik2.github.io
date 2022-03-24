import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FlashMessagesService } from 'flash-messages-angular';
import { Router } from '@angular/router';
import { User } from 'src/app/modules/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


 
 // email:string;
  //password:string;
   user:User={

    email:'hello',
   password:'',
  }
   


  constructor(
    private authService:AuthService,
    private router:Router,
    private flashMessage:FlashMessagesService
  ) { }

  ngOnInit(): void {
    console.log(this.user.email)
    this.authService.getAuth().subscribe(auth=>{
      if(auth){
        this.router.navigate(['/']);
      }
    });
    
  }

  onSubmit(){
    console.log(this.user.email)
    console.log(this.user.password)
   // this.authService.login(this.email,this.password)
   this.authService.login(this.user.email,this.user.password)

    .then(res =>{
      this.flashMessage.show('You are now logged in',{
        cssClass:'alert-success',timeout:4000
      });
      this.router.navigate(['/']);
    })
    .catch(err=>{
      this.flashMessage.show(err.message,{
        cssClass:'alert-danger',timeout:4000
      });
    });
  }
}
