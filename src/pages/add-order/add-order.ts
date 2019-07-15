import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { IonicSelectableComponent } from 'ionic-selectable';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrderserviceProvider } from '../../providers/orderservice/orderservice';
import { ConstantProvider } from '../../providers/constant/constant';

import { Storage } from '@ionic/storage';

import{ OrdersPage } from '../orders/orders';


/**
 * Generated class for the AddOrderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-order',
  templateUrl: 'add-order.html',
})

export class AddOrderPage {

  public id: number;
  public name: string;

  ports:  any;
  orderForm: FormGroup;
  categories:any=[];
  products:any=[];
  cart_arr:any=[];
  data_value:any=0;

  total_qty:any=0;
  sub_total:any=0;
  disc_total:any=0;
  disc_value:any=0;
  gst_value:any=0;
  gross_total:any=0;
  total_amt:any=0;
  dealer_discount:any=0;

  constructor(public navCtrl: NavController, public formBuilder: FormBuilder, public navParams: NavParams,public serv:OrderserviceProvider,public storage: Storage, public alertCtrl: AlertController,  public toastCtrl: ToastController, public constant:ConstantProvider) {

    this.orderForm = formBuilder.group({
      category_val: ['', Validators.required],
      product_val: ['', Validators.required],
      qty: [1, Validators.required],
      comment:''
    });

    this.categories = navParams.get('categories');
    console.log(this.categories);
  }

  portChange(event: {
    component: IonicSelectableComponent,
    value: any 
  }) {
    console.log('port:', event.value);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddOrderPage');
  }
  
  ionViewWillEnter(){
    this.orderForm.value.qty=1;
  }
  


  get_products(){
    console.log('test');
    console.log(this.orderForm.value.category_val);
    this.serv.get_products(this.orderForm.value.category_val).then((response:any)=>{
      console.log(response);
      this.products= response;      
		});
  }

  get_price(){
    console.log(this.orderForm.value.product_val);
    
    this.data_value = this.products.reduce((results, item) => {
      if (item.cat_no == this.orderForm.value.product_val.cat_no) results = item.price;
      return results;
    }, []); 
    console.log(this.data_value);
  }


  addtocart(){
    if(this.cart_arr.length == 0)
    {
      this.cart_arr.push({category:this.orderForm.value.category_val.category, cat_no:this.orderForm.value.product_val.cat_no, id:this.orderForm.value.product_val.id, qty:parseInt(this.orderForm.value.qty), price:parseInt(this.data_value), price_new:(parseInt(this.orderForm.value.qty)*parseInt(this.data_value))});
    }
    else
    {
      for(var i=0;i<this.cart_arr.length;i++)
      {
        if(this.cart_arr[i].id == this.orderForm.value.product_val.id)
        {
          this.cart_arr[i].qty = this.cart_arr[i].qty + parseInt(this.orderForm.value.qty);
          this.cart_arr[i].price_new = this.cart_arr[i].price_new + (parseInt(this.orderForm.value.qty)*parseInt(this.data_value));
          break;
        }
        else if(i == this.cart_arr.length -1)
        {
          this.cart_arr.push({category:this.orderForm.value.category_val.category, cat_no:this.orderForm.value.product_val.cat_no, id:this.orderForm.value.product_val.id, qty:parseInt(this.orderForm.value.qty), price:parseInt(this.data_value), price_new:(parseInt(this.orderForm.value.qty)*parseInt(this.data_value))});
          break;
        }
      }
    }
    this.data_value=0;
    // this.orderForm.reset();
    this.orderForm = this.formBuilder.group({
      category_val: ['', Validators.required],
      product_val: ['', Validators.required],
      qty: [1, Validators.required],
      comment:''
    });
    console.log(this.cart_arr);
    this.products=[];
    this.calculate_amt();
  }

  calculate_amt(){
  
    this.total_qty = 0;
    this.sub_total = 0;

    for(var i=0;i<this.cart_arr.length;i++)
    {
      this.total_qty = this.total_qty + parseInt(this.cart_arr[i].qty);
      this.sub_total = this.sub_total + (parseInt(this.cart_arr[i].price)*parseInt(this.cart_arr[i].qty));
    }
    
    console.log(this.total_qty);
    console.log(this.sub_total);
    
    this.storage.get('discount').then((disc_val) => {
      console.log(disc_val);
      if(disc_val>0){
        this.dealer_discount = disc_val;
      }else{
        this.dealer_discount = '0';
      }
      this.disc_value=((disc_val)*this.sub_total)/100;
      this.disc_total=this.sub_total-this.disc_value;
      this.gst_value=(this.disc_total*18)/100;
      this.gross_total=this.disc_total+this.gst_value;
    });
  }

  confirm_order(){
    console.log(this.orderForm.value);
    
    this.cart_arr.map((item)=>{
      item.added_value = item.qty
    });
    
    this.cart_arr[0].sub_total = this.sub_total;
    this.cart_arr[0].dealer_discount = this.dealer_discount;
    this.cart_arr[0].disc_value = this.disc_value;
    this.cart_arr[0].gst_value = this.gst_value;
    this.cart_arr[0].gross_total = this.disc_total;
    this.cart_arr[0].total_amount = this.gross_total;
    this.cart_arr[0].comment = this.orderForm.value.comment || 'No Remark';
    
    console.log(this.cart_arr);
    this.serv.insert_order(this.cart_arr).then((response:any)=>{
      let toast = this.toastCtrl.create({
        message: 'Your Order Added Successfully.',
        duration: 3000
      });
      toast.present();
      this.navCtrl.push(OrdersPage);
    });
  }


  del_cart(i){

    console.log(i);
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
            console.log('Ok clicked');
            this.cart_arr.splice(i,1);
          }
        }
      ]
    });
    alert.present();
  }

  

}
