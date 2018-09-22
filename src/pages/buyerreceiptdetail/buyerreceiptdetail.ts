import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ModalOptions } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-buyerreceiptdetail',
  templateUrl: 'buyerreceiptdetail.html',
})
export class BuyerreceiptdetailPage {

  constructor(public modalCtrl: ModalController, public navCtrl: NavController, public navParams: NavParams) {
  }

  closeDetail() {
    this.navCtrl.pop();
  }


  rateOrder() {
    const myModalOptions: ModalOptions = {
      showBackdrop: true,
      enableBackdropDismiss: true
    };
    const modal = this.modalCtrl.create('RateorderPage', "", myModalOptions);
    modal.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BuyerreceiptdetailPage');
  }

}
