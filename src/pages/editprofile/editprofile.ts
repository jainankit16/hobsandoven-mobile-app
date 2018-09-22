import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ApputilsProvider } from '../../providers/apputils/apputils';
import { Home } from '../../providers';
import { ActionSheetController } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-editprofile',
  templateUrl: 'editprofile.html',
})
export class EditprofilePage {

  private userProfileData: any;
  private imageProfile: File;
  private imageCertificate: File;

  private bigImage: any;
  private bigSize: any;
  private smallSize: any;

  userData: {
    email: String,
    name: String, user_id: String, profile_picture: String,
    phone: String, address: String
  } = {
      email: "",
      name: "",
      user_id: "",
      profile_picture: "assets/img/user.png",
      phone: "",
      address: ""
    };

  editProfileParams: {
    method: String, email: String,
    name: String, user_id: String, profile_picture: String,
    phone: String, address: String, certificate: String
  } = {
      method: "edit_profile",
      email: "",
      name: "",
      user_id: "",
      profile_picture: "assets/img/user.png",
      phone: "",
      address: "",
      certificate: ""
    }

  private isCertificateAdded: boolean = false;
  constructor(public event: Events, public actionSheetCtrl: ActionSheetController, public home: Home, public utilsProvider: ApputilsProvider, private camera: Camera, private storage: Storage, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditprofilePage');
  }

  ngOnInit() {
    debugger;
    this.storage.get('user').then(user => {
      if (user != null) {

        //set used data in side menu
        this.editProfileParams.email = user.email;
        this.editProfileParams.name = user.name;
        if (user.profile_picture != "" && user.profile_picture != undefined) {
          this.editProfileParams.profile_picture = user.profile_picture;
        }
        this.editProfileParams.user_id = user.user_id;
        if (user.address != undefined && user.address != "") {
          this.editProfileParams.address = user.address;
        }
        if (user.phone != undefined && user.phone != "") {
          this.editProfileParams.phone = user.phone;
        }

      } else {

      }

    });
  }

