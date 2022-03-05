/* eslint-disable camelcase */
/*
ROUTER: ROUTES 🔗
In this file, all routes for the Rebel Tools app are defined.

Documentation:
- https://router.vuejs.org/
- https://quasar.dev/layout/routing-with-layouts-and-pages
*/

// IMPORTS: Lazy loaded (https://router.vuejs.org/guide/advanced/lazy-loading.html)
const MovementPage_Home = () => import('src/pages/movement/page/Home')
const MovementPage_Events = () => import('src/pages/movement/page/Events')
const MovementPage_Event = () => import('src/pages/movement/page/Event')
const MovementPage_Community = () => import('src/pages/movement/page/Community')
const MovementPage_Vacancies = () => import('src/pages/movement/page/Vacancies')
const MovementPage_Teams = () => import('src/pages/movement/page/Teams')
const MovementPage_Partners = () => import('src/pages/movement/page/Partners')

const MovementDashboard_Home = () => import('src/pages/movement/dashboard/Home')
const MovementDashboard_Calendar = () => import('src/pages/movement/dashboard/Calendar')
const MovementDashboard_NewEvent = () => import('src/pages/movement/dashboard/NewEvent')
const MovementDashboard_Page = () => import('src/pages/movement/dashboard/Page')
const MovementDashboard_Community = () => import('src/pages/movement/dashboard/Community')
const MovementDashboard_Apps = () => import('src/pages/movement/dashboard/Apps')

// ROUTES
const routes = [
  {
    path: '/',
    component: () => import('src/layouts/HomeLayout.vue'),
    children: [
      { path: '', name: 'Home', component: () => import('src/pages/Index.vue') },
      { path: 'campaigns/actionnetwork', name: 'Action Network', component: () => import('src/pages/campaigns/ActionNetwork.vue') },
      { path: 'start', name: 'Start', component: () => import('src/pages/Start.vue') },
      { path: 'privacy', name: 'Privacy', component: () => import('src/pages/Privacy.vue') },
      { path: 'settings', name: 'Settings', component: () => import('src/pages/Settings.vue') },
      { path: 'new-movement', name: 'New movement', component: () => import('src/pages/NewMovement.vue') }
    ]
  },
  {
    path: '/verify',
    component: () => import('src/pages/VerifyEmail.vue')
  },
  {
    path: '/super-admin/',
    component: () => import('src/layouts/SuperAdminLayout.vue'),
    children: [
      { path: '', name: 'Super admin', component: () => import('src/pages/super-admin/Index.vue') }
    ]
  },
  {
    path: '/:movementPath/',
    component: () => import('src/layouts/movement/MovementLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('src/layouts/movement/PageLayout.vue'),
        children: [
          { path: '', name: 'Movement', component: MovementPage_Home },
          { path: 'events', name: 'Events', component: MovementPage_Events },
          { path: 'events/:eventPath', name: 'Event', component: MovementPage_Event },
          { path: 'community', name: 'Community', component: MovementPage_Community },
          { path: 'vacancies', name: 'Vacant roles', component: MovementPage_Vacancies },
          { path: 'teams', name: 'Our teams', component: MovementPage_Teams },
          { path: 'partners', name: 'Partners', component: MovementPage_Partners }
        ]
      },
      {
        path: 'dashboard/',
        component: () => import('src/layouts/movement/DashboardLayout.vue'),
        children: [
          { path: '', name: 'Dashboard', component: MovementDashboard_Home },
          { path: 'calendar', name: 'Dashboard Calendar', component: MovementDashboard_Calendar },
          { path: 'calendar/new-event', name: 'Dashboard New Event', component: MovementDashboard_NewEvent },
          { path: 'community', name: 'Dashboard Community', component: MovementDashboard_Community },
          { path: 'page', name: 'Dashboard Page', component: MovementDashboard_Page },
          { path: 'apps', name: 'Dashboard Apps', component: MovementDashboard_Apps }
        ]
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)',
    name: '404',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
