const { Mongo } = require('meteor/mongo')
import Schema from './schema'

const ChildRoles = new Mongo.Collection('child-roles')
ChildRoles.attachSchema(Schema)
export default ChildRoles
