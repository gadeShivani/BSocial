import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController} from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import {UserdataProvider} from '../../providers/userdata/userdata';
import { AngularFireStorage } from 'angularfire2/storage';
import { Observable } from 'rxjs/Observable';
import {LoginPage} from '../../pages/login/login';
import 'rxjs/add/operator/map';
/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  users:any;
  uploadPercent: Observable<number>;
  downloadURL: any;
  constructor(public navCtrl: NavController, public alertCtrl: AlertController,public navParams: NavParams,public auth:AuthProvider, public userdata: UserdataProvider, private storage: AngularFireStorage) {
    if(!(this.auth.getCurrentUser())){
      this.navCtrl.setRoot(LoginPage);
    }else{
      this.users = this.userdata.getUser();
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }
  uploadImage(event){

    const file = event.target.files[0];
    const date=new Date();
    // const timestamp = Math.floor(date/1000);
    const filePath = 'userImages/' + (this.auth.getCurrentUser()).uid;
    const task = this.storage.upload(filePath, file);
    // observe percentage changes
     this.uploadPercent = task.percentageChanges();
    // get notified when the download URL is available
     this.downloadURL = task.downloadURL();
    }
    updatethisUser(user){
      let imageurl='';
      if(this.downloadURL){
        imageurl = this.downloadURL.value;
      }
      else{
        imageurl = user.image;
      }
      this.userdata.updateUser(user,imageurl);
      let alert = this.alertCtrl.create({
        title: 'Profile Updated',
        subTitle: 'Your profile has been updated',
        buttons: ['Dismiss']
      });
      alert.present();
    }

}
