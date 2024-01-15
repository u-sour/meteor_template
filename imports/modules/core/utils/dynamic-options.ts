import { Meteor } from "meteor/meteor";
import { Option } from "../types/option"

const dynamicOptions = {
    roles: async () => {
        const options: Array<Option> = []
        const { data } = await Meteor.callAsync('core.admin.findRoles', {}, {});
        for (let index = 0; index < data.length; index++) {
            const role = data[index];
            options.push({ label: role._id.toUpperCase(), value: role._id })
        }
        return options
    }
}

export default dynamicOptions