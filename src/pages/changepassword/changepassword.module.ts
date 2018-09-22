import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChangepasswordPage } from './changepassword';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    ChangepasswordPage,
  ],
  imports: [
    IonicPageModule.forChild(ChangepasswordPage),
    TranslateModule.forChild()
  ],
  exports: [
    ChangepasswordPage
  ]
})
export class ChangepasswordPageModule {}
