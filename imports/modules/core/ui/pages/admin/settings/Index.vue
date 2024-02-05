<template>
    <div>
        <div class="list-group">
            <template v-for="route in routeList" :key="route.title">
                <RouterLink :to="{ name: route.name }"
                    class="d-flex justify-content-between align-items-center list-group-item list-group-item-action"
                    v-if="userIsInAuthorization({ parentRoutePath: route.meta.authorization.parentRoutePath, roles: route.meta.authorization.roles })">
                    <div class="d-flex align-items-center">
                        <IconSvg :name="route.meta.iconName" class="me-1" /> {{ $t(route.meta.title) }}
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

const routeList = routes[0].children[1].children.filter(r => r.name === 'core.auth.admin.settings.roles')
</script>

<style lang="scss" scoped></style>