  async getProfilePictureFromCamera() {
    // const options: CameraOptions = {
    //   quality: 80,
    //   destinationType: this.camera.DestinationType.DATA_URL,
    //   encodingType: this.camera.EncodingType.JPEG,
    //   mediaType: this.camera.MediaType.PICTURE,
    //   correctOrientation: true,
    // }

    // this.camera.getPicture(options).then((imageData) => {
    //   // imageData is either a base64 encoded string or a file URI
    //   // If it's base64 (DATA_URL):
    //   debugger;

    //   this.imageProfile = imageData;

    //   let base64Image = 'data:image/jpeg;base64,' + imageData;
    //   this.editProfileParams.profile_picture = base64Image;
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
        this.resize(0);
      } else {
        this.editProfileParams.profile_picture = this.bigImage;
        //   //navigate to create meal page
      }
    }
    catch (err) {
      console.error(err);
    }
  }

  async getProfilePictureFromGallery() {

    // const options: CameraOptions = {
    //   quality: 80,
    //   destinationType: this.camera.DestinationType.DATA_URL,
    //   encodingType: this.camera.EncodingType.JPEG,
    //   mediaType: this.camera.MediaType.PICTURE,
    //   sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
    //   correctOrientation: true,
    // }

    // this.camera.getPicture(options).then((imageData) => {
    //   // imageData is either a base64 encoded string or a file URI
    //   // If it's base64:
    //   let base64Image = 'data:image/jpeg;base64,' + imageData;

    //   this.editProfileParams.profile_picture = base64Image;
    // }, (err) => {
    //   // Handle error
    // })
    try {
      const options: CameraOptions = {
        quality: 80,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
        correctOrientation: true,
      }
      const result = await this.camera.getPicture(options);
      this.bigImage = `data:image/png;base64,${result}`;
      this.bigSize = this.getImageSize(this.bigImage);
      if ((+this.bigSize) > 50) {
        this.resize(0);
      } else {
        this.editProfileParams.profile_picture = this.bigImage;
        //   //navigate to create meal page
      }
    }
    catch (err) {
      console.error(err);
    }
  }

  async getCertificatePictureFromCamera() {


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
        this.resize(1);
      } else {
        this.editProfileParams.certificate = this.bigImage;
        this.isCertificateAdded = true;
        //   //navigate to create meal page
      }
    }
    catch (err) {
      console.error(err);
    }
  }

  async getCertificatePictureFromGallery() {

    // const options: CameraOptions = {
    //   quality: 80,
    //   destinationType: this.camera.DestinationType.DATA_URL,
    //   encodingType: this.camera.EncodingType.JPEG,
    //   mediaType: this.camera.MediaType.PICTURE,
    //   sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
    //   correctOrientation: true,
    // }

    // this.camera.getPicture(options).then((imageData) => {
    //   // imageData is either a base64 encoded string or a file URI
    //   // If it's base64:
    //   let base64Image = 'data:image/jpeg;base64,' + imageData;
    //   this.editProfileParams.certificate = base64Image;
    //   this.isCertificateAdded = true;
    // }, (err) => {
    //   // Handle error
    // })
    try {
      const options: CameraOptions = {
        quality: 80,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
        correctOrientation: true,
      }
      const result = await this.camera.getPicture(options);
      this.bigImage = `data:image/png;base64,${result}`;
      this.bigSize = this.getImageSize(this.bigImage);
      if ((+this.bigSize) > 50) {
        this.resize(1);
      } else {
        this.editProfileParams.certificate = this.bigImage;
        this.isCertificateAdded = true;
        //   //navigate to create meal page
      }
    }
    catch (err) {
      console.error(err);
    }
  }

  openActionSheet(type) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select An Option',
      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text: 'Camera',
          role: 'destructive',
          handler: () => {
            console.log('Camera clicked');

            if (type == "1") {
              this.getProfilePictureFromCamera();
            } else if (type == "2") {
              this.getCertificatePictureFromCamera();
            }
          }
        },
        {
          text: 'Gallery',
          handler: () => {
            console.log('Gallery clicked');
            if (type == "1") {
              this.getProfilePictureFromGallery();
            } else if (type == "2") {
              this.getCertificatePictureFromGallery();
            }
          }
        },
        {
          text: 'Cancel',
          role: 'cancel', // will always sort to be on the bottom
          handler: () => {
            console.log('Cancel clicked');

          }
        }
      ]
    });
    actionSheet.present();
  }

  saveProfile() {
    this.utilsProvider.showLoading();
    this.home.updateProfile(this.editProfileParams).then((resp) => {
      this.utilsProvider.hideLoading();

      this.userProfileData = resp;
      this.userProfileData = JSON.parse(this.userProfileData.data);

      if (this.userProfileData.error_code == 0) {
        this.storage.set('user', this.userProfileData.result);
        this.utilsProvider.showToast(this.userProfileData.status);

      } else if (this.userProfileData.error_code == 1) {
        this.utilsProvider.showToast(this.userProfileData.error_string);
      }

    }, (err) => {
      this.utilsProvider.hideLoading();
    });
  }

  ionViewWillLeave() {
    this.event.publish("updateProfileData");
  }

  getImageSize(data_url) {
    var head = 'data:image/png;base64,';
    return ((data_url.length - head.length) * 3 / 4 / (1024)).toFixed(4);
  }

  resize(value) {
    this.generateFromImage(this.bigImage, 400, 400, 0.9, data => {
      this.smallSize = this.getImageSize(data);
      if (+this.smallSize > 50) {
        this.generateFromImage(this.bigImage, 300, 300, 0.7, data => {
          this.smallSize = this.getImageSize(data);
          if (value == 1) {
            this.editProfileParams.certificate = data;
            this.isCertificateAdded = true;
          } else {
            this.editProfileParams.profile_picture = data;
          }

        });

      } else {
        if (value == 1) {
          this.editProfileParams.certificate = data;
          this.isCertificateAdded = true;
        } else {
          this.editProfileParams.profile_picture = data;
        }

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



}
