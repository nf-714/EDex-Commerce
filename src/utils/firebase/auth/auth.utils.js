//firebase authentication
import { app } from "../firebase.utils"
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut
} from "firebase/auth"

//Integrating google authentication provider. You can also have many providers as you want
const provider = new GoogleAuthProvider();

//Setting up custom parameters for google authentication which allows us to set some custom parameters
provider.setCustomParameters({ prompt: "select_account" });

//getAuth is a method which allows us to get authentication service from firebase. Only one method is required to get authentication service from firebase
export const auth = getAuth(app);

//signInWithRedirect is a method which allows us to sign in with popup method
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider);

/* You might consider to take different providers (such as: google, github, facebook)
   but application as a whole should only have one auth service. Because its a singleton
    and we don't want to have multiple instances of authentication service in our application
*/

//createUserWithEmailAndPassword is a method which allows us to create user with email and password. It takes two parameters email and password
export const authenticationWithEmailAndPassword = async (email, password) => await createUserWithEmailAndPassword(auth, email, password);

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;
  
    return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);
