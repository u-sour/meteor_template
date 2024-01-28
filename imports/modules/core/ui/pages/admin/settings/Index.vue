<template>
    <div>
        <div class="list-group">
            <template v-for="route in routeList" :key="route.title">
                <RouterLink :to="{ name: route.name }"
                    class="d-flex justify-content-between align-items-center list-group-item list-group-item-action"
                    v-if="userIsInAuthorization({ parentRoutePath: route.authorization.parentRoutePath, roles: route.authorization.roles })">
                    <div class="d-flex align-items-center">
                        <IconSvg :name="route.iconName" class="me-1" /> {{ $t(route.title) }}
                    </div>
                    <IconSvg :name="Icons.nextRoute" />
                </RouterLink>
            </template>
        </div>
    </div>
</template>

<script setup>
import IconSvg from '../../../components/IconSvg.vue';
import Icons from '../../../../utils/icons'
import routes from '../../../routes';
import { userIsInAuthorization } from '/imports/modules/core/utils/security';

const adminChildRoutes = routes[0].children[1].children
const routeList = [{
    iconName: adminChildRoutes[9].meta.iconName,
    title: adminChildRoutes[9].meta.title,
    name: adminChildRoutes[9].name,
    authorization: adminChildRoutes[9].meta.authorization
}]

</script>

<style lang="scss" scoped></style>