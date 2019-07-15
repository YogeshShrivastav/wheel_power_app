import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddOrderPage } from './add-order';
import { IonicSelectableModule } from 'ionic-selectable';

@NgModule({
  declarations: [
    AddOrderPage,
  ],
  imports: [
    IonicPageModule.forChild(AddOrderPage),
    IonicSelectableModule
  ],
})
export class AddOrderPageModule {}
