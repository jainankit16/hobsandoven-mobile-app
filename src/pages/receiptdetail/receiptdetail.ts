import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ReceiptdetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-receiptdetail',
  templateUrl: 'receiptdetail.html',
})
export class ReceiptdetailPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  closeDetail() {
    this.navCtrl.pop();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReceiptdetailPage');
  }

}
