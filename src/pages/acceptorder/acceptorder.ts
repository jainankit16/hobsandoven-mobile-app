import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ModalOptions } from 'ionic-angular';

/**
 * Generated class for the AcceptorderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-acceptorder',
  templateUrl: 'acceptorder.html',
})
export class AcceptorderPage {

  constructor(public modalCtrl: ModalController, public navCtrl: NavController, public navParams: NavParams) {
  }


  cancelOrder() {
    const myModalOptions: ModalOptions = {
      showBackdrop: true,
      enableBackdropDismiss: true
    };
    const modal = this.modalCtrl.create('NotacceptorderPage', "", myModalOptions);
    modal.present();
  }


  closeDetail() {
    this.navCtrl.pop();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AcceptorderPage');
  }


}
