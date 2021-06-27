import React, {useEffect, useState} from 'react';
import './App.css';
import NavBar from "./components/organism/Navbar";
import SignUpForm from "./components/organism/SignUp";
import {Routes} from "./router/types";
import LoginForm from "./components/organism/Login";
import Home from "./components/organism/Home";
import {Roles, User} from "./models/types";
import {getSavedUser} from "./services/Persistance";
import Projects from "./components/organism/Projects";
import Organisations from "./components/organism/Organisations";
import Volunteers from "./components/organism/Volunteers";

function App() {
    const [currentUser, setCurrentUser] = useState<User>();
    const [currentRoute, setCurrentRoute] = useState<Routes>(Routes.LogIn);

    useEffect(() => {
        getCurrentUser();
    }, []);

    function getCurrentUser() {
        getSavedUser().then(user => {
            setCurrentUser(user);

            if (user !== undefined) {
                setCurrentRoute(Routes.Home);
            } else {
                setCurrentRoute(Routes.LogIn);
            }
        });

    }

    function renderRoute() {
        switch (currentRoute) {
            case Routes.LogIn:
                return <LoginForm routeSelected={(route) => {
                    setCurrentRoute(route);
                    getCurrentUser();
                }}
                />;
            case Routes.SignUp:
                return <SignUpForm routeSelected={(route) => {
                    setCurrentRoute(route);
                    getCurrentUser();
                }}
                />;
            case Routes.Home:
                return <Home />;
            case Routes.Projects:
                return <Projects/>;
            case Routes.Organisations:
                return <Organisations/>;
            case Routes.Volunteers:
                return <Volunteers/>;
            default:
                return null;
        }
    }

    return (
        <div className="App">
            <NavBar routeSelected={(route) => {setCurrentRoute(route)}} isLoggedIn={currentUser !== undefined}
                    isVolunteer={currentUser !== undefined && currentUser.role === Roles.volunteer}/>
            {renderRoute()}
        </div>
    );
}

export default App;
