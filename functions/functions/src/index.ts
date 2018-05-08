import * as functions from 'firebase-functions';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
import * as admin from 'firebase-admin';
// import { admin } from 'firebase-admin';


admin.initializeApp();

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
exports.createProfile = functions.auth.user()
  .onCreate( (userRecord, context) => {
  return admin.firestore().doc('/users/'+userRecord.uid).set({
    full_name: 'What should we call you',
    uid: userRecord.uid,
    image:'http://www.scuolacalcioaldaroma.it/wp-content/uploads/2015/08/icon-profile.png'
  });
});
