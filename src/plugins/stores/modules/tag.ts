import router from '@/plugins/router'
import type { TagList } from '@/types/tag'
import { defineStore } from 'pinia'

export const useTagStore = defineStore('tagStore', {
  state: (): State => ({
    tagList: []
  }),
  actions: {
    addTag(value: TagList) {
      const isFind = this.tagList.find((item) => item.path === value.path)
      if (!isFind) {
        this.tagList.push(value)
      }
    },
    closeTag(index: number) {
      this.tagList.splice(index, 1)
      if (!this.tagList.length) {
        router.push('/')
        this.init()
      }
    },
    closeOtherTags(index: number) {
      this.tagList = [this.tagList[index]]
    },
    closeAllTags() {
      useTagStore().$reset()
      if (!this.tagList.length) {
        router.push('/')
        this.init()
      }
    },
    init() {
      this.addTag({
        path: '/dashboard',
        title: '仪表盘',
        keepAlive: '0'
      })
    }
  }
})

interface State {
  tagList: TagList[]
}
