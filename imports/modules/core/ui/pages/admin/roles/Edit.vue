<template>
    <div class="col">
        <FormKit type="form" id="editRoleForm" v-model="initData" @submit="submit" :actions="false" :disabled="submitted">
            <div class="row">
                <div class="col-6">
                    <FormKit name="name" :label="$t(`${labelPrefix}.name`)" validation="required" autocomplete="off" />
                </div>
                <div class="col-6">
                    <FormKit type="select" name="status" :label="$t(`${labelPrefix}.status`)"
                        :options="staticOptions.status" validation="required" />
                </div>
            </div>
            <!--form-actions-->
            <FormActions :submitted="submitted" />
        </FormKit>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import FormActions from '../../../components/form/FormActions.vue';
import { UpdateRoleForm } from '/imports/modules/core/types/role';
import notify from '/imports/modules/core/utils/notify';
import staticOptions from '../../../../utils/static-options';
import { reset } from '@formkit/vue';
import { useI18n } from 'vue-i18n';
import { Meteor } from 'meteor/meteor';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const { id } = useRoute().params;
const { t } = useI18n();
const labelPrefix = 'core.pages.admin.settings.roles.form';
const initData = ref();
const submitted = ref(false);

// find one child role
Meteor.call('core.admin.findOneRole', { selector: { _id: id } }, (err: any, res: any) => {
    if (err) {
        submitted.value = false;
        return notify.error(t(err.message));
    }
    initData.value = res.data;
})

const submit = async (form: UpdateRoleForm) => {
    submitted.value = true;
    Meteor.call('core.admin.updateRole', { doc: form }, (err: any, res: any) => {
        if (err) {
            submitted.value = false;
            return notify.error(t(err.message));
        }
        reset('editRoleForm');
        submitted.value = false;
        notify.success(t(res.message));
        router.back();
    })
}
</script>

<style scoped></style>