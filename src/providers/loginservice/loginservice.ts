import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import { ConstantProvider } from '../constant/constant';

/*
Generated class for the LoginserviceProvider provider.

See https://angular.io/guide/dependency-injection for more info on providers
and Angular DI.
*/
@Injectable()
export class LoginserviceProvider {

     private token_data : any;
     token_value:any;
     
     constructor(public http: Http, private constant: ConstantProvider, public storage: Storage) {
          console.log('Hello LoginserviceProvider Provider');
     }
     
     public verifyMobile(mobile) {       
          return new Promise((resolve, reject) => {
               let header = new Headers();
               header.append('Content-Type', 'application/json');
               let data = {mobile:mobile};
               this.http.post(this.constant.server_url+'login/verifyMobile', JSON.stringify(data), {headers:header}).map(res=>res.json()).subscribe(response=> {
                    console.log(response);
                    resolve(response);
               }, (err) => {
                    console.log(err);
                    reject(err);
               });
          })
     }
     
     public sendMobileSMS(mobile) {
          
          return new Promise((resolve, reject) => {
               let header = new Headers();
               header.append('Content-Type', 'application/json');
               let data = {mobile:mobile};
               this.http.post(this.constant.server_url+'login/sendMobileSMS', JSON.stringify(data), {headers:header}).map(res=>res.json()).subscribe(response=> {
                    console.log(response);
                    resolve(response);
               }, (err) => {
                    console.log(err);
                    reject(err);
               });
          })
     }
     
     
     // public reauthenticate(token) {
     //      return new Promise((resolve, reject) => {
     //           this.token_value = this.get_token_data();
     //           this.token_value = this.get_token_data();
     //           let header = new Headers({"Content-Type": "application/x-www-form-urlencoded",'Authorization': 'Bearer '+this.token_value});
               
     //           this.http.get(this.constant.server_url+'login/auth', {headers: header}).map(res => res.json())
     //           .subscribe(res => {
     //                resolve(res);
     //                console.log(res);
     //           }, (err) => {
     //                reject(err);
     //           });
     //      });
     // }

     set_token_data(value)
     {
       this.token_data = value;
     }
     get_token_data()
     {
       return this.token_data;
     }
     
     
}
