import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, AlertController, LoadingController, Loading } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
import { Storage } from '@ionic/storage';
import { LoginPage } from '../login/login';
import { ShopingAddressPage } from '../shoping-address/shoping-address';
import { OtpPage } from '../otp/otp';

@IonicPage()
@Component({
  selector: 'page-customer-login',
  templateUrl: 'customer-login.html',
})
export class CustomerLoginPage {

  cart_arr:any=[];
  cart_total:any=0;
  constructor(public navCtrl: NavController, public navParams: NavParams,public db:DatabaseProvider,public storage:Storage,public event:Events,public alertCtrl:AlertController,public loadingCtrl:LoadingController) {
    this.cart_arr = this.navParams.get('data');
    this.cart_total = this.navParams.get('total');
  }
  data:any = {};
  loading:any;
  token:any='';
  cart:any=[];
  login_data:any={};
  ionViewDidLoad() {
    this.loader = this.loadingCtrl.create({
      spinner: 'hide',
      content: `<img src="./assets/imgs/gif.svg" class="h15" />`,
    });
    this.loader.present();
    this.loader.dismiss();
    console.log(this.cart_arr);
    console.log(this.cart_total);
  }


  loader:Loading;
  login()
  {
    this.loader = this.loadingCtrl.create({
      spinner: 'hide',
      content: `<img src="./assets/imgs/gif.svg" class="h15" />`,
    });
    this.loader.present();

    this.db.getData(this.data,"login/loginUser")
    .subscribe(resp=>{
      console.log(resp);
      this.loader.dismiss();
      if(resp['data'])
      {
        this.login_data = resp['data'];
        this.token = resp['token'];
        this.login_data.login = true;
        this.navCtrl.push(OtpPage,{mobile:this.login_data.mobile,otp:this.login_data.otp,token:this.token,cart:this.cart_arr,login_data:this.login_data,cart_total:this.cart_total});
      }
      else
      {
        this.navCtrl.push(ShopingAddressPage,{data:this.cart_arr,total:this.cart_total,new_user:'yes'});
      }
    });
  }
  
  showLoginError() {
      let alert = this.alertCtrl.create({
          title: 'Alert!',
          message: 'Mobile No. does not exist please Register First',
          buttons: ['Ok']
      });
      
      alert.present();
  }  
  
  showLoading() {
      this.loading = this.loadingCtrl.create({
          spinner: 'hide',
          content: '<p><img src="assets/imgs/gif.svg"/></p>'
      });
      this.loading.present();
      this.loading.dismiss();
  }  

  sales_login()
  {
    this.navCtrl.push(LoginPage);
  }

  new_user()
  {
    this.navCtrl.push(ShopingAddressPage,{data:this.cart_arr,total:this.cart_total,new_user:'yes'});
  }
}
