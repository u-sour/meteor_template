import SimpleSchema from 'simpl-schema'

export default new SimpleSchema({
  name: {
    type: String,
  },
  roles: {
    type: Array,
  },
  'roles.$': {
    type: String,
  },
  status: {
    type: String,
  },
})
