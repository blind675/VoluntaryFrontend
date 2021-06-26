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
    interests: string;
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
