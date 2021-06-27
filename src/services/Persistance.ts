import { set, get } from "idb-keyval";
import {Organisation, User, Volunteer} from "../models/types";

const userKey = '#@User0-Data';
const myOrgKey = '#@myOrganisation1-Data';
const myOrganisationsKey = '#@myOrganisations2-Data';
const volunteerKey = '#@Volunteer3-Data';

export async function saveUser(user: User) {
    await set(userKey, user);
}

export async function getSavedUser() {
    return await get<User>(userKey);
}

export async function saveMyOrganisation(org: Organisation) {
    await set(myOrgKey, org);
}

export async function getMyOrganisation() {
    return await get<Organisation>(myOrgKey);
}

export async function saveMyOrganisations(organisations: Organisation[]) {
    await set(myOrganisationsKey, organisations);
}

export async function getMyOrganisations() {
    return await get<Organisation[]>(myOrganisationsKey);
}

export async function saveVolunteer(volunteer: Volunteer) {
    await set(volunteerKey, volunteer);
}

export async function getVolunteer() {
    return await get<Volunteer>(volunteerKey);
}
