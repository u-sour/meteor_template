<template>
    <div class="container-fluid p-0 d-flex vh-100 overflow-hidden">
        <SideBar />
        <div class="flex-fill overflow-auto">
            <SidebarHeaderCollapse />
            <div class="p-3">
                <Breadcrumb />
                <PageHeader />
                <RouterView />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import SideBar from '../components/Sidebar.vue';
import SidebarHeaderCollapse from '../components/SidebarHeaderCollapse.vue';
import Breadcrumb from '../components/Breadcrumb.vue';
import PageHeader from '../components/PageHeader.vue'
</script>

<style scoped></style>