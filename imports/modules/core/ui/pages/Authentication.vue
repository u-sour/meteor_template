<template>
    <div class="container-fluid">
        <div class="row">
            <div class="vh-100 col-sm-12 col-md-12 col-lg-6  d-flex justify-content-center align-items-center">
                <div class="col px-lg-5">
                    <router-view />
                </div>
            </div>
            <div class="vh-100 col-lg-6 d-none d-lg-flex justify-content-center align-items-center bg-primary">
                <h1 class="text-light">{{ companyName }}</h1>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const companyName = "YOUR COMPANY NAME";
</script>

<style scoped></style>