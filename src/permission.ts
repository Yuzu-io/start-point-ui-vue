import NProgress from 'nprogress'
import router from './plugins/router'
import getPageTitle from './utils/getPageTitle'
import { usePermissionStore, useUserStore } from './plugins/stores'
import { addRoutes, getFirstDynamicRoutes } from './utils/routesUtils'

NProgress.configure({
  showSpinner: false
})

export const mainRouteName = 'AppMain'

router.beforeEach(async (to) => {
  NProgress.start()

  const userStore = useUserStore()
  const permissionStore = usePermissionStore()

  // 页面标题
  document.title = getPageTitle(to.meta.title as string)

  if (userStore.token) {
    const firstRoutes = getFirstDynamicRoutes()
    if (!permissionStore.isAddRoutes) {
      permissionStore.isAddRoutes = true
      await userStore.getUserInfo()
      await permissionStore.getRoutes()
      await addRoutes(permissionStore.menuRouters, mainRouteName)
      return to.fullPath
    } else {
      if (to.path === '/login' || to.path === '/') {
        return { path: firstRoutes ? firstRoutes.path : '/notAuth' }
      } else {
        return true
      }
    }
  } else {
    // 判断是否是白名单
    if (permissionStore.whiteList.includes(to.path)) {
      return true
    } else {
      return {
        path: '/login',
        query: {
          redirect: encodeURIComponent(to.fullPath)
        }
      }
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
