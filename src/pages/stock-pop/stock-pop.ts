import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController, Loading } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';

/**
 * Generated class for the StockPopPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-stock-pop',
  templateUrl: 'stock-pop.html',
})
export class StockPopPage {

  cat_no:any=0;
  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl:ViewController,public db:DatabaseProvider,public loadingCtrl:LoadingController) {
    this.cat_no = this.navParams.get('cat_no');
  }

  ionViewDidLoad() {
    console.log(this.cat_no);
    this.get_warehouse_vise();
  }

  loader:Loading;
  warehouse_detail:any=[];
  get_warehouse_vise()
  {
    this.loader = this.loadingCtrl.create({
      spinner: 'hide',
      content: `<img src="./assets/imgs/gif.svg" class="h15" />`,
    });
    this.loader.present();

    this.db.getData(this.cat_no,"product/get_warehouse_vise")
    .subscribe(resp=>{
      console.log(resp);
      this.warehouse_detail = resp['warehouse_product'];
      this.loader.dismiss();
    })
  }

  close()
  {
    this.viewCtrl.dismiss();
  }
}
