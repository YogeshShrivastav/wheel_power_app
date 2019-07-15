import { Component, NgZone, ViewChild } from '@angular/core';

import { HomePage } from '../home/home';
import { ContactusPage } from '../contactus/contactus';

import { CatalougePage } from '../catalouge/catalouge';
import { NewArrivalsPage } from '../new-arrivals/new-arrivals';
import { AboutusPage } from '../aboutus/aboutus';
import { SearchPage } from '../search/search';
import { ProductCatalougePage } from '../product-catalouge/product-catalouge';
import { Storage } from '@ionic/storage';
import { OrderListPage } from '../order-list/order-list';
import { Events, Tabs, Platform, App, ToastController, NavController } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  @ViewChild(Tabs) tabs;

  private firstLoaded: boolean = false;
  tab1Root = HomePage;
  tab2Root = ProductCatalougePage;
  tab3Root = ContactusPage;
  tab4Root = OrderListPage;


  tab5Root = CatalougePage;
  tab6Root = NewArrivalsPage;
  tab7Root = AboutusPage;
  tab8Root = SearchPage;



  token:any='';
  constructor(public storage:Storage,public event: Events,public zone:NgZone,public platform:Platform,public app:App,public toastCtrl:ToastController,public db:DatabaseProvider,public nav:NavController) {
    this.storage.get('token')
    .then(resp=>{
      console.log(resp);
      this.token = resp
    });


    this.event.subscribe("order",(data)=>{
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
    });   
    
    // platform.registerBackButtonAction(() => {
    //   console.log('register back fun ');
      
    //   const overlayView = this.app._appRoot._overlayPortal._views[0];
    //   if (overlayView && overlayView.dismiss) {
    //     overlayView.dismiss();
    //     return;
    //   }
      
      
    //   let nav = app.getActiveNav();
    //   console.log(nav);
    //   console.log('nav');
    //   console.log("active nav");
      

    //   let view = this.nav.getActive().name;
      
    //   console.log(view);
    //   console.log('tabs view');

    //   console.log(nav.canGoBack());
    //   console.log('can go back');
      
      
    //   if(view == 'HomePage') 
    //   {
    //     if(this.db.backButton==0)
    //     {
    //       this.db.backButton=1;
    //       let toast = this.toastCtrl.create({
    //         message: 'Press again to exit!',
    //         duration: 2000
    //       });
    //       toast.present();
    //       setTimeout(() => {
    //         this.db.backButton=0;
    //       },2500);
    //     }
    //     else
    //     {
    //       this.platform.exitApp();
    //     }
    //   }
    //   else if(view == 'ProductCatalougePage' || view == 'LoginPage' || view == 'OrderListPage' || view == "ContactusPage")
    //   {
    //     this.nav.setRoot(TabsPage);
    //   }
    //   else 
    //   {
    //     app.navPop();
    //   }
    // });

  }

  product_catalooge()
  {
    this.tabs.select(1);
  }
}
