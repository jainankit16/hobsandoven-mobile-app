import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyordersPage } from './myorders';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    MyordersPage,
  ],
  imports: [
    IonicPageModule.forChild(MyordersPage),
    TranslateModule.forChild()
  ],
  exports: [
    MyordersPage
  ]
})
export class MyordersPageModule {}
