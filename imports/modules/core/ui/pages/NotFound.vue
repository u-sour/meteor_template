<template>
    <div class="container-fluid">
        <div class="vh-100 d-flex flex-column justify-content-center align-items-center">
            <h1>{{ $t('core.pages.notFound.title') }}</h1>
            <h6>{{ $t('core.pages.notFound.subTitle') }}</h6>
            <p>{{ $t('core.pages.notFound.content') }}</p>
            <FormKit type="button" :label="$t('core.btns.other.goBack')" @click="this.$router.back()" />
        </div>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped></style>