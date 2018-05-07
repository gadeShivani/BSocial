import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import  {AppdataProvider} from '../../providers/appdata/appdata';
import { AuthProvider } from '../../providers/auth/auth';
import {LoginPage} from '../../pages/login/login';
import {AddideaPage} from '../../pages/addidea/addidea';
import { AngularFireStorage } from 'angularfire2/storage';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
/**
 * Generated class for the AddideaImagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-addidea-image',
  templateUrl: 'addidea-image.html',
})
export class AddideaImagePage {
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  durl:string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public auth: AuthProvider,private storage: AngularFireStorage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddideaImagePage');
  }
  uploadImage(event){

    const file = event.target.files[0];
    const date=new Date();
    // const timestamp = Math.floor(date/1000);
    const filePath = 'ideaImages/' +  String(date) + (this.auth.getCurrentUser()).uid;
    const task = this.storage.upload(filePath, file);
    // observe percentage changes
     this.uploadPercent = task.percentageChanges();
    // get notified when the download URL is available
     this.downloadURL = task.downloadURL();
    }
  nextstep(){
    const params = {'durl':this.downloadURL};
    this.navCtrl.push('AddideaPage',params);
  }


}
