import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PickuporderPage } from './pickuporder';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    PickuporderPage,
  ],
  imports: [
    IonicPageModule.forChild(PickuporderPage),
    TranslateModule.forChild()
  ],
  exports: [
    PickuporderPage
  ]
})
export class PickuporderPageModule {}
