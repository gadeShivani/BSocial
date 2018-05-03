import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {LoginPage} from '../../pages/login/login';
import { AuthProvider } from '../../providers/auth/auth';

/**
 * Generated class for the LogoutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-logout',
  templateUrl: 'logout.html',
})
export class LogoutPage {
  constructor(public navCtrl: NavController, public navParams: NavParams,public auth:AuthProvider) {
  }

  ionViewDidLoad() {
    if(!(this.auth.getCurrentUser())){
      this.navCtrl.setRoot(LoginPage);
    }else{
    setTimeout(() =>
    {    this.auth.signOut();
        this.navCtrl.setRoot(LoginPage);
    },
    2000);
  }
}

}
