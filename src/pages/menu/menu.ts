import { ResultPage } from './../result/result';
import { IdeasPage } from './../ideas/ideas';
import { ProfilePage } from './../profile/profile';
import { LogoutPage } from '../logout/logout';
import { TabsPage } from './../tabs/tabs';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, Nav } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import {LoginPage} from '../../pages/login/login';
/**
 * Generated class for the MenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */



 export interface PageInterface {
   title: string;
   pageName: string;
   tabComponent?: any;
   index?: number;
   icon: string;
 }

 @IonicPage()
 @Component({
   selector: 'page-menu',
   templateUrl: 'menu.html',
 })
 export class MenuPage {
   // Basic root for our content view
   rootPage = 'TabsPage';

   // Reference to the app's root nav
   @ViewChild(Nav) nav: Nav;

   pages: PageInterface[] = [
     { title: 'Home', pageName: 'TabsPage', tabComponent: 'IdeasPage', index: 0, icon: 'home' },
     { title: 'Profile', pageName: 'ProfilePage', icon: 'person' },
     {title: 'Logout',pageName:'LogoutPage', icon: 'log-out'}
     // { title: 'Special', pageName: 'SpecialPage', icon: 'shuffle' },
   ];

   constructor(public navCtrl: NavController,public auth: AuthProvider) {
     if(!(this.auth.getCurrentUser())){
       this.navCtrl.setRoot(LoginPage);
     }else{
       console.log((this.auth.getCurrentUser()).uid);
     }
   }

   openPage(page: PageInterface) {
     let params = {};

     // The index is equal to the order of our tabs inside tabs.ts
     if (page.index) {
       params = { tabIndex: page.index };
     }

     // The active child nav is our Tabs Navigation
     if (this.nav.getActiveChildNavs()[0] && page.index != undefined) {
       this.nav.getActiveChildNavs()[0].select(page.index);
     } else {
       // Tabs are not active, so reset the root page
       // In this case: moving to or from SpecialPage
       this.nav.setRoot(page.pageName, params);
     }
   }

   isActive(page: PageInterface) {
     // Again the Tabs Navigation
     let childNav = this.nav.getActiveChildNavs()[0];
     if (childNav) {
       if (childNav.getSelected() && childNav.getSelected().root === page.tabComponent) {
         return 'primary';
       }
       return;
     }

     // Fallback needed when there is no active childnav (tabs not active)
     if (this.nav.getActive() && this.nav.getActive().name === page.pageName) {
       return 'primary';
     }
     return;
   }

 }
