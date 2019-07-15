import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BrandPage } from './brand';

@NgModule({
  declarations: [
    BrandPage,
  ],
  imports: [
    IonicPageModule.forChild(BrandPage),
  ],
})
export class BrandPageModule {}
