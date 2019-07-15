import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShopingAddressPage } from './shoping-address';
import { IonicSelectableModule } from 'ionic-selectable';

@NgModule({
  declarations: [
    ShopingAddressPage,
  ],
  imports: [
    IonicSelectableModule,
    IonicPageModule.forChild(ShopingAddressPage),
  ],
})
export class ShopingAddressPageModule {}
