import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-cancelorder',
  templateUrl: 'cancelorder.html',
})
export class CancelorderPage {

  cancelOrderParam: { reason: string } = {
    reason: ""
  }

  constructor(public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams) {
  }

  notCacel() {
    this.viewCtrl.dismiss();
  }

  closeModel() {
    this.viewCtrl.dismiss();
  }

  cancelOrder(){

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CancelorderPage');
  }

}
