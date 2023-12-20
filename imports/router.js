import { createRouter, createWebHistory } from 'vue-router'
import app from './ui/routes'
import core from '/imports/modules/core/ui/routes'

export const router = createRouter({
  history: createWebHistory(),
  routes: [...app, ...core],
})
