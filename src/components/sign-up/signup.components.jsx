import { useState } from "react"

import { authenticationWithEmailAndPassword } from "../../utils/firebase/auth/auth.utils.js"

import { userAuthentication } from "../../utils/firebase/database/database.utils.js"
import Input from "../input-form/input.component.jsx"

const defaultFormValue = {
    displayName: '',
    email: '',
    password: ''
}

const SignUpComponent = () => {
    const [formValue, setFormValue] = useState(defaultFormValue)

    const { displayName, email, password } = formValue
    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(formValue)
        
        try {
            const { user } = await authenticationWithEmailAndPassword(email, password)
            console.log("user", user)
            await userAuthentication(user, { displayName, email })
        }
        catch (error) {
            if (error.code === "auth/email-already-in-use") {
                alert("Cannot create user, email already in use");
            } else {
                console.log("user creation encountered an error", error);
            }
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormValue({ ...formValue, [name]: value });

    };
    return (
        <div className="form-container">
            <form className="form" onSubmit={handleSubmit}>
                <h1>Create An Account</h1>
                <Input
                    label="Name"
                    placeholder="Enter your Name"
                    type="name"
                    name='displayName'
                    value={displayName}
                    onChange={handleChange}
                    w="100%"
                    h="40px"
                />
                <Input
                    label="Email"
                    placeholder="Enter your email"
                    type="email"
                    name='email'
                    value={email}
                    onChange={handleChange}
                    w="100%"
                    h="40px"
                />

                <Input
                    label="Password"
                    placeholder="Enter your password"
                    type="password"
                    name='password'
                    value={password}
                    onChange={handleChange}
                    w="100%"
                    h="40px"
                />
                <button className="button">Sign In</button>
                <button className="button btn-google">Sign In with Google</button>
                {
                    /*
                    <Button 
                        className="button" 

                        text="Sign In" 
                        w="100%" 
                        h="30px"/>
                    */
                }
            </form>
        </div>
    )
}

export default SignUpComponent