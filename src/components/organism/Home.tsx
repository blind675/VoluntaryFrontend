import {Organisation, Roles, User} from "../../models/types";
import React, {useEffect, useState} from "react";
import {clear} from 'idb-keyval';
import {getMyOrganisation, getSavedUser} from "../../services/Persistance";
import {Button} from "react-bootstrap";
import {Routes} from "../../router/types";

export type Props = {
    routeSelected: (route: Routes) => void;
};

export default function Home({routeSelected}: Props) {
    const [myOrg, setMyOrg] = useState<Organisation>();
    const [user, setUser] = useState<User>();

    useEffect(() => {
        getSavedUser().then(user => setUser(user));

        getMyOrganisation().then((org) => {
            console.log(' !!! ');
            setMyOrg(org);
        });
    }, []);

    function logOutPressed() {
        clear().then(() => {
            routeSelected(Routes.LogIn);
        });
    }

    return (
        <div style={{marginTop: 30}}>
            <h2>Welcome {user?.role === Roles.volunteer ? user.username : 'to'}</h2>
            {user?.role === Roles.volunteer ? null : <h1>{myOrg?.name}</h1>}

            <Button variant="primary" onClick={logOutPressed}>
                LogOut
            </Button>

        </div>
    );
}
