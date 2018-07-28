import  firebase from "firebase"
import dotenv from "dotenv"


dotenv.config()

 var config = {
   apiKey: process.env.apiKey,
   authDomain: "kanban-a1ed5.firebaseapp.com",
   databaseURL: "https://kanban-a1ed5.firebaseio.com",
   projectId: "kanban-a1ed5",
   storageBucket: "kanban-a1ed5.appspot.com",
   messagingSenderId: "1010023110395"
 };

export const app = firebase.initializeApp(config);
export const database = firebase.database();