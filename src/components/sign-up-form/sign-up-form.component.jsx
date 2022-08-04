import { useState } from 'react';
import {
    createAuthUserWithEmailAndPassword,
    createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils';
import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';
import './sign-up.style.scss';

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
};

const SignUpForm = () => {
    const [formFields, setFormFileds] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;

    const resetFormFields = () => {
        setFormFileds(defaultFormFields);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        /*
        to-do:
        1. confirm password matches
        2. authenticate user with email and password
        3. create a user document from what the function returns
        Tip: similar to sign-in component
        */
        if (password !== confirmPassword) {
            alert('Password does not match');
            return;
        }
        try {
            const { user } = await createAuthUserWithEmailAndPassword(
                email,
                password
            );

            const userDocRef = await createUserDocumentFromAuth(user, {
                displayName,
            });

            //reset form field when creating user is successful.
            resetFormFields();
        } catch (error) {
            if (error.code == 'auth/email-already-in-use') {
                alert('The acount is exisiting');
            } else {
                console.log('signup failed: ' + error);
            }
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFileds({ ...formFields, [name]: value });
    };

    return (
        <div className="sign-up-container">
            <h2>Don't have an account?</h2>
            <span>Sign Up with Email and Password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label="Display Name"
                    type="text"
                    required
                    onChange={handleChange}
                    name="displayName"
                    value={displayName}
                />
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
                <FormInput
                    label="Confirm Password"
                    type="password"
                    required
                    onChange={handleChange}
                    name="confirmPassword"
                    value={confirmPassword}
                />
                <Button type="submit" buttontype="">
                    Sign Up
                </Button>
            </form>
        </div>
    );
};

export default SignUpForm;
