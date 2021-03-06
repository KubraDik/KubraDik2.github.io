import { Injectable } from '@angular/core';
import { AngularFirestore,AngularFirestoreCollection,AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Client } from '../modules/Client';
import { map } from 'rxjs/operators';
//import { doc } from '@firebase/firestore';
import { Action } from 'rxjs/internal/scheduler/Action';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  clientsCollection:AngularFirestoreCollection<Client>;//müşteri koleksiyonu oluşturduk,client interfacemizden geliyor
  clientDoc:AngularFirestoreDocument<Client>;
  clients:Observable<Client[]>;
  client:Observable<Client>;

  //afs:angularfirestore,yapıcımız burdan geliyor

  constructor(private afs:AngularFirestore)
   { 
     this.clientsCollection=this.afs.collection('clients',
     ref=> ref.orderBy('lastName','asc'));
   }

  getClients():Observable<Client[]>{
     //Get clients with the id
     this.clients=this.clientsCollection.snapshotChanges().pipe(
     map(changes =>{
       return changes.map(action=>{
         const data=action.payload.doc.data() as Client;
         data.id=action.payload.doc.id;
         return data;
       });
     }));
     return this.clients;
   }



   newClient(client:Client){
     
     this.clientsCollection.add(client);

   }

//docprop kullanırız
   getClient(id:string):Observable<Client>{

    this.clientDoc=this.afs.doc<Client>(`clients/${id}`);
    this.client=this.clientDoc.snapshotChanges().pipe(map(action=>{
      if(action.payload.exists===false){

        return null;
      }else{
 
        const data=action.payload.data() as Client;
        data.id=action.payload.id;
        return data;
      }
    }));
    return this.client;

   }

   updateClient(client: Client) {
    this.clientDoc = this.afs.doc(`clients/${client.id}`);
    this.clientDoc.update(client);
  }

  deleteClient(client: Client) {
    this.clientDoc = this.afs.doc(`clients/${client.id}`);
    this.clientDoc.delete();
  }

      /*deleteClient(client: Client) {
        this.clientDoc = this.afs.doc(`clients/${client.id}`);
        this.clientDoc.delete();
      }*/

  }
