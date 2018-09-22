import { Injectable } from '@angular/core';
import {
  Loading,
  LoadingController,
  ToastController
} from 'ionic-angular';
import 'rxjs/add/operator/map';
import { TabsPage } from "../../pages/tabs/tabs";


@Injectable()
export class ApputilsProvider {

  public loading: Loading;

  constructor(public loadingCtrl: LoadingController, public toastCtrl: ToastController) {

  }

  getCurrentTimeStamp() {
    return new Date().getTime();
  }

  getTimeInterval(previous) {

    var current = new Date().getTime();

    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;

    var elapsed = current - previous;

    if (elapsed < msPerMinute) {
      return Math.round(elapsed / 1000) + ' Sec ago';
    }

    else if (elapsed < msPerHour) {
      return Math.round(elapsed / msPerMinute) + ' Min ago';
    }

    else if (elapsed < msPerDay) {
      return Math.round(elapsed / msPerHour) + ' Hrs ago';
    }

    else if (elapsed < msPerMonth) {
      return Math.round(elapsed / msPerDay) + ' Days ago';
    }

    else if (elapsed < msPerYear) {
      return Math.round(elapsed / msPerMonth) + ' Mon ago';
    }

    else {
      return Math.round(elapsed / msPerYear) + ' Years ago';
    }
  }

  toNameUppercase(str) {
    if (str != undefined) {
      return str.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
    }
    else {
      return "";
    }

  }

  showToast(message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: 'bottom'
    });

    toast.present(toast);
  }

nameValidation(name){
  
  // let nameregExp = /^[a-zA-Z]+$/;
  let nameregExp = /^[a-zA-Z ]*$/;
  if (nameregExp.test(name)) {
    return true;
  }
  return false;
}

  emailValidation(email) {
    let regExp = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    if (regExp.test(email)) {
      return true;
    }
    return false;
  }


  showLoading() {

    if (!this.loading) {
      this.loading = this.loadingCtrl.create({
        dismissOnPageChange: true,
      });
      this.loading.present();
    }
  }

  hideLoading() {
    if (this.loading) {
      this.loading.dismiss();
      this.loading = null;
    }
  }

  getImage(img_returned) {
    if (img_returned == "" || img_returned == undefined) {
      return img_returned = "assets/images/defult_pic.jpg";
    } else {
      return img_returned;
    }
  }


  registerDefaultBack(platform, view, navCtrl) {
    var page_name = "";
    if (navCtrl != "") {
      page_name = navCtrl.getActive().name;
    }

    console.log(page_name);
    platform.ready().then(() => {
      platform.registerBackButtonAction(() => {
        if (page_name == "ModalCmp") {
          view.dismiss();
          navCtrl.setRoot(TabsPage);
        } else if (page_name == "" || page_name == "TabsPage") {
          platform.exitApp();
        } else {
          navCtrl.pop({});
        }
      });
    });
  }


}
