import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AngularFireStorage } from 'angularfire2/storage';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
interface Items {
  idea_title:string,
  idea_description:string,
  image:string,
  likes:{},
  totalLikes:number
  uid:string,
  date_added:string
}
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
      idea_title:data.value.idea_title,
      idea_description:data.value.idea_description,
      image:data.value.image_url,
      likes:{},
      totalLikes:0,
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
