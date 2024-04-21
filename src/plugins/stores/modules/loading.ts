import { defineStore } from 'pinia'

export const useLoadingStore = defineStore('loadingStore', {
  state: (): State => ({
    loading: false,
    delay: 1,
    tip: '加载中...'
  }),
  actions: {
    isLoading(val: boolean) {
      this.loading = val
    }
  }
})

interface State {
  loading: boolean
  delay: number
  tip: string
}
