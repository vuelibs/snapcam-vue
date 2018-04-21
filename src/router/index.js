import Vue from 'vue'
import Router from 'vue-router'
import Webcam from '@/components/Webcam'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', name: 'webcam', component: Webcam }
  ]
})
