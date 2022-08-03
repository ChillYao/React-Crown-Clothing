import React from 'react';
import {
    signInWithGooglePopup,
    createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils';
import SignUpForm from '../../components/sign-up-form/sign-up-form.component';

const SignIn = () => {
    //Execute the sign in with google pop-up
    const logGoogleUser = async () => {
        const response = await signInWithGooglePopup();
        console.log(response);
        const { user } = response;
        const userDocRef = await createUserDocumentFromAuth(user);
    };

    return (
        <div>
            <h1>This is SignIn Component</h1>
            <button onClick={logGoogleUser}>Sign In With Google Popup</button>
            <SignUpForm />
        </div>
    );
};

export default SignIn;
