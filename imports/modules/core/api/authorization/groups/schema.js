import SimpleSchema from 'simpl-schema'

export default new SimpleSchema({
  name: {
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
  status: {
    type: String,
  },
})
