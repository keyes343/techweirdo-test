import * as React from 'react';
import { useEffect, useContext } from 'react';
import { HashRouter, Switch, Route, Router } from 'react-router-dom';
import { createHashHistory } from 'history';
import { r, e, t, reuse, init } from './incoming';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import * as pages from './index';
import axios from 'axios';

export interface PageRouterProps {}

const PageRouter: React.FC<PageRouterProps> = () => {
    const history = createHashHistory();
    const state_user = useContext(r.user.StateContext);
    const dispatch_user = useContext(r.user.DispatchContext)!;
    const state_settings = useContext(r.settings.StateContext);
    const dispatch_settings = useContext(r.settings.DispatchContext)!;

    // ACKNOWLEDGE USER in database once user logs in
    // this is done once every refrest
    const acknowledgedUser = React.useCallback(async () => {
        // do not acknowledge user if already acknowledged
        // or if not logged in yet.
        if (state_user.acknowledged || !state_user.loggedIn) {
            return;
        }
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
            // console.log(data);
        } else if (status === 400) {
            alert('Some data is missing so the request could not be accepted.');
        } else {
            alert('Something went wrong. Please refresh and try loggin in again.');
        }
    }, [dispatch_user, state_user.acknowledged, state_user.email, state_user.loggedIn, state_user.uid]);

    useEffect(() => {
        acknowledgedUser();
    }, [acknowledgedUser]);

    // AUTO AUTH CHECK FIREBASE
    // if user is logged into browser, app will update according it to
    useEffect(() => {
        const auth = getAuth();
        // init.firebase_app()
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // console.log({ userExists: user });
                let { phoneNumber, email } = user;
                // if user is logged in with OTP
                if (phoneNumber) {
                    // phoneNumber = phoneNumber.slice(3);
                    dispatch_user({
                        type: r.user.act['loginWith-otp'],
                        payload: { user },
                    });
                } else if (email) {
                    dispatch_user({
                        type: r.user.act['loginWith-google'],
                        payload: { user },
                    });
                }
            }
        });
    }, [dispatch_user]);

    return (
        <Router history={history}>
            <HashRouter>
                <Route path={e.links.paths.home}>
                    <reuse.nav.Navbar />
                </Route>
                <Route path={e.links.paths.home}>
                    <pages.Home />
                </Route>
                <Switch>
                    <Route path="/admin/" strict>
                        {/* <Admin /> */}
                    </Route>
                </Switch>
            </HashRouter>
        </Router>
    );
    // if(state_settings.isMobile){
    // }else {
    //     return (
    //     );

    // }
};

export default PageRouter;
