import { defineStore } from 'pinia'

export const useUserStore = defineStore('userStore', {
  state: (): State => ({
    accessToken: ''
  }),
  actions: {}
})

interface State {
  accessToken: string
}
