import SimpleSchema from "simpl-schema";

export const InsertSchema = new SimpleSchema({
    firstName: {
        type: String,
        min: 4,
    },
    lastName: {
        type: String,
        min: 4,
    },
    username: {
        type: String,
        min: 4,
        max: 20,
    },
    email: {
        type: String,
    },
    phoneNumber: {
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
        allowedValues: ["active", "inactive"],
    },
    roles: {
        type: Array,
    },
    'roles.$': {
        type: String,
    },
    profileImage: {
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
        min: 4,
    },
    lastName: {
        type: String,
        min: 4,
    },
    username: {
        type: String,
        min: 4,
        max: 20,
    },
    email: {
        type: String,
    },
    phoneNumber: {
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
        allowedValues: ["active", "inactive"],
    },
    roles: {
        type: Array,
    },
    'roles.$': {
        type: String,
    },
    profileImage: {
        type: String,
        optional: true,
    },
})


const ProfileImageSchema = new SimpleSchema({
    publicId: {
        type: String
    },
    name: {
        type: String
    },
    base64: {
        type: String
    },
    url: {
        type: String
    },
})

export const UpdateProfileSchema = new SimpleSchema({
    _id: {
        type: String,
    },
    firstName: {
        type: String,
        min: 4,
    },
    lastName: {
        type: String,
        min: 4,
    },
    username: {
        type: String,
        min: 4,
        max: 20,
    },
    about: {
        type: String,
        max: 120,
        optional: true
    },
    company: {
        type: String,
        optional: true
    },
    job: {
        type: String,
        optional: true
    },
    address: {
        type: String,
        optional: true
    },
    phoneNumber: {
        type: String,
        optional: true
    },
    email: {
        type: String,
    },
    status: {
        type: String,
        allowedValues: ["active", "inactive"],
    },
    // profileImageFile: {
    //     type: Object,
    //     optional: true,
    //     blackbox: true
    // },
    // profileImage: {
    //     type: ProfileImageSchema,
    //     optional: true,
    //     blackbox: true
    // },
})

