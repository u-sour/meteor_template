export interface CreateUserForm {
    firstName: string,
    lastName: string,
    username: string,
    about?: string,
    company?: string,
    job?: string,
    address?: string,
    phoneNumber: string,
    email: string,
    password: string,
    roleGroup: string,
    routePermissions: { route: string, roles: string[] }
    // roles: string[]
    status: string
}

export interface EditUserForm {
    _id: string,
    firstName: string,
    lastName: string,
    username: string,
    about?: string,
    company?: string,
    job?: string,
    address?: string,
    phoneNumber: string,
    email: string,
    changePassword?: boolean,
    password?: string
    roleGroup: string,
    routePermissions: { route: string, roles: string[] }
    // roles: string[]
    status: string
}