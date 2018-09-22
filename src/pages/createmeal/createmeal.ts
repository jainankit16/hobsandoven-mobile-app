import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, MenuController } from 'ionic-angular';
import { ApputilsProvider } from '../../providers/apputils/apputils';
import { Geolocation } from '@ionic-native/geolocation';
import { Storage } from '@ionic/storage';
import { ActionSheetController } from 'ionic-angular';
import { Home } from '../../providers';
import { Camera, CameraOptions } from '@ionic-native/camera';



@IonicPage()
@Component({
  selector: 'page-createmeal',
  templateUrl: 'createmeal.html',
})
export class CreatemealPage {


  createmealparam: {
    method: String,
    user_id: String,
    meal_image: String,
    meal_title: String, meal_category_id: String, no_of_servings: String,
    weight_per_serving: String, price_per_serving: String,
    pickup_address: String, pickup_datetime: String,
    pickup_endtime: String, lat: String, lng: String, meal_description: String,
    meal_content: any, meal_nutrition: any


  } = {
      method: 'create_meal',
      user_id: '',
      meal_image: '',
      meal_title: '',
      meal_category_id: '',
      no_of_servings: '',
      weight_per_serving: '',
      price_per_serving: '',
      pickup_address: '',
      pickup_datetime: '',
      pickup_endtime: '',
      lat: '',
      lng: '',
      meal_description: '',
      meal_content: {
        contains_whole_grains: "false",
        partially_organic: "false",
        hund_per_organic: "false",
        doesnt_contain_dairy_products: "false",
        sugarfree: "false",
        low_fat: "false",
        rich_in_protiens: "false",
        gluten: "false",
        doesnt_contain_nuts: "false",
        doesnt_contain_meat: "false",
        doesnt_contain_egg: "false",
        doesnt_contain_sellfish: "false",
        hund_per_halal: "false"

      },
      meal_nutrition: {
        calories: "",
        fat: "",
        carbohydrates: "",
        proteins: ""
      },


    };

  editMealParams: {
    meal_id: string,
    method: String,
    user_id: String,
    meal_image: String,
    meal_title: String, meal_category_id: String, no_of_servings: String,
    weight_per_serving: String, price_per_serving: String,
    pickup_address: String, pickup_datetime: String,
    pickup_endtime: String, lat: String, lng: String, meal_description: String,
    meal_content: any, meal_nutrition: any


  } = {
      meal_id: "",
      method: 'create_meal',
      user_id: '',
      meal_image: '',
      meal_title: '',
      meal_category_id: '',
      no_of_servings: '',
      weight_per_serving: '',
      price_per_serving: '',
      pickup_address: '',
      pickup_datetime: '',
      pickup_endtime: '',
      lat: '',
      lng: '',
      meal_description: '',
      meal_content: {
        contains_whole_grains: "false",
        partially_organic: "false",
        hund_per_organic: "false",
        doesnt_contain_dairy_products: "false",
        sugarfree: "false",
        low_fat: "false",
        rich_in_protiens: "false",
        gluten: "false",
        doesnt_contain_nuts: "false",
        doesnt_contain_meat: "false",
        doesnt_contain_egg: "false",
        doesnt_contain_sellfish: "false",
        hund_per_halal: "false"

      },
      meal_nutrition: {
        calories: "",
        fat: "",
        carbohydrates: "",
        proteins: ""
      },


    };

  private mealContent: String = ''
  private selectedMealCategory: String = '';
  private mealCategoryData: any;
  private isEditMode: boolean = false;

  mealCategoryParams: { method: string } = {
    method: "meal_category"
  }


