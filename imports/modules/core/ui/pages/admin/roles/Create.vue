<template>
    <div class="col">
        <FormKit type="form" id="createUserForm" @submit="submit" #default="{ value }" :actions="false"
            :disabled="submitted">
            <FormKit name="_id" :label="$t(`${labelPrefix}.name`)" validation="required" />
            <!--form-actions-->
            <FormActions :submitted="submitted" />
        </FormKit>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import FormActions from '../../../components/form/FormActions.vue';
import { CreateUserForm } from '/imports/modules/core/types/user';
import notify from '/imports/modules/core/utils/notify';
import staticOptions from '../../../../utils/static-options';
import dynamicOptions from '/imports/modules/core/utils/dynamic-options';
import { Option } from '/imports/modules/core/types/option';
import { reset } from '@formkit/vue';
import { useI18n } from 'vue-i18n';
import { Meteor } from 'meteor/meteor';

const { t } = useI18n()
const labelPrefix = 'core.pages.admin.roles.form';
const validations = {
    userInfo: "required|length:4",
    email: "required|email",
    password: "required|contains_uppercase|length:6"
}
const roleOptions = ref<Option[]>([])
const submitted = ref(false)

onMounted(async () => {
    roleOptions.value = await dynamicOptions.roles()
})

const toggleShowPassword = (node: any, e: any) => {
    node.props.suffixIcon = node.props.suffixIcon === 'eye' ? 'eyeClosed' : 'eye'
    node.props.type = node.props.type === 'password' ? 'text' : 'password'
}

const submit = async (form: CreateUserForm) => {
    submitted.value = true;
    Meteor.call('core.admin.insertUser', { user: form }, (err: any, res: any) => {
        if (err) {
            submitted.value = false;
            return notify.error(err.message);
        }
        reset('createUserForm');
        submitted.value = false;
        notify.success(t(res.message))
    })

}
</script>

<style scoped></style>