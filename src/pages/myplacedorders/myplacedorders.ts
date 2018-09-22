import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Keyboard } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Slides } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { ApputilsProvider } from '../../providers/apputils/apputils';
import { Home } from '../../providers';

@IonicPage()
@Component({
  selector: 'page-myplacedorders',
  templateUrl: 'myplacedorders.html',
})
export class MyplacedordersPage {
  @ViewChild(Slides) slides: Slides;


  isMyOrders: boolean = true;
  isReciepts: boolean = false;

  myOrdersParams: { method: string, user_id: string } = {
    method: "get_my_meals",
    user_id: ""
  }

  constructor(public utilsProvider: ApputilsProvider,
    private keyboard: Keyboard,
    public home: Home,
    private storage: Storage, public navCtrl: NavController, public navParams: NavParams) {
  }


  ionViewWillEnter() {
    if (this.isMyOrders) {
      this.slides.slideTo(0);
    } else if (this.isReciepts) {
      this.slides.slideTo(1);
    }
  }
  ionViewDidLoad() {
    //get user data
    this.storage.get('user').then(user => {
      if (user != null) {
        this.myOrdersParams.user_id = user.user_id;
        this.myMealsOrders();
      } else {

      }

    });
  }

  myOrders() {
    this.isMyOrders = true;
    this.isReciepts = false;

    this.slides.slideTo(0, 500);

    this.myMealsOrders();
  }

  reciepts() {
    this.isMyOrders = false;
    this.isReciepts = true;

    //slide to forgot
    this.slides.slideTo(1, 500);
  }

  slideChanged() {

    //close keyboard
    if (this.keyboard.isOpen()) {
      this.keyboard.close();
    }
    //
    let currentIndex = this.slides.getActiveIndex();
    console.log('Current index is', currentIndex);

    if (currentIndex == 0) {
      this.isMyOrders = true;
      this.isReciepts = false;
    } else if (currentIndex == 1) {
      this.isMyOrders = false;
      this.isReciepts = true;
    }
  }

  mealClickFunc(){
    this.navCtrl.push('CompleteorderPage');
  }

  recieptClickFunc(){
    this.navCtrl.push('BuyerreceiptdetailPage');
  }

  myMealsOrders() {

  }

}
