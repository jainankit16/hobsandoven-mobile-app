import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-mealdetail',
  templateUrl: 'mealdetail.html',
})
export class MealdetailPage {



  nutritions: { calories: String, fat: String, carbohydrates: String, proteins: String } = {
    calories: "",
    fat: "",
    carbohydrates: "",
    proteins: ""
  }
  private mealData: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {

    if (this.navParams.get("mealData")) {
      debugger;
      this.mealData = this.navParams.get("mealData");
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MealdetailPage');
  }

  closeDetail() {
    this.navCtrl.pop();
  }

  editClick() {
    this.navCtrl.push('CreatemealPage', { mealdata: this.mealData })
  }

}
