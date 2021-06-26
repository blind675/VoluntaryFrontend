import {Organisation, Roles, User} from "../../models/types";

export type Props = {
    user?: User;
    myOrg?: Organisation;
};

export default function Home({user, myOrg}: Props) {
    return (
        <div style={{marginTop: 30}}>
            <h2>Welcome {user?.role === Roles.volunteer ? user.username : 'to'}</h2>
            {user?.role === Roles.volunteer ? null : <h1>{myOrg?.name}</h1>}
        </div>
    );
}
