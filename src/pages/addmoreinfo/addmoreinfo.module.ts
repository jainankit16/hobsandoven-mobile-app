import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddmoreinfoPage } from './addmoreinfo';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    AddmoreinfoPage,
  ],
  imports: [
    IonicPageModule.forChild(AddmoreinfoPage),
    TranslateModule.forChild()
  ],
  exports: [
    AddmoreinfoPage
  ]
})
export class AddmoreinfoPageModule {}
