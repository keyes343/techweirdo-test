import { useEffect, useState, useMemo, useContext, useCallback } from 'react';
import { r, e, t } from './incoming';
import axios from 'axios';

import { getAuth, onAuthStateChanged, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

const User = () => {
    const state_user = useContext(r.user.StateContext);
    const dispatch_user = useContext(r.user.DispatchContext)!;

    const LOGIN = useCallback(async () => {
        const provider = new GoogleAuthProvider();
        provider.addScope('profile');
        provider.addScope('email');

        try {
            try {
                const auth = getAuth();
                const result = await signInWithPopup(auth, provider);
                console.log({ result });
                if (result && result.user) {
                    // setting up auth in context
                    dispatch_user({
                        type: r.user.act['loginWith-google'],
                        payload: result.user,
                    });
                }
            } catch (error) {
                console.log({ error });
            }
        } catch (error) {
            console.log({ error });
        }
    }, [dispatch_user]);

    const LOGOUT = useCallback(async () => {
        const auth = getAuth();
        await auth.signOut();
        dispatch_user({
            type: r.user.act.logout,
            payload: null,
        });
    }, [dispatch_user]);

    // ACKNOWLEDGE USER in database once user logs in
    const acknowledgedUser = useCallback(async () => {
        // do not acknowledge user if already acknowledged
        // or if not logged in yet.
        const touchpoint = e.links.apis.aws + '/user/acknowledge';

        // PAYLOAD FOR ACKNOWLEDGING USER
        const payload = {
            // email: undefined,
            email: state_user.email as string,
            uid: state_user.uid! as string,
        };
        // MAKING AXIOS CALL TO VERIFY USER IN MONGOOSE
        const { status, data } = await axios.post(touchpoint, payload);

        if (status === 200) {
            dispatch_user({
                type: r.user.act.acknowledged,
                payload: data.doc,
            });
        } else if (status === 400) {
            alert('Some data is missing so the request could not be accepted.');
        } else {
            alert('Something went wrong. Please refresh and try loggin in again.');
        }
    }, [dispatch_user, state_user.email, state_user.uid]);

    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user && !state_user.loggedIn) {
                console.log('auth check done, user not logged in, but google is');
                dispatch_user({
                    type: r.user.act['loginWith-google'],
                    payload: user,
                });
            }
        });
    }, [dispatch_user, state_user.loggedIn]);
    return { LOGIN, LOGOUT, acknowledgedUser };
};

export default User;
