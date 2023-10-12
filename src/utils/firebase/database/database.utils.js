//firebase datastore

import {
    getFirestore,//Initialize firestore
    doc,         //Create a reference to a document
    getDoc,      //Read a document
    setDoc       //Write a document
} from "firebase/firestore"

import { app } from "../firebase.utils"

export const db = getFirestore(app); //this directly gives us access to firestore database

export const readDocumentById = async (collection, id) => {
    const docRef = doc(db, collection, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        console.log(docSnap.data())
        return docSnap.data();
    } else {
        console.log("No such document!");
    }
}

export const userAuthentication = async (
    userAuth,
    additionalInformation = {}
) => {
    console.log("check",userAuth, additionalInformation)
    if (!userAuth) return;

    const userDocRef = doc(db, "users", userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);
    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation
            });
        } catch (error) {
            console.log("user data", displayName, email, password,additionalInformation)
            console.log("error creating the user", error.message);
        }
    }
  

    return await readDocumentById("users", userAuth.uid);
};

