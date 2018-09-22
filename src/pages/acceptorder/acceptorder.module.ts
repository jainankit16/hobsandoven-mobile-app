import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AcceptorderPage } from './acceptorder';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    AcceptorderPage,
  ],
  imports: [
    IonicPageModule.forChild(AcceptorderPage),
    TranslateModule.forChild()
  ],
  exports: [
    AcceptorderPage
  ]
})
export class AcceptorderPageModule {}
