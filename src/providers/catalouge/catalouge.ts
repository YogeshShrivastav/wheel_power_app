
import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import { ConstantProvider } from '../constant/constant';
// import { GESTURE_PRIORITY_MENU_SWIPE } from 'ionic-angular/umd/gestures/gesture-controller';


/*
  Generated class for the CatalougeProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CatalougeProvider {
  
  constructor(public http: Http, private constant: ConstantProvider, public storage: Storage) {
    console.log('Hello CatalougeProvider Provider');

  }


  public getCategory(){
    console.log('testaaaaaa');
    console.log(name);
    return new Promise((resolve, reject) => {
        let header = new Headers();
        header.append('Content-Type', 'application/json');
        this.http.get(this.constant.server_url+'category/category_list',{headers: header}).map(res=>res.json())
        .subscribe(res=>{
          console.log(res);
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }


  public getsubCategory(cat){
    return new Promise((resolve, reject) => {
        let header = new Headers();
        header.append('Content-Type', 'application/json');
        this.http.post(this.constant.server_url+'category/subcategory_list',JSON.stringify(cat),{headers: header}).map(res=>res.json())
        .subscribe(res=>{
          console.log(res);
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  public getProductssList(sub_cat){
    return new Promise((resolve,reject)=>{
      let header = new Headers();
      header.append('Content-Type','application/json');
      this.http.post(this.constant.server_url+'category/productss_list',JSON.stringify(sub_cat),{headers:header}).map(res=>res.json())
      .subscribe(res=>{
        console.log(res);
        resolve(res);
      },(err)=>{
        reject(err);
      })
    })
  }

  public getProductList(sub_category,filterSelectedData,newarrival,brand){
   console.log(sub_category);
   console.log(filterSelectedData);
   console.log(newarrival);


    console.log(newarrival);
    return new Promise((resolve, reject) => {
        let header = new Headers();
        let data = {'sub_category':sub_category, 'filterSelected':filterSelectedData, 'newarrival':newarrival,'brand':brand};
        header.append('Content-Type', 'application/json');
        this.http.post(this.constant.server_url+'category/product_list',JSON.stringify(data),{headers: header}).map(res=>res.json())
        .subscribe(res=>{
          console.log(res);
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  public getCategoryList(){
    return new Promise((resolve, reject) => {
        let header = new Headers();
        header.append('Content-Type', 'application/json');
        this.http.post(this.constant.server_url+'category/category_list',{headers: header}).map(res=>res.json())
        .subscribe(res=>{
          console.log(res);
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }


  public getSubCategoryData(category){
    // console.log(category);
    console.log(category);
    return new Promise((resolve, reject) => {
        let header = new Headers();
        let data = {'category':category};

        header.append('Content-Type', 'application/json');        
        this.http.post(this.constant.server_url+'category/subcategory_data',JSON.stringify(data),{headers: header}).map(res=>res.json())
        .subscribe(res=>{
          console.log(res);
          resolve(res);

        }, (err) => {
          reject(err);
        });
    });
  }

  
  public getBrandCategory(name){
    console.log(name);
    return new Promise((resolve, reject) => {
        let header = new Headers();
        header.append('Content-Type', 'application/json');        
        this.http.post(this.constant.server_url+'category/brandcategory_data',JSON.stringify(name),{headers: header}).map(res=>res.json())
        .subscribe(res=>{
          console.log(res);
          resolve(res);

        }, (err) => {
          reject(err);
        });
    });
  }

}
