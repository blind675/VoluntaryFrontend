export enum Roles {
    volunteer = 'volunteer',
    manager = 'manager',
    organisation = 'organization'
}

export interface User {
    username: string;
    email: string;
    password?: string;
    name?: string;
    contactData?: string;
    token?: string;
    role?: Roles;
}

export interface Volunteer extends User {
    id?: string
    interests: string;
    organisations?: Organisation[];
}

export interface Organisation extends User {
    id?: string;
    name: string;
    description: string;
}

export interface Project {
    id: string;
    name: string;
    organisation: Organisation;
}
