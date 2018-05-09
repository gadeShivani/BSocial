import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import {AuthProvider} from '../../providers/auth/auth';
import { AngularFireStorage } from 'angularfire2/storage';
import { Observable } from 'rxjs/Observable';
import {LoginPage} from '../../pages/login/login';
import 'rxjs/add/operator/map';

interface Results {
  idea_title:string,
  idea_description:string,
  image:string,
  likes:[string],
  totalLikes:number
  uid:string,
  date_added:number
}
interface ResultsId extends Results { id: string; }
/*
  Generated class for the AppdataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ResultdataProvider {


  resultsCollection: AngularFirestoreCollection<Results>; //Firestore collection
  results: Observable<Results[]>;
  constructor(private afs: AngularFirestore, private auth: AuthProvider) {

    let date = new Date();
    let month = date.getMonth();

    let year = date.getFullYear();

    let date_added =  (month*10000+year);

    this.resultsCollection = this.afs.collection('results', ref => ref.where('date_added',"==",date_added)); //ref()
    this.results = this.resultsCollection.snapshotChanges().map(actions => { //this helps in getting id
      return actions.map(a => {
        const data = a.payload.doc.data() as Results;
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    });

}
  getResults():Observable<Results[]>{
    return this.results;
  }

  likeIdea(idea){
    if((idea.likes).includes((this.auth.getCurrentUser()).uid)){
      console.log('already likes');
    }
    else{
      (idea.likes).push((this.auth.getCurrentUser()).uid);
      idea.totalLikes++;
      this.afs.doc<Results>('results/'+idea.id).update(idea);
    }
  }




}
