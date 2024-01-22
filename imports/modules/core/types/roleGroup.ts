export interface CreateRoleGroupForm {
    name: string,
    roles: string[],
    status: string,
    createdAt: Date,
    createdBy: string
}

export interface UpdateRoleGroupForm {
    _id: string
    name: string,
    roles: string[],
    status: string,
    createdAt: Date,
    createdBy: string
}