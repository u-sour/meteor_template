export interface CreateRoleGroupForm {
    name: string,
    routePermissions: { route: string, roles: string[] }
    // roles: string[],
    status: string,
    createdAt: Date,
    createdBy: string
}

export interface UpdateRoleGroupForm {
    _id: string
    name: string,
    routePermissions: { route: string, roles: string[] }
    // roles: string[],
    status: string,
    createdAt: Date,
    createdBy: string
}