import NProgress from 'nprogress'
import router from './plugins/router'
import getPageTitle from './utils/getPageTitle'
import { usePermissionStore, useUserStore } from './plugins/stores'
import { MessagePlugin } from 'tdesign-vue-next'

NProgress.configure({ showSpinner: false })

router.beforeEach(async (to, from, next) => {
  NProgress.start()

  const userStore = useUserStore()
  const permissionStore = usePermissionStore()

  // 页面标题
  document.title = getPageTitle(to.meta)

  if (userStore.accessToken) {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
      return
    }
    try {
      // 获取用户个人信息
      await userStore.getUserInfo()
      // 获取菜单路由
      const { menuRouters } = permissionStore
      // 判断是否存在
      if (menuRouters && !menuRouters.length) {
        const routeList = []
      }
    } catch (error: any) {
      MessagePlugin.error(error.message)
      next({
        path: '/login',
        query: {
          redirect: encodeURIComponent(to.fullPath)
        }
      })
      NProgress.done()
    }
  } else {
    // 判断是否是白名单

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
