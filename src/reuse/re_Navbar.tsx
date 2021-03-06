import * as React from 'react';
import { useState, useContext, useCallback } from 'react';
import { h, r, e, s, init } from './incoming';
import { useHistory } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export interface NavbarProps {
    middle?: boolean;
}

export const Navbar: React.FC<NavbarProps> = (p) => {
    const history = useHistory();
    const state_user = useContext(r.user.StateContext);
    const state_med = useContext(r.med.StateContext);
    const state_settings = useContext(r.settings.StateContext);

    return (
        <s.nav.Wrapper
            zIndex={10}
            onClick={() => {
                console.log({
                    // state_payment,
                    // hook_admin,
                    // state_user,
                    // state_forms,
                    state_settings,
                    state_user,
                    state_med,
                    // state_panel,
                    // hook_forms,
                    // hook_panel,
                });
            }}
        >
            {/* logo on left corner */}
            <s.nav.Logo
                pointer
                onClick={() => {
                    history.push('/');
                }}
            >
                <s.Box pd="0.5rem 1rem 0">TechWeirdo</s.Box>
                {/* <img src={media.companyLogo} alt="" /> */}
            </s.nav.Logo>

            <div />
            {/* nav links */}
            {/* <s.nav.Links>
                {[
                    {
                        name: 'Home',
                    },
                    {
                        name: 'About us',
                    },
                    {
                        name: 'Career',
                    },
                    {
                        name: 'Contact',
                    },
                ].map((box, i) => {
                    return <div key={i}>{box.name}</div>;
                })}
            </s.nav.Links> */}

            {/* profile button */}
            <s.Box flex row last pd="0 2rem" zIndex={100}>
                <MyProfileButton />
                {/* <s.Box ht="3rem" wd="3rem" bd="green" /> */}
            </s.Box>
        </s.nav.Wrapper>
    );
};

export default Navbar;

const MyProfileButton = () => {
    const [showingProfile, set_showingProfile] = useState(false);

    const toggleProfile = () => {
        set_showingProfile(!showingProfile);
    };

    return (
        <s.nav.ButtonWrapper
            onClick={() => {
                toggleProfile();
            }}
            relative
        >
            {/* <img src={media.personIcon} alt="person icon" /> */}
            <s.nav.MyProfileButton>Settings</s.nav.MyProfileButton>
            {/* ABSOLUTE - popup for user profile */}
            <s.nav.Popup
                absolute
                // grid
                // columns="1fr"
                // gap="2rem"
                // right="30%"
                // top="90%"
                showing={showingProfile}
                onClick={(e: any) => {
                    e.stopPropagation();
                }}
            >
                <MenuOptions toggleProfile={toggleProfile} />
                <s.nav.CloseButton aim="center" onClick={toggleProfile}>
                    CLOSE
                </s.nav.CloseButton>
            </s.nav.Popup>
        </s.nav.ButtonWrapper>
    );
};

const MenuOptions = (p: { toggleProfile: () => void }) => {
    const history = useHistory();
    const state_user = useContext(r.user.StateContext);
    const dispatch_user = useContext(r.user.DispatchContext)!;
    const dispatch_settings = useContext(r.settings.DispatchContext)!;
    const hook_user = h.User();
    // const LOGOUT = async () => {
    //     const auth = getAuth();
    //     await auth.signOut();
    //     dispatch_user({
    //         type: r.user.act.logout,
    //         payload: null,
    //     });
    // };

    // const toggle_profile_and_history = (path: string) => {
    //     p.toggleProfile();
    //     history.push(path);
    // };
    const alterSettings = useCallback((key: '/' | '/see/' | '/admin/') => {
        // dispatch_settings({
        //     type: r.settings.act['menu-option'],
        //     payload: key,
        // });
        history.push(key);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const dashboard_list = [
        {
            title: 'Record new medicine',
            onClick: () => alterSettings('/'),
        },
        {
            title: 'See my med calendar',
            onClick: () => alterSettings('/see/'),
        },
        {
            title: state_user.loggedIn ? 'Log Out' : 'Log In',
            onClick: () => (state_user.loggedIn ? hook_user.LOGOUT() : hook_user.LOGIN()),
        },
    ];

    return (
        <s.Box grid columns="1fr" onClick={(evt: any) => evt.stopPropagation()}>
            {dashboard_list.map((list, i) => {
                return (
                    <s.nav.PopupItem key={i} onClick={() => list.onClick()}>
                        {list.title}
                    </s.nav.PopupItem>
                );
            })}
            {/* <s.nav.PopupItem onClick={() => {}}>My Dashboard</s.nav.PopupItem>
            <s.nav.PopupItem
                onClick={
                    state_user.loggedIn
                        ? LOGOUT
                        : () => {
                              p.toggleProfile();
                              history.push(e.links.paths.login);
                          }
                }
            >
                {state_user.loggedIn ? 'Log Out' : 'Log In'}
            </s.nav.PopupItem> */}
        </s.Box>
    );
};
