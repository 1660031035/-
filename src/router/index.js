import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */
// 动态路由表
export const asyncRoutes = [
  // 后面补充八个配置
  {
    path: '/employees',
    component: Layout,
    children: [
      {
        path: '',
        name: 'employees',
        component: () => import('@/views/employees/employees.vue'),
        meta: { title: 'Employees', icon: 'employees' }
      },
    ]
  },
  {
    path: '/departments',
    component: Layout,
    children: [
      {
        path: '',
        name: 'departments',
        component: () => import('@/views/departments/departments.vue'),
        meta: { title: 'departments', icon: 'departments' }
      },
    ]
  },
  {
    path: '/settings',
    component: Layout,
    children: [
      {
        path: '',
        name: 'settings',
        component: () => import('@/views/settings/settings.vue'),
        meta: { title: 'settings', icon: 'settings' }
      },
    ]
  },
  {
    path: '/salarys',
    component: Layout,
    children: [
      {
        path: '',
        name: 'salarys',
        component: () => import('@/views/salarys/salarys.vue'),
        meta: { title: 'salarys', icon: 'salarys' }
      },
    ]
  },
  {
    path: '/social_securitys',
    component: Layout,
    children: [
      {
        path: '',
        name: 'social_securitys',
        component: () => import('@/views/social_securitys/social_securitys.vue'),
        meta: { title: 'social_securitys', icon: 'social_securitys' }
      },
    ]
  },
  {
    path: '/attendances',
    component: Layout,
    children: [
      {
        path: '',
        name: 'attendances',
        component: () => import('@/views/attendances/attendances.vue'),
        meta: { title: 'attendances', icon: 'attendances' }
      },
    ]
  },
  {
    path: '/approvals',
    component: Layout,
    children: [
      {
        path: '',
        name: 'approvals',
        component: () => import('@/views/approvals/approvals.vue'),
        meta: { title: 'approvals', icon: 'approvals' }
      },
    ]
  },
]

// 静态路由表，项目中每个用户都可以访问的功能
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: [...constantRoutes, ...asyncRoutes]
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
