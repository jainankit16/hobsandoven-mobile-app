import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NotacceptorderPage } from './notacceptorder';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    NotacceptorderPage,
  ],
  imports: [
    IonicPageModule.forChild(NotacceptorderPage),
    TranslateModule.forChild()
  ],
  exports: [
    NotacceptorderPage
  ]
})
export class NotacceptorderPageModule {}
