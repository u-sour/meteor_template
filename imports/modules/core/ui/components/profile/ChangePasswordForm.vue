<template>
    <div class="col">
        <FormKit type="form" id="changePasswordForm" @submit="submit" :actions="false" :disabled="submitted">
            <FormKit type="password" name="currentPassword" :label="$t(`${labelPrefix}.form.currentPassword`)"
                prefix-icon="password" suffix-icon="eyeClosed" suffix-icon-class="hover:text-blue-500"
                :wrapper-class="{ 'formkit-wrapper': false }" :validation="validations.password"
                @suffix-icon-click="toggleShowPassword" />
            <FormKit type="password" name="newPassword" :label="$t(`${labelPrefix}.form.newPassword`)"
                prefix-icon="password" suffix-icon="eyeClosed" suffix-icon-class="hover:text-blue-500"
                :wrapper-class="{ 'formkit-wrapper': false }" :validation="validations.password"
                @suffix-icon-click="toggleShowPassword" />
            <FormKit type="password" name="confirmNewPassword" :label="$t(`${labelPrefix}.form.confirmNewPassword`)"
                prefix-icon="password" suffix-icon="eyeClosed" suffix-icon-class="hover:text-blue-500"
                :wrapper-class="{ 'formkit-wrapper': false }" :validation="`${validations.password}|confirm:newPassword`"
                @suffix-icon-click="toggleShowPassword" />
            <div>
                <button class="btn btn-primary fw-bold" type="submit" :disabled="submitted">{{
                    $t('core.btns.profile.changePassword') }}</button>
            </div>
        </FormKit>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import auth from '../../../api/auth/class'
import { reset } from '@formkit/core';
import { changePasswordForm } from '../../../types/authentication';
import notify from '../../../utils/notify'

defineProps({
    labelPrefix: { type: String, required: true }
})

const validations = {
    password: "required|contains_uppercase|length:6"
}

const submitted = ref(false)
const toggleShowPassword = (node: any, e: any) => {
    node.props.suffixIcon = node.props.suffixIcon === 'eye' ? 'eyeClosed' : 'eye'
    node.props.type = node.props.type === 'password' ? 'text' : 'password'
}

const submit = (form: changePasswordForm) => {
    submitted.value = true;
    auth.user.changePassword(form).then((res) => {
        submitted.value = false;
        reset('changePasswordForm');
        notify.success(res.message)
    }).catch((err) => {
        submitted.value = false;
        return notify.error(err.message);
    });
}
</script>

<style scoped></style>