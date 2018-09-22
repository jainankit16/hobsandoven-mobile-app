import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GooglesearchPage } from './googlesearch';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    GooglesearchPage,
  ],
  imports: [
    IonicPageModule.forChild(GooglesearchPage),
    TranslateModule.forChild()
  ],
  exports: [
    GooglesearchPage
  ]
})
export class GooglesearchPageModule {}
