import { Meteor } from "meteor/meteor";
import { Option } from "../types/option"

const dynamicOptions = {
    roleGroups: async () => {
        const options: Array<Option> = []
        const { data } = await Meteor.callAsync('core.admin.findRoleGroups', { selector: { status: 'active' } });
        for (let index = 0; index < data.length; index++) {
            const role = data[index];
            options.push({ label: role.name.toUpperCase(), value: role._id })
        }
        return options
    },
    roles: async () => {
        const options: Array<Option> = []
        const { data } = await Meteor.callAsync('core.admin.findRoles', { selector: { status: 'active' } });
        for (let index = 0; index < data.length; index++) {
            const role = data[index];
            options.push({ label: role.name.toUpperCase(), value: role._id })
        }
        return options
    }
}

export default dynamicOptions