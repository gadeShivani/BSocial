import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import {firebaseConfig} from '../config';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabase } from 'angularfire2/database';
import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { AuthProvider } from '../providers/auth/auth';
import { SignupPage } from '../pages/signup/signup';
import { AngularFireAuth } from 'angularfire2/auth';
import { NgxErrorsModule } from '@ultimate/ngxerrors';
import { AppdataProvider } from '../providers/appdata/appdata';
import { AngularFirestoreModule,AngularFirestore } from 'angularfire2/firestore';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    SignupPage
    ],
  imports: [
    BrowserModule,
    NgxErrorsModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig.fire),
    AngularFirestoreModule.enablePersistence() //.enablePersistence() used for offline storage
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    SignupPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AngularFireAuth,
    AngularFirestore,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    AppdataProvider
  ]
})
export class AppModule {}
