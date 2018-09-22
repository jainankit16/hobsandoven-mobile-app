import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CancelorderPage } from './cancelorder';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    CancelorderPage,
  ],
  imports: [
    IonicPageModule.forChild(CancelorderPage),
    TranslateModule.forChild()
  ],
  exports: [
    CancelorderPage
  ]
})
export class CancelorderPageModule {}
