import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate,Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/auth";//yetkiyi devre dışı  bırakacağımız için import ettik
import { Observable } from "rxjs";//BURASI HATA VEREBİLİR ÇALIŞMAZSA DEFAULT ŞEKİLDE DE BAK
import { auth } from "firebase";
import { map } from "rxjs/operators";

@Injectable()
export class AuthGuard implements CanActivate{
  constructor(
    private router:Router,
    private afAuth:AngularFireAuth,


  ) { }


  canActivate():Observable<boolean>{

    return this.afAuth.authState.pipe(map(auth=>{
      if(!auth){
        this.router.navigate(['/login']);
        return false;
      }else{
        return true;//dersek bizi istenilen sayfaya yönlendirecek
      }
    }));

  }
  
}
