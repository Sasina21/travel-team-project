import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyCalr1VvG4rJbO0XTeR72xbE_I6Gp1oH0c",
    authDomain: "project-190f0.firebaseapp.com",
    databaseURL: "https://project-190f0.firebaseio.com",
    projectId: "project-190f0",
    storageBucket: "project-190f0.appspot.com",
    messagingSenderId: "796798932873"
};
firebase.initializeApp(config);

export default firebase;

export const database = firebase.database();
export const auth = firebase.auth();
export const storage = firebase.storage();
// export const facebookAuthProvider = new firebase.auth.FacebookAuthProvider();
// export const emailAuthProvider = new firebase.auth.EmailAuthProvider();
// export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
export const messaging = firebase.messaging();