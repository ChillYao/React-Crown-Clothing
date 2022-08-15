import { useState } from 'react';
import {
    signInWithGooglePopup,
    createUserDocumentFromAuth,
    signInUserWithEmailAndPassword,
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
        try {
            const { user } = await signInUserWithEmailAndPassword(
                email,
                password
            );
            console.log(user);
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log('login failed, errorCode: ' + errorCode);
            console.log('errorMessage: ' + errorMessage);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFileds({ ...formFields, [name]: value });
    };

    //Execute the sign in with google pop-up
    const logGoogleUser = async () => {
        await signInWithGooglePopup();
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
                <div className="buttons-container">
                    {' '}
                    <Button type="submit" buttontype="">
                        Sign In
                    </Button>
                    <Button
                        type="button"
                        buttontype="google"
                        onClick={logGoogleUser}
                    >
                        Google Sign In
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default SignInForm;
