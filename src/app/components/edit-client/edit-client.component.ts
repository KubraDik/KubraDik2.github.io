import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FlashMessagesService } from 'flash-messages-angular';
import { Client } from 'src/app/modules/Client';
import { FlashMessagesModule } from 'flash-messages-angular';


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
  disableBalanceOnEdit:boolean=true

  constructor(
    private clientService:ClientService,
    private router:Router,
    private route:ActivatedRoute,
    private flashMessage:FlashMessagesService
  ) { }

  ngOnInit(): void {
    //Get id from url
    this.id=this.route.snapshot.params['id'];
     //Get client
     this.clientService.getClient(this.id).subscribe(client => 
      
       this.client = client
      // console.log(this.client);
      );
 
   }


   onSubmit({value,valid}:{value:Client, valid:boolean}){
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

   }

}
