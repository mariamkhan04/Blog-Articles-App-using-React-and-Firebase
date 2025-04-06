import {useState, useEffect} from "react";
import {signInWithPopup, GoogleAuthProvider, signOut} from "firebase/auth";
import {auth} from "./firebaseConfig.js";

// Google Sign in 
export function login(){
    return signInWithPopup(auth, new GoogleAuthProvider())
} 

// Sign out
export function logout(){
    return signOut(auth);
}

export function loggedInUserDisplayName(){
    return auth.currentUser.displayName;
}

// Track user auth state (if user is logged in or out)
export const useAuthentication = () =>{
    const [user, setUser] = useState(null);
    useEffect(() => { // lsiten for auth state changes
        return auth.onAuthStateChanged((user) => {
            user ? setUser(user) : setUser(null); // if user is logged in, set user object
        });
    },[])
    return user; // return user object if logged in 
}