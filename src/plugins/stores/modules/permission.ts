import { getRoutesApi } from '@/api/auth'
import type { RoutesInfoRes } from '@/types/routes'
import { defineStore } from 'pinia'

export const usePermissionStore = defineStore('permissionStore', {
  state: (): State => ({
    whiteList: ['/login'],
    menuRouters: [
      {
        id: '111',
        title: '仪表盘',
        routesName: 'string',
        icon: 'InsertChartFilled',
        fullPath: '/dashboard',
        componentPath: 'string',
        parentId: 'string',
        showStatus: 'string',
        isExternalLink: 'string',
        keepAlive: 'string',
        type: 'string',
        status: '0',
        orderIndex: 1,
        createTime: 'string',
        updateTime: 'string'
      },
      {
        id: '222',
        title: '系统管理',
        routesName: 'string',
        icon: 'SettingsFilled',
        fullPath: '/system',
        componentPath: 'string',
        parentId: 'string',
        showStatus: 'string',
        isExternalLink: 'string',
        keepAlive: 'string',
        type: 'string',
        status: '0',
        orderIndex: 1,
        createTime: 'string',
        updateTime: 'string',
        children: [
          {
            id: '333',
            title: '菜单管理',
            routesName: 'string',
            icon: 'MenuFilled',
            fullPath: '/menu',
            componentPath: 'string',
            parentId: 'string',
            showStatus: 'string',
            isExternalLink: 'string',
            keepAlive: 'string',
            type: 'string',
            status: '0',
            orderIndex: 1,
            createTime: 'string',
            updateTime: 'string'
          },
          {
            id: '444',
            title: '角色管理',
            routesName: 'string',
            icon: 'MenuFilled',
            fullPath: '/role',
            componentPath: 'string',
            parentId: 'string',
            showStatus: 'string',
            isExternalLink: 'string',
            keepAlive: 'string',
            type: 'string',
            status: '0',
            orderIndex: 1,
            createTime: 'string',
            updateTime: 'string'
          }
        ]
      }
    ],
    btnRouters: []
  }),
  actions: {
    async getRoutes() {
      const res = await getRoutesApi().catch((e) => console.warn(e))
      if (!res) return Promise.reject()
      this.menuRouters = res.data
      return Promise.resolve()
    }
  }
})

interface State {
  whiteList: string[]
  menuRouters: RoutesInfoRes[]
  btnRouters: []
}
