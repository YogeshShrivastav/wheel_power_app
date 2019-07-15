import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

/*
  Generated class for the DatabaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DatabaseProvider {

  constructor(public http: HttpClient,public storage: Storage) {
  }

  public myGlobalVar: number;
  public token= this.storage.get('token');

  public rootUrl: string = 'http://wheelpower.abacusdesk.com/wheel_power_api/index.php/wheel_power/';  
  public upload_url: string = 'http://wheelpower.abacusdesk.com/wheel_power_api/uploads/';

  public backButton = 0;


  public getData(data:any,fn:any)
  {    
    console.log(data);
    
    let header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
    return this.http.post(this.rootUrl+fn,JSON.stringify(data),{headers: header});  
  }

}
