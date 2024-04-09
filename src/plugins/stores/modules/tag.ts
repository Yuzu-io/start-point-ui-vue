import type { TagList } from '@/types/tag'
import { defineStore } from 'pinia'

export const useTagStore = defineStore('tagStore', {
  state: (): State => ({
    tagList: []
  }),
  actions: {
    addTag(value: TagList) {
      if (this.tagList.find((item) => item.path === value.path)) return
      this.tagList.push(value)
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
  tagList: TagList[]
}
