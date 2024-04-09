import { getRoutesApi } from '@/api/auth'
import { addRoutes, getRoutes, mainRouteName } from '@/permission'
import type { RoutesInfoRes } from '@/types/system/routes'
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
      await addRoutes(getRoutes(this.menuRouters), mainRouteName)
      return Promise.resolve()
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
