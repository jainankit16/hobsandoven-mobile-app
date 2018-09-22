import { Component, ViewChild } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { TranslateService } from '@ngx-translate/core';
import { Config, Nav, Platform, MenuController, Events } from 'ionic-angular';

import { FirstRunPage, FirstRunPage1, MainPage } from '../pages';
import { Settings } from '../providers';
import { HomePage } from '../pages/home/home';
import { SettingsPage } from '../pages/settings/settings';
import { Storage } from '@ionic/storage';
import { LoginPage } from '../pages/login/login';
import { MyordersPage } from '../pages/myorders/myorders';
import { MyplacedordersPage } from '../pages/myplacedorders/myplacedorders';
import { Geolocation } from '@ionic-native/geolocation';
import { LatLng } from '@ionic-native/google-maps';


@Component({
  template: `<ion-menu [content]="content">
    <ion-header class="custom_header">
      <ion-toolbar>
        <img width="220" height="19" src="assets/img/logo.png"/>
      </ion-toolbar>
    </ion-header>

    <ion-content class="custom_content_main">
    <ion-item class="profile_back">
      <div class="circle">
          <img width="200" height="200" src="assets/img/back_progile.png"/>
        <div class="profile_pic">
          <img [src]="this.userData.profile_picture"/>
        </div>
      </div>
    </ion-item>
    <div>
    </div>
    <ion-item class="user_info">
      <div class="username">{{this.userData.name}}</div>
      <div class="edit_profile" menuClose (click)="openPage('EditprofilePage')">Rediger profil</div>
    </ion-item>
      <ion-list class="side_menu_main_item_list">
        <button menuClose ion-item (click)="openPage('SettingsPage')">
        <img width="30" height="29" src="assets/img/fock.png"/><span class="side_menu_text">Indstillinger</span>
        </button>
        <button menuClose ion-item (click)="openPage('MyplacedordersPage')">
        <img width="30" height="30" src="assets/img/order.png"/><span class="side_menu_text">Mine order</span>
        </button>
        <button menuClose ion-item (click)="openPage('MyordersPage')">
        <img width="30" height="26" src="assets/img/wp.png"/><span class="side_menu_text">Bestillinger</span>
          
        </button>
        <button menuClose ion-item (click)="openPage('HomePage')">
        <img width="30" height="28" src="assets/img/star.png"/><span class="side_menu_text">Give os feedback</span>
          
        </button>
      </ion-list>
    </ion-content>

  </ion-menu>
  <ion-nav #content [root]="rootPage"></ion-nav>`
})
export class MyApp {
  rootPage;

  @ViewChild(Nav) nav: Nav;

  pages: any[] = [
    { title: 'Home', component: 'HomePage' },
    { title: 'Cards', component: 'CardsPage' },
    { title: 'Settings', component: 'SettingsPage' },
    { title: 'Search', component: 'SearchPage' }
  ]

  userData: { email: String, name: String, user_id: String, profile_picture: String } = {
    email: "",
    name: "",
    user_id: "",
    profile_picture: "assets/img/user.png"
  }

  constructor(private geolocation: Geolocation, public event: Events, private storage: Storage, private translate: TranslateService, platform: Platform, settings: Settings, private config: Config, private statusBar: StatusBar, private splashScreen: SplashScreen, public menu: MenuController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.menu.swipeEnable(false);

      //check user already logged in
      this.storage.get('user').then(user => {
        debugger;
        if (user != null) {
          this.rootPage = MainPage;
          // this.nav.setRoot(MainPage);
        } else {
          this.rootPage = LoginPage;
          // this.nav.setRoot(LoginPage);
        }

      });

      this.listenEvents();

      //ask user for location access
      this.getUserLocationAccess();
    });
    this.initTranslate();
  }

  initTranslate() {
    // Set the default language for translation strings, and the current language.
    this.translate.setDefaultLang('en');
    const browserLang = this.translate.getBrowserLang();

    if (browserLang) {
      if (browserLang === 'zh') {
        const browserCultureLang = this.translate.getBrowserCultureLang();

        if (browserCultureLang.match(/-CN|CHS|Hans/i)) {
          this.translate.use('zh-cmn-Hans');
        } else if (browserCultureLang.match(/-TW|CHT|Hant/i)) {
          this.translate.use('zh-cmn-Hant');
        }
      } else {
        this.translate.use(this.translate.getBrowserLang());
      }
    } else {
      this.translate.use('en'); // Set your language here
    }

    this.translate.get(['BACK_BUTTON_TEXT']).subscribe(values => {
      this.config.set('ios', 'backButtonText', values.BACK_BUTTON_TEXT);
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    // this.nav.setRoot(page);
    if (page == "HomePage") {
      this.nav.push('HomePage');
    } else if (page == "SettingsPage") {
      this.nav.push('SettingsPage');
    } else if (page == "MyplacedordersPage") {
      this.nav.push('MyplacedordersPage');
    } else if (page == "MyordersPage") {
      this.nav.push('MyordersPage');
    } else if (page == "EditprofilePage") {
      this.nav.push('EditprofilePage');
    }
  }

  ngOnInit() {
    debugger;
    this.updateUserData();
  }

  listenEvents() {
    this.event.subscribe("updateProfileData", () => {
      this.updateUserData();
    });
  }

  updateUserData() {
    debugger;
    this.storage.get('user').then(user => {
      if (user != null) {

        //set used data in side menu
        this.userData.email = user.email;
        this.userData.name = user.name;
        if (user.profile_picture != "" && user.profile_picture != undefined) {
          this.userData.profile_picture = user.profile_picture;
        } else {
          this.userData.profile_picture = "assets/img/user.png";
        }
        this.userData.user_id = user.user_id;

      } else {

        // this.nav.setRoot(LoginPage);
      }

    });
  }

  getUserLocationAccess() {
    // this.geolocation.getCurrentPosition().then(position => {
    //   // Change to actual current location
    //   return new LatLng(position.coords.latitude, position.coords.longitude);
    // }).then(latLng => {
    //   var currentPosition = latLng;
    //   alert("hi");
    // });

    //call feeds here
  }
}
