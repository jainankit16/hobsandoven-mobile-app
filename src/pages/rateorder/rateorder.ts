import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the RateorderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-rateorder',
  templateUrl: 'rateorder.html',
})
export class RateorderPage {

  private isFilled: boolean = false;



  rateOrderParam: { comments: string, rating: string } = {
    comments: "",
    rating: ""
  };

  constructor(public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams) {
  }

  notNow() {
    this.viewCtrl.dismiss();
  }

  closeModel() {
    this.viewCtrl.dismiss();
  }

  rateOrder() {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RateorderPage');
  }

}
