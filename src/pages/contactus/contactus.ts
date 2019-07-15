import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController, Loading } from 'ionic-angular';
import { AboutserviceProvider } from '../../providers/aboutservice/aboutservice';
import { SearchPage } from '../search/search';

/**
 * Generated class for the ContactusPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contactus',
  templateUrl: 'contactus.html',
})
export class ContactusPage {

  contact_list:any=[];

  loader:Loading;
  constructor(public navCtrl: NavController, public service: AboutserviceProvider, public loadingCtrl:LoadingController){
    this.loader = this.loadingCtrl.create({
      spinner: 'hide',
      content: `<img src="./assets/imgs/gif.svg" class="h15" />`,
    });
    this.loader.present();
    this.loader.dismiss();
  }

  getContactus() {
    let loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: `<img src="./assets/imgs/gif.svg" class="h15" />`,
    });
    
    this.service.getContactus().then((response:any)=>{
      loading.dismiss();
      console.log(response);
      this.contact_list = response;
      
    });
    loading.present();
  }

  goToSearch(){
    this.navCtrl.push(SearchPage)
  } 

}
