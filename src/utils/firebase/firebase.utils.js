// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {
    GoogleAuthProvider,
    getAuth,
    signInWithPopup,
    signInWithRedirect,
} from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyDwmhxJHWUAokm_EPZtxhnP-f0kLv4Zo7U',
    authDomain: 'crwn-cloting-db-9352f.firebaseapp.com',
    projectId: 'crwn-cloting-db-9352f',
    storageBucket: 'crwn-cloting-db-9352f.appspot.com',
    messagingSenderId: '891071286606',
    appId: '1:891071286606:web:4f814ab27214570bc2e21f',
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

//Initialize the Signin Provider
const provider = new GoogleAuthProvider();

//Force the user to select account
provider.setCustomParameters({
    prompt: 'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
