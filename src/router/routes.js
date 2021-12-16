
const routes = [
  {
    path: '/',
    component: () => import('src/layouts/HomeLayout.vue'),
    children: [
      { path: '', name: 'Home', component: () => import('src/pages/Index.vue') },
      { path: 'start', name: 'Start', component: () => import('src/pages/Start.vue') },
      { path: 'settings', name: 'Settings', component: () => import('src/pages/Settings.vue') },
      { path: 'new-movement', name: 'New movement', component: () => import('src/pages/NewMovement.vue') }
    ]
  },
  {
    path: '/:id/',
    component: () => import('src/layouts/MovementLayout.vue'),
    children: [
      { path: '', name: 'Movement', component: () => import('src/pages/movement/Index.vue') },
      { path: 'events', name: 'Events', component: () => import('src/pages/movement/Events.vue') },
      { path: 'community', name: 'Community', component: () => import('src/pages/movement/Community.vue') },
      { path: 'vacancies', name: 'Vacant roles', component: () => import('src/pages/movement/Vacancies.vue') },
      { path: 'teams', name: 'Our teams', component: () => import('src/pages/movement/Teams.vue') },
      { path: 'partners', name: 'Partners', component: () => import('src/pages/movement/Partners.vue') }
    ]
  },
  {
    path: '/:id/dashboard',
    component: () => import('layouts/DashboardLayout.vue'),
    children: [
      { path: '', name: 'Dashboard', component: () => import('src/pages/dashboard/Index.vue') },
      { path: 'calendar', name: 'Dashboard Calendar', component: () => import('pages/dashboard/Calendar.vue') },
      { path: 'community', name: 'Dashboard Community', component: () => import('pages/dashboard/Community.vue') },
      { path: 'page', name: 'Dashboard Page', component: () => import('pages/dashboard/Page.vue') },
      { path: 'apps', name: 'Dashboard Apps', component: () => import('pages/dashboard/Apps.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