  constructor(public camera: Camera, public home: Home,
    public actionSheetCtrl: ActionSheetController,
    private storage: Storage, private geolocation: Geolocation, public menu: MenuController, public events: Events, public navCtrl: NavController, public navParams: NavParams,
    public utilsProvider: ApputilsProvider) {

    this.menu.swipeEnable(false);

    //get navparams
    if (this.navParams.get('mealImage')) {
      this.createmealparam.meal_image = this.navParams.get('mealImage');
      // this.createmealparam.meal_image = "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg/1200px-Good_Food_Display_-_NCI_Visuals_Online.jpg"
    } else {

    }

    //get meal data if coming from edit
    debugger;
    if (this.navParams.get('mealdata')) {
      let data = this.navParams.get('mealdata');
      //set data
      this.createmealparam.method = "edit_meal";
      this.createmealparam.meal_image = data.image;
      this.createmealparam.meal_title = data.meal_title;
      this.createmealparam.meal_category_id = data.meal_category_id;
      this.createmealparam.no_of_servings = data.no_of_servings;
      this.createmealparam.weight_per_serving = data.weight_per_serving;
      this.createmealparam.price_per_serving = data.price_per_serving;
      this.createmealparam.pickup_address = data.pickup_address;
      this.createmealparam.pickup_datetime = data.pickup_datetime;
      this.createmealparam.pickup_endtime = data.pickup_endtime
      this.createmealparam.meal_description = data.meal_description
      this.createmealparam.meal_content.contains_whole_grains = data.contains_whole_grains;
      this.createmealparam.meal_content.partially_organic = data.partially_organic;
      this.createmealparam.meal_content.hund_per_organic = data.hund_per_organic;
      this.createmealparam.meal_content.doesnt_contain_dairy_products = data.doesnt_contain_dairy_products;
      this.createmealparam.meal_content.sugarfree = data.sugarfree;
      this.createmealparam.meal_content.low_fat = data.low_fat;
      this.createmealparam.meal_content.rich_in_protiens = data.rich_in_protiens;
      this.createmealparam.meal_content.gluten = data.gluten;
      this.createmealparam.meal_content.doesnt_contain_nuts = data.doesnt_contain_nuts;
      this.createmealparam.meal_content.doesnt_contain_meat = data.doesnt_contain_meat
      this.createmealparam.meal_content.doesnt_contain_egg = data.doesnt_contain_egg;
      this.createmealparam.meal_content.doesnt_contain_sellfish = data.doesnt_contain_sellfish;
      this.createmealparam.meal_content.hund_per_halal = data.hund_per_halal;
      this.createmealparam.meal_nutrition.calories = data.calories;
      this.createmealparam.meal_nutrition.fat = data.fat;
      this.createmealparam.meal_nutrition.carbohydrates = data.carbohydrates;
      this.createmealparam.meal_nutrition.proteins = data.proteins;
      //
      this.isEditMode = true;

      //add meal id to edit params
      this.editMealParams.meal_id = data.meal_id;

      //create string to show if we are coming from edit
      var keys = Object.keys(this.createmealparam.meal_content)
      keys.forEach(element => {
        if (this.createmealparam.meal_content[element] == "true") {
          if (element == "contains_whole_grains") {
            this.updateStringContent("Indeholder fuldkorn");
          } else if (element == "partially_organic") {
            this.updateStringContent("Delvist økologisk");
          } else if (element == "hund_per_organic") {
            this.updateStringContent("100% økologisk");
          } else if (element == "doesnt_contain_dairy_products") {
            this.updateStringContent("Indeholder ikke mejeriprodukter");
          } else if (element == "sugarfree") {
            this.updateStringContent("Sukkerfrit");
          } else if (element == "low_fat") {
            this.updateStringContent("Fedtfattigt");
          } else if (element == "rich_in_protiens") {
            this.updateStringContent("Rig på proteiner");
          } else if (element == "gluten") {
            this.updateStringContent("Glutenfri");
          } else if (element == "doesnt_contain_nuts") {
            this.updateStringContent("Indeholder ikke nødder");
          } else if (element == "doesnt_contain_meat") {
            this.updateStringContent("Indeholder ikke kød");
          } else if (element == "doesnt_contain_egg") {
            this.updateStringContent("Indeholder ikke æg");
          } else if (element == "doesnt_contain_sellfish") {
            this.updateStringContent("Indeholder ikke skalddyr");
          } else if (element == "hund_per_halal") {
            this.updateStringContent("100% halal");
          }
        }
      });

    } else {
      this.isEditMode = false;
    }
    //

    debugger;
    this.getNutritionsListners();

    this.getMoreInfoListner();

    this.getSelectedAddress();

    //get meal categories
    this.getMealCategories();

  }

  updateStringContent(name) {
    if (this.mealContent == "") {
      this.mealContent = name;
    } else {
      this.mealContent = this.mealContent + ", " + name;

    }

  }

