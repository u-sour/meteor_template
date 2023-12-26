<template>
    <div class="container-fluid">
        <div class="vh-100 d-flex flex-column justify-content-center align-items-center">
            <h1>{{ $t('app.pages.notFound.title') }}</h1>
            <h6>{{ $t('app.pages.notFound.subTitle') }}</h6>
            <p>{{ $t('app.pages.notFound.content') }}</p>
            <FormKit type="button" :label="$t('app.btns.other.goBack')" @click="this.$router.back()" />
        </div>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped></style>