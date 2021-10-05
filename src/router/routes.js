
const routes = [
  {
    path: '/',
    component: () => import('src/layouts/HomeLayout.vue'),
    children: [
      { path: '', name: 'Home', component: () => import('src/pages/Index.vue') }
    ]
  },
  {
    path: '/:id/',
    component: () => import('src/layouts/MovementLayout.vue'),
    children: [
      { path: '', name: 'Movement', component: () => import('src/pages/Movement.vue') },
      { path: 'events', name: 'Events', component: () => import('src/pages/Events.vue') },
      { path: 'community', name: 'Community', component: () => import('pages/Community.vue') }
    ]
  },
  {
    path: '/dashboard',
    component: () => import('layouts/DashboardLayout.vue'),
    children: [
      { path: '', name: 'Dashboard', component: () => import('pages/Dashboard.vue') },
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
