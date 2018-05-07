import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddideaImagePage } from './addidea-image';
import {ProgressbarComponent} from '../../components/progressbar/progressbar';

@NgModule({
  declarations: [
    AddideaImagePage,
    ProgressbarComponent
  ],
  imports: [
    IonicPageModule.forChild(AddideaImagePage),
  ],
})
export class AddideaImagePageModule {}
