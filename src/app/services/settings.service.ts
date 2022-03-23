import { Injectable } from '@angular/core';
import { Settings } from '../modules/settings';


@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  
  settings:Settings={

    allowRegistration:false,//kayda izin verme
    disableBalanceOnAdd:false,
    disableBalanceOnEdit:false

  }

  constructor() {

   /*if(localStorage.getItem('settings')!=null) {
     this.settings=JSON.parse(localStorage.getItem('settings'));
   }*/

   }

  getSettings():Settings{
   return this.settings;
  }
/*
  changeSettings(settings:Settings){
    localStorage.setItem('settings',JSON.stringify(settings));//aktarılan ayarlara ayarlar
  }*/
}
