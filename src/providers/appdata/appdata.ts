import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import {AuthProvider} from '../../providers/auth/auth';
import { AngularFireStorage } from 'angularfire2/storage';
import { Observable } from 'rxjs/Observable';
import {LoginPage} from '../../pages/login/login';
import 'rxjs/add/operator/map';
interface Items {
  idea_title:string,
  idea_description:string,
  image:string,
  likes:[string],
  totalLikes:number
  uid:string,
  date_added:number
}
interface ItemsId extends Items { id: string; }
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
export class AppdataProvider {

  ideasCollection: AngularFirestoreCollection<Items>; //Firestore collection
  ideas: Observable<Items[]>;

  resultsCollection: AngularFirestoreCollection<Results>; //Firestore collection
  results: Observable<Results[]>;
  constructor(private afs: AngularFirestore, private auth: AuthProvider) {

    let date = new Date();
    let month = date.getMonth()+1;

    let year = date.getFullYear();

    let date_added =  (month*10000+year);
    this.ideasCollection = this.afs.collection('ideas', ref => ref.where('date_added',"==",date_added)); //ref()
    this.ideas = this.ideasCollection.snapshotChanges().map(actions => { //this helps in getting id
      return actions.map(a => {
        const data = a.payload.doc.data() as Items;
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    });
    let r_date_added = (((month-1)*10000)+year)
    console.log(r_date_added);
    this.resultsCollection = this.afs.collection('results', ref => ref.where('date_added',"==",r_date_added)); //ref()
    this.results = this.ideasCollection.snapshotChanges().map(actions => { //this helps in getting id
      return actions.map(a => {
        const data = a.payload.doc.data() as Items;
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    });

}
  getIdeas():Observable<Items[]>{
    return this.ideas;
  }
  getResults():Observable<Results[]>{
    return this.results;
  }

  addIdea(data,uid,date){
    this.ideasCollection.add({
      idea_title:data.value.idea_title,
      idea_description:data.value.idea_description,
      image:data.value.image_url,
      likes:[uid,],
      totalLikes:1,
      uid:uid,
      date_added:date
    })
    .then( (result) => {
        console.log("Document addded with id >>> ", result.id);

    })
    .catch( (error) => {
        console.error("Error adding document: ", error);
    });

  }

  likeIdea(idea){
    if((idea.likes).includes((this.auth.getCurrentUser()).uid)){
      console.log('already likes');
    }
    else{
      (idea.likes).push((this.auth.getCurrentUser()).uid);
      idea.totalLikes++;
      this.afs.doc<Items>('ideas/'+idea.id).update(idea);
    }
  }




}
