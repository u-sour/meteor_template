<template>
    <div class="col">
        <FormKit type="form" id="changePasswordForm" @submit="submit" :actions="false" :disabled="submitted">
            <FormKit type="password" name="currentPassword" :label="$t(`${labelPrefix}.form.currentPassword`)"
                prefix-icon="password" suffix-icon="eyeClosed" suffix-icon-class="hover:text-blue-500"
                :validation="validations.password" @suffix-icon-click="toggleShowPassword" />
            <FormKit type="password" name="newPassword" :label="$t(`${labelPrefix}.form.newPassword`)"
                prefix-icon="password" suffix-icon="eyeClosed" suffix-icon-class="hover:text-blue-500"
                :validation="validations.password" @suffix-icon-click="toggleShowPassword" />
            <FormKit type="password" name="confirmNewPassword" :label="$t(`${labelPrefix}.form.confirmNewPassword`)"
                prefix-icon="password" suffix-icon="eyeClosed" suffix-icon-class="hover:text-blue-500"
                :validation="`${validations.password}|confirm:newPassword`" @suffix-icon-click="toggleShowPassword" />
            <div>
                <FormActions :submitted="submitted" submit-label-btn="core.btns.profile.changePassword"
                    :enable-cancel-btn="false" />
            </div>
        </FormKit>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { reset } from '@formkit/core';
import { changePasswordForm } from '../../../types/authentication';
import notify from '../../../utils/notify'
import FormActions from '../form/FormActions.vue';
import { changePassword } from '../../../api/auth/client/methods';
import { useI18n } from 'vue-i18n';

defineProps({
    labelPrefix: { type: String, required: true }
})

const { t } = useI18n()
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
    changePassword(form).then((res) => {
        submitted.value = false;
        reset('changePasswordForm');
        notify.success(t(res.message!))
    }).catch((err) => {
        submitted.value = false;
        return notify.error(t(err.reason));
    });
}
</script>

<style scoped></style>