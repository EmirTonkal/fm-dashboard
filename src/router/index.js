import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/Home.vue'),
      meta: {
        pageTitle: 'Home',
        breadcrumb: [
          {
            text: 'Home',
            active: true
          }
        ]
      }
    },
    /* TABLES START */
    {
      path: '/tables/boq',
      name: 'table-boq',
      component: () => import('@/views/tables/Boq.vue'),
      meta: {
        pageTitle: 'BOQ Table',
        breadcrumb: [
          {
            text: 'BOQ Table',
            active: true
          }
        ]
      }
    },
    {
      path: '/tables/sub-boq',
      name: 'table-sub-boq',
      component: () => import('@/views/tables/SubBoq.vue'),
      meta: {
        pageTitle: 'Sub BOQ Table',
        breadcrumb: [
          {
            text: 'Sub BOQ Table',
            active: true
          }
        ]
      }
    },
    {
      path: '/tables/wbs-sub-boq',
      name: 'table-wbs-sub-boq',
      component: () => import('@/views/tables/WbsSubBoq.vue'),
      meta: {
        pageTitle: 'WBS Sub BOQ Table',
        breadcrumb: [
          {
            text: 'WBS Sub BOQ Table',
            active: true
          }
        ]
      }
    },
    {
      path: '/tables/wbs',
      name: 'table-wbs',
      component: () => import('@/views/tables/Wbs.vue'),
      meta: {
        pageTitle: 'WBS Table',
        breadcrumb: [
          {
            text: 'WBS Table',
            active: true
          }
        ]
      }
    },
    {
      path: '/tables/activity',
      name: 'table-activity',
      component: () => import('@/views/tables/Activity.vue'),
      meta: {
        pageTitle: 'Activity Table',
        breadcrumb: [
          {
            text: 'Activity Table',
            active: true
          }
        ]
      }
    },
    {
      path: '/tables/material',
      name: 'table-material',
      component: () => import('@/views/tables/Material.vue'),
      meta: {
        pageTitle: 'Material Table',
        breadcrumb: [
          {
            text: 'Material Table',
            active: true
          }
        ]
      }
    },
    {
      path: '/tables/unit',
      name: 'table-unit',
      component: () => import('@/views/tables/Unit.vue'),
      meta: {
        pageTitle: 'Unit Table',
        breadcrumb: [
          {
            text: 'Unit Table',
            active: true
          }
        ]
      }
    },
    {
      path: '/tables/work',
      name: 'table-work',
      component: () => import('@/views/tables/Work.vue'),
      meta: {
        pageTitle: 'Work Table',
        breadcrumb: [
          {
            text: 'Work Table',
            active: true
          }
        ]
      }
    },
    {
      path: '/tables/sub-contractor',
      name: 'table-sub-contractor',
      component: () => import('@/views/tables/SubContractor.vue'),
      meta: {
        pageTitle: 'Sub Contractor Table',
        breadcrumb: [
          {
            text: 'Sub Contractor Table',
            active: true
          }
        ]
      }
    },
    {
      path: '/tables/sub-contractor-user',
      name: 'table-sub-contractor-user',
      component: () => import('@/views/tables/SubContractorUser.vue'),
      meta: {
        pageTitle: 'Sub Contractor User Table',
        breadcrumb: [
          {
            text: 'Sub Contractor User Table',
            active: true
          }
        ]
      }
    },
    {
      path: '/tables/user',
      name: 'table-user',
      component: () => import('@/views/tables/User.vue'),
      meta: {
        pageTitle: 'User Table',
        breadcrumb: [
          {
            text: 'User Table',
            active: true
          }
        ]
      }
    },
    {
      path: '/reports/pivot',
      name: 'report-pivot',
      component: () => import('@/views/reports/Pivot.vue'),
      meta: {
        pageTitle: 'Pivot Report',
        breadcrumb: [
          {
            text: 'Pivot Report',
            active: true
          }
        ]
      }
    },
    /* TABLES START */
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login.vue'),
      meta: {
        layout: 'full'
      }
    },
    {
      path: '/error-404',
      name: 'error-404',
      component: () => import('@/views/error/Error404.vue'),
      meta: {
        layout: 'full'
      }
    },
    {
      path: '*',
      redirect: 'error-404'
    },
    {
      path: '/tables/organization-chart',
      name: 'table-organization-chart',
      component: () => import('@/views/tables/OrganizationChart.vue'),
      meta: {
        pageTitle: 'Organization Chart Table',
        breadcrumb: [
          {
            text: 'Organization Chart Table',
            active: true
          }
        ]
      }
    }
  ]
});

router.beforeEach((to, _from, next) => {
  const localStorageCheck =
    localStorage.token && localStorage.dbLanguage && localStorage.siteId;

  if (to.name === 'login' && localStorageCheck) {
    router.push({ path: '/', query: { to: to.path } });
  }

  if (to.name !== 'login' && !localStorageCheck) {
    router.push({ path: '/login', query: { to: to.path } });
  }

  return next();
});

// ? For splash screen
// Remove afterEach hook if you are not using splash screen
router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById('loading-bg');
  if (appLoading) {
    appLoading.style.display = 'none';
  }
});

export default router;
