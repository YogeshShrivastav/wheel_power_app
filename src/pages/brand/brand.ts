import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading } from 'ionic-angular';
import {ConstantProvider} from '../../providers/constant/constant';
import { CatalougePage } from '../catalouge/catalouge';
import { ProductDetailsPage } from '../product-details/product-details';
import { ProductsPage } from '../products/products';
import { SearchserviceProvider } from '../../providers/searchservice/searchservice';
import { SearchPage } from '../search/search';
import { DatabaseProvider } from '../../providers/database/database';
/**
 * Generated class for the BrandPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-brand',
  templateUrl: 'brand.html',
})
export class BrandPage {
  brandlist:any = [];

  loader:Loading;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public service: SearchserviceProvider, 
    public loadingCtrl: LoadingController, 
    public constant: ConstantProvider,
    public db : DatabaseProvider) {
    this.showLoading();

    }

    ionViewDidLoad() {
      this.getBrand();
    }

    getBrand() {  

      this.db.getData("","product/get_brand")
      .subscribe(resp=>{
        console.log(resp);
        this.brandlist = resp;
       
      });     
    }

    goToSearch(){
      this.navCtrl.push(SearchPage)
    }

    goTocategory(brand) {
      this.navCtrl.push(CatalougePage,{brand:brand});
    }
  

    showLoading()
    {
      this.loader = this.loadingCtrl.create({
        spinner: 'hide',
        content: `<img src="./assets/imgs/gif.svg" class="h15" />`,
      });
      this.loader.present();
      this.loader.dismiss();
    }
}
