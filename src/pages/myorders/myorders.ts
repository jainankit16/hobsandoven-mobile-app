import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Keyboard } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Slides } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { ApputilsProvider } from '../../providers/apputils/apputils';
import { Home } from '../../providers';



@IonicPage()
@Component({
  selector: 'page-myorders',
  templateUrl: 'myorders.html',
})
export class MyordersPage {
  @ViewChild(Slides) slides: Slides;


  private mealImage: any;
  private myMealsData: any;


  isOrders: boolean = false;
  isMyMeals: boolean = true;
  isReciepts: boolean = false;

  myMealsParams: { method: string, user_id: string } = {
    method: "get_my_meals",
    user_id: ""
  }

  constructor(
    public utilsProvider: ApputilsProvider,
    private keyboard: Keyboard,
    public home: Home,
    private storage: Storage,
    public camera: Camera, public navCtrl: NavController,
    public navParams: NavParams) {
  }

  ionViewWillEnter() {
    if (this.isOrders) {
      this.slides.slideTo(0);
    } else if (this.isMyMeals) {
      this.slides.slideTo(1);
    } else if (this.isReciepts) {
      this.slides.slideTo(2);
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyordersPage');
    //get user data
    this.storage.get('user').then(user => {
      if (user != null) {
        this.myMealsParams.user_id = user.user_id;
        this.getMyMeals();


      } else {

      }

    });
  }

  orders(this) {
    this.isOrders = true;
    this.isMyMeals = false;
    this.isReciepts = false;
    this.textColor = "#ffffff";

    this.slides.slideTo(0, 500);
  }

  myMeals() {
    this.isOrders = false;
    this.isMyMeals = true;
    this.isReciepts = false;

    this.slides.slideTo(1, 500);

    this.getMyMeals();
  }

  reciepts() {
    this.isOrders = false;
    this.isMyMeals = false;
    this.isReciepts = true;

    //slide to forgot
    this.slides.slideTo(2, 500);
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
      this.isOrders = true;
      this.isMyMeals = false;
      this.isReciepts = false;

    } else if (currentIndex == 1) {
      this.isOrders = false;
      this.isMyMeals = true;
      this.isReciepts = false;
    } else if (currentIndex == 2) {
      this.isOrders = false;
      this.isMyMeals = false;
      this.isReciepts = true;
    }
  }

  mealClickFunc(data) {
    this.navCtrl.push('MealdetailPage', { mealData: data })
  }

  createMeal() {

    this.getMealPictureFromCamera();

  }

  getMealPictureFromCamera() {
    const options: CameraOptions = {
      quality: 80,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
    }

    this.camera.getPicture(options).then((imageData) => {

      debugger;

      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.mealImage = base64Image;

      //navigate to create meal page
      this.navCtrl.push('CreatemealPage', { mealImage: this.mealImage });

    }, (err) => {
      // Handle error
    });
  }

  getMyMeals() {
    debugger;
    this.utilsProvider.showLoading();

    // this.createmealparam.meal_content = JSON.stringify(JSON.stringify(this.createmealparam.meal_content));
    // this.createmealparam.meal_nutrition = JSON.stringify(JSON.stringify(this.createmealparam.meal_nutrition));
    this.home.getMyMealMeals(this.myMealsParams).then((resp) => {
      this.utilsProvider.hideLoading();

      let data = resp;
      data = JSON.parse(data.data);

      if (data.error_code == 0) {
        this.myMealsData = data.result;
      } else if (data.error_code == 1) {
        this.utilsProvider.showToast(data.status);
      }

      if (data.result.length > 0) {

      } else {
        // this.noFeed = true;
      }


    }, (err) => {
      this.utilsProvider.hideLoading();
    });
  }

}
