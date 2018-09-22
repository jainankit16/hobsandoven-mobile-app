import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, Events } from 'ionic-angular';
import { ApputilsProvider } from '../../providers/apputils/apputils';
import { Home } from '../../providers';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker,
  LatLng
} from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation';
import { Storage } from '@ionic/storage';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Diagnostic } from '@ionic-native/diagnostic';





@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  @ViewChild('fileInput') fileInput;

  map: GoogleMap;


  private isFeed: boolean = true;
  private isMap: boolean = false;
  private isFilter: boolean = false;
  private isNotification: boolean = false;
  private noFeed: boolean = false;
  private isShowFewer: boolean = true;
  private isSelected: boolean = false;
  // private isDishCard: boolean = false;

  private cardObj: { isDishCard: boolean } = {
    isDishCard: false
  }
  private feedUrl: String = "assets/img/feed_selected.png";
  private mapUrl: String = "assets/img/map.png";
  private filterUrl: String = "assets/img/sort.png";
  private notificationUrl: String = "assets/img/notification.png";
  public feedData: any;
  public gridData: Array<Array<any>>;
  refreshEvent: any;
  private isLoader: boolean = false;
  private mealImage: any;
  private filterData: any;
  private filterGridData: any;
  private bigImage: any;
  private bigSize: any;
  private smallSize: any;

  cardData = {
    meal_id: "",
    image: "assets/img/man.png",
    meal_title: "",
    meal_category_id: "",
    no_of_servings: "",
    weight_per_serving: "",
    price_per_serving: "80",
    pickup_address: "",
    pickup_datetime: "",
    pickup_endtime: "",
    meal_description: "",
    meal_content: "",
    status: "",
    created_by: "",
    created_on: "",
    contains_whole_grains: "",
    partially_organic: "",
    hund_per_organic: "",
    doesnt_contain_dairy_products: "",
    sugarfree: "",
    low_fat: "",
    rich_in_protiens: "",
    gluten: "",
    doesnt_contain_nuts: "",
    doesnt_contain_meat: "",
    doesnt_contain_egg: "",
    doesnt_contain_sellfish: "",
    hund_per_halal: "",
    nutrition_id: "",
    calories: "",
    carbohydrates: "",
    proteins: ""

  };

  feedparams: { method: string, user_id: String, lat: String, lng: String } = {
    method: "get_all_meal",
    user_id: "",
    lat: '',
    lng: ''
  };

  filterparams: { method: string, user_id: String } = {
    method: "filter_list",
    user_id: ""
  };

  updateFiltersParams: { method: string, user_id: string, vis_list: string, kost_list: string } = {
    method: "updateFilterList",
    user_id: "",
    vis_list: "",
    kost_list: ""
  }


  private marker_inactive: any;
  private marker_active: any;
  private lastOpenMarkerIndex = undefined;
  private locations: any;




  constructor(private diagnostic: Diagnostic,
    private events: Events, private storage: Storage,
    private geolocation: Geolocation, public home: Home,
    public navCtrl: NavController, public navParams: NavParams,
    public menu: MenuController, public utilsProvider: ApputilsProvider,
    public camera: Camera, private ref: ChangeDetectorRef) {

    this.menu.swipeEnable(true);

    this.marker_inactive = {
      url: 'assets/img/mealdot.png',
      size: {
        width: 22,
        height: 22
      }
    };

    this.marker_active = {
      url: 'assets/img/mealdot_sel.png',
      size: {
        width: 35,
        height: 35
      }
    };

    this.locations = [
      ['Bondi Beach', 28.631055, 77.382026, 4],
      ['Coogee Beach', 28.632055, 77.383026, 5],
      ['Cronulla Beach', 28.634055, 77.385026, 3],
      ['Manly Beach', 28.636055, 77.387026, 2],
      ['Maroubra Beach', 28.638055, 77.389026, 1]
    ];



    // this.diagnostic.registerLocationStateChangeHandler((state) => {
    //   debugger;
    //   //alert("hi")
    // });


  }

  feedClick() {

    //disable card
    this.cardObj.isDishCard = false;

    this.isFeed = true;
    this.isMap = false;
    this.isFilter = false;
    this.isNotification = false;
    this.feedUrl = "assets/img/feed_selected.png";
    this.mapUrl = "assets/img/map.png";
    this.filterUrl = "assets/img/sort.png";
    this.notificationUrl = "assets/img/notification.png";

    //update feeds
    if (this.feedparams.lat != "") {
      this.getFeed("");
    } else {
      this.getUserLocation()
    }

  }

  mapClick() {
    this.isFeed = false;
    this.isMap = true;
    this.isFilter = false;
    this.isNotification = false;
    this.feedUrl = "assets/img/feed.png";
    this.mapUrl = "assets/img/map_selected.png";
    this.filterUrl = "assets/img/sort.png";
    this.notificationUrl = "assets/img/notification.png";

    //map loading start
    this.utilsProvider.showLoading();

    //get current location to set map target
    this.geolocation.getCurrentPosition({ timeout: 5000, enableHighAccuracy: true }).then((position) => {

      let yourPosition = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      //load map
      this.loadMap(yourPosition);

    }, (err) => {
      console.log(err);
      debugger
      this.utilsProvider.hideLoading();
      //alert('location error');
    });

  }

  filterClick() {

    //disable card
    this.cardObj.isDishCard = false;

    this.isFeed = false;
    this.isMap = false;
    this.isFilter = true;
    this.isNotification = false;
    this.feedUrl = "assets/img/feed.png";
    this.mapUrl = "assets/img/map.png";
    this.filterUrl = "assets/img/sort_selected.png";
    this.notificationUrl = "assets/img/notification.png";
    // this.utilsProvider.showToast('Filter coming soon....');

    //get filters
    this.getFilters();
  }

  notificationClick() {

    //disable card
    this.cardObj.isDishCard = false;

    this.isFeed = false;
    this.isMap = false;
    this.isFilter = false;
    this.isNotification = true;
    this.feedUrl = "assets/img/feed.png";
    this.mapUrl = "assets/img/map.png";
    this.filterUrl = "assets/img/sort.png";
    this.notificationUrl = "assets/img/notification_selected.png";
    // this.utilsProvider.showToast('Notification coming soon....');
  }

  createMeal() {


    // this.getMealPictureFromCamera();

    // this.navCtrl.push('CreatemealPage');
    // this.navCtrl.push('GooglesearchPage');
    // this.navCtrl.push('FeeddetailsPage');
    this.navCtrl.push('AcceptorderPage');
    // this.navCtrl.push('PickuporderPage');
    // this.navCtrl.push('ReceiptdetailPage');
    

  }

  ionViewDidEnter() {
    //set user data in side menu
    this.events.publish("updateProfileData");

    //update user data in side menu
    this.events.publish("updateProfileData");

    //get current location to set map target
    debugger;
    if (this.feedparams.lat != "") {
      this.feedClick();

    } else {
      this.getUserLocation()
    }
  }

  // ionViewDidLoad() {
  //   debugger;
  //   this.utilsProvider.showLoading();


  //   this.geolocation.getCurrentPosition({ timeout: 5000, enableHighAccuracy: true }).then((position) => {

  //     let yourPosition = {
  //       lat: position.coords.latitude,
  //       lng: position.coords.longitude
  //     };

  //     //get user data
  //     this.storage.get('user').then(user => {
  //       if (user != null) {
  //         this.feedparams.user_id = user.user_id;
  //         this.filterparams.user_id = user.user_id;
  //         this.updateFiltersParams.user_id = user.user_id;
  //         this.feedparams.lat = yourPosition.lat + "";
  //         this.feedparams.lng = yourPosition.lng + "";

  //         // call feed for first time
  //         this.feedClick();

  //       } else {

  //       }

  //     });
  //   }, (err) => {
  //     console.log(err);
  //     debugger
  //     this.utilsProvider.hideLoading();
  //     //alert('location error');
  //   });

  //   //update user data in side menu
  //   this.events.publish("updateProfileData");

  // }

  ionViewDidLoad() {


    // this.geolocation.getCurrentPosition().then(position => {
    //   // Change to actual current location
    //   return new LatLng(position.coords.latitude, position.coords.longitude);
    // }).then(latLng => {
    //   var currentPosition = latLng;
    //   alert("hi home ");

    //   //get user data
    //   // this.storage.get('user').then(user => {
    //   //   if (user != null) {
    //   //     this.feedparams.user_id = user.user_id;
    //   //     this.filterparams.user_id = user.user_id;
    //   //     this.updateFiltersParams.user_id = user.user_id;
    //   //     this.feedparams.lat = currentPosition.lat + "";
    //   //     this.feedparams.lng = currentPosition.lng + "";

    //   //     // call feed for first time
    //   //     this.feedClick();

    //   //   } else {

    //   //   }

    //   // });

    //   //call feeds here
    // });
  }

  loadMap(currentPosition) {

    let mapOptions: GoogleMapOptions = {
      camera: {
        target: currentPosition,
        zoom: 16,
        tilt: 30
      }
    };

    this.utilsProvider.hideLoading();
    this.map = GoogleMaps.create('map_canvas', mapOptions);
    this.map.setMyLocationEnabled(true);
    this.map.setMyLocationButtonEnabled(true);

    //map click event
    this.map.on(GoogleMapsEvent.MAP_CLICK).subscribe(() => {

      // close dish card if open
      if (this.cardObj.isDishCard) {
        this.cardObj.isDishCard = false;
      }
      this.ref.detectChanges();



      // change marker to inactive
      this.changeLastMarkerToInactive(this.lastOpenMarkerIndex);
    });

    this.addMarkers(this.locations);


  }

  addMarkers(places) {

    debugger;
    this.feedData.result.forEach((place, index) => {

      this.map.addMarker({
        icon: this.marker_inactive,

        position: {
          lat: place.lat,
          lng: place.lng
        }
      }).then(marker => {
        place.marker = marker;
        marker.on(GoogleMapsEvent.MARKER_CLICK)
          .subscribe(() => {

            //open dish card
            // this.utilsProvider.showToast("Coming Soon...");
            // setTimeout(() => {

            this.openDishCard(place);
            // }, 3000);
            // setTimeout(() => this.cardObj.isDishCard = true, 0);


            console.log("clicked on marker : ", marker);
            marker.setIcon(this.marker_active);
            if (this.lastOpenMarkerIndex !== undefined && this.lastOpenMarkerIndex != index) {
              this.changeLastMarkerToInactive(this.lastOpenMarkerIndex);
            }
            this.lastOpenMarkerIndex = index;
            console.log("--->active = " + this.lastOpenMarkerIndex);



          });
        this.locations[index] = marker;
      });
      // this.places.push(place);


    });
    // this.spinner.hide();

  }

  private openDishCard(feed) {
    // setTimeout(() => {
    debugger;
    this.cardData = feed;
    this.cardObj.isDishCard = true;
    this.ref.detectChanges();
    // }, 3000);

  }

  private changeLastMarkerToInactive(lastOpenMarkerIndex) {
    this.locations[lastOpenMarkerIndex].setIcon(this.marker_inactive);
  }

  onButtonClick() {
    // this.geolocation.getCurrentPosition().then((resp) => {
    //   // resp.coords.latitude
    //   // resp.coords.longitude
    //   alert(JSON.stringify(resp.coords.latitude+","+resp.coords.longitude));
    //   }).catch((error) => {
    //   alert('Error getting location'+JSON.stringify(error));
    //   });
    this.geolocation.getCurrentPosition().then((resp) => {
      var lat = resp.coords.latitude;
      var long = resp.coords.longitude;
      alert(lat + "," + long);
      console.log(lat + "," + long);
    }).catch((error) => {
      console.log('Error getting location', error);
    });

    let watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
      // data can be a set of coordinates, or an error (if an error occurred).
      // data.coords.latitude
      // data.coords.longitude
    });
  }

  showFewer() {
    if (this.isShowFewer) {
      this.isShowFewer = false;
    } else {
      this.isShowFewer = true;
    }
  }

  async filterClicked(event, filter) {

    if (event.target.classList.contains('unselected_filter')) {
      event.target.classList.remove('unselected_filter');
      event.target.classList.add('selected_filter');
    } else {
      event.target.classList.add('unselected_filter');
      event.target.classList.remove('selected_filter');
    }

    this.filterData.result.category.forEach(item => {
      if (filter.meal_category_id == item.meal_category_id) {

        if (event.target.classList.contains('unselected_filter')) {
          item.flag = "0";
        } else {
          item.flag = "1";
        }
        return;
      }
    });

  }

  moreFilterClicked(filter, event) {

    this.filterData.result.more.forEach(item => {
      if (filter.more_filter_id == item.more_filter_id) {

        if (!event.checked) {
          item.flag = "0";
        } else {
          item.flag = "1";
        }
        return;
      }
    });

  }

  async saveFilters() {
    this.utilsProvider.showLoading();
    this.updateFiltersParams.kost_list = "";
    this.updateFiltersParams.vis_list = "";

    //set all vis filters in update object
    this.filterData.result.category.forEach((item, index) => {
      if (item.flag == "1") {
        if (this.updateFiltersParams.vis_list != '') {
          this.updateFiltersParams.vis_list = this.updateFiltersParams.vis_list + "," + item.meal_category_id;
        } else {
          this.updateFiltersParams.vis_list = item.meal_category_id + "";
        }
      }
      //set all kost filters in update object
      if (index === this.filterData.result.category.length - 1) {
        this.filterData.result.more.forEach((item1, index1) => {
          if (item1.flag == "1") {
            if (this.updateFiltersParams.kost_list != '') {
              this.updateFiltersParams.kost_list = this.updateFiltersParams.kost_list + "," + item1.more_filter_id;

            } else {
              this.updateFiltersParams.kost_list = item1.more_filter_id + "";
            }
          }

          //updae filters to server
          if (index1 === this.filterData.result.more.length - 1) {
            this.updateFilters();

          }

        });
      }
      //
    });








  }

  updateFilters() {
    this.home.updatefilters(this.updateFiltersParams).then((resp) => {
      this.utilsProvider.hideLoading();
      // this.isLoader = false;
      let userData = resp;
      userData = JSON.parse(userData.data);

      if (userData.error_code == 0) {
        this.feedClick();
        this.utilsProvider.showToast(userData.status);

      } else if (userData.error_code == 1) {
        this.utilsProvider.showToast(userData.status);
      }

    }, (err) => {
      this.utilsProvider.hideLoading();
      // this.isLoader = false;
    });
  }

  doRefresh(refresher) {
    this.refreshEvent = refresher;
    console.log('Begin async operation', refresher);

    if (this.isFeed) {
      this.getFeed("refresh");
    } else if (this.isMap) {
      refresher.complete();
    } else if (this.isFilter) {
      refresher.complete();
    } else if (this.isNotification) {
      refresher.complete();
    } else {
      refresher.complete();
    }

    // refresher.complete();
  }

  getPicture() {
    if (Camera['installed']()) {
      this.camera.getPicture({
        destinationType: this.camera.DestinationType.DATA_URL,
        targetWidth: 96,
        targetHeight: 96
      }).then((data) => {
        //this.form.patchValue({ 'profilePic': 'data:image/jpg;base64,' + data });
      }, (err) => {
        alert('Unable to take photo');
      })
    } else {
      //this.fileInput.nativeElement.click();
    }
  }

  mealCardClick(event) {
    // event
    debugger;
    alert("Meal Click");
  }

  async getMealPictureFromCamera() {
    // const options: CameraOptions = {
    //   quality: 80,
    //   destinationType: this.camera.DestinationType.DATA_URL,
    //   encodingType: this.camera.EncodingType.JPEG,
    //   mediaType: this.camera.MediaType.PICTURE,
    //   correctOrientation: true,
    // }

    // this.camera.getPicture(options).then((imageData) => {
    //   let base64Image = 'data:image/jpeg;base64,' + imageData;
    //   this.mealImage = base64Image;

    //   //navigate to create meal page
    //   this.navCtrl.push('CreatemealPage', { mealImage: this.mealImage });

    // }, (err) => {
    //   // Handle error
    // });
    try {
      const options: CameraOptions = {
        quality: 80,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        correctOrientation: true,
      }
      const result = await this.camera.getPicture(options);
      this.bigImage = `data:image/png;base64,${result}`;
      this.bigSize = this.getImageSize(this.bigImage);
      if ((+this.bigSize) > 50) {
        this.resize();
      } else {
        this.mealImage = this.bigImage;
        //   //navigate to create meal page
        this.navCtrl.push('CreatemealPage', { mealImage: this.mealImage });
      }
    }
    catch (err) {
      console.error(err);
    }
  }

  getImageSize(data_url) {
    var head = 'data:image/png;base64,';
    return ((data_url.length - head.length) * 3 / 4 / (1024)).toFixed(4);
  }

  resize() {
    this.generateFromImage(this.bigImage, 400, 400, 0.9, data => {
      this.smallSize = this.getImageSize(data);
      if (+this.smallSize > 50) {
        this.generateFromImage(this.bigImage, 300, 300, 0.7, data => {
          this.smallSize = this.getImageSize(data);
          this.mealImage = data;
          //   //navigate to create meal page
          this.navCtrl.push('CreatemealPage', { mealImage: this.mealImage });
        });

      } else {
        this.mealImage = data;
        //   //navigate to create meal page
        this.navCtrl.push('CreatemealPage', { mealImage: this.mealImage });
      }
    });
  }

  generateFromImage(img, MAX_WIDTH: number = 700, MAX_HEIGHT: number = 700, quality: number = 1, callback) {
    var canvas: any = document.createElement("canvas");
    var image = new Image();
    image.onload = () => {
      var width = image.width;
      var height = image.height;

      if (width > height) {
        if (width > MAX_WIDTH) {
          height *= MAX_WIDTH / width;
          width = MAX_WIDTH;
        }
      } else {
        if (height > MAX_HEIGHT) {
          width *= MAX_HEIGHT / height;
          height = MAX_HEIGHT;
        }
      }
      canvas.width = width;
      canvas.height = height;
      var ctx = canvas.getContext("2d");

      ctx.drawImage(image, 0, 0, width, height);

      // IMPORTANT: 'jpeg' NOT 'jpg'
      var dataUrl = canvas.toDataURL('image/jpeg', quality);

      callback(dataUrl)
    }
    image.src = img;
  }


  getFeed(type: string) {
    debugger;
    this.utilsProvider.showLoading();
    // this.isLoader = true;
    this.isFeed = false;
    if (type != "refresh") {
      // this.utilsProvider.showLoading();
    }

    // alert("Get Feeds params:- " + JSON.stringify(this.feedparams));
    this.home.getfeed(this.feedparams).then((resp) => {
      this.utilsProvider.hideLoading();
      // this.isLoader = false;
      this.isFeed = true;
      // if(type =="refresh"){
      //   this.refreshEvent.complete();

      // }
      // alert("Feed success response:-"+JSON.stringify(resp));
      this.feedData = resp;
      this.feedData = JSON.parse(this.feedData.data);
      if (this.feedData.error_code == 0) {
        if (this.feedData.result.length > 0) {
          this.noFeed = false;

          //set data according to grid
          let rowNum = 0; //counter to iterate over the rows in the grid

          this.gridData = Array(Math.ceil(this.feedData.result.length / 2)); //MATHS!


          for (let i = 0; i < this.feedData.result.length; i += 2) { //iterate images

            if (i == this.feedData.result.length - 1) {
              this.gridData[rowNum] = Array(1); //declare one element per row

            } else {
              this.gridData[rowNum] = Array(2); //declare two elements per row

            }


            if (this.feedData.result[i]) { //check file URI exists
              this.gridData[rowNum][0] = this.feedData.result[i] //insert image
            }

            //check for last item not availble in case of odd items
            // alert(this.feedData.result[i+1] +":" +i);

            if (this.feedData.result[i + 1] != undefined) {
              if (this.feedData.result[i + 1]) { //repeat for the second image
                this.gridData[rowNum][1] = this.feedData.result[i + 1]
              }
            }

            rowNum++; //go on to the next row
          }


        } else {
          this.gridData = [];
          this.noFeed = true;
        }

      } else if (this.feedData.error_code == 1) {
        this.utilsProvider.showToast(this.feedData.status);
      }




    }, (err) => {
      this.utilsProvider.hideLoading();
      // alert("Feed API error:-"+JSON.stringify(err));
      // this.isLoader = false;
      this.isFeed = true;
    });
    //////////////////////////////

  }

  getFilters() {
    this.utilsProvider.showLoading();
    // this.isLoader = true;
    debugger;
    this.home.getfilters(this.filterparams).then((resp) => {
      this.utilsProvider.hideLoading();
      this.filterData = {};
      this.filterData = resp;
      this.filterData = JSON.parse(this.filterData.data);

      let rowNum = 0; //counter to iterate over the rows in the grid

      this.filterGridData = {};
      this.filterGridData = Array(Math.ceil(this.filterData.result.category.length / 2)); //MATHS!


      for (let i = 0; i < this.filterData.result.category.length; i += 2) { //iterate images

        if (i == this.filterData.result.category.length - 1) {
          this.filterGridData[rowNum] = Array(1); //declare one element per row

        } else {
          this.filterGridData[rowNum] = Array(2); //declare two elements per row

        }


        if (this.filterData.result.category[i]) { //check file URI exists
          this.filterGridData[rowNum][0] = this.filterData.result.category[i] //insert image
        }

        //check for last item not availble in case of odd items
        // alert(this.feedData.result[i+1] +":" +i);

        if (this.filterData.result.category[i + 1] != undefined) {
          if (this.filterData.result.category[i + 1]) { //repeat for the second image
            this.filterGridData[rowNum][1] = this.filterData.result.category[i + 1]
          }
        }

        rowNum++; //go on to the next row
      }

      if (this.filterData.error_code == 0) {

      } else if (this.filterData.error_code == 1) {
        this.utilsProvider.showToast(this.filterData.error_string);
      }


    }, (err) => {
      this.utilsProvider.hideLoading();
      // this.isLoader = false;
      this.isFeed = true;
    });
  }

  selectAllFilters() {
    // for (let i = 0; i < this.filterData.result.category.length; i++) {
    //   this.filterData.result.category[i].flag = "1";
    // }
    this.filterData.result.category.forEach(item => {
      item.flag = "1";
    });


  }

  getUserLocation() {
    this.utilsProvider.showLoading();
    let options = { enableHighAccuracy: true };

    this.geolocation.getCurrentPosition(options).then((position) => {
      return new LatLng(position.coords.latitude, position.coords.longitude);
    }).then(latLng => {
      var yourPosition = latLng;

      // alert("My Position:- " + JSON.stringify(yourPosition));

      //get user data
      this.storage.get('user').then(user => {
        if (user != null) {
          this.feedparams.user_id = user.user_id;
          this.filterparams.user_id = user.user_id;
          this.updateFiltersParams.user_id = user.user_id;
          this.feedparams.lat = yourPosition.lat + "";
          this.feedparams.lng = yourPosition.lng + "";

          // call feed for first time
          this.feedClick();

        } else {

        }

      });
    }, (err) => {
      console.log(err);
      debugger;
      this.utilsProvider.hideLoading();
      //alert('location error');
    });
  }

  feedClickFunc(feed) {
    // this.utilsProvider.showToast("Coming Soon...");
    this.navCtrl.push('FeeddetailsPage', { feeddata: feed });
  }

}
