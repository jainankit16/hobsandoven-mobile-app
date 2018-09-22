import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApputilsProvider } from '../../providers/apputils/apputils';

@IonicPage()
@Component({
  selector: 'page-feeddetails',
  templateUrl: 'feeddetails.html',
})
export class FeeddetailsPage {
  private mealData: any;
  private totalprice: any;
  orderParams: { pickuptime: string, quantity: number } = {
    pickuptime: "",
    quantity: 1,
  }
  constructor(public utilsProvider: ApputilsProvider, public navCtrl: NavController, public navParams: NavParams) {

    //get feed data
    if (this.navParams.get('feeddata')) {
      this.mealData = this.navParams.get('feeddata');
      this.totalprice = parseInt(this.mealData.price_per_serving);
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FeeddetailsPage');
  }

  closeDetail() {
    this.navCtrl.pop();
  }

  minusClick() {
    if (this.orderParams.quantity > 1) {
      this.orderParams.quantity = this.orderParams.quantity - 1;
      this.totalprice = this.totalprice - parseInt(this.mealData.price_per_serving);
    }
  }

  plusClick() {
    this.orderParams.quantity = this.orderParams.quantity + 1;
    this.totalprice = this.totalprice + parseInt(this.mealData.price_per_serving);
  }

  placeOrder() {
    debugger;
    if (this.orderParams.pickuptime != "") {

    } else {
      this.utilsProvider.showToast('Please select picup time first.')
    }
  }

}
