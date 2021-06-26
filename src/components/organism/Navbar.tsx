import {Nav, Navbar} from "react-bootstrap";
import logo2 from "../../assets/logo.svg";
import React from "react";
import {Routes} from "../../router/types";

export type Props = {
    routeSelected: (route: Routes) => void;
    isLoggedIn: boolean;
    isVolunteer: boolean;
};

export default function NavBar({routeSelected, isLoggedIn, isVolunteer}: Props) {

    function renderRoleLinks() {
        if(isVolunteer) {
            return(
                <>
                    <Nav.Link href="#tasks" onSelect={()=>routeSelected(Routes.Tasks)}>Tasks</Nav.Link>
                    <Nav.Link href="#organisation" onSelect={()=>routeSelected(Routes.Organisations)}>Organisations</Nav.Link>
                </>
            );
        }

        return(
            <>
                <Nav.Link href="#projcts" onSelect={()=>routeSelected(Routes.Projects)}>Projects</Nav.Link>
                <Nav.Link href="#volunteers" onSelect={()=>routeSelected(Routes.Volunteers)}>Volunteers</Nav.Link>
            </>
        )
    }

    function renderLinks() {
        if(isLoggedIn) {
            return (
                <>
                    <Nav.Link href="#home" onSelect={()=>routeSelected(Routes.Home)}>Home</Nav.Link>
                    {renderRoleLinks()}
                </>
            )
        }

        return (
            <>
                <Nav.Link href="#login" onSelect={()=>routeSelected(Routes.LogIn)}>LogIn</Nav.Link>
                <Nav.Link href="#signup" onSelect={()=>routeSelected(Routes.SignUp)}>SignUp</Nav.Link>
            </>
        )
    }

    return (
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="#home">
                <img
                    alt="Voluntary logo"
                    src={logo2}
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                /> Voluntary
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    {renderLinks()}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}
