import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StockPopPage } from './stock-pop';

@NgModule({
  declarations: [
    StockPopPage,
  ],
  imports: [
    IonicPageModule.forChild(StockPopPage),
  ],
})
export class StockPopPageModule {}
