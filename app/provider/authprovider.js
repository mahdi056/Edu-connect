'use client'
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import React, { createContext, useEffect, useState } from 'react';
import { auth } from "../(main)/Components/Header/firebase.init";



export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const provder = new GoogleAuthProvider();
    const [refreshTrigger, setRefreshTrigger] = useState(false);

    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };


    const updateUserProfile = (updatedData) => {
        return updateProfile(auth.currentUser, updatedData);
    };


    const SignInwithGoogle = () => {
        return signInWithPopup(auth, provder);
    };

    const userLogin = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    const SignOut = () => {
        return signOut(auth);
    }


    const authInfo = {
        createUser,
        user,
        setUser,
        updateUserProfile,
        SignInwithGoogle,
        userLogin,
        SignOut,
        refreshTrigger,
        setRefreshTrigger,
        loading

    }


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentuser => {
            if (currentuser) {
                const userdata = {
                    displayName: currentuser.displayName,
                    email: currentuser.email,
                    location: currentuser.location
                }
                setUser(userdata);

            }
            else {
                setUser(null);
            }

            setLoading(false);
        })

        return () => unsubscribe();


    }, [])

  



    return (
        <AuthContext.Provider value={authInfo}>
            
            {
            
        children
      }
        </AuthContext.Provider>
    );
};

export default AuthProvider;