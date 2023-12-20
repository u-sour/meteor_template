import { Meteor } from 'meteor/meteor'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { VueMeteor } from 'vue-meteor-tracker'
import config from './config/formkit.config'
import { plugin, defaultConfig } from '@formkit/vue'
import '@formkit/themes/genesis'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap'
import App from './App.vue'
import { router } from './router'

Meteor.startup(() => {
  const app = createApp(App)
  const pinia = createPinia()
  app.use(pinia)
  app.use(router)
  app.use(VueMeteor)
  app.use(plugin, defaultConfig(config))
  app.mount('#app')
})
