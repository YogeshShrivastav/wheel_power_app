import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ZoomImagePage } from './zoom-image';
import { PinchZoomModule } from 'ngx-pinch-zoom';

@NgModule({
  declarations: [
    ZoomImagePage,
  ],
  imports: [
    PinchZoomModule,
    IonicPageModule.forChild(ZoomImagePage),
  ],
})
export class ZoomImagePageModule {}
