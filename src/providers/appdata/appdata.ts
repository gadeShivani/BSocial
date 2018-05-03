import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
/*
  Generated class for the AppdataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AppdataProvider {
  ideasCollection: AngularFirestoreCollection<Items>; //Firestore collection
  ideas: Observable<Items[]>;
  constructor(private afs: AngularFirestore) {
    this.ideasCollection = this.afs.collection('ideas'); //ref()
    this.ideas = this.ideasCollection.valueChanges();
  }
  getIdeas():Observable<Items[]>{
    return this.ideas;
  }

  addIdea(data,uid,date){
    this.ideasCollection.add({
      idea_title:data.idea_title,
      idea_description:data.idea_description,
      image:"https://png.pngtree.com/thumb_back/fw800/back_pic/03/70/72/5257b6c12d89875.jpg",
      likes:0,
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


}
