import { Meteor } from 'meteor/meteor'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VueProgressBar from '@aacassandra/vue3-progressbar'
import { VueMeteor } from 'vue-meteor-tracker'
import vue3ProgressbarConfig from './modules/core/utils/config/vue3-progressbar.config'
import i18nConfig from './modules/core/utils/config/i18n.config'
import fkConfig from './modules/core/utils/config/formkit.config'
import { plugin, defaultConfig } from '@formkit/vue'
import Vue3EasyDataTable from 'vue3-easy-data-table'
import 'bootstrap'
import '/imports/styles/main.scss'
import '@formkit/themes/genesis'
import 'vue3-toastify/dist/index.css'
import 'vue3-easy-data-table/dist/style.css'
import App from './App.vue'
import { router } from './router'
import { userIsInAuthorization } from './modules/core/utils/security'

Meteor.startup(() => {
  const app = createApp(App)
  const pinia = createPinia()
  app.use(pinia)
  app.use(router)
  app.use(VueMeteor)
  app.use(i18nConfig)
  app.use(VueProgressBar, vue3ProgressbarConfig)
  app.use(plugin, defaultConfig(fkConfig))
  app.component('EasyDataTable', Vue3EasyDataTable)
  app.mount('#app')

  const progress = app.config.globalProperties.$Progress

  /**
   * Navigation Router Guards
   **/
  router.beforeEach((to, from, next) => {
    progress.start()
    if (to.meta.requiresAuth && !Meteor.userId()) {
      // (not allow user enter to route user page without login)
      // if route user want to enter require auth & user doesn't login it will redirect to login page
      return next({
        name: 'core.auth.signIn',
        query: { redirect: to.fullPath },
      })
    } else if (to.meta.requiresGuest && Meteor.userId()) {
      // (not allow user enter to route sing in or sing up page after login)
      // else if route user want to enter require guest & user already login login it will go to home page
      return next({ name: 'core.auth.admin.dashboard' })
    } else if (
      to.meta.requiresAuth &&
      !userIsInAuthorization({
        parentRoutePath: to.meta.authorization.parentRoutePath,
        roles: to.meta.authorization.roles,
      })
    ) {
      // permission to access
      return next({ name: 'core.forbidden' })
    } else {
      return next()
    }
  })
  //  hook the progress bar to finish after we've finished moving router-view
  router.afterEach(() => {
    progress.finish()
  })
})
