import React, {useEffect, useState} from "react";
import {Volunteer} from "../../models/types";
import {Spinner} from "react-bootstrap";
import {fetchVolunteers} from "../../services/API";

export default function Volunteers() {
    const [volunteers, setVolunteers] = useState<Volunteer[] | undefined>();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        loadVolunteers();
    }, []);

    function loadVolunteers() {
        setIsLoading(true);
        fetchVolunteers().then((result) => {
            setVolunteers(result);
            setIsLoading(false);
        });
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

    function renderVolunteers() {
        if (volunteers) {
            return volunteers.map((volunteer) => <div
                key={volunteer.id}
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    padding: 20,
                    margin: 10,
                    height: 30,
                    backgroundColor: '#0d3e5e'
                }}
            >
                {volunteer.name} - {volunteer.interests}
            </div>)
        }

        return <h5>You have no volunteers for now.</h5>;
    }

    return <div style={{marginTop: 30}}>
        <h3 style={{marginBottom: 30}} >Volunteers in your organisation:</h3>
        {renderVolunteers()}
    </div>
}
