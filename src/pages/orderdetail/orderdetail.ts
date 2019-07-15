import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, Loading, ToastController } from 'ionic-angular';
import { OrderserviceProvider } from '../../providers/orderservice/orderservice';
// import { AddOrderPage } from '../add-order/add-order';
import { OrdersPage } from '../orders/orders';

import { ConstantProvider} from '../../providers/constant/constant';
import { DatabaseProvider } from '../../providers/database/database';
import { Storage } from '@ionic/storage';
/**
* Generated class for the OrderdetailPage page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/

@IonicPage()
@Component({
  selector: 'page-orderdetail',
  templateUrl: 'orderdetail.html',
})
export class OrderdetailPage {
  
  row:any={};
  orderdetaildata:any=[];
  productdetail:any=[];

  upload_url:any='';
  login_data:any=[];
  constructor(public navCtrl: NavController, public navParams: NavParams,public loadingCtrl: LoadingController, public alertCtrl: AlertController,public db:DatabaseProvider,public storage:Storage,public toastCtrl:ToastController) {
      this.orderdetaildata=navParams.get('row');
      console.log(this.orderdetaildata);
      this.upload_url = this.db.upload_url;
      this.storage.get('login_data')
      .then(resp=>{
        this.login_data = resp;
      })
    }
    
    
    getProductDetailData(){
      let loading =this.loadingCtrl.create({
        spinner: 'hide',
        content: `<img src="./assests/imgs/gif.svg" class="h15">`
      });
      loading.present();
    }
      
    
    cancel_order(id){
      let alert = this.alertCtrl.create({
        title: 'Delete!',
        message: 'Are you sure?',
        buttons: [
          {
            text: 'No',
            handler: () => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'Yes',
            handler: () => {
              console.log(id);
              this.db.getData(id,"order/delete_order")
              .subscribe(resp=>{
                console.log(resp);
                if(resp == 'success')
                {
                  this.navCtrl.pop();
                }
              });
            }
          }
        ]
      });
      alert.present();
    }

    update_order(item,data)
    {
      console.log("called");
      console.log(data);
      this.db.getData(item,"order/update_order")
      .subscribe(resp=>{
        console.log(resp);
        if(resp == 'true')
        {
          let toast = this.toastCtrl.create({
            message: 'Qty Updated!',
            position: 'bottom',
            duration: 2000
          });
          toast.present();
        }
      })
    }

   
    
  
    
  }
  