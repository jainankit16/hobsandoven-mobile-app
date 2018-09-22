import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, App, ModalController, ModalOptions } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { Storage } from '@ionic/storage';


@IonicPage()
@Component({
  selector: 'page-logout',
  templateUrl: 'logout.html',
})
export class LogoutPage {

  constructor(public modalCtrl: ModalController, public app: App, private storage: Storage, public viewCtrl: ViewController,
    public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LogoutPage');
  }

  closeModel() {
    this.viewCtrl.dismiss();
  }
  logout() {
    this.storage.set('user', null);
    // this.navCtrl.setRoot(LoginPage);
    this.viewCtrl.dismiss();

    this.app.getRootNav().setRoot(LoginPage)
  }

  deleteAccount() {
    this.viewCtrl.dismiss();
    const myModalOptions: ModalOptions = {
      showBackdrop: true,
      enableBackdropDismiss: true
    };
    const modal = this.modalCtrl.create('DeleteaccountPage', "", myModalOptions);
    modal.present();
  }

}
