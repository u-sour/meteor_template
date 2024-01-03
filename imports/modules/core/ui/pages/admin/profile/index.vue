<template>
    <div class="row g-3">
        <div class="col-lg-2">
            <div class="card bg-light-subtle border-0 py-3 d-flex align-items-center">
                <img src="/images/404/No-Image-Placeholder.svg" class="profile-img rounded me-2 mb-2" alt="profile image">
                <div class="card-body text-center">
                    <h5 class="card-title">{{ fullName.toUpperCase() }}</h5>
                    <p class="card-text">{{ job }}</p>
                    <!-- <RouterLink to="" class="btn btn-primary">Edit Profile</RouterLink> -->
                </div>
            </div>
        </div>
        <div class="col-lg-10">
            <div class="card bg-light-subtle border-0 p-3">
                <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
                    <li class="nav-item" role="presentation">
                        <button class="nav-link active" id="pills-home-tab" data-bs-toggle="pill"
                            data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home"
                            aria-selected="true">{{ $t(`${labelOverviewPrefix}.title`) }}</button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link" id="pills-profile-tab" data-bs-toggle="pill"
                            data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile"
                            aria-selected="false">{{ $t(`${labelEditProfilePrefix}.title`) }}</button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link" id="pills-contact-tab" data-bs-toggle="pill"
                            data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact"
                            aria-selected="false">{{ $t(`${labelChangePasswordPrefix}.title`) }}</button>
                    </li>
                </ul>
                <div class="tab-content" id="pills-tabContent">
                    <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab"
                        tabindex="0">
                        <Overview :label-prefix="labelOverviewPrefix" />
                    </div>
                    <div class="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab"
                        tabindex="0">
                        <EditProfileForm :label-prefix="labelEditProfilePrefix" />
                    </div>
                    <div class="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab"
                        tabindex="0">
                        <ChangePasswordForm :label-prefix="labelChangePasswordPrefix" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { toRefs } from 'vue';
import { useAuthStore } from '../../../../stores/auth';
import Overview from '../../../components/profile/Overview.vue';
import EditProfileForm from '../../../components/profile/EditProfileForm.vue';
import ChangePasswordForm from '../../../components/profile/ChangePasswordForm.vue';

const labelOverviewPrefix = 'core.pages.admin.profile.overview';
const labelEditProfilePrefix = 'core.pages.admin.profile.editProfile';
const labelChangePasswordPrefix = 'core.pages.admin.profile.changePassword';
const authStore = useAuthStore()
const { fullName, job } = toRefs(authStore)
</script>

<style scoped>
.profile-img {
    width: 128px;
    height: 128px;
    object-fit: cover;
}
</style>