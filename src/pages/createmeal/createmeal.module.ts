import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreatemealPage } from './createmeal';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    CreatemealPage,
  ],
  imports: [
    IonicPageModule.forChild(CreatemealPage),
    TranslateModule.forChild()
  ],
  exports: [
    CreatemealPage
  ]
})
export class CreatemealPageModule {}
