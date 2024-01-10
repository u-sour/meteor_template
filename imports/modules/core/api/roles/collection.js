const { Mongo } = require('meteor/mongo')
import { RolesSchema } from './schema'

const RolesCollection = new Mongo.Collection('roles')
Roles.attachSchema(RolesSchema)
export default Roles
