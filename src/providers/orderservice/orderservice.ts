import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ConstantProvider } from '../constant/constant';
import { Header } from 'ionic-angular';

/*
Generated class for the OrderserviceProvider provider.

See https://angular.io/guide/dependency-injection for more info on providers
and Angular DI.
*/
@Injectable()
export class OrderserviceProvider {
  
  private token_data : any;
  token_value:any;
  
  constructor(public http: Http, private constant: ConstantProvider, public storage: Storage) {
    console.log('Hello OrderserviceProvider Provider');
  }
  
  
  public getCategoryList(){
    console.log('test')
    return new Promise((resolve, reject) => {
      this.storage.get('token').then((token_value) => {
      
      let header = new Headers({"Content-Type": "application/x-www-form-urlencoded",'Authorization': 'Bearer '+token_value});
      
      console.log(this.token_value); 
      this.http.post(this.constant.server_url+'Order/category_list',JSON.stringify(token_value),{headers: header}).map(res=>res.json())
      .subscribe(res=>{
        console.log(res);
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
    });
  }
  
  public get_products(val){  
    return new Promise((resolve, reject) => {
      this.storage.get('token').then((token_value) => {
      
      let header = new Headers({"Content-Type": "application/x-www-form-urlencoded",'Authorization': 'Bearer '+token_value});
      this.http.post(this.constant.server_url+'order/product_list',JSON.stringify(val,token_value),{headers: header}).map(res=>res.json())
      .subscribe(res=>{
        console.log(res);
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
    });
  }
  
  public insert_order(data:any){
    return new Promise((resolve, reject) => {  
      this.storage.get('token').then((token_value) => {
      
      let header = new Headers({"Content-Type": "application/x-www-form-urlencoded",'Authorization': 'Bearer '+token_value});
      this.http.post(this.constant.server_url+'order/submit_order',JSON.stringify(data,token_value),{headers: header}).map(res=>res.json())
      .subscribe(res=>{
        console.log(res);
        
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
    });
  }
  
  
  public get_order_list(){
    console.log('test');
    return new Promise((resolve, reject) => {
      this.storage.get('token').then((token_value) => {
      let header = new Headers({"Content-Type": "application/x-www-form-urlencoded",'Authorization': 'Bearer '+token_value});
      this.http.post(this.constant.server_url+'order/get_order',JSON.stringify(token_value),{headers: header}).map(res=>res.json())
      .subscribe(res=>{
        console.log(res);
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
    });
  }

  // public change_item_qty(id,op){
  //   console.log('test');
  //   return new Promise((resolve, reject) => {
  //     this.token_value = this.get_token_data();    
  //     let header = new Headers({"Content-Type": "application/x-www-form-urlencoded",'Authorization': 'Bearer '+this.token_value});
  //     this.http.post(this.constant.server_url+'order/get_order',JSON.stringify(this.token_value),{headers: header}).map(res=>res.json())
  //     .subscribe(res=>{
  //       console.log(res);
  //       resolve(res);
  //     }, (err) => {
  //       reject(err);
  //     });
  //   });
  // }
  // public change_item_qty(id,op){
  //   console.log(id);
  //   return new Promise ((resolve, reject)=>{
  //     this.token_value = this.get_token_data();
  //     let header =new Headers({"Content-Type": "application/x-www-form-urlencoded",'Authorization': 'Bearer' +this.token_value}); this.http.post(this.constant.server_url+'order/get_order_datas',JSON.stringify(this.token_value,id),{ headers : header}).map(res=>res.json())
  //     .subscribe(res=>{
  //       resolve(res);
  //     },
  //     (err)=>{
  //       reject(err);
        
  //     });
  //   });
  // }

  public change_item_qty(id,op){  
    console.log(id)
    return new Promise((resolve, reject) => {
      let header = new Headers();
      header.append('Content-Type', 'application/json');
      let data = {'id':id, 'op':op};
      this.http.post(this.constant.server_url+'order/change_order_item',JSON.stringify(data),{headers: header}).map(res=>res.json())
      .subscribe(res=>{
        console.log(res);
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }
  
  public get_order_detail(id){  
    console.log(id)
    return new Promise((resolve, reject) => {
      let header = new Headers();
      header.append('Content-Type', 'application/json');
      this.http.post(this.constant.server_url+'order/get_order_data',JSON.stringify(id),{headers: header}).map(res=>res.json())
      .subscribe(res=>{
        console.log(res);
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }
  
  public cancle_order(id){  
    console.log(id)
    return new Promise((resolve, reject) => {
      let header = new Headers();
      header.append('Content-Type', 'application/json');
      this.http.post(this.constant.server_url+'order/cancle_order',JSON.stringify(id),{headers: header}).map(res=>res.json())
      .subscribe(res=>{
        console.log(res);
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }
  
  public getProductDetailData(id){  
    console.log(id)
    return new Promise((resolve, reject) => {
      let header = new Headers();
      header.append('Content-Type', 'application/json');
      this.http.post(this.constant.server_url+'order/get_order_datas',JSON.stringify(id),{headers: header}).map(res=>res.json())
      .subscribe(res=>{
        console.log(res);
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  public delete_item(id){  
    console.log(id)
    return new Promise((resolve, reject) => {
      let header = new Headers();
      header.append('Content-Type', 'application/json');
      this.http.post(this.constant.server_url+'order/delete_order',JSON.stringify(id),{headers: header}).map(res=>res.json())
      .subscribe(res=>{
        console.log(res);
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }
  
}
