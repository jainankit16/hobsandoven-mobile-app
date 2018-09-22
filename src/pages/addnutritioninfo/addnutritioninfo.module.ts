import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddnutritioninfoPage } from './addnutritioninfo';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    AddnutritioninfoPage,
  ],
  imports: [
    IonicPageModule.forChild(AddnutritioninfoPage),
    TranslateModule.forChild()
  ],
  exports: [
    AddnutritioninfoPage
  ]
})
export class AddnutritioninfoPageModule {}
