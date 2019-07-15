import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
import { ProductCatalougePage } from '../product-catalouge/product-catalouge';
import { Storage } from '@ionic/storage';
import { OrderListPage } from '../order-list/order-list';
import { CustomerLoginPage } from '../customer-login/customer-login';

@IonicPage()
@Component({
  selector: 'page-shoping-address',
  templateUrl: 'shoping-address.html',
})
export class ShopingAddressPage {

  state_name:any={};
  district_name:any={};
  cart_arr:any=[];
  grand_total:any=0;
  total_payment:any=0;
  cart_total:any=0;
  new_user:any='';
  login_type:any='';
  data:any={};
  cash:any={};
  card:any={};
  cheque:any={};
  login_data:any={};
  constructor(public navCtrl: NavController, public navParams: NavParams,public db:DatabaseProvider,public toastCtrl:ToastController,public storage:Storage) {
    this.new_user = this.navParams.get('new_user');
    if(this.new_user)
    {
      this.data.order = this.navParams.get('data');
      console.log("if");
    }
    else
    {
      this.data = this.navParams.get('data');
      console.log(this.data);
      
      console.log("else");
    }
    this.cart_total = this.navParams.get('total');

    this.storage.get('login_data')
    .then((login_value)=>{
      this.login_data = login_value;
      this.data.user_id = this.login_data.id;
      this.data.user_type = this.login_data.user_type;
      console.log(this.login_data);
    });
    console.log(this.state_name);
    
  }

  ionViewDidLoad() {  
    this.get_state();
    this.get_district_indp();
  }

  place_order()
  {
    console.log(this.data);
    if(this.data.order_total_amount)
    {
      this.db.getData(this.data,"order/submit_order")
      .subscribe(resp=>{
        console.log(resp);
        if(resp['msg'] == 'success')
        {
          let toast = this.toastCtrl.create({
            message: 'Order Placed',
            position: 'bottom',
            duration: 2000
          });
          
          toast.present();
          this.navCtrl.setRoot(OrderListPage);
          this.navCtrl.parent.select(3);
        }
      });
    }
    else
    {
      this.db.getData(this.data,"customer/submit_customer")
      .subscribe(resp=>{
        console.log(resp);
        if(resp == 'success')
        {
          let toast = this.toastCtrl.create({
            message: 'Account Created',
            position: 'bottom',
            duration: 2000
          });
          toast.present()
          this.navCtrl.setRoot(CustomerLoginPage,{data:this.data.order,total:this.cart_total});
        }
      })
    }
    

  }

  MobileNumber(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  state_list:any=[];
  get_state()
  {
    this.db.getData("","order/get_state")
    .subscribe(resp=>{
      console.log(resp);
      this.state_list = resp;
    })
  }

  district_list:any=[];
  get_district(state)
  {
    this.data.state = state.state_name;
    this.db.getData(state,"order/get_district")
    .subscribe(resp=>{
      console.log(resp);
      this.district_list = resp;
    })
  }

  get_district_indp()
  {
    this.db.getData("","order/get_district_indp")
    .subscribe(resp=>{
      console.log(resp);
      this.district_list = resp;
    })
  }

  city_list:any=[];
  get_city(district)
  {
    this.data.district = district.district_name;
    this.db.getData(this.data,"order/get_city")
    .subscribe(resp=>{
      console.log(resp);
      this.city_list = resp;
    })
    
  }

  area_list:any=[];
  get_area(city)
  {
    this.data.city = city.city;
    this.db.getData(this.data,"order/get_area")
    .subscribe(resp=>{
      console.log(resp);
      this.area_list = resp
    })
  }

  
  get_pincode(area)
  {
    this.data.area = area.area;
    this.db.getData(this.data,"order/get_pincode")
    .subscribe(resp=>{
      console.log(resp);
      this.data.pincode = resp['pincode'];
    })
  }

  
  check_user()
  {
    console.log(this.data.mobile_1);
    this.db.getData(this.data.mobile_1,"order/check_user")
    .subscribe(resp=>{
      console.log(resp);
      if(resp)
      {
        this.data.name = resp['name'];
        this.data.mobile_1 = resp['mobile_1'];
        this.data.mobile_2 = resp['mobile_2'];
        this.data.address = resp['address'];
        this.data.email = resp['email'];
        this.data.state = resp['state'];
        this.data.district = resp['district'];
        this.state_name.state_name = resp['state'];
        this.district_name.district_name = resp['district'];
        this.data.city = resp['city'];
        this.data.pincode = resp['pincode'];
      }
    });
  }
}
