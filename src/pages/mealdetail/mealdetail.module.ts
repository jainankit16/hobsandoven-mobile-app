import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MealdetailPage } from './mealdetail';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    MealdetailPage,
  ],
  imports: [
    IonicPageModule.forChild(MealdetailPage),
    TranslateModule.forChild()
  ],
  exports: [
    MealdetailPage
  ]
})
export class MealdetailPageModule {}
