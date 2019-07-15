// import { HttpClient } from '@angular/common/http';
import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ConstantProvider } from '../constant/constant';

/*
  Generated class for the EnquiryserviceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class EnquiryserviceProvider {

  constructor(public http: Http, private constant: ConstantProvider, public storage: Storage) {
   
  }

  public getState(){
    return new Promise((resolve, reject) => {
        let header = new Headers();
        header.append('Content-Type', 'application/json');
        this.http.get(this.constant.server_url+'enquiry/all_state',{headers: header}).map(res=>res.json())
        .subscribe(res=>{
          console.log(res);
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  public getCity(val){
    return new Promise((resolve, reject) => {
        let header = new Headers();
        header.append('Content-Type', 'application/json');
        this.http.post(this.constant.server_url+'enquiry/all_city',JSON.stringify(val),{headers: header}).map(res=>res.json())
        .subscribe(res=>{
          console.log(res);
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }


  public submit_enquiry(enquiry){
    return new Promise((resolve, reject) => {
       let header = new Headers();
        header.append('Content-Type', 'application/json');
        console.log(enquiry);
        this.http.post(this.constant.server_url+'enquiry/submit_enquiry',JSON.stringify(enquiry),{headers: header}).map(res=>res.json())
        .subscribe(res=>{
          console.log(res);
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
}
