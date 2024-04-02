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
        icon: 'Insert_Chart',
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
        icon: 'Settings',
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
            icon: 'Menu',
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
            icon: 'Menu',
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
          },
          {
            id: '555',
            title: '用户管理',
            routesName: 'string',
            icon: 'Menu',
            fullPath: '/user',
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
