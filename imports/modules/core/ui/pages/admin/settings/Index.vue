<template>
    <div>
        <div class="list-group">
            <RouterLink :to="{ name: route.name }"
                class="d-flex justify-content-between align-items-center list-group-item list-group-item-action"
                v-for="route in routeList" :key="route.title">
                <div class="d-flex align-items-center">
                    <IconSvg :name="route.iconName" class="me-1" /> {{ $t(route.title) }}
                </div>
                <IconSvg :name="Icons.nextRoute" />
            </RouterLink>
            <!-- <a href="#" class="list-group-item list-group-item-action">A second link item</a>
            <a href="#" class="list-group-item list-group-item-action">A third link item</a>
            <a href="#" class="list-group-item list-group-item-action">A fourth link item</a> -->
        </div>
    </div>
</template>

<script setup>
import IconSvg from '../../../components/IconSvg.vue';
import Icons from '../../../../utils/icons'
import routes from '../../../routes';

const adminChildRoutes = routes[0].children[1].children
const routeList = [{ iconName: adminChildRoutes[9].meta.iconName, title: adminChildRoutes[9].meta.title, name: adminChildRoutes[9].name }]
</script>

<style lang="scss" scoped></style>