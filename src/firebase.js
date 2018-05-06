import firebase from 'firebase';

var config = {
    apiKey: "AIzaSyA1S9lydpfIvGx2q3rzha1ZGR1AI44ZfQQ",
    authDomain: "fir-15aa0.firebaseapp.com",
    databaseURL: "https://fir-15aa0.firebaseio.com",
    projectId: "fir-15aa0",
    storageBucket: "fir-15aa0.appspot.com",
    messagingSenderId: "1093114732429"
};

firebase.initializeApp(config);

export default firebase;
export const db = firebase.database();
export const auth = firebase.auth();
