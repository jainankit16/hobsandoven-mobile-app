import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-addnutritioninfo',
  templateUrl: 'addnutritioninfo.html',
})
export class AddnutritioninfoPage {

  nutritions: { calories: String, fat: String, carbohydrates: String, proteins: String } = {
    calories: "",
    fat: "",
    carbohydrates: "",
    proteins: ""
  }


  private isSave:boolean = false;

  constructor(public events:Events, public navCtrl: NavController, public navParams: NavParams) {
    //get navparams
    if (this.navParams.get('nutritions')) {
      let data = this.navParams.get('nutritions');
      this.nutritions.calories = data.calories;
      this.nutritions.fat = data.fat;
      this.nutritions.carbohydrates = data.carbohydrates;
      this.nutritions.proteins = data.proteins;
    } else {
    }
  }

  submitClickFunc() {
    // Under some function
    debugger;
    this.events.publish('nutritions', this.nutritions);
    this.navCtrl.pop();
    // this.isSave = true;
    // this.navCtrl.pop();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddnutritioninfoPage');
  }

  ionViewWillLeave(){
    if(this.isSave){
      this.navCtrl.getPrevious().data.nutritions = this.nutritions;
      debugger;
    }

  }

  

}
