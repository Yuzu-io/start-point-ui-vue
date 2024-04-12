import router from '@/plugins/router'
import type { TagList } from '@/types/tag'
import { defineStore } from 'pinia'
import { mainRouteName } from '@/permission'

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
      const routesList = router.getRoutes()
      const firstRoutes = routesList.find((item) => item.meta.parentName === mainRouteName)
      if (firstRoutes) {
        this.addTag({
          path: firstRoutes.path,
          title: firstRoutes.meta.title as string,
          keepAlive: firstRoutes.meta.keepAlive as string
        })
      }
    },
    destruction() {
      useTagStore().$reset()
    }
  }
})

interface State {
  tagList: TagList[]
}
