import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the ZoomImagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-zoom-image',
  templateUrl: 'zoom-image.html',
})
export class ZoomImagePage {

  image:any='';
  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController) {
    this.image = this.navParams.get('image');
  }

  ionViewDidLoad() {
    console.log(this.image);
    
  }

  close()
  {
    this.viewCtrl.dismiss();
  }

}
