import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController, ModalController, NavParams } from 'ionic-angular';

import { User } from '../../providers';
import { MainPage } from '../';
import { isJsObject } from '@angular/core/src/change_detection/change_detection_util';
import { TutorialPage } from '../tutorial/tutorial';
import { ApputilsProvider } from '../../providers/apputils/apputils';
import { ForgotpasswordPage } from '../forgotpassword/forgotpassword';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { Storage } from '@ionic/storage';
import { Slides } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { Keyboard } from 'ionic-angular';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';






@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})

export class LoginPage {
  @ViewChild(Slides) slides: Slides;
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type

  public confirmPassword: string = "";
  cbChecked: boolean = false;
  public userData: any;
  private isLoader: boolean = false;


  loginparams: { act_type: string, method: string, email: string, password: string } = {
    act_type: "normal",
    method: "signin",
    email: '',
    password: ''
  };

  facebookloginparams: { name: string, facebook_id: string, act_type: string, method: string, email: string, password: string } = {
    name: '',
    facebook_id: '',
    act_type: "facebook",
    method: "signin",
    email: '',
    password: ''
  };

  signupparams: { method: string, name: string, email: string, password: string } = {
    method: "signup",
    name: '',
    email: '',
    password: ''
  };

  forgotpasswordparam: { method: string, email: string } = {
    method: 'forgotpassword',
    email: ''
  };

  // Our translated text strings
  private loginErrorString: string;
  isSignUp: boolean = false;
  isLogin: boolean = true;
  isForgot: boolean = false;
  isTerms: boolean = false;


  constructor(private nativePageTransitions: NativePageTransitions,
    private navParams: NavParams, private keyboard: Keyboard,
    public navCtrl: NavController,
    private storage: Storage,
    public user: User,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    public modalCtrl: ModalController, public utilsProvider: ApputilsProvider, public fb: Facebook) {

    this.translateService.get('LOGIN_ERROR').subscribe((value) => {
      this.loginErrorString = value;
    })

    //get navparams
    if (this.navParams.get('terms')) {
      this.isTerms = this.navParams.get('terms');
      this.signupparams = this.navParams.get('data');
      this.cbChecked = this.navParams.get('termscondition');
      this.confirmPassword = this.navParams.get('confirmPassword');
      if (this.cbChecked) {

      }
    } else {
      this.isTerms = false;
    }

  }

  signup(this) {
    this.isSignUp = true;
    this.isLogin = false;
    this.isForgot = false;
    this.textColor = "#ffffff";

    this.slides.slideTo(0, 500);
  }

  login() {
    this.isSignUp = false;
    this.isLogin = true;
    this.isForgot = false;

    this.slides.slideTo(1, 500);
  }

  forgot() {
    this.isSignUp = false;
    this.isLogin = false;
    this.isForgot = true;

    //slide to forgot
    this.slides.slideTo(2, 500);
  }

  slideChanged() {

    //clear other form data
    this.signupparams.email = "";
    this.signupparams.name = "";
    this.signupparams.password = "";
    this.cbChecked = false;
    this.confirmPassword = "";

    this.loginparams.email = "";
    this.loginparams.password = "";

    this.forgotpasswordparam.email = "";


    //close keyboard
    if (this.keyboard.isOpen()) {
      this.keyboard.close();
    }
    //
    let currentIndex = this.slides.getActiveIndex();
    console.log('Current index is', currentIndex);

    if (currentIndex == 0) {
      this.isSignUp = true;
      this.isLogin = false;
      this.isForgot = false;

    } else if (currentIndex == 1) {
      this.isSignUp = false;
      this.isLogin = true;
      this.isForgot = false;
    } else if (currentIndex == 2) {
      this.isSignUp = false;
      this.isLogin = false;
      this.isForgot = true;
    }
  }

