// import { HttpClient } from '@angular/common/http';
import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import { ConstantProvider } from '../constant/constant';

/*
  Generated class for the ArrivalserviceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ArrivalserviceProvider {

  constructor(public http: Http, private constant: ConstantProvider, public storage: Storage) {
    console.log('Hello ArrivalserviceProvider Provider');
  }


  public getNewArrival(){
    return new Promise((resolve, reject) => {
        let header = new Headers();
        header.append('Content-Type', 'application/json');
        this.http.get(this.constant.server_url+'arrival/arrival_list',{headers: header}).map(res=>res.json())
        .subscribe(res=>{
          console.log(res);
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  public getCategory(){
    return new Promise((resolve, reject) => {
        let header = new Headers();
        header.append('Content-Type', 'application/json');
        this.http.get(this.constant.server_url+'arrival/category_list',{headers: header}).map(res=>res.json())
        .subscribe(res=>{
          console.log(res);
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  public getSubCategoryData(category,filterSelected){
    console.log(category);
    console.log(filterSelected);
    return new Promise((resolve, reject) => {
        let header = new Headers();
        let data = {'category':category, 'filterSelected':filterSelected};
        header.append('Content-Type', 'application/json');        
        this.http.post(this.constant.server_url+'arrival/subcategory_data',JSON.stringify(data),{headers: header}).map(res=>res.json())
        .subscribe(res=>{
          console.log(res);
          resolve(res);

        }, (err) => {
          reject(err);
        });
    });
  }
}
