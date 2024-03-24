import type { RoutesInfo } from '@/types/routes'
import { defineStore } from 'pinia'

export const useTagStore = defineStore('tagStore', {
  state: (): State => ({
    tagList: [
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
        title: '菜单管理',
        routesName: 'string',
        icon: 'string',
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
        id: '222',
        title: '菜单管理',
        routesName: 'string',
        icon: 'string',
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
        id: '222',
        title: '菜单管理',
        routesName: 'string',
        icon: 'string',
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
        id: '222',
        title: '菜单管理',
        routesName: 'string',
        icon: 'string',
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
        id: '222',
        title: '菜单管理',
        routesName: 'string',
        icon: 'string',
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
        id: '222',
        title: '菜单管理',
        routesName: 'string',
        icon: 'string',
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
        id: '222',
        title: '菜单管理',
        routesName: 'string',
        icon: 'string',
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
        id: '222',
        title: '菜单管理',
        routesName: 'string',
        icon: 'string',
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
      }
    ]
  }),
  actions: {
    addTag(value: any) {
      if (Array.isArray(value)) {
        this.tagList.push(...value)
      } else {
        this.tagList.push(value)
      }
    },
    closeTag(index: number) {
      this.tagList.splice(index, 1)
      if (!this.tagList.length) {
        useTagStore().$reset()
      }
    },
    closeOtherTags(index: number) {
      this.tagList = [this.tagList[index]]
    }
  }
})

interface State {
  tagList: RoutesInfo[]
}
