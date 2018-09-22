import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, NavParams, MenuController, ModalController, ModalOptions } from 'ionic-angular';

import { Settings } from '../../providers';
import { MainPage } from '..';
import { LogoutPage } from '../logout/logout';
import { ChangepasswordPage } from '../changepassword/changepassword';
import { NativePageTransitions, NativeTransitionOptions } from '../../../node_modules/@ionic-native/native-page-transitions';


/**
 * The Settings page is a simple form that syncs with a Settings provider
 * to enable the user to customize settings for the app.
 *
 */
@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {
  // Our local settings object
  options: any;

  settingsReady = false;

  form: FormGroup;

  profileSettings = {
    page: 'profile',
    pageTitleKey: 'SETTINGS_PAGE_PROFILE'
  };

  page: string = 'main';
  pageTitleKey: string = 'SETTINGS_TITLE';
  pageTitle: string;

  subSettings: any = SettingsPage;

  constructor(private nativePageTransitions: NativePageTransitions,
    public navCtrl: NavController,
    public settings: Settings,
    public formBuilder: FormBuilder,
    public navParams: NavParams,
    public translate: TranslateService,
    public menu: MenuController, public modalCtrl: ModalController) {
    this.menu.swipeEnable(false);
  }

  ionViewDidLoad() {
  }

  ionViewWillEnter() {
    this.translate.get(this.pageTitleKey).subscribe((res) => {
      // this.pageTitle = res;
      this.pageTitle = "Indstillinger";
    })
  }
  ngOnChanges() {
    console.log('Ng All Changes');
  }
  changePassword() {
    // let options: NativeTransitionOptions = {
    //   direction: 'left',
    //   duration: 500,
    //   slowdownfactor: 3,
    //   slidePixels: 20,
    //   iosdelay: 100,
    //   androiddelay: 150,
    //   fixedPixelsTop: 0,
    //   fixedPixelsBottom: 60
    //  };

    // this.nativePageTransitions.slide(options);
    this.navCtrl.push('ChangepasswordPage');

  }
  goBack() {
    // alert("hi");
    this.navCtrl.push(MainPage);
  }
  logout() {
    const myModalOptions: ModalOptions = {
      showBackdrop: true,
      enableBackdropDismiss: true
    };
    const modal = this.modalCtrl.create('LogoutPage', "", myModalOptions);
    modal.present();
  }
}
