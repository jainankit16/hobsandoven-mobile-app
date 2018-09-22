import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController, ModalOptions } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-notacceptorder',
  templateUrl: 'notacceptorder.html',
})
export class NotacceptorderPage {

  constructor(public modalCtrl: ModalController,public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams) {
  }

  notCacel() {
    this.viewCtrl.dismiss();
  }

  yes() {
    
    const myModalOptions: ModalOptions = {
      showBackdrop: true,
      enableBackdropDismiss: true
    };
    const modal = this.modalCtrl.create('CancelorderPage', "", myModalOptions);
    modal.present();
    this.viewCtrl.dismiss();
  }

  closeModel() {
    this.viewCtrl.dismiss();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotacceptorderPage');
  }

}
