<template>
    <div class="container-fluid p-0 d-flex vh-100">
        <SideBar :brand="brand"/>
        <div class="flex-fill">
            <SidebarHeaderCollapse :brand="brand"/>
            <div class="p-4">
                <nav style="--bs-breadcrumb-divider:'>';font-size:14px">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><i class="fa-solid fa-house"></i></li>
                        <li class="breadcrumb-item">Dashboard</li>
                        <li class="breadcrumb-item">Orders</li>
                    </ol>
                </nav>
                <div class="d-flex justify-content-between">
                    <h5>Orders</h5>
                    <button class="btn btn-sm btn-light"><i class="fa-solid fa-download"></i> Download</button>
                </div>
                <hr>
                <div class="row">
                    <div class="col">
                        <RouterView/>
                    </div>
                </div>
            </div>
            
        </div>
    </div>
</template>

<script setup lang="ts">
import SideBar from '../components/Sidebar.vue';
import SidebarHeaderCollapse from '../components/SidebarHeaderCollapse.vue';

const brand = 'Meteor Template';
</script>

<style scoped>

</style>