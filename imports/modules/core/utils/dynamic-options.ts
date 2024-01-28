import { Meteor } from "meteor/meteor";
import { Option } from "../types/option"
import { find } from 'lodash'
import routes from "../ui/routes"
import { useI18n } from "vue-i18n";

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
    },
    routes: (selectedOptions: any) => {
        const { t } = useI18n()
        const options: Array<Option> = []
        const tempRoutes = routes[0].children[1].children ?? []
        for (let index = 0; index < tempRoutes.length; index++) {
            const route = tempRoutes[index]
            if (tempRoutes[index].meta.isParent) {
                options.push({
                    label: t(route.meta.title), value: route.path, attrs: {
                        disabled: find(selectedOptions, { route: route.path })
                    }
                })
            }
        }
        return options
    }
}

export default dynamicOptions