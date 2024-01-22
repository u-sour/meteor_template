export interface CreateRoleForm {
    name: string,
    status: string,
    createdAt: Date,
    createdBy: string
}

export interface UpdateRoleForm {
    _id: string
    name: string,
    status: string
    createdAt: Date,
    createdBy: string
}