import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/layout'
  },
  {
    path: '/layout',
    name: 'layout',
    component: () => import('@/layouts/AppMain.vue'),
    redirect: 'dashboard',
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        meta: {
          title: '仪表盘',
          keepAlive: true,
          parentPath: ''
        }
      },
      {
        path: '/system',
        name: 'system',
        meta: {
          title: '系统管理',
          keepAlive: true,
          parentPath: ''
        },
        children: [
          {
            path: '/menu',
            name: 'menu',
            component: () => import('@/views/system/menu/index.vue'),
            meta: {
              title: '菜单管理',
              keepAlive: true,
              parentPath: '/system'
            }
          }
        ]
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      title: '登录'
    },
    component: () => import('@/views/login/Login.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
