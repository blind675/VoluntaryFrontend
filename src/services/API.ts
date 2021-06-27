import axios, {Method} from "axios";
import {Organisation, Roles, User, Volunteer} from "../models/types";
import {
    getMyOrganisation, getMyOrganisations,
    getSavedUser,
    getVolunteer,
    saveMyOrganisation, saveMyOrganisations,
    saveUser,
    saveVolunteer
} from "./Persistance";

const API_BASE_URL = 'https://voluntary-backend.herokuapp.com';


async function callAPI(method: Method, path: string, data?: {}) {

    const user = await getSavedUser();
    const response = await axios({
        headers: user?.token ? {Authorization: `Bearer ${user?.token}`} : null,
        method: method,
        url: API_BASE_URL + path,
        data
    })
    console.log('[callAPI] response:', response);

    return response
}

async function authCall(method: Method, path: string, data: {}) {
    try {
        const response = await callAPI(method, path, data);

        if (response.status === 200) {

            console.log(' auth response data: ', response.data);

            const user: User = {
                email: response.data.user.email,
                username: response.data.user.username,
                token: response.data.jwt,
                role: response.data.user.role.type
            }
            await saveUser(user);

            if (user.role === Roles.organisation) {
                const myOrg: Organisation = response.data.user.organization;
                await saveMyOrganisation(myOrg);
            } else {
                const volunteer: Volunteer = response.data.user.volunteer;
                await saveVolunteer(volunteer);
                const volunteerResponse = await callAPI('get', `/volunteers/${volunteer?.id}`);

                if (volunteerResponse.status === 200) {
                    const organisations: Organisation[] = volunteerResponse.data.organisations;
                    await saveMyOrganisations(organisations);
                }
            }

            return user;
        }

        alert(response.statusText);
        return null;

    } catch (err) {
        alert(err);
        return null;
    }
}

async function createAccount(data: {}) {
    return authCall('post', '/auth/local/register', data);
}

export async function createOrganisation(data: Organisation) {
    return createAccount({...data, isOrganisation: true});
}

export async function createVolunteer(data: Volunteer) {
    return createAccount(data);
}

export async function login(email: string, password: string) {
    const data = {
        identifier: email,
        password: password
    }

    return authCall('post', '/auth/local', data);
}

export async function addProject(name: string) {
    try {
        const myOrg = await getMyOrganisation();

        const response = await callAPI('post', '/projects', {
            organisation: myOrg?.id,
            name
        });

        if (response.status === 200) {
            return response;
        }

        alert(response.statusText);
        return null;
    } catch (err) {
        alert(err);
        return null;
    }
}

export async function fetchProjects() {
    try {
        const myOrg = await getMyOrganisation();

        const response = await callAPI('get', `/projects?organisation.id=${myOrg?.id}`);

        if (response.status === 200) {
            return response.data;
        }

        alert(response.statusText);
        return undefined;
    } catch (err) {
        alert(err);
        return undefined;
    }
}

export async function fetchOrganisations() {
    try {
        const response = await callAPI('get', `/organisations`);

        if (response.status === 200) {
            return response.data as Organisation[];
        }

        alert(response.statusText);
        return undefined;
    } catch (err) {
        alert(err);
        return undefined;
    }
}

export async function joinOrganisation(org: Organisation) {
    try {
        const volunteer = await getVolunteer();
        const myOrganisations = await getMyOrganisations();

        let myOrgs: Organisation[] = [];
        if(myOrganisations) {
            myOrgs = myOrganisations
        }

        myOrgs.push(org);

        const organisationsIDs = myOrgs.map((org)=> org.id);

        const response = await callAPI('put', `/volunteers/${volunteer?.id}`, {organisations: organisationsIDs});

        if (response.status === 200) {

            await saveMyOrganisations(myOrgs);

            return response.data;
        }

        alert(response.statusText);
        return undefined;
    } catch (err) {
        alert(err);
        return undefined;
    }
}

export async function fetchVolunteers() {
    try {
        const myOrg = await getMyOrganisation();
        const response = await callAPI('get', `/organisations/${myOrg?.id}`);

        if (response.status === 200) {
            return response.data.volunteers as Volunteer[];
        }

        alert(response.statusText);
        return undefined;
    } catch (err) {
        alert(err);
        return undefined;
    }
}
