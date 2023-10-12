import { useState, useContext } from "react"

import { UserContext } from "../../context/user.context.jsx"

import { useNavigate } from "react-router-dom"

import { signInWithGooglePopup, signInAuthUserWithEmailAndPassword } from "../../utils/firebase/auth/auth.utils"
import { userAuthentication, readDocumentById} from "../../utils/firebase/database/database.utils.js"

import Input from "../input-form/input.component.jsx"


const defaultFormValue = {
    email: 'nf@gmail.com',
    password: '12345678'
}



const SignInComponent = () => {
    const [formValue, setFormValue] = useState(defaultFormValue)
    const navigate = useNavigate();


    const { email, password } = formValue

    const { currentUser, setCurrentUser } = useContext(UserContext)

    const logUserIn = async () => {
        const response = await signInWithGooglePopup()
        const data = await userAuthentication(response.user)
        navigate('/shop')
        setCurrentUser(data)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { user } = await signInAuthUserWithEmailAndPassword(
                email,
                password
            );
            const data = await readDocumentById("users", user.uid)
            setCurrentUser(data)
            if(currentUser !== null){
                console.log("Hello")
                navigate('/shop')
            }
            else{
                navigate('/shop')
            }
            
        } catch (error) {
            switch (error.code) {
                case 'auth/wrong-password':
                    alert('incorrect password for email');
                    break;
                case 'auth/user-not-found':
                    alert('no user associated with this email');
                    break;
                default:
                    console.log(error);
            }
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        console.log(name, value)
        setFormValue({ ...formValue, [name]: value });
    };

    return (
        <div className="form-container">
            <form
                className="form"
                onSubmit={handleSubmit}
                style={
                    {
                        backgroundColor: 'white',
                    }
                }
            >
                <h1 className="form-title">Sign In</h1>
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
                <button className="button btn-google" onClick={logUserIn}>Sign In with Google</button>
            </form>
        </div>
    )
}

export default SignInComponent