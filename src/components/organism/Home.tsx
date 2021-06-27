import {Organisation, Roles, User} from "../../models/types";
import {useEffect, useState} from "react";
import {getMyOrganisation, getSavedUser} from "../../services/Persistance";

export default function Home() {
    const [myOrg, setMyOrg] = useState<Organisation>();
    const [user, setUser] = useState<User>();

    useEffect(() => {
        getSavedUser().then(user => setUser(user));

        getMyOrganisation().then((org) => {
            console.log(' !!! ');
            setMyOrg(org);
        });
    }, []);

    return (
        <div style={{marginTop: 30}}>
            <h2>Welcome {user?.role === Roles.volunteer ? user.username : 'to'}</h2>
            {user?.role === Roles.volunteer ? null : <h1>{myOrg?.name}</h1>}
        </div>
    );
}
