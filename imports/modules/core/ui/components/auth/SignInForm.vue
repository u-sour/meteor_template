<template>
    <h1 class="fw-bolder">{{ $t("core.pages.auth.signIn.title") }}</h1>
    <h6 class="text-secondary">{{ $t("core.pages.auth.signIn.subTitle") }}</h6>
    <div class="mt-5">
        <FormKit type="form" id="signInForm" @submit="signIn" :actions="false" :disabled="submitted">
            <FormKit name="username" :label="$t('core.pages.auth.signIn.form.username')"
                :wrapper-class="{ 'formkit-wrapper': false }" :validation="validations.username" />
            <FormKit type="password" name="password" :label="$t('core.pages.auth.signIn.form.password')"
                prefix-icon="password" suffix-icon="eyeClosed" suffix-icon-class="hover:text-blue-500"
                :wrapper-class="{ 'formkit-wrapper': false }" :validation="validations.password"
                @suffix-icon-click="toggleShowPassword" />
            <div class="d-flex justify-content-between ">
                <FormKit type="checkbox" :label="$t('core.pages.auth.signIn.form.rememberMe')" name="rememberMe" />
                <router-link :to="{ name: '' }">{{ $t('core.pages.auth.signIn.components.forgotPassword') }}</router-link>
            </div>
            <div class="d-grid gap-2">
                <button class="btn btn-primary fw-bold" type="submit" :disabled="submitted">{{
                    $t('core.btns.auth.signIn').toUpperCase()
                }}</button>
            </div>
            <div class="text-center mt-3">
                <span>{{ $t('core.pages.auth.signIn.components.noAccount') }} <span><router-link
                            :to="{ name: 'core.auth.signUp' }">{{ $t('core.btns.auth.signUp')
                            }}</router-link></span></span>
            </div>
        </FormKit>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { reset } from '@formkit/core'
import notify from '../../../utils/notify'
import auth from '../../../api/auth/class'
import { SignInForm } from '../../../types/authentication';
import { useAuthStore } from '../../../stores/auth'
import { useRouter } from 'vue-router';

const router = useRouter();
const validations = {
    username: "required|length:4",
    password: "required|contains_uppercase|length:6"
}
const authStore = useAuthStore()
const submitted = ref(false)
const toggleShowPassword = (node: any, e: any) => {
    node.props.suffixIcon = node.props.suffixIcon === 'eye' ? 'eyeClosed' : 'eye'
    node.props.type = node.props.type === 'password' ? 'text' : 'password'
}
const signIn = async (form: SignInForm) => {
    submitted.value = true
    auth.user.signIn(form).then((res) => {
        authStore.setUser(res.data.userId)
        submitted.value = false;
        reset('signInForm');
        router.replace({ name: 'core.auth.admin.dashboard' })
        notify.success(res.message)
    }).catch((err) => {
        submitted.value = false;
        return notify.error(err.message);
    });
}
</script>

<style scoped></style>