import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import {LoginPage} from '../../pages/login/login';
import {AppdataProvider} from '../../providers/appdata/appdata';
import { AlertController } from 'ionic-angular';

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
  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController,public auth: AuthProvider,public appdata:AppdataProvider) {
    if(!(this.auth.getCurrentUser())){
      this.navCtrl.setRoot(LoginPage);
    }else{
      console.log((this.auth.getCurrentUser()).uid);
    }

    this.ideas=this.appdata.getIdeas();
    console.log(this.ideas);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IdeasPage');
  }

  addIdea(){
    let alert = this.alertCtrl.create({
      title: 'Add Idea',
      message: 'Enter details for the idea you are adding',
      inputs: [
        {
          name: 'idea_title',
          placeholder: 'Idea Title'
        },
        {
          name: 'idea_description',
          placeholder: 'Idea Description'
        },
        {name:'image',
          type:'file'}
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Submit',
          handler: data => {
            let date = new Date();
            let month = String(date.getMonth()+1);

            let year = String(date.getFullYear());

            let date_added =  (month+year);
            this.appdata.addIdea(data,(this.auth.getCurrentUser()).uid,date_added)
            console.log('Saved clicked');
          }
        }
      ]
    });

    alert.present();

  }

  // toggle() {
  //  this.visible = !this.visible;
  // }

}
