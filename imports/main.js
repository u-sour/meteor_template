import { Meteor } from 'meteor/meteor'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { VueMeteor } from 'vue-meteor-tracker'
import i18nConfig from './modules/core/utils/config/i18n.config'
import fkConfig from './modules/core/utils/config/formkit.config'
import { plugin, defaultConfig } from '@formkit/vue'
import '/imports/styles/main.css'
import '@formkit/themes/genesis'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap'
import 'vue3-toastify/dist/index.css';
import App from './App.vue'
import { router } from './router'

Meteor.startup(() => {
  const app = createApp(App)
  const pinia = createPinia()
  app.use(pinia)
  app.use(router)
  app.use(VueMeteor)
  app.use(i18nConfig)
  app.use(plugin, defaultConfig(fkConfig))
  app.mount('#app')

  router.beforeResolve((to, from, next) => {
    if (to.meta.requiresAuth && !Meteor.userId()) {
      // (not allow user enter to route user page without login)
      // if route user want to enter require auth & user doesn't login it will redirect to login page
      return next({ name: 'core.auth.signIn', query: { redirect: to.fullPath } })
    } else if (to.meta.requiresGuest && Meteor.userId()) {
      // (not allow user enter to route sing in or sing up page after login)
      // else if route user want to enter require guest & user already login login it will go to home page
      return next({ name: 'core.auth.admin.dashboard' })
    } else {
      return next()
    }
  })
})
