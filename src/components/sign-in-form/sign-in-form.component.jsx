import { useState } from 'react';
import {
    signInWithGooglePopup,
    createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils';
import Button from '../button/button.component';
import FormInput from '../form-input/form-input.component';
import './sign-in-form.style.scss';

const defaultFormFields = {
    email: '',
    password: '',
};

const SignInForm = () => {
    const [formFields, setFormFileds] = useState(defaultFormFields);
    const { email, password } = formFields;

    const handleSubmit = async (event) => {
        event.preventDefault();
        return;
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFileds({ ...formFields, [name]: value });
    };

    //Execute the sign in with google pop-up
    const logGoogleUser = async () => {
        const response = await signInWithGooglePopup();
        //console.log(response);
        const { user } = response;
        const userDocRef = await createUserDocumentFromAuth(user);
    };

    return (
        <div className="sign-in-container">
            <h2>I aready have an account</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label="Email"
                    type="email"
                    required
                    onChange={handleChange}
                    name="email"
                    value={email}
                />
                <FormInput
                    label="Password"
                    type="password"
                    required
                    onChange={handleChange}
                    name="password"
                    value={password}
                />
                <Button type="submit" buttontype="" onClick={logGoogleUser}>
                    Sign In
                </Button>
                <Button buttontype="google" onClick={logGoogleUser}>
                    Sign In With Google Popup
                </Button>
            </form>
        </div>
    );
};

export default SignInForm;
