import React, {useEffect, useState} from "react";
import {Organisation} from "../../models/types";
import {fetchOrganisations, joinOrganisation} from "../../services/API";
import {Spinner} from "react-bootstrap";
import {confirmAlert} from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import {getMyOrganisations} from "../../services/Persistance";

export default function Organisations() {
    const [organisations, setOrganisations] = useState<Organisation[] | undefined>();
    const [isLoading, setIsLoading] = useState(false);
    const [isJoiningOrg, setIsJoiningOrg] = useState(false);
    const [myOrganisations, setMyOrganisations] = useState<Organisation[]>();

    useEffect(() => {
        loadOrganisations();

    }, []);

    function loadOrganisations() {
        setIsLoading(true);
        fetchOrganisations().then((result) => {

            getMyOrganisations().then(organisations =>
            {
                setMyOrganisations(organisations);

                const difference = result?.filter((res) => {

                    const contains = organisations?.find((org) => {
                        return org.id === res.id;
                    });
                    return !contains;
                });

                setOrganisations(difference);
                setIsLoading(false);
            });

        });
    }

    function join(organisation: Organisation) {
        setIsJoiningOrg(true);
        joinOrganisation(organisation).then((response) => {
            setIsJoiningOrg(false);
            getMyOrganisations().then(organisations => setMyOrganisations(organisations));
        });
    }

    function renderMyOrganisations() {
        return (
            <div style={{marginTop: 30, marginBottom: 30}}>
                <h4>My Organisations:</h4>
                {myOrganisations ?
                    myOrganisations.map((org) => <div
                            key={org.id}
                            style={{
                                padding: 20,
                                margin: 10,
                                borderStyle: 'solid',
                                borderWidth: 1,
                                borderColor: 'slategray',
                                backgroundColor: 'black'
                            }}
                        >
                            <h6>{org.name}</h6>
                            <p>{org.description}</p>
                        </div>
                    ) : "You don't belong to any organisation. Please select one below!"}
            </div>
        );
    }

    function renderOrganisations() {
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

        return organisations?.map((org) => <div
            key={org.id}
            style={{
                padding: 20,
                margin: 10,
                borderBottomStyle: 'solid',
                backgroundColor: 'gray',
                borderBottomWidth: 1,
                borderBottomColor: 'white'
            }}
            onClick={() => {
                confirmAlert({
                    title: `Join ${org.name}?`,
                    message: `Are you sure you want to be part of ${org.name}?`,
                    buttons: [
                        {
                            label: 'Yes',
                            onClick: () => join(org)
                        },
                        {
                            label: 'Not sure.',
                            onClick: () => {
                                return null;
                            }
                        }
                    ]
                });
            }}
        >
            <h5>{org.name}</h5>
            <p>{org.description}</p>
        </div>)
    }

    if (isJoiningOrg) {
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

    return <div>
        {renderMyOrganisations()}
        <h4>Organisations:</h4>
        {renderOrganisations()}
    </div>;
};
