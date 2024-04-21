import router from '@/plugins/router'
import type { RoutesInfoRes } from '@/types/system/routes'

// 获取第一个动态路由
export function getFirstDynamicRoutes() {
  const routesList = router.getRoutes()
  const firstRoutes = routesList.find(
    (item) =>
      item.meta &&
      item.meta.dynamic &&
      item.meta.isExternalLink === '1' &&
      item.meta.showStatus === '0'
  )
  return firstRoutes
}

// 销毁动态路由
export function flushDynamicRoutes() {
  const getRoutes = router.getRoutes()
  const dynamicRoutes = getRoutes.filter((route) => route.meta && route.meta.dynamic)

  dynamicRoutes.forEach((route) => {
    router.removeRoute(route.name as string)
  })
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
            showStatus: item.showStatus,
            isExternalLink: item.isExternalLink,
            icon: item.icon,
            parentName,
            dynamic: true // 标识动态
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
