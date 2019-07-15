import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
import { OrdersPage } from '../orders/orders';
import { ProductCatalougePage } from '../product-catalouge/product-catalouge';
import { TabsPage } from '../tabs/tabs';
import { Storage } from '@ionic/storage';
import { CustomerLoginPage } from '../customer-login/customer-login';

/**
 * Generated class for the AddtocartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-addtocart',
  templateUrl: 'addtocart.html',
})
export class AddtocartPage {

  e:any={};
  upload_url:any='';
  login_data:any={};
  loader:Loading;
  constructor(public navCtrl: NavController, public navParams: NavParams,public db:DatabaseProvider,public session:Storage,public loadingCtrl:LoadingController){

    this.session.get('login_data').then(resp=>{
      this.login_data = resp;
      console.log(this.login_data);
    })
    this.upload_url = this.db.upload_url;
  }
  
  grand_total:any=0;
  ionViewDidLoad() {   
    this.get_app_record();
  }
  
  cart_array:any=[];
  get_app_record()
  {
    this.loader = this.loadingCtrl.create({
      spinner: 'hide',
      content: `<img src="./assets/imgs/gif.svg" class="h15" />`,
    });
    this.loader.present();

    this.cart_array = this.navParams.get('data');
    this.grand_total = 0;
    for(var i=0;i<this.cart_array.length;i++)
    {
      this.cart_array[i].mrp = parseInt(this.cart_array[i].price)* parseInt(this.cart_array[i].qty);
      this.grand_total = this.grand_total+parseInt(this.cart_array[i].mrp);
    }
    this.loader.dismiss();
    console.log(this.grand_total);
  }

  update_cary_qty(indx,qty,action)
  {
    if(action == 'add'){
      this.cart_array[indx]['qty'] = parseInt(this.cart_array[indx]['qty'])+1;
    }
    else{
      if(this.cart_array[indx]['qty'] > 1){
        this.cart_array[indx]['qty'] = parseInt(this.cart_array[indx]['qty'])-1;
      }
    }
    console.log(this.cart_array);
    this.get_app_record();
  }

  removefrom_cart(indx)
  {
    this.cart_array.splice(indx,1);
    this.navCtrl.push(TabsPage,{index:2});
  }

  place_order()
  {
    if(this.login_data)
    {
      console.log("cart array......... token yes");
      console.log(this.cart_array);

      this.navCtrl.push(OrdersPage,{data:this.cart_array,total:this.grand_total});
    }
    else
    {
      console.log("cart array......... token No");
      console.log(this.cart_array);

      this.navCtrl.push(CustomerLoginPage,{data:this.cart_array,total:this.grand_total})
    }
  }

}
