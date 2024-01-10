
import roles from "../api/roles/server/class"
import { Option } from "../types/option"


const dynamicOptions = {
    roles: async () => {
        const options: Array<Option> = []
        const { data } = await roles.findRoles.callAsync({}, {});
        for (let index = 0; index < data.length; index++) {
            const role = data[index];
            options.push({ label: role._id.toUpperCase(), value: role._id })
        }
        return options
    }
}

export default dynamicOptions