import { createContext, useEffect, useState } from "react";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut , onAuthStateChanged, sendEmailVerification, updateProfile, GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail} from "firebase/auth";
import app from "../../fireBase/firebase.config";

export const AuthContext = createContext()
const Auth = getAuth(app)

const UserContext = ({children}) =>{

    const [user, setUser] = useState(null);
    const [loadding, setLoadding] = useState(true);

    const googleProvider = new GoogleAuthProvider();

    const googleSignIn = () =>{

        return signInWithPopup(Auth, googleProvider);
    }

    const CreateUser = (email, password) =>{
        setLoadding(true);
        return createUserWithEmailAndPassword(Auth, email, password);
    }

    const signUser = (email, password) =>{
        setLoadding(true);
        return signInWithEmailAndPassword(Auth, email, password);
    }

    const updateUser = (upUser) =>{
        return updateProfile(Auth.currentUser, upUser);
    }

    const passwordReset = (email) =>{

        return sendPasswordResetEmail(Auth, email);
    }

    const logOut = () =>{
        setLoadding(true);
        return signOut(Auth);
    }

    const EmailVarification = () =>{

        return sendEmailVerification(Auth.currentUser);
    }

    useEffect(()=>{

        const unSubscribe = onAuthStateChanged(Auth, currentUser =>{
            console.log('current user = ', currentUser);
            setUser(currentUser);
            setLoadding(false);
        })

        return ()=> unSubscribe();
    },[])

    const userInfo = {user,loadding, CreateUser, signUser, logOut, EmailVarification, updateUser, googleSignIn, passwordReset};
    
    return <AuthContext.Provider value={userInfo}>
        {children}
    </AuthContext.Provider>
}


export default UserContext;