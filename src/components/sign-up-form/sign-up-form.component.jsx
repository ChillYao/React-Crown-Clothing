import { useState } from 'react';
import {
    createAuthUserWithEmailAndPassword,
    createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils';

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
        <div>
            <h1>Sign Up with Email and Password</h1>
            <form onSubmit={handleSubmit}>
                <label>Display Name</label>
                <input
                    type="text"
                    required
                    onChange={handleChange}
                    name="displayName"
                    value={displayName}
                ></input>
                <label>Email</label>
                <input
                    type="email"
                    required
                    onChange={handleChange}
                    name="email"
                    value={email}
                ></input>
                <label>Password</label>
                <input
                    type="password"
                    required
                    onChange={handleChange}
                    name="password"
                    value={password}
                ></input>
                <label>Confirm Password</label>
                <input
                    type="password"
                    required
                    onChange={handleChange}
                    name="confirmPassword"
                    value={confirmPassword}
                ></input>
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default SignUpForm;
