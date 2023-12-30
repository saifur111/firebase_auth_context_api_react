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
import { initalState, reducer } from './authReducer';

export const AuthContext = createContext();
const UserContext = ({ children }) => {
    const [user, setUser] = useState(null);

    const [state, dispatch] = useReducer(reducer, initalState);

    const auth = getAuth(app);
    const googleProvider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider();
    const currentuser = auth.currentUser;

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
            setUser(currentUser);
            console.log('Auth state Changed', currentUser);
        })
        return () =>{
            unsubscribe();
        }
    }, [])

    const authInfo = { user,  cleanUp_UI, createUser, signIn, logOut, signInWithGoogle, signInWithGithub,state}
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};
export default UserContext;
export const useUserContext = () => useContext(AuthContext);