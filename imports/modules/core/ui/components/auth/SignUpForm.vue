<template>
    <div>
        <h1 class="fw-bolder">Join us today!</h1>
        <h6 class="text-secondary">Sign up now to become a member.</h6>
        <div class="mt-5">
            <FormKit type="form" id="signUpForm" @submit="signUp" :actions="false" :disabled="submitted">
                <div class="row">
                    <div class="col-6">
                        <FormKit name="firstName" label="Firstname" :wrapper-class="{ 'formkit-wrapper': false }"
                            validation="required|length:3" />
                    </div>
                    <div class="col-6">
                        <FormKit name="lastName" label="Lastname" :wrapper-class="{ 'formkit-wrapper': false }"
                            validation="required|length:3" />
                    </div>
                </div>
                <FormKit name="username" label="Username" :wrapper-class="{ 'formkit-wrapper': false }"
                    validation="required|length:3" />
                <FormKit name="email" label="Email address" :wrapper-class="{ 'formkit-wrapper': false }"
                    validation="required|email" />
                <FormKit type="password" name="password" label="Password" prefix-icon="password" suffix-icon="eyeClosed"
                    suffix-icon-class="hover:text-blue-500" :wrapper-class="{ 'formkit-wrapper': false }"
                    validation="required" @suffix-icon-click="toggleShowPassword" />
                <FormKit type="password" name="confirmPassword" label="Confirm Password" prefix-icon="password"
                    suffix-icon="eyeClosed" suffix-icon-class="hover:text-blue-500"
                    :wrapper-class="{ 'formkit-wrapper': false }" validation="required|confirm:password"
                    @suffix-icon-click="toggleShowPassword" />
                <div class="d-grid gap-2">
                    <button class="btn btn-primary fw-bold" type="submit" :disabled="submitted">SIGN UP</button>
                </div>
                <div class="text-center mt-3">
                    <span>Already have an account? <span><router-link :to="{ name: 'core.auth.signIn', replace: true }">Sign
                                In
                            </router-link></span></span>
                </div>
            </FormKit>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { reset } from '@formkit/core'
import { SignUpFrom } from '../../../types/authentication';
import { insertUser } from '../../../api/auth/methods'

const submitted = ref(false)
const toggleShowPassword = (node: any, e: any) => {
    node.props.suffixIcon = node.props.suffixIcon === 'eye' ? 'eyeClosed' : 'eye'
    node.props.type = node.props.type === 'password' ? 'text' : 'password'
}
const signUp = async (form: SignUpFrom) => {
    form.status = 'inactive';
    form.roles = ['guest'];
    submitted.value = true;
    await new Promise((r) => setTimeout(r, 1000))
    insertUser({ user: form }, (err, res) => {
        if (err) {
            submitted.value = false;
            return console.log(err);
        }
        submitted.value = false;
        reset('signUpForm');
        console.log('success ...', res)
    })

}
</script>

<style scoped></style>