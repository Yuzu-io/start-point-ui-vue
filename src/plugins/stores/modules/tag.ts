import { defineStore } from 'pinia'

export const useTagStore = defineStore('tagStore', {
  state: (): State => ({
    tagList: [
      {
        id: 1,
        name: '首页'
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
  tagList: any[]
}
