import NProgress from 'nprogress'
import router from './plugins/router'
import getPageTitle from './utils/getPageTitle'
import { usePermissionStore, useTagStore, useUserStore } from './plugins/stores'
import type { RoutesInfoRes } from './types/system/routes'
import { constantsRoutes } from './plugins/router/constantsRoutes'
import type { TagList } from './types/tag'

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
    if (to.path === '/login') {
      return { path: '/' }
    } else {
      if (!permissionStore.isAddRoutes) {
        permissionStore.isAddRoutes = true
        await permissionStore.getRoutes()
        await addRoutes(getRoutes(permissionStore.menuRouters), mainRouteName)
        return to.fullPath
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

router.afterEach((to) => {
  NProgress.done()
  if (to.path === '/login') return
  const data: TagList = {
    title: to.meta.title as string,
    path: to.path,
    keepAlive: to.meta.keepAlive as string
  }
  const tagStore = useTagStore()
  tagStore.addTag(data)
})

// 获取路由
export function getRoutes(menu: RoutesInfoRes[]) {
  return constantsRoutes.concat(menu)
}

// 添加路由
export function addRoutes(_routes: RoutesInfoRes[], _parentName: string = '') {
  const flatMenuList: RoutesInfoRes[] = []
  const modules = import.meta.glob('@/views/**/*.vue')

  function recursion(routes: RoutesInfoRes[], parentName: string = '') {
    routes.forEach((item) => {
      if (item.fullPath && item.componentPath) {
        flatMenuList.push(item)
        const componentString = item.componentPath.replace(/^\/+/, '') // 过滤字符串前面所有 '/' 字符
        const componentPath = componentString.replace(/\.\w+$/, '') // 过滤掉后缀名，为了让 import 加入 .vue ，不然会有警告提示...
        const name = item.routesName || item.fullPath.replace(/\//, '') // routesName为空时，取fullPath去除开头/
        const componentUrl = '/src/' + componentPath + '.vue'

        const route = {
          path: item.fullPath,
          name,
          component: modules[componentUrl],
          meta: {
            title: item.title,
            keepAlive: item.keepAlive,
            icon: item.icon,
            parentName
          }
        }
        // 添加路由到vue-router中
        parentName ? router.addRoute(parentName, route) : router.addRoute(route)
        if (item.children && item.children.length) {
          recursion(item.children, name)
        }
      } else {
        if (item.children && item.children.length) {
          recursion(item.children, parentName)
        }
      }
    })
  }
  recursion(_routes, _parentName)
  return Promise.resolve({ tree: _routes, flat: flatMenuList })
}
