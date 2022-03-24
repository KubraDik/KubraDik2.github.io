import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


//import { auth } from 'firebase/app';
//import firebase from 'firebase/app';




@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth:AngularFireAuth) { }

  login(email:string,password:string){
    return new Promise((resolve,reject)=>{

      this.afAuth.signInWithEmailAndPassword(email,password)
      .then(userData => resolve(userData),
      err => reject(err))
    });

  }
  getAuth(){
    return this.afAuth.authState.pipe(map(auth=>auth));

}

 logout(){
   this.afAuth.signOut();
 }

 register(email:string,password:string){
  return new Promise((resolve,reject)=>{

    this.afAuth.createUserWithEmailAndPassword(email,password)
    .then(userData => resolve(userData),
    err => reject(err))
  });

}

}
