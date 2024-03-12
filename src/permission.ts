import NProgress from 'nprogress'
import router from './plugins/router'
import getPageTitle from './utils/getPageTitle'
import { usePermissionStore, useUserStore } from './plugins/stores'

NProgress.configure({
  showSpinner: false
})

router.beforeEach(async (to, from, next) => {
  NProgress.start()

  const userStore = useUserStore()
  const permissionStore = usePermissionStore()

  // 页面标题
  document.title = getPageTitle(to.meta.title as string)

  if (userStore.token) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      // 判断是否存在
      if (!router.hasRoute(to.name || '')) {
        // 获取菜单路由
        const { menuRouters } = permissionStore
        //
      }
      next()
    }
    NProgress.done()
  } else {
    // 判断是否是白名单
    if (permissionStore.whiteList.includes(to.path)) {
      next()
    } else {
      next({
        path: '/login',
        query: {
          redirect: encodeURIComponent(to.fullPath)
        }
      })
    }
    NProgress.done()
  }
})

// 添加路由
export function addRoutes(_routes: any[], _parentName: string = '') {
  const flatMenuList = []
  function recursion(routes: any[], parentName: string = '') {
    routes.forEach((item) => {
      if (item.path && item.componentPath) {
        flatMenuList.push(item)
      }
    })
  }
}
