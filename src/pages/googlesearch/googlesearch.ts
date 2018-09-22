import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker
} from '@ionic-native/google-maps';

declare var google: any


@IonicPage()
@Component({
  selector: 'page-googlesearch',
  templateUrl: 'googlesearch.html',
})
export class GooglesearchPage {

  private GoogleAutocomplete: any;
  private autocomplete: any;
  private autocompleteItems: any;

  searchInput;
  searchResults: any = [];


  constructor(private events:Events, public navCtrl: NavController, public navParams: NavParams) {


    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
    this.autocomplete = { input: '' };
    this.autocompleteItems = [];
  }

  updateSearchResults() {


    if (this.autocomplete.input == '') {
      this.autocompleteItems = [];
      return;
    }
    this.GoogleAutocomplete.getPlacePredictions({ input: this.autocomplete.input },
      (predictions, status) => {
        this.autocompleteItems = [];
        predictions.forEach((prediction) => {
          this.autocompleteItems.push(prediction);
        });
      });
  }

  selectSearchResult(selectedAddress){
    this.events.publish('selectedAddress', selectedAddress);
    this.navCtrl.pop();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GooglesearchPage');
  }

  loadSearch() {
    debugger;
    let displaySuggestions = (predictions, status) => {
      if (status != google.maps.places.PlacesServiceStatus.OK) {
        return;
      }
      console.log(predictions);
      this.searchResults = predictions;
    };
    var service = new google.maps.places.AutocompleteService();
    service.getQueryPredictions({ input: this.searchInput }, displaySuggestions);
  }

  backClick(){
    this.navCtrl.pop();
  }

}
