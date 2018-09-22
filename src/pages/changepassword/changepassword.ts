import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApputilsProvider } from '../../providers/apputils/apputils';
import { User } from '../../providers';
import { Storage } from '@ionic/storage';


@IonicPage()
@Component({
  selector: 'page-changepassword',
  templateUrl: 'changepassword.html',
})
export class ChangepasswordPage {

  private confirmnewpassword: String = "";
  private passwordData: any;
  changepasswordparam: {
    method: string, old_password: string,
    new_password: string, user_id: String
  } = {
      method: 'change_password',
      old_password: '',
      new_password: '',
      user_id: ''
    };

  constructor(private storage: Storage, public user: User, public utilsProvider: ApputilsProvider, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangepasswordPage');
  }

  changePasswordClick() {
    if (this.changepasswordparam.old_password != "") {
      if (this.changepasswordparam.old_password.length >= 6 && this.changepasswordparam.old_password.length <= 15) {
        if (this.changepasswordparam.new_password != "") {
          if (this.changepasswordparam.new_password.length >= 6 && this.changepasswordparam.new_password.length <= 15) {
            if (this.confirmnewpassword != "") {
              if (this.confirmnewpassword.length >= 6 && this.confirmnewpassword.length <= 15) {
                if (this.changepasswordparam.new_password == this.confirmnewpassword) {
                  this.utilsProvider.showLoading();
                  // this.isLoader = true;
                  debugger;
                  this.changePassword();
                } else {
                  this.utilsProvider.showToast('Kodeordene matcher ikke');
                }
              } else {
                this.utilsProvider.showToast('Confirm password length should be of minimum 6 and maximum 15 characters');
              }
            } else {
              this.utilsProvider.showToast('Please enter confirm password');
            }
          } else {
            this.utilsProvider.showToast('New password length should be of minimum 6 and maximum 15 characters');
          }
        } else {
          this.utilsProvider.showToast('Please enter new password');
        }
      } else {
        this.utilsProvider.showToast('Current password length should be of minimum 6 and maximum 15 characters');
      }
    } else {
      this.utilsProvider.showToast('Please enter current password');
    }
  }

  changePassword() {
    this.user.changePassword(this.changepasswordparam).then((resp) => {
      this.utilsProvider.hideLoading();
      // this.isLoader = false;
      this.passwordData = resp;
      this.passwordData = JSON.parse(this.passwordData.data);

      if (this.passwordData.error_code == 0) {
        this.utilsProvider.showToast(this.passwordData.status);
        this.changepasswordparam.old_password = "";
        this.changepasswordparam.new_password = "";
        this.confirmnewpassword = "";
        

      } else if (this.passwordData.error_code == 1) {
        this.utilsProvider.showToast(this.passwordData.status);
      }

    }, (err) => {
      this.utilsProvider.hideLoading();
      // this.isLoader = false;
    });
  }

  ngOnInit() {
    this.storage.get('user').then(user => {
      if (user != null) {

        //set used data in side menu

        this.changepasswordparam.user_id = user.user_id;


      } else {

      }

    });
  }

}
