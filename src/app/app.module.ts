import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import "materialize-css";
import { MaterializeModule } from 'angular2-materialize';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ConstantProvider } from '../providers/constant/constant';
import { CatalougeProvider } from '../providers/catalouge/catalouge';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';
import { ArrivalserviceProvider } from '../providers/arrivalservice/arrivalservice';
import { EnquiryserviceProvider } from '../providers/enquiryservice/enquiryservice';
import { AboutserviceProvider } from '../providers/aboutservice/aboutservice';
import { SearchserviceProvider } from '../providers/searchservice/searchservice';
import { LoginPageModule } from '../pages/login/login.module';
import { ProductdetailserviceProvider } from '../providers/productdetailservice/productdetailservice';
import { LoginserviceProvider } from '../providers/loginservice/loginservice';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { IonicSelectableModule  } from 'ionic-selectable';
import { OrderserviceProvider } from '../providers/orderservice/orderservice';
import { PinchZoomModule } from 'ngx-pinch-zoom';
import { DatabaseProvider } from '../providers/database/database';
import { HttpClientModule } from '@angular/common/http';
import { SessionProvider } from '../providers/session/session';
import { AboutusPageModule } from '../pages/aboutus/aboutus.module';
import { AddOrderPageModule } from '../pages/add-order/add-order.module';
import { AddtocartPageModule } from '../pages/addtocart/addtocart.module';
import { BrandPageModule } from '../pages/brand/brand.module';
import { CatalougePageModule } from '../pages/catalouge/catalouge.module';
import { ContactusPageModule } from '../pages/contactus/contactus.module';
import { EnquiryPageModule } from '../pages/enquiry/enquiry.module';
import { EventPageModule } from '../pages/event/event.module';
import { NetworkPageModule } from '../pages/network/network.module';
import { NewArrivalsPageModule } from '../pages/new-arrivals/new-arrivals.module';
import { OrderdetailPageModule } from '../pages/orderdetail/orderdetail.module';
import { OrdersPageModule } from '../pages/orders/orders.module';
import { OtpPageModule } from '../pages/otp/otp.module';
import { ProductCatalougePageModule } from '../pages/product-catalouge/product-catalouge.module';
import { ProductDetailsPageModule } from '../pages/product-details/product-details.module';
import { SearchPageModule } from '../pages/search/search.module';
import { ShopingAddressPageModule } from '../pages/shoping-address/shoping-address.module';
import { SubcategoryPageModule } from '../pages/subcategory/subcategory.module';
import { ViewCartPageModule } from '../pages/view-cart/view-cart.module';
import { ZoomImagePageModule } from '../pages/zoom-image/zoom-image.module';
import { StockPopPageModule } from '../pages/stock-pop/stock-pop.module';
import { OrderListPageModule } from '../pages/order-list/order-list.module';
import { Network } from '@ionic-native/network';
import { CustomerLoginPageModule } from '../pages/customer-login/customer-login.module';
import { AppVersion } from '@ionic-native/app-version';
import { NetworkerrorPageModule } from '../pages/networkerror/networkerror.module';
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    MaterializeModule,
    IonicSelectableModule,
    PinchZoomModule,
    AboutusPageModule,
    AddOrderPageModule,
    AddtocartPageModule,
    BrandPageModule,
    CatalougePageModule,
    ContactusPageModule,
    EnquiryPageModule,
    EventPageModule,
    NetworkPageModule,
    NewArrivalsPageModule,
    OrderdetailPageModule,
    OrdersPageModule,
    OtpPageModule,
    ProductCatalougePageModule,
    ProductDetailsPageModule,
    SearchPageModule,
    ShopingAddressPageModule,
    SubcategoryPageModule,
    ViewCartPageModule,
    ZoomImagePageModule,
    StockPopPageModule,
    OrderListPageModule,
    OrderdetailPageModule,
    LoginPageModule,
    CustomerLoginPageModule,
    NetworkerrorPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabsPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ConstantProvider,
    CatalougeProvider,
    ArrivalserviceProvider,
    EnquiryserviceProvider,
    AboutserviceProvider,
    SearchserviceProvider,
    ProductdetailserviceProvider,
    LoginserviceProvider,
    AndroidPermissions,
    OrderserviceProvider,
    DatabaseProvider,
    SessionProvider,
    Network,
    AppVersion,
  ]
})
export class AppModule {}
