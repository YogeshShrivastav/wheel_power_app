import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController, Loading } from 'ionic-angular';
import { SubcategoryPage } from '../subcategory/subcategory';
import { SearchPage } from '../search/search';
import { DatabaseProvider } from '../../providers/database/database';

@IonicPage()
@Component({
  selector: 'page-catalouge',
  templateUrl: 'catalouge.html',
})
export class CatalougePage {
  category:any = [];
  loader:Loading;
  brand:any;
  val:any;
  upload_url:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public loadingCtrl: LoadingController,public db:DatabaseProvider) {
    this.brand = navParams.get('brand');
    console.log(this.brand);
    this.showLoading();
  }

  ionViewDidLoad() {
    this.getCategoryList();
    this.upload_url = this.db.upload_url;
  }

  category_list:any=[];
  getCategoryList()
  {
    this.db.getData(this.brand,"product/category_list")
    .subscribe(resp=>{
      console.log(resp);
      this.category_list=resp;
    });  
  }

  goToSubCategoryPage(category){
    this.navCtrl.push(SubcategoryPage, {brand:this.brand,cat:category})
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
