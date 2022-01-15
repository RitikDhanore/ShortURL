import app from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDQ8b8YreE_y6YDsYA9zodQsqvKuiQuqs0",
    authDomain: "shortly-68b5b.firebaseapp.com",
    projectId: "shortly-68b5b",
    storageBucket: "shortly-68b5b.appspot.com",
    messagingSenderId: "731069623240",
    appId: "1:731069623240:web:e0be384af43f8ad3fe6efd"
  };

  const firebase = app.initializeApp(firebaseConfig);
  const firestore = firebase.firestore();
  const auth = firebase.auth();

  if(process.env.NODE_ENV === "development"){
    firestore.useEmulator("localhost", 8080);
    auth.useEmulator("http://localhost:9099");
  }

  

  export {firebase, firestore, auth, app};
