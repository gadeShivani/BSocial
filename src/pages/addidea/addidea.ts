import { Component } from '@angular/core';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import {AppdataProvider} from '../../providers/appdata/appdata';
import { AuthProvider } from '../../providers/auth/auth';
import {LoginPage} from '../../pages/login/login';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
/**
 * Generated class for the AddideaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-addidea',
  templateUrl: 'addidea.html',
})
export class AddideaPage {
  private idea : FormGroup;
  public durl:any;
  public finalImage:string;
  constructor(public navCtrl: NavController,public alertCtrl: AlertController, public navParams: NavParams,public appdata:AppdataProvider, private formBuilder: FormBuilder,public auth: AuthProvider) {
    if(!(this.auth.getCurrentUser())){
      this.navCtrl.setRoot(LoginPage);
    }else{
      this.durl = this.navParams.get('durl');
      if(this.durl.value){
        this.idea = this.formBuilder.group({
        idea_title: ['', Validators.required],
        idea_description: ['',Validators.required],
        image_url:[this.durl.value]
      });
      }

    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddideaPage');
  }

  addIdea()
  {
    let date = new Date();
    let month = String(date.getMonth()+1);

    let year = String(date.getFullYear());

    let date_added =  (month+year);
    this.appdata.addIdea(this.idea,(this.auth.getCurrentUser()).uid,date_added);

    let alert = this.alertCtrl.create({
      title: 'Idea Submitted',
      subTitle: 'Your idea has been submitted successfully. HAPPY VOTING! Check back at the end of the month for results.',
      buttons: ['See other Ideas!']
    });
    alert.present();
  }
}
