import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
import { Storage } from '@ionic/storage';
import { OrderdetailPage } from '../orderdetail/orderdetail';


@IonicPage()
@Component({
  selector: 'page-order-list',
  templateUrl: 'order-list.html',
})
export class OrderListPage {

  data:any={};
  search:any={};
  login_data:any=[];
  user_id:any='';
  loader:Loading;
  constructor(public navCtrl: NavController, public navParams: NavParams,public db:DatabaseProvider,public storage:Storage,public loadingCtrl:LoadingController) {
  }

  ionViewDidLoad() {
  }

  ionViewWillEnter(){
    this.storage.get('login_data')
    .then(resp=>{
      this.login_data = resp;
      this.data.user_id = this.login_data.id;
      this.data.user_type = this.login_data.user_type;
      console.log(this.login_data);
      this.get_order();
    });
  }

  show:boolean=false
  order_list:any=[];
  get_order()
  {
    this.loader = this.loadingCtrl.create({
      spinner: 'hide',
      content: `<img src="./assets/imgs/gif.svg" class="h15" />`,
    });
    this.loader.present();
    this.data.search = this.search;
    this.db.getData(this.data,"order/get_order")
    .subscribe(resp=>{
      console.log(resp);
      this.order_list = resp['order_list'];
      if(this.order_list.length == 0)
      {
        this.show=true;
      }
      else
      {
        this.show=false;
      }
      for(var i=0; i<this.order_list.length; i++)
      {
        for(var j=0;j<this.order_list[i].order_item.length; j++)
        {
          this.order_list[i].order_item[j]['total_value'] = parseInt(this.order_list[i].order_item[j]['qty']) * parseInt(this.order_list[i].order_item[j]['price']);
        }
      }
      this.loader.dismiss();
    })
  }

  goToOrderdetail(data)
  {
    console.log(data);
    this.navCtrl.push(OrderdetailPage,{row:data});
  }
}
