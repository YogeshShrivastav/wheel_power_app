import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ConstantProvider } from '../../providers/constant/constant';
import { Storage } from '@ionic/storage';
import { stringify } from '@angular/core/src/util';
import { OrdersPage } from '../orders/orders';
import { LoginPage } from '../login/login';
import { OrderserviceProvider } from '../../providers/orderservice/orderservice';

/**
 * Generated class for the ViewCartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-view-cart',
  templateUrl: 'view-cart.html',
})
export class ViewCartPage {

  cart_arr:any=[];
  total_price:any;
  cart_id:string;
  cart_count:string;
  cart_price:string;
  upload_url:any;
  token:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public constant:ConstantProvider, public order_service: OrderserviceProvider) {

    // this.token = this.navParams.get('token');
    // console.log(this.token);
    

    this.storage.get('token').then((token_value)=>{
      console.log(token_value);
      this.token = token_value;
    })

    this.storage.get('cart_data').then((data)=>{
      if(data){
        console.log('Data is:', JSON.parse(data));
        this.cart_arr=JSON.parse(data);
        console.log(this.cart_arr);
        this.calc_total();
      }
    });

  }

  calc_total(){
    this.total_price = 0;
    console.log(this.cart_arr);
    for(let i =0 ; i< this.cart_arr.length; i++){
      this.total_price = parseInt(this.total_price) + ((this.cart_arr[i].price != 0 ? parseInt(this.cart_arr[i].price) : parseInt(this.cart_arr[i].price)) * parseInt(this.cart_arr[i].count) );
      if(i==0){
        this.cart_id = this.cart_arr[i].id ;
        this.cart_count = this.cart_arr[i].count ;
        this.cart_price = this.cart_arr[i].price ;
      }else{
        this.cart_id = this.cart_id+ '-' +this.cart_arr[i].id ;
        this.cart_count = this.cart_count+ '-' +this.cart_arr[i].count ;
        this.cart_price = this.cart_price+ '-' +this.cart_arr[i].price ;
      }
    }
    console.log(this.cart_id);
    console.log(this.cart_count);
  }
  remove_from_cart(i){
    this.cart_arr.splice([i],1);
    this.storage.set('cart_data',JSON.stringify(this.cart_arr));
    this.calc_total();
    if(this.cart_arr.length == 0){
      this.navCtrl.pop();
    }
  }
  
  add_item(i){
    this.cart_arr[i].count+=1;
    this.storage.set('cart_data',JSON.stringify(this.cart_arr));
    this.calc_total();
  }

  rm_item(i){
    this.cart_arr[i].count-=1;
    this.storage.set('cart_data',JSON.stringify(this.cart_arr));
    this.calc_total();
  }

  ionViewWillLeave(){
    this.constant.myGlobalVar = this.cart_arr.length;
  }

  ionViewDidLoad() {
    this.upload_url = this.constant.upload_url;
    console.log('ionViewDidLoad ViewCartPage');
  }

  token_value:any;
  goToOrderPage(){
    console.log(this.cart_arr);
    
      if(this.token){
        // this.order_service.insert_order(this.cart_arr).then((response)=>{
        //   console.log(response);
        // })
        this.navCtrl.push(OrdersPage,{cart:this.cart_arr});
      }else{
        this.navCtrl.push(LoginPage,{cart:this.cart_arr});
      }
    
    // this.navCtrl.push(OrdersPage,{cart:this.cart_arr});

  }

}
