<template>
    <div class="container-fluid">
        <div class="vh-100 d-flex flex-column justify-content-center align-items-center">
            <h1>{{ $t('core.pages.forbidden.title') }}</h1>
            <h6>{{ $t('core.pages.forbidden.subTitle') }}</h6>
            <p>{{ $t('core.pages.forbidden.content') }}</p>
            <FormKit type="button" :label="$t('core.btns.other.goBack')" @click="$router.back()" />
        </div>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped></style>