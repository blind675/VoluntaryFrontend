import {Button, Form, NavLink, Spinner} from "react-bootstrap";
import logo from "../../assets/logo.svg";
import React, {useState} from "react";
import {Routes} from "../../router/types";
import {login} from "../../services/API";

export type Props = {
    routeSelected: (route: Routes) => void;
};

export default function LoginForm({routeSelected}: Props) {
    const [email, setEmail] = useState<string | undefined>();
    const [password, setPassword] = useState<string | undefined>();

    const [isLoading, setIsLoading] = useState(false);


    async function handleSubmit() {
        if (email && password ) {

            setIsLoading(true)
            const response = await login(email, password);
            setIsLoading(false);

            if (response) {
                routeSelected(Routes.Home);
            }
        }
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

    return (
        <>
            <div style={{padding: 20}}>
                <img src={logo} className="App-logo" alt="logo"/>
            </div>
            <h1> Log In </h1>
            <Form style={{marginTop: 10, padding: 20}}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Control type="email" placeholder="Enter email" value={email}
                                  onChange={(e) => setEmail(e.target.value)}/>
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Control type="password" placeholder="Password" value={password}
                                  onChange={(e) => setPassword(e.target.value)}/>
                </Form.Group>

                <Button variant="primary" onClick={handleSubmit}>
                    Log In
                </Button>

                <Form.Text style={{marginTop: 30}} muted={false}>
                    Don't have an account?
                    <NavLink href="#signup" onSelect={() => routeSelected(Routes.SignUp)}> SignUp </NavLink>
                </Form.Text>

            </Form>
        </>
    )
}
