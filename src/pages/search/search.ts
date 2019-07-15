import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { CatalougePage } from '../catalouge/catalouge';
import { SubcategoryPage } from '../subcategory/subcategory';
import { BrandPage } from '../brand/brand';
import { ProductDetailsPage } from '../product-details/product-details';
import {ConstantProvider} from '../../providers/constant/constant';
import { SearchserviceProvider } from '../../providers/searchservice/searchservice';
import { ProductdetailserviceProvider } from '../../providers/productdetailservice/productdetailservice';
import { DatabaseProvider } from '../../providers/database/database';

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
  
  data:any=[];
  brandlist:any=[];
  upload_url:any;
  request =false;
  
  constructor(public navCtrl: NavController,public navParams: NavParams,public loadingCtrl: LoadingController,public db:DatabaseProvider) {
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }
  
  dataChanged(newObj)
  {
      console.log(newObj.length);
      this.db.getData({'search':newObj},"product/products_list")
      .subscribe(resp=>{
        console.log(resp);
        this.data = resp;
        
      })
      // if(newObj.length == 0) {
      //   this.data = [];
      //   console.log(this.data);
      // }
      // else if(newObj.length > 0){
      //   this.request=true;

      //     setTimeout(()=>{
      //         // this.service.search(newObj).then((response:any)=>{
      //         //   console.log(response);
      //         //   this.request=false;
      //         // });
      //     },500);
      // }
    }

  getBrandCategory(name) {
    console.log(name);
    this.navCtrl.push(CatalougePage,{name:name,val:2});

  }

  product_detail:any=[];

  goToProductDetailPage(id) {
    console.log(id);

    // this.detail.getProductDetail(id).then((response)=>{
    //   console.log(response);
    //   this.product_detail = response["productlist"];
    //   this.navCtrl.push(ProductDetailsPage,{prod_id:this.product_detail});
    // })
    
  }

  getsubCategory(){
      this.navCtrl.push(SubcategoryPage);
  }


  getBrand(){
    this.navCtrl.push(BrandPage);
}
 




}
