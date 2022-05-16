/* eslint-disable camelcase */
/*
ROUTER: ROUTES 🔗
In this file, all routes for the Rebel Tools app are defined.

Documentation:
- https://router.vuejs.org/
- https://quasar.dev/layout/routing-with-layouts-and-pages
*/

// IMPORTS: Lazy loaded (https://router.vuejs.org/guide/advanced/lazy-loading.html)
const MovementPage_Home = () => import("src/pages/movement/page/Home");
const MovementPage_Events = () => import("src/pages/movement/page/Events");
const MovementPage_Event = () => import("src/pages/movement/page/Event");
const MovementPage_Community = () =>
  import("src/pages/movement/page/Community");
const MovementPage_Vacancies = () =>
  import("src/pages/movement/page/Vacancies");
const MovementPage_Teams = () => import("src/pages/movement/page/Teams");
const MovementPage_Partners = () => import("src/pages/movement/page/Partners");

const MovementDashboard_Home = () =>
  import("src/pages/movement/dashboard/Home");
const MovementDashboard_Calendar = () =>
  import("src/pages/movement/dashboard/Calendar");
const MovementDashboard_EditEvent = () =>
  import("src/pages/movement/dashboard/dialogs/EditEvent");
const MovementDashboard_Page = () =>
  import("src/pages/movement/dashboard/Page");
const MovementDashboard_Community = () =>
  import("src/pages/movement/dashboard/community/Community");
const MovementDashboard_Rebel = () =>
  import("src/pages/movement/dashboard/community/Rebel");
const MovementDashboard_Outreach = () =>
  import("src/pages/movement/dashboard/community/Outreach");
const MovementDashboard_Apps = () =>
  import("src/pages/movement/dashboard/Apps");

// ROUTES
const routes = [
  {
    path: "",
    component: () => import("src/layouts/HomeLayout.vue"),
    children: [
      {
        path: "",
        name: "Home",
        component: () => import("src/pages/Index.vue"),
      },
      {
        path: "/campaigns/actionnetwork",
        name: "Action Network",
        component: () => import("src/pages/campaigns/ActionNetwork.vue"),
      },
      {
        path: "/start",
        name: "Start",
        component: () => import("src/pages/Start.vue"),
      },
      {
        path: "/privacy",
        name: "Privacy",
        component: () => import("src/pages/Privacy.vue"),
      },
      {
        path: "/settings",
        name: "Settings",
        component: () => import("src/pages/Settings.vue"),
      },
      {
        path: "/new-movement",
        name: "New movement",
        component: () => import("src/pages/NewMovement.vue"),
      },
    ],
  },
  {
    path: "/verify",
    component: () => import("src/pages/VerifyEmail.vue"),
  },
  {
    path: "/super-admin",
    component: () => import("src/layouts/SuperAdminLayout.vue"),
    children: [
      {
        path: "",
        name: "Super admin",
        component: () => import("src/pages/super-admin/Index.vue"),
      },
    ],
  },
  {
    path: "/:movementPath/",
    component: () => import("src/layouts/movement/MovementLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("src/layouts/movement/PageLayout.vue"),
        children: [
          { path: "", name: "Movement", component: MovementPage_Home },
          { path: "events", name: "Events", component: MovementPage_Events },
          {
            path: "events/:eventPath",
            name: "Event",
            component: MovementPage_Event,
          },
          {
            path: "community",
            name: "Community",
            component: MovementPage_Community,
          },
          {
            path: "vacancies",
            name: "Vacant roles",
            component: MovementPage_Vacancies,
          },
          { path: "teams", name: "Our teams", component: MovementPage_Teams },
          {
            path: "partners",
            name: "Partners",
            component: MovementPage_Partners,
          },
        ],
      },
      {
        path: "dashboard/",
        component: () => import("src/layouts/movement/DashboardLayout.vue"),
        children: [
          {
            path: "",
            name: "Dashboard",
            components: {
              FirstView: MovementDashboard_Home,
            },
            meta: { app: "Home" },
          },
          {
            path: "calendar/",
            name: "Dashboard Calendar",
            components: {
              FirstView: MovementDashboard_Calendar,
            },
            meta: { app: "Calendar" },
          },
          {
            path: "calendar/new-event/",
            name: "Dashboard New Event",
            components: {
              FirstView: MovementDashboard_Calendar,
              SecondView: MovementDashboard_EditEvent,
            },
            meta: { secondView: true, app: "Calendar" },
          },
          {
            path: "calendar/:eventID/edit",
            name: "Dashboard Event Edit",
            components: {
              FirstView: MovementDashboard_Calendar,
              SecondView: MovementDashboard_EditEvent,
            },
            meta: { secondView: true, app: "Calendar" },
          },
          {
            path: "community",
            name: "Dashboard Community",
            components: {
              FirstView: MovementDashboard_Community,
            },
            meta: { app: "Community" },
          },
          {
            path: "community/:userID",
            name: "Dashboard Rebel",
            components: {
              FirstView: MovementDashboard_Community,
              SecondView: MovementDashboard_Rebel,
            },
            meta: { secondView: true, app: "Community" },
          },
          {
            path: "page",
            name: "Dashboard Page",
            components: {
              FirstView: MovementDashboard_Page,
            },
            meta: { app: "Page" },
          },
        ],
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)",
    name: "404",
    component: () => import("pages/Error404.vue"),
  },
];

export default routes;
