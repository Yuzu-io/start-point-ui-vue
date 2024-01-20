import { defineStore } from 'pinia'

export const usePermissionStore = defineStore('permissionStore', {
  state: (): State => ({
    whiteList: ['/login'],
    menuRouters: [],
    btnRouters: []
  })
})

interface State {
  whiteList: string[]
  menuRouters: []
  btnRouters: []
}
