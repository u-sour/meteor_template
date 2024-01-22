<template>
    <div class="col">
        <FormKit type="form" id="editRoleGroupForm" v-model="initData" @submit="submit" :actions="false"
            :disabled="submitted">
            <FormKit name="name" :label="$t(`${labelPrefix}.name`)" validation="required" autocomplete="off" />
            <FormKit name="roles" type="checkbox" :label="$t(`${labelPrefix}.roles.label`)" :options="roleOptions"
                decorator-icon="check" :help="$t(`${labelPrefix}.roles.help`)" validation="required" />
            <FormKit type="select" name="status" :label="$t(`${labelPrefix}.status`)" :options="staticOptions.status"
                validation="required" />
            <!--form-actions-->
            <FormActions :submitted="submitted" />
        </FormKit>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import FormActions from '../../../components/form/FormActions.vue';
import { UpdateRoleGroupForm } from '/imports/modules/core/types/roleGroup';
import notify from '/imports/modules/core/utils/notify';
import staticOptions from '../../../../utils/static-options';
import dynamicOptions from '/imports/modules/core/utils/dynamic-options';
import { Option } from '/imports/modules/core/types/option';
import { reset } from '@formkit/vue';
import { useI18n } from 'vue-i18n';
import { Meteor } from 'meteor/meteor';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const { id } = useRoute().params;
const { t } = useI18n();
const labelPrefix = 'core.pages.admin.roleGroups.form';
const roleOptions = ref<Option[]>([])
const initData = ref();
const submitted = ref(false);

onMounted(async () => {
    roleOptions.value = await dynamicOptions.roles();
})

// find one child role
Meteor.call('core.admin.findOneRoleGroup', { selector: { _id: id } }, (err: any, res: any) => {
    if (err) {
        submitted.value = false;
        return notify.error(t(err.message));
    }
    initData.value = res.data;
})

const submit = async (form: UpdateRoleGroupForm) => {
    submitted.value = true;
    Meteor.call('core.admin.updateRoleGroup', { doc: form }, (err: any, res: any) => {
        if (err) {
            submitted.value = false;
            return notify.error(t(err.message));
        }
        reset('editRoleGroupForm');
        submitted.value = false;
        notify.success(t(res.message));
        router.back();
    })
}
</script>

<style scoped></style>