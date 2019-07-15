import { Component, ViewChild,NgZone } from '@angular/core';
import {App, Nav, Platform, ToastController, Events, ModalController, AlertController, LoadingController, Loading } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { CatalougePage } from '../pages/catalouge/catalouge';
import { ContactusPage } from '../pages/contactus/contactus';
import { EnquiryPage } from '../pages/enquiry/enquiry';
import { AboutusPage } from '../pages/aboutus/aboutus';
import { EventPage } from '../pages/event/event';
import { SearchPage } from '../pages/search/search';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { ConstantProvider } from '../providers/constant/constant';
import { CatalougeProvider } from '../providers/catalouge/catalouge';
import { ProductsPage } from '../pages/products/products';
import { Storage } from '@ionic/storage';
import { ProductCatalougePage } from '../pages/product-catalouge/product-catalouge';
import { OrderListPage } from '../pages/order-list/order-list';
import { Network } from '@ionic-native/network';
import { AppVersion } from '@ionic-native/app-version';
import { NetworkerrorPage } from '../pages/networkerror/networkerror';
import { DatabaseProvider } from '../providers/database/database';



export interface PageInterface {
  title: string;
  name: string;
  component: any;
  icon: string;
  index?: number;
  tabName?: string;
  tabComponent?: any;
}

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  
  token:any;
  network_err:any=false;
  rootPage: any = TabsPage;
  loader:Loading;
  
  user_pages: PageInterface[] = [
    { title: 'Home', name: 'HomePage', component:HomePage, index: 0, icon: 'home' },
    { title: 'Products', name: 'ProductsPage', component:ProductCatalougePage, index: 1, icon: 'account_balance_wallet' },
    { title: 'Contact Us', name: 'ContactusPage', component: ContactusPage, index: 2, icon: 'contacts' },
    { title: 'Order', name: 'Order', component:OrderListPage, index: 3, icon: 'shopping_basket' },
    // { title: 'About Us', name: 'AboutusPage', component: AboutusPage, index: 4, icon: 'help' },
    // { title: 'Search', name: 'SearchPage', component: SearchPage, index: 5, icon: 'search' }
  ];

  customer_pages: PageInterface[] = [
    { title: 'Home', name: 'HomePage', component:HomePage, index: 0, icon: 'home' },
    { title: 'Products', name: 'ProductsPage', component:ProductCatalougePage, index: 1, icon: 'account_balance_wallet' },
    { title: 'Contact Us', name: 'ContactusPage', component: ContactusPage, index: 2, icon: 'contacts' },
    // { title: 'About Us', name: 'AboutusPage', component: AboutusPage, index: 4, icon: 'help' },
    // { title: 'Search', name: 'SearchPage', component: SearchPage, index: 4, icon: 'search' }
  ];

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen , public service: CatalougeProvider,  public constant: ConstantProvider,   private app: App,public toastCtrl:ToastController, public storage:Storage,public event: Events,public zone:NgZone,public network:Network,public appversion:AppVersion,public db:DatabaseProvider,public modalCtrl:ModalController,public alertCtrl: AlertController,public loadingCtrl:LoadingController) {
    this.show_loading();
    this.initializeApp();
    this.event.subscribe("login",(data)=>{
      console.log(data);
      if(data == true)
      {
        this.zone.run(()=>{
          setTimeout(() => { 
            this.storage.get('token')
            .then((token_value)=>{
              this.token = token_value;
              console.log(this.token);
            });
        },0) 
        })
      }
    })
    if(!this.token)
    {
      this.storage.get('token')
      .then((token_value)=>{
        this.token = token_value;
      });
    }  
   
    
  }
  
  show_loading()
  {
    this.loader = this.loadingCtrl.create({
      spinner: 'hide',
      content: `<img src="./assets/imgs/gif.svg" class="h15" />`,
    });
    this.loader.present();
    this.loader.dismiss();
  }


  initializeApp() {
    this.platform.ready().then(() => {
      this.check_network();
      // this.check_version();
      this.statusBar.styleDefault();
      this.statusBar.overlaysWebView(false);
      this.statusBar.backgroundColorByHexString('#DA0B0B');
      this.splashScreen.hide();     
    });

    this.platform.registerBackButtonAction(() => {
      console.log("back button pressed");
      
      const overlayView = this.app._appRoot._overlayPortal._views[0];
      if (overlayView && overlayView.dismiss) {
        overlayView.dismiss();
        return;
      }
            
      let nav = this.app.getActiveNav();
      let view = nav.getActive().name;
      
      console.log(view);
      console.log(nav.canGoBack());
      
      
      if(view == 'HomePage') 
      {
        if(this.db.backButton==0)
        {
          this.db.backButton=1;
          let toast = this.toastCtrl.create({
            message: 'Press again to exit!',
            duration: 2000
          });
          toast.present();
          setTimeout(() => {
            this.db.backButton=0;
          },2500);
        }
        else
        {
          this.platform.exitApp();
        }
      }
      else if(view == 'ProductCatalougePage' || view == 'LoginPage' || view == 'OrderListPage' || view == "ContactusPage")
      {
        this.nav.setRoot(TabsPage);
      }
      else 
      {
        this.app.navPop();
      }
    });
  }
  
  check_network()
  {
    this.network.onDisconnect()
    .subscribe(resp=>{
      console.log(resp);
      this.rootPage = NetworkerrorPage;
    });

    this.network.onConnect()
      .subscribe(resp=>{
        console.log(resp);
        this.rootPage = TabsPage;
    });
  }
  db_app_version:any='';
  app_version:any='';
  check_version()
  {
    this.db.getData("","customer/app_version")
    .subscribe(resp=>{
      console.log(resp);
      this.db_app_version = resp['app_version'];

      this.appversion.getVersionNumber()
      .then(resp=>{
        console.log(resp);
        this.app_version = resp;
        if(this.app_version != this.db_app_version)
        {
          let updateAlert = this.alertCtrl.create({
            title: 'Update Available',
            message: 'A newer version of this app is available for download. Please update it from PlayStore !',
            buttons: [
              {text: 'Cancel', },
              {text: 'Update Now',
              handler: () => {
                // this.market.open('wheelpower.abacusdesk.com');
                window.open('https://play.google.com/store/apps/details?id=wheelpower.abacusdesk.com&hl=en','_system','location=yes');
                } }
              ]
            });
            updateAlert.present();
        }
        console.log("version");
        
      });

    });
    
    
   
  }
  
  openPage(page: PageInterface) 
  {
    let params = {};
    if (page.index) {
      params = { tabIndex: page.index };
    }
    if (this.nav.getActiveChildNavs().length && page.index != undefined){
      this.nav.getActiveChildNavs()[0].select(page.index);
    } else {
      console.log(page.index);
      console.log(page.component);
      this.nav.setRoot(page.component, params);
      
    }
  }
  
  isActive(page: PageInterface) {
    let childNav = this.nav.getActiveChildNavs()[0];
    console.log(childNav);
    
    if (childNav) {
      if (childNav.getSelected() && childNav.getSelected().root === page.tabComponent) {
        return 'primary';
      }
      return;
    }
    if (this.nav.getActive() && this.nav.getActive().name === page.name) {
      return 'primary';
    }
    return;
  }
  
  
  
  
  SeeHome(){
    this.nav.push(HomePage,{index:0})
  }
  
  SeeCatalogeList(){
    this.nav.push(CatalougePage)
  }
  
  getNewArrival(newarrival){
    this.nav.push(ProductsPage, {newarrival:newarrival} )
  }
  
  
  ContactMe(){
    this.nav.push(ContactusPage,{index:2})
  }
  
  enquiry(){
    this.nav.push(EnquiryPage,{index:3})
  }
  
  AboutMe(){
    this.nav.push(AboutusPage)
  }
  
  SeeEvent(){
    this.nav.push(EventPage)
  }
  
  Search(){
    this.nav.push(SearchPage)
  }
  
  Login(){
    if(!this.token){
      this.nav.push(LoginPage);
      // this.nav.push(CustomerLoginPage);
    }
  }
  LogOut(){
    if(this.token){
      this.storage.set('login_data', '');
      this.storage.set('token', '');
      this.token='';
      this.event.publish("login",false);
      this.nav.setRoot(TabsPage);
    }
  }
  
}

