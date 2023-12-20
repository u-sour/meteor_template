<template>
    <div class="container-fluid">
        <div class="vh-100 d-flex flex-column justify-content-center align-items-center">
            <h1>404</h1>
            <h6 class="text-secondary">Page Not Found.</h6>
            <p>The page you requested cloud not be found.</p>
            <FormKit type="button" label="Go Back" @click="this.$router.back()" />
        </div>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped></style>