import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController, Loading } from 'ionic-angular';
import { CatalougeProvider } from '../../providers/catalouge/catalouge';
import { SearchPage } from '../search/search';
import { ProductsPage } from '../products/products';
import { ConstantProvider } from '../../providers/constant/constant';
import { DatabaseProvider } from '../../providers/database/database';

/**
 * Generated class for the SubcategoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-subcategory',
  templateUrl: 'subcategory.html',
})
export class SubcategoryPage {

  upload_url:any;
  loader:Loading;
  brand:any='';
  cat:any='';
  constructor(public navCtrl: NavController, public navParams: NavParams,public loadingCtrl: LoadingController,public db:DatabaseProvider) {
    this.brand = navParams.get('brand');
    this.cat = navParams.get('cat');
    console.log(this.brand);
    console.log(this.cat);
    this.showLoading();
  }  

  ionViewDidLoad() {
    this.upload_url = this.db.upload_url;
    this.getsubCategory();
  }

  sub_category:any=[];
  getsubCategory()
  {
    this.db.getData({"brand":this.brand,"category":this.cat},"product/subcategory_list")
    .subscribe(resp=>{
      console.log(resp);
      this.sub_category=resp;
    });
    
  }

  getProductList(sub_category){
    this.navCtrl.push(ProductsPage, {brand:this.brand,category:this.cat,sub_categoryes:sub_category})
  }

  goToSearch(){
    this.navCtrl.push(SearchPage)
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
