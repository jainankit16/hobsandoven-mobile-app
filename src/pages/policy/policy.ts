import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { Navbar } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-policy',
  templateUrl: 'policy.html',
})
export class PolicyPage {

  @ViewChild(Navbar) navBar: Navbar;
  private data:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
      //get navparams
      if (this.navParams.get('data')) {
        this.data = this.navParams.get('data');
      } else {
        this.data = null;
      }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TermsPage');
    this.navBar.backButtonClick = (e:UIEvent)=>{
      this.navCtrl.push("LoginPage",
      {
        terms:true,
        data:this.data,
        termscondition:this.navParams.get('termscondition'),
        confirmPassword:this.navParams.get('confirmPassword')
      });
     }
  }

}
