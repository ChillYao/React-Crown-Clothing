// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {
    GoogleAuthProvider,
    getAuth,
    signInWithPopup,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from 'firebase/auth';

import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

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
const googleProvider = new GoogleAuthProvider();

//Force the user to select account
googleProvider.setCustomParameters({
    prompt: 'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = () =>
    signInWithPopup(auth, googleProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (
    userAuth,
    additionalInformation
) => {
    if (!userAuth) return;

    //Three arguments: database, collection, identifier ('NikeAirMax', 'AdidasNMD' 之类的，是unique ID，类似主键)
    //google will create the user document if its uid is not exisiting in current collection
    const userDocRef = doc(db, 'user', userAuth.uid);
    console.log(userDocRef);

    //进入userDocRef这个Document，看看user是否存在
    const userSnapShot = await getDoc(userDocRef);
    console.log(userSnapShot.exists());

    //if user data does not exist
    //create / set the document with the user data from userAuth in my collection.
    if (!userSnapShot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        try {
            //Save the user data in the Firebase document.
            //additional Information is an object that conatains displayName when displayName is missing.
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation,
            });
        } catch (error) {
            console.log('error when creating the user', error.message);
        }
    }

    //if user data exisit
    //return back this documents
    return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;
    return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => {
    return await signOut(auth);
};

export const onAuthStateChangedListner = (callback) =>
    onAuthStateChanged(auth, callback);
