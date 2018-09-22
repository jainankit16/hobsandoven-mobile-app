import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-addmoreinfo',
  templateUrl: 'addmoreinfo.html',
})
export class AddmoreinfoPage {


  meal_content: {
    contains_whole_grains: string,
    partially_organic: string,
    hund_per_organic: string,
    doesnt_contain_dairy_products: string,
    sugarfree: string,
    low_fat: string,
    rich_in_protiens: string,
    gluten: string,
    doesnt_contain_nuts: string,
    doesnt_contain_meat: string,
    doesnt_contain_egg: string,
    doesnt_contain_sellfish: string,
    hund_per_halal: string
  } = {
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

    };


  private mealContentArr: Array<string> = [];
  private mealContentString: string = "";


  constructor(private events: Events, public navCtrl: NavController, public navParams: NavParams) {

    //get selected meal content
    debugger;
    if (this.navParams.get("mealContent")) {
      let data = this.navParams.get("mealContent");
      this.meal_content.contains_whole_grains = data.contains_whole_grains;
      this.meal_content.partially_organic = data.partially_organic;
      this.meal_content.hund_per_organic = data.hund_per_organic;
      this.meal_content.doesnt_contain_dairy_products = data.doesnt_contain_dairy_products;
      this.meal_content.sugarfree = data.sugarfree;
      this.meal_content.low_fat = data.low_fat;
      this.meal_content.rich_in_protiens = data.rich_in_protiens;
      this.meal_content.gluten = data.gluten;
      this.meal_content.doesnt_contain_nuts = data.doesnt_contain_nuts;
      this.meal_content.doesnt_contain_meat = data.doesnt_contain_meat;
      this.meal_content.doesnt_contain_egg = data.doesnt_contain_egg;
      this.meal_content.doesnt_contain_sellfish = data.doesnt_contain_sellfish;
      this.meal_content.hund_per_halal = data.hund_per_halal;

      //create string to show if we are coming from edit
      var keys = Object.keys(this.meal_content)
      keys.forEach(element => {
        if (this.meal_content[element] == "true") {
          if (element == "contains_whole_grains") {
            this.updateStringContent(true, "Indeholder fuldkorn");
          } else if (element == "partially_organic") {
            this.updateStringContent(true, "Delvist økologisk");
          } else if (element == "hund_per_organic") {
            this.updateStringContent(true, "100% økologisk");
          } else if (element == "doesnt_contain_dairy_products") {
            this.updateStringContent(true, "Indeholder ikke mejeriprodukter");
          } else if (element == "sugarfree") {
            this.updateStringContent(true, "Sukkerfrit");
          } else if (element == "low_fat") {
            this.updateStringContent(true, "Fedtfattigt");
          } else if (element == "rich_in_protiens") {
            this.updateStringContent(true, "Rig på proteiner");
          } else if (element == "gluten") {
            this.updateStringContent(true, "Glutenfri");
          } else if (element == "doesnt_contain_nuts") {
            this.updateStringContent(true, "Indeholder ikke nødder");
          } else if (element == "doesnt_contain_meat") {
            this.updateStringContent(true, "Indeholder ikke kød");
          } else if (element == "doesnt_contain_egg") {
            this.updateStringContent(true, "Indeholder ikke æg");
          } else if (element == "doesnt_contain_sellfish") {
            this.updateStringContent(true, "Indeholder ikke skalddyr");
          } else if (element == "hund_per_halal") {
            this.updateStringContent(true, "100% halal");
          }
        }
      });
    }
  }

  onMoreSelected(event, id, name) {
    debugger;
    switch (id) {
      case 1:
        if (event.checked) {
          this.meal_content.contains_whole_grains = "true";
          this.updateStringContent(true, name);
        } else {
          this.meal_content.contains_whole_grains = "false";
          this.updateStringContent(false, name);
        }
        //

        break;
      case 2:
        if (event.checked) {
          this.meal_content.partially_organic = "true";
          this.updateStringContent(true, name);
        } else {
          this.meal_content.partially_organic = "false";
          this.updateStringContent(false, name);
        }
        break;
      case 3:
        if (event.checked) {
          this.meal_content.hund_per_organic = "true";
          this.updateStringContent(true, name);
        } else {
          this.meal_content.hund_per_organic = "false";
          this.updateStringContent(false, name);
        }
        break;
      case 4:
        if (event.checked) {
          this.meal_content.doesnt_contain_dairy_products = "true";
          this.updateStringContent(true, name);
        } else {
          this.meal_content.doesnt_contain_dairy_products = "false";
          this.updateStringContent(false, name);
        }
        break;
      case 5:
        if (event.checked) {
          this.meal_content.sugarfree = "true";
          this.updateStringContent(true, name);
        } else {
          this.meal_content.sugarfree = "false";
          this.updateStringContent(false, name);
        }
        break;
      case 6:
        if (event.checked) {
          this.meal_content.low_fat = "true";
          this.updateStringContent(true, name);
        } else {
          this.meal_content.low_fat = "false";
          this.updateStringContent(false, name);
        }
        break;
      case 7:
        if (event.checked) {
          this.meal_content.rich_in_protiens = "true";
          this.updateStringContent(true, name);
        } else {
          this.meal_content.rich_in_protiens = "false";
          this.updateStringContent(false, name);
        }
        break;
      case 8:
        if (event.checked) {
          this.meal_content.gluten = "true";
          this.updateStringContent(true, name);
        } else {
          this.meal_content.gluten = "false";
          this.updateStringContent(false, name);
        }
        break;
      case 9:
        if (event.checked) {
          this.meal_content.doesnt_contain_nuts = "true";
          this.updateStringContent(true, name);
        } else {
          this.meal_content.doesnt_contain_nuts = "false";
          this.updateStringContent(false, name);
        }
        break;
      case 10:
        if (event.checked) {
          this.meal_content.doesnt_contain_meat = "true";
          this.updateStringContent(true, name);
        } else {
          this.meal_content.doesnt_contain_meat = "false";
          this.updateStringContent(false, name);
        }
        break;
      case 11:
        if (event.checked) {
          this.meal_content.doesnt_contain_egg = "true";
          this.updateStringContent(true, name);
        } else {
          this.meal_content.doesnt_contain_egg = "false";
          this.updateStringContent(false, name);
        }
        break;
      case 12:
        if (event.checked) {
          this.meal_content.doesnt_contain_sellfish = "true";
          this.updateStringContent(true, name);
        } else {
          this.meal_content.doesnt_contain_sellfish = "false";
          this.updateStringContent(false, name);
        }
        break;
      case 13:
        if (event.checked) {
          this.meal_content.hund_per_halal = "true";
          this.updateStringContent(true, name);
        } else {
          this.meal_content.hund_per_halal = "false";
          this.updateStringContent(false, name);
        }
        break;

      default:
        break;
    }
  }

  submitClickFunc() {
    // Under some function
    debugger;

    //iterate selected meal content array to create a common string to show user
    this.mealContentArr.forEach(element => {

      if (this.mealContentString == "") {
        this.mealContentString = element;
      } else {
        this.mealContentString = this.mealContentString + ", " + element;

      }
    });
    this.events.publish('mealContent', this.meal_content, this.mealContentString);
    this.navCtrl.pop();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddmoreinfoPage');
  }

  updateStringContent(value, name) {
    if (value) {
      const index: number = this.mealContentArr.indexOf(name);
      if (index == -1) {
        this.mealContentArr.push(name);
      }
    } else {
      const index: number = this.mealContentArr.indexOf(name);
      if (index !== -1) {
        this.mealContentArr.splice(index, 1);
      }
    }

  }

}
