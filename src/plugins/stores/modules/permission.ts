import { getRoutesApi } from '@/api/auth'
import type { RoutesInfoRes } from '@/types/system/routes'
import { flushDynamicRoutes } from '@/utils/routesUtils'
import { defineStore } from 'pinia'

export const usePermissionStore = defineStore('permissionStore', {
  state: (): State => ({
    whiteList: ['/login'],
    menuRouters: [],
    btnRouters: [],
    isAddRoutes: false
  }),
  actions: {
    async getRoutes() {
      const res = await getRoutesApi().catch((e) => console.warn(e))
      if (!res) return Promise.reject()
      this.menuRouters = res.data
      return Promise.resolve()
    },
    destruction() {
      usePermissionStore().$reset()
      flushDynamicRoutes()
    }
  },
  persist: {
    paths: ['menuRouters']
  }
})

interface State {
  whiteList: string[]
  menuRouters: RoutesInfoRes[]
  btnRouters: []
  isAddRoutes: boolean
}
