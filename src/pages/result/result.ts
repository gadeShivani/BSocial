import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import {ResultdataProvider} from '../../providers/resultdata/resultdata';
import { AlertController } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';
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
    results:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public auth:AuthProvider, public resultdata: ResultdataProvider, public socialSharing: SocialSharing) {
    if(!(this.auth.getCurrentUser())){
      this.navCtrl.setRoot(LoginPage);
    }else{
        this.results=this.resultdata.getResults();
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResultPage');
  }
  isLiked(likes){
    return likes.includes((this.auth.getCurrentUser()).uid)
  }
  shareThis(result){
    var msg = "Checkout this idea on BSocial App!!"+ result.idea_title +result.idea_description;
    this.socialSharing.share(msg, null, null, null);
    // this.socialSharing.shareViaEmail('Body', 'Subject', ['recipient@example.org']).then(() => {
    //   // Success!
    // }).catch(() => {
    // // Error!
    // });
  }

}
