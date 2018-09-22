import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CompleteorderPage } from './completeorder';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    CompleteorderPage,
  ],
  imports: [
    IonicPageModule.forChild(CompleteorderPage),
    TranslateModule.forChild()
  ],
  exports: [
    CompleteorderPage
  ]
})
export class CompleteorderPageModule {}
