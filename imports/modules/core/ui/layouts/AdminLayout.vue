<template>
    <div class="container-fluid p-0 d-flex vh-100">
        <SideBar />
        <div class="flex-fill">
            <SidebarHeaderCollapse />
            <div class="p-4">
                <Breadcrumb />
                <PageHeader />
                <!-- <div class="row"> -->
                <!-- <div class="col"> -->
                <RouterView />
                <!-- </div> -->
                <!-- </div> -->
            </div>

        </div>
    </div>
</template>

<script setup lang="ts">
import SideBar from '../components/Sidebar.vue';
import SidebarHeaderCollapse from '../components/SidebarHeaderCollapse.vue';
import Breadcrumb from '../components/Breadcrumb.vue';
import PageHeader from '../components/PageHeader.vue';
</script>

<style scoped></style>