  getNutritionsListners() {
    debugger;
    this.events.subscribe("nutritions", (nutrition) => {
      this.createmealparam.meal_nutrition = nutrition;
    })
  }

  getMoreInfoListner() {
    debugger;
    this.events.subscribe("mealContent", (mealContentData, mealContentString) => {
      this.createmealparam.meal_content = mealContentData;
      this.mealContent = mealContentString;
    })
  }

  getSelectedAddress() {
    this.events.subscribe("selectedAddress", (selectedAddress) => {
      this.createmealparam.pickup_address = selectedAddress.description;
    })
  }

  proceedClickFunc() {
    debugger;
    if (this.createmealparam.meal_title != '') {
      if (this.createmealparam.meal_category_id != '') {
        if (this.createmealparam.no_of_servings != '') {
          if (this.createmealparam.weight_per_serving != '') {
            if (this.createmealparam.price_per_serving != '') {
              if (this.createmealparam.pickup_address != '') {
                if (this.createmealparam.pickup_datetime != '') {
                  if (this.createmealparam.pickup_endtime != '') {
                    if(this.isEditMode){
                      this.updateMeal();
                    }else{
                      this.createMeal();
                    }
                  } else {
                    this.utilsProvider.showToast('Please select pickup end time.');

                  }
                } else {
                  this.utilsProvider.showToast('Please select pickup date and time.');

                }
              } else {
                this.utilsProvider.showToast('Please enter pickup address.');

              }
            } else {
              this.utilsProvider.showToast('Please enter price per serving.');

            }
          } else {
            this.utilsProvider.showToast('Please enter weight per serving.');

          }
        } else {
          this.utilsProvider.showToast('Please enter numner of serving.');

        }
      } else {
        this.utilsProvider.showToast('Please select meal category.');

      }
    } else {
      this.utilsProvider.showToast('Please enter meal title.');

    }
  }

  addMoreInfoFunc() {
    this.navCtrl.push('AddmoreinfoPage', { mealContent: this.createmealparam.meal_content });
  }

  addNutritionInfoFunc() {
    debugger;
    this.navCtrl.push('AddnutritioninfoPage', { nutritions: this.createmealparam.meal_nutrition });
  }

  ionViewDidLoad() {
    this.utilsProvider.showLoading();
    this.geolocation.getCurrentPosition().then((position) => {

      let yourPosition = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      //get user data
      this.storage.get('user').then(user => {
        if (user != null) {
          this.createmealparam.user_id = user.user_id;
          this.createmealparam.lat = yourPosition.lat + "";
          this.createmealparam.lng = yourPosition.lng + "";

        } else {

        }

      });
    }, (err) => {
      console.log(err);
      alert('location error');
    });

  }

  getMealCategories() {
    debugger;
    this.utilsProvider.showLoading();

    this.home.getMealCategories(this.mealCategoryParams).then((resp) => {
      this.utilsProvider.hideLoading();

      this.mealCategoryData = resp;
      this.mealCategoryData = JSON.parse(this.mealCategoryData.data);


      if (this.mealCategoryData.result.length > 0) {
        if (this.isEditMode) {
          this.mealCategoryData.result.forEach(element => {
            if (element.meal_category_id == this.createmealparam.meal_category_id) {
              this.selectedMealCategory = element.category_name;
              return;
            }
          });
        }

      } else {
        // this.noFeed = true;
      }


    }, (err) => {
      this.utilsProvider.hideLoading();
    });
  }

  openGoogleSearch() {
    this.navCtrl.push('GooglesearchPage');
  }

  openActionSheetForNumbers() {
    let actionSheet = this.actionSheetCtrl.create({
      cssClass: 'action-sheets-custom',
    });

    for (let i = 1; i <= 10; i++) {
      actionSheet.addButton({
        text: i + "", cssClass: "", handler: () => {
          this.createmealparam.no_of_servings = i + "";
        }
      });
    }

    actionSheet.present();
  }

  openActionSheetForCategories() {
    let actionSheet = this.actionSheetCtrl.create({
      cssClass: 'action-sheets-custom',
    });

    for (let i = 0; i < this.mealCategoryData.result.length; i++) {
      actionSheet.addButton({
        text: this.mealCategoryData.result[i].category_name + "", cssClass: "", handler: () => {
          this.createmealparam.meal_category_id = this.mealCategoryData.result[i].meal_category_id + "";
          this.selectedMealCategory = this.mealCategoryData.result[i].category_name;
        }
      });
    }

    actionSheet.present();
  }

