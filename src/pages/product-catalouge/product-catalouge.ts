import { Component, ViewChild  } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading, AlertController, Refresher, ToastController,ModalController} from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
import { AddtocartPage } from '../addtocart/addtocart';
import { ZoomImagePage } from '../zoom-image/zoom-image';
import { ProductDetailsPage } from '../product-details/product-details';
import { Storage } from '@ionic/storage';
import { StockPopPage } from '../stock-pop/stock-pop';
import { Content } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-product-catalouge',
  templateUrl: 'product-catalouge.html',
})
export class ProductCatalougePage {
  @ViewChild('pageTop') pageTop: Content;
  
  pagingEnabled: boolean = true;
  toggle = false;
  all:boolean=false;
  loader:Loading;
  upload_url:any='';
  show:boolean=false;
  token:any='';
  login_data:any=[];
  cart_array:any=[];
  constructor(public navCtrl: NavController, public navParams: NavParams,public db:DatabaseProvider,public loadingCtrl:LoadingController,public alertCtrl:AlertController,public toastCtrl:ToastController,public modalCtrl: ModalController,public storage:Storage) {
    this.storage.get('token')
    .then((token_value)=>{
      this.token = token_value;
      console.log(this.token);
    });
    
    this.storage.get('login_data')
    .then(resp=>{
      this.login_data = resp;
      if(this.login_data)
      {
        this.data.user_id = this.login_data.id;
        this.data.user_type = this.login_data.user_type;
      }
      console.log(this.login_data);
    });
  }
  
  ionViewWillEnter(){        
    this.upload_url = this.db.upload_url;
    this.all = true;
    this.data.category = "all";
    this.get_brand();
    this.get_category();
    this.get_all_product('');  
  } 


  ionViewDidLoad() {
    this.show_loading();
  }
  
  data:any={};
  brand_list:any=[];
  get_brand()
  {
    this.db.getData("","product/get_brand")
    .subscribe(resp=>{
      console.log(resp);
      this.brand_list = resp;
      for(var i=0;i<this.brand_list.length;i++)
      {
        this.brand_list[i]['checked'] = false;
      }
    })
  }
  
  category_list:any=[];
  get_category()
  {    
    this.db.getData(this.data,"product/category_list")
    .subscribe(resp=>{
      console.log(resp);
      this.category_list = resp;      
      for(var i=0;i<this.category_list.length; i++)
      {
        this.category_list[i]['active'] = false;
      }
      console.log(this.show);
      
    })
  }
  
  select_cat(indx)
  {
    this.show_loading();
    if(indx == 'all')
    { 
      for(var i=0;i<this.category_list.length; i++){
        this.category_list[i]['active'] = false;
      }
      this.all = true; 
      this.data.category  = indx;
    }
    else
    {
      for(var i=0;i<this.category_list.length; i++){
        this.category_list[i]['active'] = false;
      }
      this.category_list[indx]['active'] = true;
      this.all = false;
      this.data.category = this.category_list[indx]['category'];
    }
    this.product_data = [];    
    this.pageTop.scrollToTop();
    this.pagingEnabled = false;
    console.log(this.data);
  }
  
  search()
  {
    this.product_data = [];    
  }

  brand:any=[];
  select_brand(indx,data)
  {
    this.show_loading();
    console.log(this.brand_list[indx]['brand']);
    if(data == true){
      this.brand.push(this.brand_list[indx]['brand']);
    }
    else{
      let b_indx  = this.brand.indexOf(this.brand_list[indx]['brand']);
      this.brand.splice(b_indx,1);
    }
    console.log(this.brand);
    this.data.brand = this.brand;
    this.data.category = "all";
    this.pageTop.scrollToTop();
    this.product_data = [];    
    this.pagingEnabled = false;
  }
  
  start:any=0;
  limit:any=10;
  product_data:any=[]
  get_all_product(event)
  { 
    this.db.getData({data:this.data,start:this.product_data.length},"product/products_list")
    // this.db.getData({data:this.data,start:this.product_data.length},"product/test_product")
    .subscribe(resp=>{
      console.log(resp);
      this.product_data = this.product_data.concat(resp);
      if(event)event.complete();

      if(this.product_data.length == 0)
      {  
        this.show = true;  
        this.pagingEnabled = false;
      }
      else
      {  
        this.show = false;  
        this.pagingEnabled = true;
      }

      for(var i=0;i<this.product_data.length; i++){
        this.product_data[i]['qty'] = 0;
      }     
      // this.loader.dismiss();
    });
  }

  quantity(indx,value)
  {
    if(value == 'add'){
      var tmp_qty = 0;
      tmp_qty = parseInt(this.product_data[indx]['qty'])+1;
      this.product_data[indx]['qty']=tmp_qty;
    }
    else{
      if(this.product_data[indx]['qty'] > 0){
        this.product_data[indx]['qty']=parseInt(this.product_data[indx]['qty'])-1;
      }
      else{
        this.product_data[indx]['qty']=0;
      }
    }
  }
  
  add_to_cart(value)
  {    
    if(this.cart_array.length == 0)
    {   
      this.cart_array.push(value);
    }
    else
    {
      for(var i=0; i<this.cart_array.length; i++) 
      {
        if(this.cart_array[i].cat_no == value.cat_no) 
        {
          this.cart_array[i].qty = parseInt(value.qty);
          break;
        }
        else if(i == this.cart_array.length -1) 
        {
          this.cart_array.push(value);
          break; 
        }
      } 
    }
    
    let toast = this.toastCtrl.create({
      message: 'Item Updated to Cart!',
      position: 'bottom',
      duration: 2000
    });
    toast.present();
    
    for(var i=0;i<this.cart_array.length;i++)
    {
      this.cart_array[i]['mrp'] = parseInt(this.cart_array[i]['qty']) * parseInt(this.cart_array[i].price);
    }
  }
  
  goto_cart()
  {
    this.navCtrl.push(AddtocartPage,{data:this.cart_array})
  }
  
  show_loading()
  {
    this.loader = this.loadingCtrl.create({
      spinner: 'hide',
      content: `<img src="./assets/imgs/gif.svg" class="h15" />`,
    });
    this.loader.present();
    this.loader.dismiss();
  }
  
  zoom_image(image_info) {
    console.log(image_info);
    
    let profileModal = this.modalCtrl.create(ZoomImagePage,{image:image_info});
    profileModal.present();
  }
  
  goToProductdetail(cat_no)
  {
    console.log(cat_no);
    this.navCtrl.push(ProductDetailsPage,{cat_no:cat_no})
  }
  
  show_stock(cat_no)
  {
    let stock_model = this.modalCtrl.create(StockPopPage,{cat_no:cat_no});
    
    stock_model.present();
  }
}
