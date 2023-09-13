import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export function useAuthStatus() {
    // sets isLoggedIn false, checkingStatus true
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [checkingStatus, setCheckingStatus] = useState(true);
    const [counter, setCounter] = useState(0);

    useEffect(() => {
        const auth = getAuth();
        console.log(auth);

        // Once auth is successful
        // https://firebase.google.com/docs/auth/web/manage-users#web-modular-api
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setLoggedIn(true);
                setCheckingStatus(false);
            } 
            
            // update counter https://stackoverflow.com/questions/68861996/usestate-undefined-in-react-just-after-set
            // const newCounter = counter + 1;
            const newCounter = 1;
            setCounter(newCounter)
        });
    }, [counter]);
    // console.log(isLoggedIn)
    return { isLoggedIn, checkingStatus, counter };
}