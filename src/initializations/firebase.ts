import { initializeApp } from 'firebase/app';

let firebaseConfig = {
    apiKey: 'AIzaSyCUEOmtdjPagFKiLXNvq2UysJeIlFGGPCI',
    authDomain: 'techweirdo-test.firebaseapp.com',
    projectId: 'techweirdo-test',
    storageBucket: 'techweirdo-test.appspot.com',
    messagingSenderId: '329794554649',
    appId: '1:329794554649:web:779ff4093e5225861e5388',
};
// Initialize Firebase
// firebase.initializeApp(firebaseConfig);
// firebase.analytics();

const firebase_app = initializeApp(firebaseConfig);

export { firebase_app };
