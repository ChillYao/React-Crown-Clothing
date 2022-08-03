import { useState } from 'react';
import { createAuthUserWithEmailAndPassword } from '../../utils/firebase/firebase.utils';

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
};

const SignUpForm = () => {
    const [formFields, setFormFileds] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;

    const handleSubmit = async (event) => {
        event.preventDefault();
        /*
        to-do:
        1. confirm password matches
        2. authenticate user with email and password
        3. create a user document from what the function returns
        Tip: similar to sign-in component
        */
    };

    console.log(formFields);
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFileds({ ...formFields, [name]: value });
    };

    return (
        <div>
            <h1>Sign Up with Email and Password</h1>
            <form onSubmit={() => {}}>
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
