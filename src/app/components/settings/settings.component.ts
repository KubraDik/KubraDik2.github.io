import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'flash-messages-angular';
import { SettingsService } from 'src/app/services/settings.service';
import { Settings } from '../../modules/Settings';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  settings:Settings;

  constructor(
  private router:Router,
  private flashMessage:FlashMessagesService,
  private settingsService:SettingsService
  ) { }

  ngOnInit(): void {
    this.settings=this.settingsService.getSettings();
  }

  onSubmit(){
    this.settingsService.changeSettings(this.settings);
    this.flashMessage.show('Settings saved',{
      cssClass:'alert-success',timeout:4000
    });
  }

}
