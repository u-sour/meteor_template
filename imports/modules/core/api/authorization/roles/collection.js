import SuperCollection from '../../libs/SuperCollection'
import Schema from './schema'
import TimestampSchema from '../../timestamp/schema'

const Roles = new SuperCollection('core_roles')
Roles.attachSchema(Schema.extend(TimestampSchema))
export default Roles
