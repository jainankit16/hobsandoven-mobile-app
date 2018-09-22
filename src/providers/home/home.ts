import 'rxjs/add/operator/toPromise';

import { Injectable } from '@angular/core';

import { Api } from '../api/api';
/**
 * A simple settings/config class for storing key/value pairs with persistence.
 */
@Injectable()
export class Home {

  _feed: any;

  constructor(public api: Api) { }

  /**
* get feeds for the user in his area
*/
  getfeed(accountInfo: any) {
    let seq = this.api.post('', accountInfo, {})
      .then(data => {

        return data;

      })
      .catch(error => {
        return error

      });
    return seq;
  }

  getfilters(accountInfo: any) {
    let seq = this.api.post('', accountInfo, {})
      .then(data => {

        return data;

      })
      .catch(error => {
        return error

      });
    return seq;
  }

  updatefilters(accountInfo: any) {
    let seq = this.api.post('', accountInfo, {})
      .then(data => {

        return data;

      })
      .catch(error => {
        return error

      });
    return seq;
  }

  updateProfile(accountInfo: any) {
    let seq = this.api.post('', accountInfo, {})
      .then(data => {

        return data;

      })
      .catch(error => {
        return error

      });
    return seq;
  }

  getMealCategories(accountInfo: any) {
    let seq = this.api.post('', accountInfo, {})
      .then(data => {

        return data;

      })
      .catch(error => {
        return error

      });
    return seq;
  }

  getMyMealMeals(accountInfo: any) {
    let seq = this.api.post('', accountInfo, {})
      .then(data => {

        return data;

      })
      .catch(error => {
        return error

      });
    return seq;
  }

  creatMeal(accountInfo: any) {
    let seq = this.api.post('', accountInfo, {})
      .then(data => {

        return data;

      })
      .catch(error => {
        return error

      });
    return seq;
  }

  _feedResp(resp) {
    this._feed = resp.user;
  }
}
