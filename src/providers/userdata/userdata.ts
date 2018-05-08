import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import {AuthProvider} from '../../providers/auth/auth';
import { AngularFireStorage } from 'angularfire2/storage';
import { Observable } from 'rxjs/Observable';
import {LoginPage} from '../../pages/login/login';
import 'rxjs/add/operator/map';
interface Users {
  uid:string
  full_name:string,
  image:string
}
interface UserId extends Users { id: string; }
/*
  Generated class for the UserdataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserdataProvider {
  userCollection: AngularFirestoreCollection<Users>; //Firestore collection
  user: Observable<Users[]>;
  durl:any;
  constructor(private afs: AngularFirestore, private auth: AuthProvider) {
    if(this.auth.getAuthenticated()){
    this.userCollection = this.afs.collection('users', ref => ref.where('uid',"==",(this.auth.getCurrentUser()).uid));
    this.user = this.userCollection.snapshotChanges().map(actions => { //this helps in getting id
      return actions.map(a => {
        const data = a.payload.doc.data() as Users;
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    });
  }
  }
  getUser():Observable<Users[]>{
    return this.user;
  }
  updateUser(user,imageurl){
    user.image = imageurl;
    this.afs.doc<Users>('users/'+user.id).update(user);
  }

}
