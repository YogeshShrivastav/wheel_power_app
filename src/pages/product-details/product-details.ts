import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
import { ProductdetailserviceProvider } from '../../providers/productdetailservice/productdetailservice';
import { SearchPage } from '../search/search';
import { EnquiryPage } from '../enquiry/enquiry';
import { ConstantProvider } from '../../providers/constant/constant';
import { ViewCartPage } from '../view-cart/view-cart';
import { Storage } from '@ionic/storage';
import { LoginPage } from '../login/login';
import { DatabaseProvider } from '../../providers/database/database';
/**
* Generated class for the ProductDetailsPage page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/

@IonicPage()
@Component({
  selector: 'page-product-details',
  templateUrl: 'product-details.html',
})
export class ProductDetailsPage {

  cat_no:any='';
  first_image = '';
  upload_url:any='';
  constructor(public navCtrl: NavController, public navParams: NavParams,public loadingCtrl: LoadingController,public db:DatabaseProvider) {
    this.cat_no = this.navParams.get('cat_no');
  }

  ionViewDidLoad() {
    console.log(this.cat_no);
    this.upload_url = this.db.upload_url;
    this.get_product_detail();
  }
  product_data:any={};
  get_product_detail()
  {
    this.db.getData(this.cat_no,"product/product_detail")
    .subscribe(resp=>{
      console.log(resp);
      this.product_data = resp['product_data'];
      if(this.product_data.image.length > 0)
      {
        this.first_image = this.product_data.image[0].image;
      }
    })
  }

  goToSearch()
  {
    this.navCtrl.push(SearchPage);
  }
}
