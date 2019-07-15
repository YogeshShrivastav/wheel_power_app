import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductCatalougePage } from './product-catalouge';
import { PinchZoomModule } from 'ngx-pinch-zoom';

@NgModule({
  declarations: [
    ProductCatalougePage,
  ],
  imports: [    
    PinchZoomModule,
    IonicPageModule.forChild(ProductCatalougePage),
  ],
})
export class ProductCatalougePageModule {}
