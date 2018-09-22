import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, App } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { LoginPage } from '../login/login';
import { User, ApputilsProvider } from '../../providers';


@IonicPage()
@Component({
  selector: 'page-deleteaccount',
  templateUrl: 'deleteaccount.html',
})
export class DeleteaccountPage {

  deleteUserParams: { method: string, user_id: string } = {
    method: "delete_user",
    user_id: ""
  }

  constructor(public utilsProvider: ApputilsProvider, private user: User, private storage: Storage, public app: App, public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    //get user data
    this.storage.get('user').then(user => {
      if (user != null) {
        this.deleteUserParams.user_id = user.user_id;
      } else {

      }

    });
  }

  closeModel() {
    this.viewCtrl.dismiss();
  }

  deleteAccount() {
    this.utilsProvider.showLoading();
    debugger;
    this.user.deleteAccount(this.deleteUserParams).then((resp) => {
      this.utilsProvider.hideLoading();

      let data = resp;
      data = JSON.parse(data.data);

      if (data.error_code == 0) {
        this.utilsProvider.showToast(data.status);
        this.storage.set('user', null);
        // this.navCtrl.setRoot(LoginPage);
        this.viewCtrl.dismiss();

        this.app.getRootNav().setRoot(LoginPage)
      }



    }, (err) => {
      this.utilsProvider.hideLoading();
    });

  }

  dontDeleteAccount() {
    this.viewCtrl.dismiss();
  }

}