  createMeal() {
    debugger;
    this.utilsProvider.showLoading();

    // this.createmealparam.meal_content = JSON.stringify(JSON.stringify(this.createmealparam.meal_content));
    // this.createmealparam.meal_nutrition = JSON.stringify(JSON.stringify(this.createmealparam.meal_nutrition));
    this.home.getMealCategories(this.createmealparam).then((resp) => {
      this.utilsProvider.hideLoading();

      let data = resp;
      data = JSON.parse(data.data);

      if (data.error_code == 0) {
        this.utilsProvider.showToast(data.status);
        this.navCtrl.pop();
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

  updateMeal() {
    debugger;

    this.utilsProvider.showLoading();

    this.editMealParams.method = "edit_meal";
    this.editMealParams.meal_image = this.createmealparam.meal_image;
    this.editMealParams.meal_title = this.createmealparam.meal_title;
    this.editMealParams.meal_category_id = this.createmealparam.meal_category_id;
    this.editMealParams.no_of_servings = this.createmealparam.no_of_servings;
    this.editMealParams.weight_per_serving = this.createmealparam.weight_per_serving;
    this.editMealParams.price_per_serving = this.createmealparam.price_per_serving;
    this.editMealParams.pickup_address = this.createmealparam.pickup_address;
    this.editMealParams.pickup_datetime = this.createmealparam.pickup_datetime;
    this.editMealParams.pickup_endtime = this.createmealparam.pickup_endtime;
    this.editMealParams.meal_description = this.createmealparam.meal_description;
    this.editMealParams.meal_content.contains_whole_grains = this.createmealparam.meal_content.contains_whole_grains;
    this.editMealParams.meal_content.partially_organic = this.createmealparam.meal_content.partially_organic;
    this.editMealParams.meal_content.hund_per_organic = this.createmealparam.meal_content.hund_per_organic;
    this.editMealParams.meal_content.doesnt_contain_dairy_products = this.createmealparam.meal_content.doesnt_contain_dairy_products;
    this.editMealParams.meal_content.sugarfree = this.createmealparam.meal_content.sugarfree;
    this.editMealParams.meal_content.low_fat = this.createmealparam.meal_content.low_fat;
    this.editMealParams.meal_content.rich_in_protiens = this.createmealparam.meal_content.rich_in_protiens;
    this.editMealParams.meal_content.gluten = this.createmealparam.meal_content.gluten;
    this.editMealParams.meal_content.doesnt_contain_nuts = this.createmealparam.meal_content.doesnt_contain_nuts;
    this.editMealParams.meal_content.doesnt_contain_meat = this.createmealparam.meal_content.doesnt_contain_meat;
    this.editMealParams.meal_content.doesnt_contain_egg = this.createmealparam.meal_content.doesnt_contain_egg;
    this.editMealParams.meal_content.doesnt_contain_sellfish = this.createmealparam.meal_content.doesnt_contain_sellfish;
    this.editMealParams.meal_content.hund_per_halal = this.createmealparam.meal_content.hund_per_halal;
    this.editMealParams.meal_nutrition.calories = this.createmealparam.meal_nutrition.calories;
    this.editMealParams.meal_nutrition.fat = this.createmealparam.meal_nutrition.fat;
    this.editMealParams.meal_nutrition.carbohydrates = this.createmealparam.meal_nutrition.carbohydrates;
    this.editMealParams.meal_nutrition.proteins = this.createmealparam.meal_nutrition.proteins;
    this.editMealParams.user_id = this.createmealparam.user_id;
    this.editMealParams.lat = this.createmealparam.lat;
    this.editMealParams.lng = this.createmealparam.lng;

    this.home.getMealCategories(this.editMealParams).then((resp) => {
      this.utilsProvider.hideLoading();

      let data = resp;
      data = JSON.parse(data.data);

      if (data.error_code == 0) {
        this.utilsProvider.showToast(data.status);
        this.navCtrl.push('HomePage');
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


  mealImageClickFunc() {
    const options: CameraOptions = {
      quality: 80,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      debugger;

      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.createmealparam.meal_image = base64Image;

    }, (err) => {
      // Handle error
    });
  }


}
