import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyplacedordersPage } from './myplacedorders';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    MyplacedordersPage,
  ],
  imports: [
    IonicPageModule.forChild(MyplacedordersPage),
    TranslateModule.forChild()
  ],
  exports: [
    MyplacedordersPage
  ]
})
export class MyplacedordersPageModule {}
