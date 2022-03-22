import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate,Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { SettingsService } from "../services/settings.service";
// import { AngularFireAuth } from "@angular/fire/auth";//yetkiyi devre dışı  bırakacağımız için import ettik
// import { Observable } from "rxjs";//BURASI HATA VEREBİLİR ÇALIŞMAZSA DEFAULT ŞEKİLDE DE BAK
// import { auth } from "firebase";
// import { map } from "rxjs/operators";

@Injectable()
export class RegisterGuard implements CanActivate{
  constructor(
    private router:Router,
    private settingsService:SettingsService,


  ) { }


  canActivate():boolean{

    if(this.settingsService.getSettings().allowRegistration){

      return true;
    }else{

      this.router.navigate(['/login']);
      return false;
    }

  }
  
}
