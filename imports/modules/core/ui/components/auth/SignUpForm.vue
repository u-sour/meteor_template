<template>
    <div>
        <h1 class="fw-bolder">Join us today!</h1>
        <h6 class="text-secondary">Sign up now to become a member.</h6>
        <div class="mt-5">
            <FormKit type="form" id="signUpForm" @submit="signUp" :actions="false" :disabled="submitted">
                <div class="row">
                    <div class="col-6">
                        <FormKit name="firstName" label="Firstname" :wrapper-class="{ 'formkit-wrapper': false }"
                            :validation="validations.userInfo" />
                    </div>
                    <div class="col-6">
                        <FormKit name="lastName" label="Lastname" :wrapper-class="{ 'formkit-wrapper': false }"
                            :validation="validations.userInfo" />
                    </div>
                </div>
                <FormKit name="username" label="Username" :wrapper-class="{ 'formkit-wrapper': false }"
                    :validation="validations.userInfo" />
                <FormKit name="email" label="Email address" :wrapper-class="{ 'formkit-wrapper': false }"
                    :validation="validations.email" />
                <FormKit type="password" name="password" label="Password" prefix-icon="password" suffix-icon="eyeClosed"
                    suffix-icon-class="hover:text-blue-500" :wrapper-class="{ 'formkit-wrapper': false }"
                    :validation="validations.password" @suffix-icon-click="toggleShowPassword" />
                <FormKit type="password" name="confirmPassword" label="Confirm Password" prefix-icon="password"
                    suffix-icon="eyeClosed" suffix-icon-class="hover:text-blue-500"
                    :wrapper-class="{ 'formkit-wrapper': false }" :validation="`${validations.password}|confirm:password`"
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
import auth from '../../../api/auth/class'
import { SignUpFrom } from '../../../types/authentication';
import notify from '../../../utils/notify'

const validations = {
    userInfo: "required|length:4",
    email: "required|email",
    password: "required|contains_uppercase|length:6"
}
const submitted = ref(false)
const toggleShowPassword = (node: any, e: any) => {
    node.props.suffixIcon = node.props.suffixIcon === 'eye' ? 'eyeClosed' : 'eye'
    node.props.type = node.props.type === 'password' ? 'text' : 'password'
}
const signUp = (form: SignUpFrom) => {
    form.status = 'inactive';
    form.roles = ['guest'];
    submitted.value = true;
    auth.admin.insertUser.call({ user: form }, (err, res) => {
        if (err) {
            submitted.value = false;
            return notify.error(err.message);
        }
        submitted.value = false;
        reset('signUpForm');
        notify.success('congratulation, account have been created.')
    })
}
</script>

<style scoped></style>