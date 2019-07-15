import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController, LoadingController, Platform, ToastController } from 'ionic-angular';
import { AboutusPage } from '../aboutus/aboutus';
import { SearchPage } from '../search/search';
import { ProductsPage } from '../products/products';
import { OrdersPage } from '../orders/orders';
import { CatalougeProvider } from '../../providers/catalouge/catalouge';
import { Network } from '@ionic-native/network';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  network_err:boolean=false;
  constructor(public navCtrl: NavController, public service: CatalougeProvider , public loadingCtrl: LoadingController,public storage: Storage,public network:Network,public platform:Platform,public toastCtrl:ToastController) {
  }
  
  SeeBrandList(){
    this.navCtrl.parent.select(1);
  }
  
  getNewArrival(newarrival){
    this.navCtrl.push(ProductsPage, {newarrival:newarrival} )
  }
  
  AboutMe(){
    this.navCtrl.push(AboutusPage)
  }

  AddOrder(){
    this.navCtrl.push(OrdersPage)
  }

  ContactMe()
  {
    this.navCtrl.parent.select(2);
  }
  

  goToSearch(){
    this.navCtrl.push(SearchPage)
  }
}
