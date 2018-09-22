import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BuyerreceiptdetailPage } from './buyerreceiptdetail';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    BuyerreceiptdetailPage,
  ],
  imports: [
    IonicPageModule.forChild(BuyerreceiptdetailPage),
    TranslateModule.forChild()
  ],
  exports: [
    BuyerreceiptdetailPage
  ]
})
export class BuyerreceiptdetailPageModule {}
