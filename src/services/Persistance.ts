import { set, get } from "idb-keyval";
import {Organisation, User} from "../models/types";

const userKey = '#@User0-Data';
const myOrgKey = '#@myOrganisation1-Data';

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
