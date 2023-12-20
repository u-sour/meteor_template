<template>
    <h1 class="fw-bolder">👋 Hello, Welcome back!</h1>
    <h6 class="text-secondary">Sign in with your data that you entered during your registration.</h6>
    <div class="mt-5">
        <FormKit type="form" :form-class="submitted ? 'hide' : 'show'" @submit="signIn" :actions="false">
            <FormKit name="email" label="Email address" :wrapper-class="{ 'formkit-wrapper': false }"
                validation="required|email" />
            <FormKit type="password" name="password" label="Password" prefix-icon="password" suffix-icon="eyeClosed"
                suffix-icon-class="hover:text-blue-500" :wrapper-class="{ 'formkit-wrapper': false }" validation="required"
                @suffix-icon-click="toggleShowPassword" />
            <div class="d-flex justify-content-between ">
                <FormKit type="checkbox" label="Remember Me" name="rememberMe" />
                <router-link :to="{ name: '' }">Forgot Password</router-link>
            </div>
            <div class="d-grid gap-2">
                <button class="btn btn-primary fw-bold" type="submit">SIGN IN</button>
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

const submitted = ref(false)

const toggleShowPassword = (node: any, e: any) => {
    node.props.suffixIcon = node.props.suffixIcon === 'eye' ? 'eyeClosed' : 'eye'
    node.props.type = node.props.type === 'password' ? 'text' : 'password'
}
const signIn = async () => {
    await new Promise((r) => setTimeout(r, 1000))
    submitted.value = true
}
</script>

<style scoped></style>