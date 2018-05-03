import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import {LoginPage} from '../../pages/login/login';
/**
 * Generated class for the ResultPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-result',
  templateUrl: 'result.html',
})
export class ResultPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public auth:AuthProvider) {
    if(!(this.auth.getCurrentUser())){
      this.navCtrl.setRoot(LoginPage);
    }else{
      console.log((this.auth.getCurrentUser()).uid);
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResultPage');
  }

}
