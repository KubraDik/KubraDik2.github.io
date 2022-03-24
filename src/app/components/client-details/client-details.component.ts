import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FlashMessagesService } from 'flash-messages-angular';
import { Client } from 'src/app/modules/Client';
import { FlashMessagesModule } from 'flash-messages-angular';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {
  id:string;
  client:Client;
  hasBalance:boolean=false;//balance yoksa yeşil,varsa kırmızı olsun diye
  showBalanceUpdateInput:boolean=false;

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
    this.clientService.getClient(this.id).subscribe(client => {
      if(client !=null){
        if(client.balance > 0){

          this.hasBalance=true;

        }

      }
      this.client = client;
      console.log(this.client);
    
    }
  );

  }

  //updateBalance(id :string)
  updateBalance(id :string){

   this.clientService.updateClient(this.client);
   this.flashMessage.show('Balance Updated',{//güncellenmiş mesajı isteriz
     cssClass:'alert-success',timeout:4000
   });

  }


  onDeleteClick(){
    if(confirm('Are you sure?')){
      this.clientService.deleteClient(this.client);
      this.flashMessage.show('Client removed',{//güncellenmiş mesajı isteriz
        cssClass:'alert-success',timeout:4000
      });
      this.router.navigate(['/']);
    }
  }
 /* onDeleteClick() { 
    if(confirm('Are you sure?')) {
      this.clientService.deleteClient(this.client);
      this.flashMessage.show('Client removed', {
        cssClass: 'alert-success', timeout: 4000
      });
      this.router.navigate(['/']);
    }
  }*/

}
