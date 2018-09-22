import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReceiptdetailPage } from './receiptdetail';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    ReceiptdetailPage,
  ],
  imports: [
    IonicPageModule.forChild(ReceiptdetailPage),
    TranslateModule.forChild()
  ],
  exports: [
    ReceiptdetailPage
  ]
})
export class ReceiptdetailPageModule {}
