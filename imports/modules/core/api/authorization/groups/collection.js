import SuperCollection from '../../libs/SuperCollection'
import Schema from './schema'
import TimestampSchema from '../../timestamp/schema'

const RoleGroups = new SuperCollection('core_roleGroups')
RoleGroups.attachSchema(Schema.extend(TimestampSchema))
export default RoleGroups
