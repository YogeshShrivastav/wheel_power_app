import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CatalougePage } from './catalouge';

@NgModule({
  declarations: [
    CatalougePage,
  ],
  imports: [
    IonicPageModule.forChild(CatalougePage),
  ],
})
export class CatalougePageModule {}
