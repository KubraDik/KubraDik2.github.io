import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FlashMessagesService } from 'flash-messages-angular';
import { Router } from '@angular/router';
import { User } from 'src/app/modules/User';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  //email:string;
  //password:string;
  user:User={

    email:'',
   password:'',
  }

  constructor(
    private authService:AuthService,
    private router:Router,
    private flashMessage:FlashMessagesService
  ) { }

  ngOnInit(): void {
  }

  onSubmit(){
    this.authService.register(this.user.email,this.user.password)
    .then(res => {
      this.flashMessage.show('You are now registered and logged in',{
        cssClass:'alert-success',timeout:4000
      });
      this.router.navigate(['/']);
    })
    .catch(err => {
      this.flashMessage.show( err.message,{
        cssClass:'alert-danger',timeout:4000
      });
    });
  }

}
