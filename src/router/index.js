import Vue from 'vue'
import Router from 'vue-router'
import SearchPage from '@/components/SearchPage'
import OrganizationPage from '@/components/OrganizationPage'
import UserPage from '@/components/UserPage'
import UserListPage from '@/components/UserListPage'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: SearchPage
    },
    {
      path: '/org/:login',
      component: OrganizationPage
    },
    {
      path: '/user/:login',
      component: UserPage
    },
    {
      path: '/users/:type/:login',
      component: UserListPage
    }
  ]
})
