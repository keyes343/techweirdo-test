import * as React from 'react';
import { useEffect, useContext } from 'react';
import { HashRouter, Switch, Route, Router } from 'react-router-dom';
import { createHashHistory } from 'history';
import { r, h, t, reuse } from './incoming';
import * as pages from './index';
import axios from 'axios';

export interface PageRouterProps {}

const PageRouter: React.FC<PageRouterProps> = () => {
    const history = createHashHistory();
    const state_user = useContext(r.user.StateContext);
    const dispatch_user = useContext(r.user.DispatchContext)!;
    const state_settings = useContext(r.settings.StateContext);
    const dispatch_settings = useContext(r.settings.DispatchContext)!;

    const hook_user = h.User();

    // ACKNOWLEDGE USER INTO DATABASE
    useEffect(() => {
        if (!state_user.acknowledged && state_user.loggedIn) {
            hook_user.acknowledgedUser();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state_user.acknowledged, state_user.loggedIn]);

    return (
        <Router history={history}>
            <HashRouter>
                <Route path={'/'}>
                    <reuse.nav.Navbar />
                </Route>
                <Route path={'/'} exact>
                    <pages.Home />
                </Route>
                <Switch>
                    <Route path="/see/" strict>
                        <pages.See />
                    </Route>
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
