import SimpleSchema from 'simpl-schema'

const ProfileImageSchema = new SimpleSchema({
  publicId: {
    type: String,
    optional: true,
  },
  name: {
    type: String,
    optional: true,
  },
  url: {
    type: String,
    optional: true,
  },
})

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
  about: {
    type: String,
    max: 120,
    optional: true,
  },
  company: {
    type: String,
    optional: true,
  },
  job: {
    type: String,
    optional: true,
  },
  address: {
    type: String,
    optional: true,
  },
  phoneNumber: {
    type: String,
    optional: true,
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
    optional: true,
  },
  status: {
    type: String,
    allowedValues: ['active', 'inactive'],
  },
  roleGroup: {
    type: String,
  },
  routePermissions: {
    type: Array,
  },
  'routePermissions.$': {
    type: Object,
  },
  'routePermissions.$.route': {
    type: String,
  },
  'routePermissions.$.roles': {
    type: Array,
  },
  'routePermissions.$.roles.$': {
    type: String,
  },
  // roles: {
  //   type: Array,
  // },
  // 'roles.$': {
  //   type: String,
  // },
  // profileImage: {
  //   type: ProfileImageSchema,
  //   optional: true,
  // },
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
  about: {
    type: String,
    max: 120,
    optional: true,
  },
  company: {
    type: String,
    optional: true,
  },
  job: {
    type: String,
    optional: true,
  },
  address: {
    type: String,
    optional: true,
  },
  phoneNumber: {
    type: String,
    optional: true,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
    min: 6,
    optional: true,
  },
  confirmPassword: {
    type: String,
    min: 6,
    optional: true,
  },
  status: {
    type: String,
    allowedValues: ['active', 'inactive'],
  },
  roleGroup: {
    type: String,
  },
  routePermissions: {
    type: Array,
  },
  'routePermissions.$': {
    type: Object,
  },
  'routePermissions.$.route': {
    type: String,
  },
  'routePermissions.$.roles': {
    type: Array,
  },
  'routePermissions.$.roles.$': {
    type: String,
  },
  // roles: {
  //   type: Array,
  // },
  // 'roles.$': {
  //   type: String,
  // },
  // profileImage: {
  //   type: ProfileImageSchema,
  //   optional: true,
  // },
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
    optional: true,
  },
  company: {
    type: String,
    optional: true,
  },
  job: {
    type: String,
    optional: true,
  },
  address: {
    type: String,
    optional: true,
  },
  phoneNumber: {
    type: String,
    optional: true,
  },
  email: {
    type: String,
  },
  status: {
    type: String,
    allowedValues: ['active', 'inactive'],
  },
  profileImage: {
    type: ProfileImageSchema,
    optional: true,
  },
})
