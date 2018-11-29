import * as firebase from 'firebase/app';
import 'firebase/firestore';

firebase.initializeApp({
  apiKey: 'AIzaSyDa7u_cvZl2we2Zbm48Z4X9MAzd6AgucKE',
  authDomain: 'trigger-riot.firebaseapp.com',
  projectId: 'trigger-riot',
});

export const db = firebase.firestore();

// Disable deprecated features
db.settings({
  timestampsInSnapshots: true,
});
