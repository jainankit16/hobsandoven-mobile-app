import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PickuporderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pickuporder',
  templateUrl: 'pickuporder.html',
})
export class PickuporderPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }



  closeDetail() {
    this.navCtrl.pop();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PickuporderPage');
  }

}
