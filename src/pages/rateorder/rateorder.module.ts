import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RateorderPage } from './rateorder';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    RateorderPage,
  ],
  imports: [
    IonicPageModule.forChild(RateorderPage),
    TranslateModule.forChild()
  ],
  exports: [
    RateorderPage
  ]
})
export class RateorderPageModule {}
