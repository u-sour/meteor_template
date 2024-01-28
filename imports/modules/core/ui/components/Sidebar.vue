<template>
    <div id="bdSidebar" class="d-flex flex-column flex-shrink-0 p-3 bg-primary text-white offcanvas-md offcanvas-start">
        <a href="#" class="navbar-brand pt-2">
            <h3>{{ brand.toUpperCase() }}</h3>
        </a>
        <hr>
        <ul class="custom-nav nav nav-pills flex-column mb-auto">
            <SidebarLink v-for="route in adminRoutes" :key="route.name" :to-route-name="route.name"
                :icon-name="route.meta.iconName"><span class="ms-2">{{ $t(route.meta.title) }}</span>
            </SidebarLink>
            <!-- <li class="nav-item mb-1">
                    <a href="#" class="">
                        <i class="fa-solid fa-bell"></i>
                        Notifications
                        <span class="notification-badge">5</span>
                    </a>
                </li> -->
        </ul>
        <hr>
        <SidebarProfile />
        <div class="mt-2">
            <div class="d-flex gap-2">
                <SignOutBtn class="flex-fill" />
                <ThemeBtn :is-show-label="true" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { userIsInAuthorization } from '../../utils/security';
import routes from '../routes';
import SidebarLink from './SidebarLink.vue';
import SidebarProfile from './SidebarProfile.vue';
import SignOutBtn from './SignOutBtn.vue';
import ThemeBtn from './ThemeBtn.vue';

defineProps({
    brand: { type: String, default: 'meteor template' }
})

const adminRoutes = routes[0].children[1].children.filter((r) => userIsInAuthorization({ parentRoutePath: r.meta.authorization.parentRoutePath, roles: r.meta.authorization.roles }) && r.meta.isParent && r.name != "core.auth.admin.profile" && r.name != "core.auth.admin.settings.roles");
</script>

<style>
#bdSidebar {
    width: 280px;
}

.custom-nav {
    color: #fff;
}

.custom-nav li a {
    color: #fff;
    text-decoration: none;
    width: 100%;
    display: flex;
    align-items: center;
    border-radius: 5px;
    padding: 8px 5px;
}

.custom-nav li a.active {
    background: rgba(255, 255, 255, 0.2);
}

.custom-nav li a:hover {
    background: rgba(255, 255, 255, 0.2);
}

.custom-nav li svg {
    width: 25px;
    text-align: center;
}

.notification-badge {
    background-color: rgba(255, 255, 255, 0.7);
    float: right;
    color: #222;
    font-size: 14px;
    padding: 0px 8px;
    border-radius: 2px;
}
</style>