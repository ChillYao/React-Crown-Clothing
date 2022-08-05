import React from 'react';

import SignUpForm from '../../components/sign-up-form/sign-up-form.component';
import SignInForm from '../../components/sign-in-form/sign-in-form.component';

const Auth = () => {
    //Execute the sign in with google pop-up
    // const logGoogleUser = async () => {
    //     const response = await signInWithGooglePopup();
    //     console.log(response);
    //     const { user } = response;
    //     const userDocRef = await createUserDocumentFromAuth(user);
    // };

    return (
        <div>
            <h1>This is Auth Component</h1>
            {/* <button onClick={logGoogleUser}>Sign In With Google Popup</button> */}
            <SignInForm />
            <SignUpForm />
        </div>
    );
};

export default Auth;
