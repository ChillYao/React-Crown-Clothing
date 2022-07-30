import React from 'react';
import { signInWithGooglePopup } from '../../utils/firebase/firebase.utils';

const SignIn = () => {
    //Execute the sign in with google pop-up
    const logGoogleUser = async () => {
        const response = await signInWithGooglePopup();
        console.log(response);
    };

    return (
        <div>
            <h1>This is SignIn Component</h1>
            <button onClick={logGoogleUser}>Sign In With Google Popup</button>
        </div>
    );
};

export default SignIn;
