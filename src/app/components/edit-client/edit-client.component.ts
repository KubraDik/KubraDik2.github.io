import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FlashMessagesService } from 'flash-messages-angular';
import { Client } from 'src/app/modules/Client';
import { FlashMessagesModule } from 'flash-messages-angular';
import { SettingsService } from 'src/app/services/settings.service';


@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {

  id:string;
  client:Client={
    firstName:'',
    lastName:'',
    email:'',
    phone:'',
    balance:0
  }
  disableBalanceOnEdit:boolean;

  constructor(
    private clientService:ClientService,
    private router:Router,
    private route:ActivatedRoute,
    private flashMessage:FlashMessagesService,
    private settingsService:SettingsService

  ) { }

  /*ngOnInit(): void {
    //Get id from url
    this.id=this.route.snapshot.params['id'];
     //Get client
     this.clientService.getClient(this.id).subscribe(client => 
      
       this.client = client
      // console.log(this.client);
      );
 
   }*/

   ngOnInit() {
    //Get id from url
    this.id=this.route.snapshot.params['id'];
     //Get client
     this.clientService.getClient(this.id).subscribe(client => this.client = client);

     this.disableBalanceOnEdit=this.settingsService.getSettings().disableBalanceOnEdit;

 
   }


   onSubmit({value,valid}:{value:Client ,valid:boolean}){
    if(!valid){
      this.flashMessage.show('Please fill out the form correctly',{
        cssClass:'alert-danger',timeout:4000});
    }else{
      //Add id to client:biz client gönderiyoruz ama aslında id göndermemiz gerekir ki güncelleme yapabilelim(urlden elir)
      value.id=this.id;
      //Update client
      this.clientService.updateClient(value);
      this.flashMessage.show('Client updated',{
        cssClass:'alert-success',timeout:4000});

    }
    this.router.navigate(['/client/'+this.id]);

   }

   /*  onSubmit({value,valid}:{value:Client, valid:boolean}){
   if(!valid){
       this.flashMessage.show('Please fill out the form correctly',{
         cssClass:'alert-danger',timeout:4000
       });

     }else{
       //Add id to client
       value.id=this.id;
       //Update client
       this.clientService.updateClient(value);
       this.flashMessage.show('Client Updated',{
        cssClass:'alert-success',timeout:4000
      });
     this.router.navigate(['/client/'+this.id]);
     }

   }*/

}
