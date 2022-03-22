import { Component, OnInit,ViewChild } from '@angular/core';
import { FlashMessagesService } from 'flash-messages-angular';
import { ClientService } from 'src/app/services/client.service';
import { Router } from '@angular/router';
import { SettingsService } from 'src/app/services/settings.service';

import { Client } from 'src/app/modules/Client';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {

  client:Client={

    firstName:'',
    lastName:'',
    email:'',
    phone:'',
    balance:0
  }

  //disableBalanceOnAdd:boolean=true;//bakiyeyi devredışı bırakıyoruz
   disableBalanceOnAdd:boolean;

  //clientForm htmldeki formumuzun ismidir
 @ViewChild('clientForm') form:any;

  constructor(
    private flashMessage : FlashMessagesService,
    private clientService: ClientService,
    private router:Router,
    private settingsService:SettingsService

    ) { }

  ngOnInit(): void {
   this.disableBalanceOnAdd=this.settingsService.getSettings().disableBalanceOnAdd;

  }

  onSubmit({value,valid}:{value:Client,valid:boolean}){

    if(this.disableBalanceOnAdd){
      value.balance=0;
    }

    //form geçerli değilse
    if(!valid){
      //Show error
      this.flashMessage.show('Please fill out the form correctly',{
        cssClass:'alert-danger',timeout:4000
      });

    }else{
      //Add new client
      //değer client olarak biçimlendiriliyor(import { ClientService } from 'src/app/services/client.service';)
      this.clientService.newClient(value);
      //Show message
      this.flashMessage.show('New client added',{
        cssClass:'alert-success',timeout:4000
      });
      //Redirect to dash-kısaçizgiye yönlendir
      this.router.navigate(['/']);//slashla nereye yönlendirildiğini belirtiriz
    }
  }

}
