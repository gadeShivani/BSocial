import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import {LoginPage} from '../../pages/login/login';
import {AppdataProvider} from '../../providers/appdata/appdata';
import { AlertController } from 'ionic-angular';
import {AddideaImagePage} from '../../pages/addidea-image/addidea-image';
import { SocialSharing } from '@ionic-native/social-sharing';

/**
 * Generated class for the IdeasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ideas',
  templateUrl: 'ideas.html',
})
export class IdeasPage {
  ideas:any;
  constructor(public navCtrl: NavController,public socialSharing: SocialSharing, public navParams: NavParams, public alertCtrl: AlertController,public auth: AuthProvider,public appdata:AppdataProvider) {
    if(!(this.auth.getCurrentUser())){
      this.navCtrl.setRoot(LoginPage);
    }else{
      this.ideas=this.appdata.getIdeas();
    }

  }

  ionViewDidLoad() {
  }

  addIdea(){
    let date = new Date();
    let month = date.getMonth()+1;

    let year = date.getFullYear();

    let date_added =  (month*10000+year);
    // if(this.appdata.checkIfPreviously((this.auth.getCurrentUser()).uid,date_added) == true){
      this.navCtrl.push('AddideaImagePage');
    // }
    // else
    // {
    //   let alert = this.alertCtrl.create({
    //     title: 'Idea Already Submitted',
    //     subTitle: 'You have already submitted an idea this month, please wait untill next month.',
    //     buttons: ['See other Ideas!']
    //   });
    //   alert.present();
    // }

  }
  isLiked(likes){
    return likes.includes((this.auth.getCurrentUser()).uid)
  }
  shareThis(idea){
    var msg = "Checkout this idea on BSocial App!!"+ idea.idea_title +idea.idea_description;
    this.socialSharing.share(msg, null, null, null);
    // this.socialSharing.shareViaEmail('Body', 'Subject', ['recipient@example.org']).then(() => {
    //   // Success!
    // }).catch(() => {
    // // Error!
    // });
  }

}
