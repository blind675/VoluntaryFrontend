import {Button, Form, Spinner} from "react-bootstrap";
import React, {useState} from "react";
import logo from "../../assets/logo.svg";
import {Organisation, Volunteer} from "../../models/types";
import {createOrganisation, createVolunteer} from "../../services/API";
import {Routes} from "../../router/types";

export type Props = {
    routeSelected: (route: Routes) => void;
};

export default function SignUpForm({routeSelected}: Props) {
    const [isVolunteer, setIsVolunteer] = useState<boolean | undefined>();

    const [email, setEmail] = useState<string | undefined>();
    const [password, setPassword] = useState<string | undefined>();
    const [userName, setUserName] = useState<string | undefined>();
    const [name, setName] = useState<string | undefined>();
    const [description, setDescription] = useState<string | undefined>();
    const [interests, setInterests] = useState<string | undefined>();

    const [isLoading, setIsLoading] = useState(false);

    async function handleSubmit() {
        if (email && password && userName) {
            const user = {
                email,
                password,
                username: userName,
            }

            if (isVolunteer === true && interests) {
                const volunteer: Volunteer = {
                    ...user,
                    interests
                }

                setIsLoading(true)
                const response = await createVolunteer(volunteer);
                setIsLoading(false);

                if (response) {
                    routeSelected(Routes.Home);
                }
            }

            if(isVolunteer === false && description && name) {
                const organisation: Organisation = {
                    ...user,
                    description,
                    name
                }

                setIsLoading(true)
                const response = await createOrganisation(organisation);
                setIsLoading(false);

                if (response) {
                    routeSelected(Routes.Home);
                }
            }
        }
    }

    function renderOrganisationSignup() {
        return (
            <Form style={{marginTop: 10, padding: 20}}>

                <h3 style={{padding: 30}}>Sign up as an ORGANISATION</h3>

                <Form.Group controlId="formBasicName">
                    <Form.Control type="text" placeholder="User name" value={userName}
                                  onChange={(e) => setUserName(e.target.value)}/>
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                    <Form.Control type="email" placeholder="Enter email" value={email}
                                  onChange={(e) => setEmail(e.target.value)}/>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Control type="password" placeholder="Password" value={password}
                                  onChange={(e) => setPassword(e.target.value)}/>
                </Form.Group>

                <Form.Group controlId="formBasicPasswordSecond">
                    <Form.Control type="password" placeholder="Retype password"/>
                </Form.Group>

                <hr/>
                <br/>
                <hr/>

                <Form.Group controlId="formBasicOrgName">
                    <Form.Control type="text" placeholder="Organisation name" value={name}
                                  onChange={(e) => setName(e.target.value)}/>
                </Form.Group>

                <Form.Group controlId="formBasicOrgDescription">
                    <Form.Label>Organisation description</Form.Label>
                    <Form.Control as="textarea" rows={3} value={description}
                                  onChange={(e) => setDescription(e.target.value)}/>
                </Form.Group>

                {/* TODO extract this */}

                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    marginTop: 30
                }}>
                    <Button variant="primary" onClick={handleSubmit}>
                        Sign Up
                    </Button>

                    <Button variant="secondary" type="reset" onClick={() => setIsVolunteer(undefined)}>
                        Cancel
                    </Button>
                </div>
            </Form>
        );
    }

    function renderVolunteerSignup() {
        return (
            <Form style={{marginTop: 10, padding: 20}}>

                <h3 style={{padding: 30}}>Sign up as a VOLUNTEER</h3>

                <Form.Group controlId="formBasicName">
                    <Form.Control type="text" placeholder="User name" value={userName}
                                  onChange={(e) => setUserName(e.target.value)}/>
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                    <Form.Control type="email" placeholder="Enter email" value={email}
                                  onChange={(e) => setEmail(e.target.value)}/>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Control type="password" placeholder="Password" value={password}
                                  onChange={(e) => setPassword(e.target.value)}/>
                </Form.Group>

                <Form.Group controlId="formBasicPasswordSecond">
                    <Form.Control type="password" placeholder="Retype password"/>
                </Form.Group>

                <hr/>
                <br/>
                <hr/>

                <Form.Group controlId="formBasicInterests">
                    <Form.Control type="text" placeholder="Interests" value={interests}
                                  onChange={(e) => setInterests(e.target.value)}/>
                </Form.Group>

                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    marginTop: 30
                }}>
                    <Button variant="primary" type="submit" onClick={handleSubmit}>
                        Sign Up
                    </Button>

                    <Button variant="secondary" type="reset" onClick={() => setIsVolunteer(undefined)}>
                        Cancel
                    </Button>
                </div>

            </Form>
        );
    }

    if (isLoading) {
        return (
            <div style={{
                display: 'flex',
                flex: 1,
                height: 400,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Spinner animation="border" role="status" variant="primary"/>
            </div>
        );
    }

    if (isVolunteer === true) {
        return renderVolunteerSignup();
    } else if (isVolunteer === false) {
        return renderOrganisationSignup();
    }

    return (
        <>
            <div style={{padding: 20}}>
                <img src={logo} className="App-logo" alt="logo"/>
            </div>
            <h1> Sign me up! </h1>
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                marginTop: 50
            }}>
                <Button variant="primary" size="lg" onClick={() => setIsVolunteer(true)}>
                    I'm a Volunteer
                </Button>
                <Button variant="primary" size="lg" onClick={() => setIsVolunteer(false)}>
                    I'm an Organisation
                </Button>
            </div>
        </>

    );
}
