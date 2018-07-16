import Vue from 'vue'
import Router from 'vue-router'

// Views - Components
import Login from '../components/Login'
import Dashboard from '../components/Dashboard'
import Promo from '../components/Promo'
import Eventt from '../components/Eventt'
import Store from '../components/Store'
import Sections from '../components/Sections'

// Components - Contruction
// import PromoPorComponentes from '../components/PromoPorComponentes'


// Views - Pages
// import Page404 from '@/views/pages/Page404'
// import Page500 from '@/views/pages/Page500'
// import Login from '@/views/pages/Login'
// import Register from '@/views/pages/Register'

Vue.use(Router)
export default new Router({
  mode: 'hash',
  linkActiveClass: 'open active',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/',
      // redirect: '/login',
      name: 'Login',
      component: Login,
      children: []
    },
    {
      path: '/:id/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      children: [
        {
          path: 'secciones',
          name: 'Section',
          component: Sections,
        },
        {
          path: 'promos',
          name: 'Promos',
          component: Promo,
        },
        {
          path: 'eventos',
          name: 'Eventt',
          component: Eventt,
        },
        {
          path: 'locales',
          name: 'Store',
          component: Store,
        },
      ]
    },

    //TEMPORALES
    // {
    //   path: '/ppc',
    //   // redirect: '/login',
    //   name: 'PromoPorComponentes',
    //   component: PromoPorComponentes,
    //   children: []
    // }
  ]
})
