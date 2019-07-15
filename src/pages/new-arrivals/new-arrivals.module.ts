import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewArrivalsPage } from './new-arrivals';

@NgModule({
  declarations: [
    NewArrivalsPage,
  ],
  imports: [
    IonicPageModule.forChild(NewArrivalsPage),
  ],
})
export class NewArrivalsPageModule {}
