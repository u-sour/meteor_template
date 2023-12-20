import SimpleSchema from "simpl-schema";

export const InsertSchema = new SimpleSchema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    username: {
        type: String,
        min: 5,
        max: 20,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
        min: 6,
    },
    confirmPassword: {
        type: String,
        min: 6,
    },
    status: {
        type: String,
    },
    roles: {
        type: Array,
    },
    'roles.$': {
        type: String,
    },
    profilePic: {
        type: String,
        optional: true,
    },
})

export const UpdateSchema = new SimpleSchema({
    _id: {
        type: String,
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    username: {
        type: String,
        min: 5,
        max: 20,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
        min: 6,
    },
    confirmPassword: {
        type: String,
        min: 6,
    },
    status: {
        type: String,
    },
    roles: {
        type: Array,
    },
    'roles.$': {
        type: String,
    },
    profilePic: {
        type: String,
        optional: true,
    },
})
