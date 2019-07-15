import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';


/*
  Generated class for the ConstantProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ConstantProvider {

  constructor(public http: Http,public storage: Storage) {
    console.log('Hello ConstantProvider Provider');
  }

  public myGlobalVar: number;


  //  public server_url: string = 'http://localhost/today/index.php/wheel_power/';
  //  public upload_url: string = 'http://localhost/today/uploads/';
  //  public backButton = 0;

  public token= this.storage.get('token');
  public rootUrl: string = 'http://nextstep.net.in/wheel_power/';  
  public server_url: string = this.rootUrl + 'index.php/wheel_power/';
  public upload_url: string = this.rootUrl + 'uploads/';
  public backButton = 0;

}
