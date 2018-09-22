import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FeeddetailsPage } from './feeddetails';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    FeeddetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(FeeddetailsPage),
    TranslateModule.forChild()
  ],
  exports: [
    FeeddetailsPage
  ]
})
export class FeeddetailsPageModule {}
