import React, { createContext, useContext, useEffect, useReducer, useState } from 'react';
import app from "../firebase/firebase.config";
import * as type from "./authType";
import {
    createUserWithEmailAndPassword,
    getAuth,
    GithubAuthProvider,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
} from "firebase/auth";
import { initalState,authReducer } from './authReducer';

export const AuthContext = createContext();
const UserContext = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initalState);
    const auth = getAuth(app);
    const googleProvider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider();

    const createUser = async (email, password, displayName) => {
        try {
            dispatch({ type: type.AUTH_TRY });
            const res = await createUserWithEmailAndPassword(auth, email, password, displayName);
            dispatch({ type: type.AUTH_SUCCESS });
            return res;
        } catch (error) {
            const msg = error.message;
            dispatch({ type: type.AUTH_ERROR, payload: msg });
        }

    };

    const signIn = async (email, password) => {
        try {
            dispatch({ type: type.AUTH_TRY });
            const res = await signInWithEmailAndPassword(auth, email, password);
            dispatch({ type: type.AUTH_SUCCESS });
            return res;
        } catch (error) {
            const msg = error.message;
            dispatch({ type: type.AUTH_ERROR, payload: msg });
        }
    };
    const signInWithGoogle = () => {
        return signInWithPopup(auth, googleProvider);
    };
    const signInWithGithub = () => {
        return signInWithPopup(auth, githubProvider);
    };

    const logOut = async () => {
        try {
            return await signOut(auth);
        } catch (error) {
            const msg = error.message;
            dispatch({ type: type.AUTH_ERROR, payload: msg });
        }
    }
    const cleanUp_UI = async () => dispatch({ type: type.AUTH_CLEAN_UP });

    useEffect(() =>{
        const unsubscribe = onAuthStateChanged(auth, currentUser =>{
            dispatch({ type: type.SET_USER , payload: currentUser });
            console.log('Auth state Changed', currentUser);
        })
        return () =>{
            unsubscribe();
        }
    }, [])
    const user =state.currentUser;
    const authInfo = { cleanUp_UI, createUser, signIn, logOut, signInWithGoogle, signInWithGithub,user}
    return (
        <AuthContext.Provider value={authInfo}>
            {!state.loading && children}
        </AuthContext.Provider>
    );
};
export default UserContext;
export const useUserContext = () => useContext(AuthContext);