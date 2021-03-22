import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
 
var firebaseConfig = {
    apiKey: "AIzaSyDYGwfyF2vaHsHYnyl8bPkGTfrwwfGsqE8",
    authDomain: "wenhop-22f08.firebaseapp.com",
    projectId: "wenhop-22f08",
    storageBucket: "wenhop-22f08.appspot.com",
    messagingSenderId: "689172845990",
    appId: "1:689172845990:web:a120c1a39b7b754e49eb67",
    measurementId: "G-FB90ZR8C7K"
  };

interface FirebaseSetup {
    auth: app.auth.Auth,
    db: app.firestore.Firestore
}
 
class Firebase implements FirebaseSetup {
    auth: app.auth.Auth;
    db: app.firestore.Firestore;
    constructor() {
      app.initializeApp(firebaseConfig);
  
      this.auth = app.auth();
      this.db = app.firestore();
    }
  
    // *** Auth API ***
  
    doSignInWithEmailAndPassword = (email: string, password: string) =>
      this.auth.signInWithEmailAndPassword(email, password);
  
    doSignOut = () => this.auth.signOut();
  
    doPasswordReset = (email: string) => this.auth.sendPasswordResetEmail(email);
  
    doPasswordUpdate = (password: string) => {
      if(this.auth.currentUser) {
        this.auth.currentUser.updatePassword(password);
      }
    }
  
    // *** User API ***
  
    // user = uid => this.db.ref(`users/${uid}`);
  
    // users = () => this.db.ref('users');
  }
  
  export default Firebase;