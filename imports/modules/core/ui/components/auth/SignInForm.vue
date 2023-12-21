<template>
    <h1 class="fw-bolder">👋 Hello, Welcome back!</h1>
    <h6 class="text-secondary">Sign in with your data that you entered during your registration.</h6>
    <div class="mt-5">
        <FormKit type="form" id="signInForm" @submit="signIn" :actions="false" :disabled="submitted">
            <FormKit name="username" label="Username" :wrapper-class="{ 'formkit-wrapper': false }"
                :validation="validations.username" />
            <FormKit type="password" name="password" label="Password" prefix-icon="password" suffix-icon="eyeClosed"
                suffix-icon-class="hover:text-blue-500" :wrapper-class="{ 'formkit-wrapper': false }"
                :validation="validations.password" @suffix-icon-click="toggleShowPassword" />
            <div class="d-flex justify-content-between ">
                <FormKit type="checkbox" label="Remember Me" name="rememberMe" />
                <router-link :to="{ name: '' }">Forgot Password</router-link>
            </div>
            <div class="d-grid gap-2">
                <button class="btn btn-primary fw-bold" type="submit" :disabled="submitted">SIGN IN</button>
            </div>
            <div class="text-center mt-3">
                <span>Don't have an account? <span><router-link :to="{ name: 'core.auth.signUp' }">Sign Up
                            Now</router-link></span></span>
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
        console.log("🚀 ~ file: SignInForm.vue:47 ~ auth.user.signIn ~ res:", res)
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