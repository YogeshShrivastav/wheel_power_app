import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController, ToastController, Events } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
import { ProductCatalougePage } from '../product-catalouge/product-catalouge';
import { ShopingAddressPage } from '../shoping-address/shoping-address';
import { Storage } from '@ionic/storage';
import { OrderListPage } from '../order-list/order-list';
import { TabsPage } from '../tabs/tabs';
 

@IonicPage()
@Component({
  selector: 'page-orders',
  templateUrl: 'orders.html',
})
export class OrdersPage {
  
  cart_arr:any=[];
  grand_total:any=0;
  total_payment:any=0;
  login_data:any={};
  data:any={};
  cash:any={};
  card:any={};
  credit:any={};
  cheque:any={};
  constructor(public event:Events,public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController,public db:DatabaseProvider,public toastCtrl:ToastController,public storage:Storage,public zone:NgZone){  
  }
 
  ionViewDidLoad() {  
  } 
  
  ionViewWillLoad()
  {
    this.cart_arr = this.navParams.get('data');
    console.log(this.cart_arr);
    this.grand_total = this.navParams.get('total');

    this.storage.get('login_data')
    .then(resp=>{
      console.log(resp);
      this.login_data = resp;
      this.data.user_id = this.login_data.id;
      this.data.user_type = this.login_data.user_type;
      console.log(this.login_data);
    });
  }

  error:boolean=false;
  submit_order()
  {
    if(this.data.cheque == true)
    { this.data.cheque_data = this.cheque;  }
    else
    {  this.data.cheque_data = ""; }

    if(this.data.card == true)
    { this.data.card_data = this.card;  }
    else
    {  this.data.card_data = ""; }

    if(this.data.cash == true)
    { this.data.cash_data = this.cash;  }
    else
    {  this.data.cash_data = ""; }

    if(this.data.credit == true)
    { this.data.credit_data = this.credit;  }
    else
    {  this.data.credit_data = ""; }

    this.data.order = this.cart_arr;
    this.data.order_total_amount = this.grand_total;
    this.data.total_payment = this.total_payment;

    if(!this.data.card && !this.data.cash && !this.data.cheque && !this.data.credit)
    {
      this.error=true;
    }
    else
    {
      this.error=false; 
    }



    console.log(this.data);
    if(!this.data.card && !this.data.cash && !this.data.cheque && !this.data.credit)
    {
    }
    else
    {
      if(this.login_data.user_type == "customer")
      {
        this.db.getData(this.data,"order/submit_order")
        .subscribe(resp=>{
          console.log(resp);
          if(resp['msg'] == 'success')
          {
            this.event.publish("login",true);
            this.event.publish("order",true);
            let toast = this.toastCtrl.create({
              message: 'Order Placed',
              position: 'bottom',
              duration: 2000
            });
            
            toast.present();
            this.zone.run(() => {
              this.navCtrl.parent.select(3);
              this.navCtrl.setRoot(OrderListPage);
            });
            // this.navCtrl.setRoot(OrderListPage);
          }
        });
      }
      else
      {
        this.navCtrl.push(ShopingAddressPage,{data:this.data});
      }
    }
  }


  check_mode()
  {
    if(!this.data.card && !this.data.cash && !this.data.cheque && !this.data.credit)
    {
      this.error=true;
    }
    else
    {
      this.error=false; 
    }
  }

  ch_amt:any=0;
  cr_amt:any=0;
  cs_amt:any=0;
  cre_amt:any=0;
  cash_amt:any=0;
  card_amt:any=0;
  cheq_amt:any=0;
  cred_amt:any=0;
  calculate(type)
  {
    if(type == 'cheque')
    {
      if(this.cheque.cheque_amount != ''){
        this.ch_amt = 0;
        this.ch_amt = this.ch_amt+parseInt(this.cheque.cheque_amount);
        this.cheq_amt = this.ch_amt;
      }
      else {
        this.cheq_amt = 0;
      }
    }

    if(type == 'card')
    {
      if(this.card.trans_amount != ''){
        this.cr_amt = this.cs_amt+parseInt(this.card.trans_amount);
        this.card_amt = this.cr_amt;
        this.cr_amt = 0;
      }
      else{
        this.card_amt = 0;
      }
    }

    if(type == 'cash')
    {
      if(this.cash.cash_amount != ''){
        this.cre_amt = this.cre_amt+parseInt(this.cash.cash_amount);
        this.cash_amt = this.cre_amt;
        this.cre_amt = 0;
      }
      else{
        this.cash_amt = 0;
      }
    }

    if(type == 'credit')
    {
      if(this.credit.credit_amt != ''){
        this.cs_amt = this.cs_amt+parseInt(this.credit.credit_amt);
        this.cred_amt = this.cs_amt;
        this.cs_amt = 0;
      }
      else{
        this.cred_amt = 0;
      }
    }
    
    this.total_payment = this.cheq_amt+this.cash_amt+this.card_amt+this.cred_amt;
    if(this.total_payment > this.grand_total)
    {
      let toast = this.toastCtrl.create({
        message: 'Payment amount is more then Order total !',
        position: 'bottom',
        duration: 2000
      });
      toast.present();

      this.total_payment = this.grand_total;

      if(type == 'cheque')
      { 
        this.cheque.cheque_amount = this.grand_total - (this.cash_amt+this.card_amt+this.cred_amt);
      }
      if(type == 'card')
      { 
        this.card.trans_amount = this.grand_total - (this.cheq_amt+this.cash_amt+this.cred_amt);
      }
      if(type == 'cash')
      { 
        this.cash.cash_amount = this.grand_total - (this.cheq_amt+this.card_amt+this.cred_amt);
      }
      if(type == 'credit')
      {
        this.credit.credit_amt = this.grand_total - (this.cheq_amt+this.cash_amt+this.card_amt)
      }

    }
  }


  MobileNumber(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

}
