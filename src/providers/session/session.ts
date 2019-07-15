import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DatabaseProvider } from '../database/database';
import { Storage } from '@ionic/storage';
import { NavController } from 'ionic-angular';
import { HomePage } from '../../pages/home/home';

/*
  Generated class for the SessionProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SessionProvider {

  constructor(public http: HttpClient,public db:DatabaseProvider,public storage:Storage,public navCtrl:NavController) {
    console.log('Hello SessionProvider Provider');
  }

  setSession(data:any)
  {
    console.log(data);
    
    
  }

}
