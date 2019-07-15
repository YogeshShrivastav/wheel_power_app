import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
import { AboutserviceProvider } from '../../providers/aboutservice/aboutservice';

/**
 * Generated class for the AboutusPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-aboutus',
  templateUrl: 'aboutus.html',
})
export class AboutusPage {
  
  about_list:any=[];
  
  constructor(public navCtrl: NavController, public service: AboutserviceProvider , public loadingCtrl: LoadingController) {

    // this.getAboutus()
  }

  getAboutus() {
    let loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: `<img src="./assets/imgs/gif.svg" class="h15" />`,
    });
    
    this.service.getAboutus().then((response:any)=>{
      loading.dismiss();
      console.log(response);
      this.about_list = response;
      
    });
    loading.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutusPage');
  }

}
