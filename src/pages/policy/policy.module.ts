import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PolicyPage } from './policy';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    PolicyPage,
  ],
  imports: [
    IonicPageModule.forChild(PolicyPage),
    TranslateModule.forChild()
  ],
  exports: [
    PolicyPage
  ]
})
export class PolicyPageModule {}
