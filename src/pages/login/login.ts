import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController ,AlertController, Events} from 'ionic-angular';
import { HomePage } from '../home/home';
import { Storage } from '@ionic/storage';
import { DatabaseProvider } from '../../providers/database/database';
import { TabsPage } from '../tabs/tabs';
import { CustomerLoginPage } from '../customer-login/customer-login';


@IonicPage()
@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})
export class LoginPage {
    
    data:any = {};
    loading:any;
    cart:any=[];
    login_data:any={};
    
    constructor(public  navCtrl: NavController,public  navParams: NavParams,private loadingCtrl: LoadingController,private alertCtrl: AlertController,public db:DatabaseProvider,public storage:Storage,public event:Events) {
    }
    
    ionViewDidLoad() {        
        this.showLoading();
    }
    
    login()
    {
        this.db.getData(this.data,"login/loginUser")
        .subscribe(resp=>{
            console.log(resp);
            if(resp['data'])
            {
                this.login_data = resp['data'];
                this.login_data.login = true;
                this.storage.set('login_data',this.login_data);
                this.storage.set('token',resp['token']);
                this.event.publish("login",true);
                this.navCtrl.setRoot(TabsPage);
            }
            else
            {
                this.showLoginError();
            }
        })
    }
    
    showLoginError() {
        
        let alert = this.alertCtrl.create({
            title: 'Alert!',
            message: 'Incorrect username or password.',
            buttons: ['Ok']
        });
        
        alert.present();
    }  
    
    showLoading() {
        this.loading = this.loadingCtrl.create({
            spinner: 'hide',
            content: '<p><img src="assets/imgs/gif.svg"/></p>'
        });
        this.loading.present();
        this.loading.dismiss();
    }  
    
    goto_customer_login()
    {
        this.navCtrl.push(CustomerLoginPage,{data:''});
    }
    
}
