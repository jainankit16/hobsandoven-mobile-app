import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditprofilePage } from './editprofile';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    EditprofilePage,
  ],
  imports: [
    IonicPageModule.forChild(EditprofilePage),
    TranslateModule.forChild()
  ],
  exports: [
    EditprofilePage
  ]
})
export class EditprofilePageModule {}
