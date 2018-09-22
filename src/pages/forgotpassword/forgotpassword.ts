import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController } from 'ionic-angular';
import { ApputilsProvider } from '../../providers/apputils/apputils';
import { LoginPage } from '../login/login';
import { User } from '../../providers';



@IonicPage()
@Component({
  selector: 'page-forgotpassword',
  templateUrl: 'forgotpassword.html',
})
export class ForgotpasswordPage {

  public userData:any;

  forgotpasswordparam: { method: string, email: string } = {
    method: 'forgotpassword',
    email: ''
  };

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController, 
    public modalCtrl: ModalController,
  public utilsProvider: ApputilsProvider,
public user: User) {

  }


  forgotPassword() {
    // this.viewCtrl.dismiss();
    
    if (this.forgotpasswordparam.email != "") {
      if (this.utilsProvider.emailValidation(this.forgotpasswordparam.email)) {
        this.utilsProvider.showLoading();
          this.doForgot();
      } else {
        this.utilsProvider.showToast('Invalid email format');
      }
    } else {
      this.utilsProvider.showToast('Please enter email');
    }
    
  }
  doForgot(){
    this.user.forgotpassword(this.forgotpasswordparam).then((resp) => {
      this.utilsProvider.hideLoading();
      this.userData = resp;
      this.userData = JSON.parse(this.userData.data);
   
      if(this.userData.error_code == 0){
        this.navCtrl.push(LoginPage);
        this.viewCtrl.dismiss();
        this.utilsProvider.showToast(this.userData.error_string);

      }else if(this.userData.error_code == 1){
        this.utilsProvider.showToast(this.userData.error_string);
      }
      

      // if(resp.result != undefined){
      //   this.showToast(resp.error_string);
      //   this.navCtrl.push(MainPage);

      // }else{
      //   this.showToast(resp.error_string);
      // }
    }, (err) => {
      this.utilsProvider.hideLoading();
    });
  }
  closeModel(){
    this.viewCtrl.dismiss();
  }

}