  // Attempt to login in through our User service
  submitLoginSingup() {
    if (this.isSignUp) {
      //do signup stuff
      if (this.signupparams.name != "") {
        if (!this.signupparams.name.replace(/\s/g, '').length) {
          this.utilsProvider.showToast('Name should contain alphabets only');
        } else {
          if (this.utilsProvider.nameValidation(this.signupparams.name)) {
            if (this.signupparams.email != "") {
              if (this.utilsProvider.emailValidation(this.signupparams.email)) {
                if (this.signupparams.password != "") {
                  if (this.signupparams.password.length >= 6 && this.signupparams.password.length <= 15) {
                    if (this.confirmPassword != "") {
                      if (this.confirmPassword.length >= 6 && this.confirmPassword.length <= 15) {
                        if (this.signupparams.password == this.confirmPassword) {
                          if (this.cbChecked) {
                            this.utilsProvider.showLoading();
                            // this.isLoader = true;
                            this.doSignUp();
                          } else {
                            this.utilsProvider.showToast('Accepter venligst vilkår og betingelser');
                          }
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
                    this.utilsProvider.showToast('Password length should be of minimum 6 and maximum 15 characters');
                  }
                } else {
                  this.utilsProvider.showToast('Please enter password');
                }
              } else {
                this.utilsProvider.showToast('Invalid email format');
              }
            } else {
              this.utilsProvider.showToast('Please enter email');
            }
          } else {
            this.utilsProvider.showToast('Name should contain alphabets only');
          }
        }

      } else {
        this.utilsProvider.showToast('Please enter name');
      }
    } else {
      //do login stuff
      if (this.loginparams.email != "") {
        if (this.utilsProvider.emailValidation(this.loginparams.email)) {
          if (this.loginparams.password != "") {
            if (this.loginparams.password.length >= 6 && this.loginparams.password.length <= 15) {
              this.utilsProvider.showLoading();
              // this.isLoader = true;
              this.doLogin();
            } else {
              this.utilsProvider.showToast('Password length should be of minimum 6 and maximum 15 characters');
            }
          } else {
            this.utilsProvider.showToast('Please enter password');
          }
        } else {
          this.utilsProvider.showToast('Invalid email format');
        }
      } else {
        this.utilsProvider.showToast('Please enter email');
      }

    }

  }

  doLogin() {
    debugger;
    this.user.login(this.loginparams).then((resp) => {
      this.utilsProvider.hideLoading();
      // this.isLoader = false;
      this.userData = resp;
      this.userData = JSON.parse(this.userData.data);

      if (this.userData.error_code == 0) {
        this.storage.set('user', this.userData.result);
        this.navCtrl.setRoot(MainPage);
        //this.utilsProvider.showToast(resp.error_string);

      } else if (this.userData.error_code == 1) {
        this.utilsProvider.showToast(this.userData.status);
      }

    }, (err) => {
      this.utilsProvider.hideLoading();
      // this.isLoader = false;
    });
    // this.user.login(this.loginparams).subscribe((resp) => {
    //   this.utilsProvider.hideLoading();
    //   this.userData = resp;

    //   if (this.userData.error_code == 0) {
    //     this.storage.set('user', this.userData.result);
    //     this.navCtrl.push(MainPage);
    //     //this.utilsProvider.showToast(resp.error_string);

    //   } else if (this.userData.error_code == 1) {
    //     this.utilsProvider.showToast(this.userData.error_string);
    //   }

    // }, (err) => {
    //   //this.navCtrl.push(MainPage);
    //   // Unable to log in
    //   this.utilsProvider.showToast(err);
    //   this.utilsProvider.showToast(JSON.stringify(err));

    //   this.utilsProvider.hideLoading();
    // });
  }

  doSignUp() {
    this.user.signup(this.signupparams).then((resp) => {
      this.utilsProvider.hideLoading();
      // this.isLoader = false;
      this.userData = resp;
      this.userData = JSON.parse(this.userData.data);

      if (this.userData.error_code == 0) {
        this.storage.set('user', this.userData.result);
        this.navCtrl.setRoot(MainPage);

      } else if (this.userData.error_code == 1) {
        this.utilsProvider.showToast(this.userData.error_string);
      }
    }, (err) => {

      this.utilsProvider.hideLoading();
      // this.isLoader = false;
    });
  }

  facebookSubmit() {
    this.fb.login(['public_profile', 'email'])
      .then((res: FacebookLoginResponse) => {

        // The connection was successful
        if (res.status == "connected") {

          // Get user ID and Token
          this.facebookloginparams.facebook_id = res.authResponse.userID;
          var fb_token = res.authResponse.accessToken;

          // Get user infos from the API
          this.fb.api("/me?fields=name,gender,birthday,email", []).then((user) => {

            // Get the connected user details
            this.facebookloginparams.name = user.name;
            this.facebookloginparams.email = user.email;

            // => Open user session and redirect to the next page
            this.utilsProvider.showLoading();
            // this.isLoader = true;
            this.user.login(this.facebookloginparams).then((resp) => {
              this.utilsProvider.hideLoading();
              // this.isLoader = false;
              this.userData = resp;
              this.userData = JSON.parse(this.userData.data);

              if (this.userData.error_code == 0) {
                this.storage.set('user', this.userData.result);
                this.navCtrl.setRoot(MainPage);
                //this.utilsProvider.showToast(resp.error_string);

              } else if (this.userData.error_code == 1) {
                this.utilsProvider.showToast(this.userData.error_string);
              }

            }, (err) => {
              this.utilsProvider.hideLoading();
              // this.isLoader = false;
            });

          });

        }
        // An error occurred while loging-in
        else {

          console.log("An error occurred...");

        }

      })
      .catch((e) => {
        console.log('Error logging into Facebook', e);
      });
  }

  showForgot() {
    // this.navCtrl.push(ForgotpasswordPage);
    this.isSignUp = false;
    this.isLogin = false;
    this.isForgot = true;

    //slide to forgot
    this.slides.slideTo(2, 500);

  }

  updateTerms(event) {
    this.cbChecked = event._value;;
  }

  termsFunc() {
    // this.utilsProvider.showLoading();
    // let options: NativeTransitionOptions = {
    //   direction: 'left',
    //   duration: 400,
    //   slowdownfactor: -1,
    //   iosdelay: 100,
    //   androiddelay: 150,
    // };

    // this.nativePageTransitions.slide(options);
    this.navCtrl.push('TermsPage', { data: this.signupparams, termscondition: this.cbChecked, confirmPassword: this.confirmPassword });
  }

  privacyFunc() {
    // this.utilsProvider.hideLoading();
    this.navCtrl.push('PolicyPage', { data: this.signupparams, termscondition: this.cbChecked, confirmPassword: this.confirmPassword });

  }

  //forgot password
  forgotPassword() {
    // this.viewCtrl.dismiss();
    if (this.forgotpasswordparam.email != "") {
      if (this.utilsProvider.emailValidation(this.forgotpasswordparam.email)) {
        this.utilsProvider.showLoading();
        // this.isLoader = true;
        this.doForgot();
      } else {
        this.utilsProvider.showToast('Invalid email format');
      }
    } else {
      this.utilsProvider.showToast('Please enter email');
    }

  }
  doForgot() {
    this.user.forgotpassword(this.forgotpasswordparam).then((resp) => {
      this.utilsProvider.hideLoading();
      // this.isLoader = false;
      this.userData = resp;
      this.userData = JSON.parse(this.userData.data);

      if (this.userData.error_code == 0) {
        // this.navCtrl.push(LoginPage);
        this.slides.slideTo(1, 500);
        this.forgotpasswordparam.email = "";
        this.utilsProvider.showToast(this.userData.error_string);

      } else if (this.userData.error_code == 1) {
        this.utilsProvider.showToast(this.userData.error_string);
      }

    }, (err) => {
      this.utilsProvider.hideLoading();
      // this.isLoader = false;
    });
  }

  ionViewWillEnter() {
    // Set initial slides value.
    // this.slides.slideTo(1);
    if (this.isTerms) {
      this.isLogin = false;
      this.isSignUp = true;
      this.isForgot = false;
    } else {
      this.slides.slideTo(1);

    }
  }


}
