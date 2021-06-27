import React, {useEffect, useState} from 'react';
import './App.css';
import NavBar from "./components/organism/Navbar";
import SignUpForm from "./components/organism/SignUp";
import {Routes} from "./router/types";
import LoginForm from "./components/organism/Login";
import Home from "./components/organism/Home";
import {Organisation, Roles, User} from "./models/types";
import {getMyOrganisation, getSavedUser} from "./services/Persistance";
import Projects from "./components/organism/Projects";
import Organisations from "./components/organism/Organisations";

function App() {
    const [currentUser, setCurrentUser] = useState<User>();
    const [currentRoute, setCurrentRoute] = useState<Routes>(Routes.Home);
    const [myOrg, setMyOrg] = useState<Organisation>();

    useEffect(() => {
       getSavedUser().then(user => {
           setCurrentUser(user);

           if(user !== undefined) {
               setCurrentRoute(Routes.Home);
           } else {
               setCurrentRoute(Routes.LogIn);
           }
       });

       getMyOrganisation().then(org => setMyOrg(org));

    }, []);

    function renderRoute() {
        switch (currentRoute) {
            case Routes.LogIn:
                return <LoginForm routeSelected={(route) => setCurrentRoute(route)}/>;
            case Routes.SignUp:
                return <SignUpForm routeSelected={(route) => setCurrentRoute(route)}/>;
            case Routes.Home:
                getSavedUser().then(user => setCurrentUser(user));
                return <Home user={currentUser} myOrg={myOrg}/>;
            case Routes.Projects:
                return <Projects/>;
            case Routes.Organisations:
                return <Organisations/>;
            default:
                return <Home user={currentUser} myOrg={myOrg}/>;
        }
    }

    return (
        <div className="App">
            <NavBar routeSelected={(route) => setCurrentRoute(route)} isLoggedIn={currentUser !== undefined}
                    isVolunteer={currentUser !== undefined && currentUser.role === Roles.volunteer}/>
            {renderRoute()}
        </div>
    );
}

export default App;
