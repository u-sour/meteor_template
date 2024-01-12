<template>
    <div>
        <h1 class="fw-bolder">{{ $t('core.pages.auth.signUp.title') }}</h1>
        <h6>{{ $t('core.pages.auth.signUp.subTitle') }}</h6>
        <div class="mt-5">
            <FormKit type="form" id="signUpForm" @submit="signUp" :actions="false" :disabled="submitted">
                <div class="row">
                    <div class="col-6">
                        <FormKit name="firstName" :label="$t('core.pages.auth.signUp.form.firstName')"
                            :validation="validations.userInfo" />
                    </div>
                    <div class="col-6">
                        <FormKit name="lastName" :label="$t('core.pages.auth.signUp.form.lastName')"
                            :validation="validations.userInfo" />
                    </div>
                </div>
                <FormKit name="username" :label="$t('core.pages.auth.signUp.form.username')"
                    :validation="validations.userInfo" />
                <FormKit name="email" :label="$t('core.pages.auth.signUp.form.email')" :validation="validations.email" />
                <FormKit name="phoneNumber" :label="$t('core.pages.auth.signUp.form.phoneNumber')" validation="required" />
                <FormKit type="password" name="password" :label="$t('core.pages.auth.signUp.form.password')"
                    prefix-icon="password" suffix-icon="eyeClosed" suffix-icon-class="hover:text-blue-500"
                    :validation="validations.password" @suffix-icon-click="toggleShowPassword" />
                <FormKit type="password" name="confirmPassword" :label="$t('core.pages.auth.signUp.form.confirmPassword')"
                    prefix-icon="password" suffix-icon="eyeClosed" suffix-icon-class="hover:text-blue-500"
                    :validation="`${validations.password}|confirm:password`" @suffix-icon-click="toggleShowPassword" />
                <div class="d-grid gap-2">
                    <button class="btn btn-primary fw-bold" type="submit" :disabled="submitted">{{
                        $t('core.btns.auth.signUp').toUpperCase() }}</button>
                </div>
                <div class="text-center mt-3">
                    <span>{{ $t('core.pages.auth.signUp.components.haveAccount') }} <span><router-link
                                :to="{ name: 'core.auth.signIn', replace: true }">{{
                                    $t('core.btns.auth.signIn') }}
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
import notify from '../../../utils/notify'
import { insertUser } from '../../../api/auth/server/methods';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
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
    insertUser.call({ user: form }, (err: any, res: any) => {
        if (err) {
            submitted.value = false;
            return notify.error(err.message);
        }
        submitted.value = false;
        reset('signUpForm');
        notify.success(t(res.message))
    })
}
</script>

<style scoped></style>