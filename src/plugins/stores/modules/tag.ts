import router from '@/plugins/router'
import type { TagList } from '@/types/tag'
import { defineStore } from 'pinia'
import { getFirstDynamicRoutes } from '@/utils/routesUtils'
import { mainRouteName } from '@/permission'

export const useTagStore = defineStore('tagStore', {
  state: (): State => ({
    tagList: [],
    cacheView: []
  }),
  actions: {
    addTag(value: TagList) {
      const isFind = this.tagList.find((item) => item.path === value.path)
      if (!isFind) {
        this.tagList.push(value)
      }
      if (!this.cacheView.includes(value.componentName) && value.keepAlive === '0') {
        this.cacheView.push(value.componentName)
      }
    },
    closeTag(index: number) {
      const cacheViewIndex = this.cacheView.indexOf(this.tagList[index].componentName)
      this.cacheView.splice(cacheViewIndex, 1)
      this.tagList.splice(index, 1)
      if (!this.tagList.length) {
        this.init()
      }
    },
    closeOtherTags(index: number) {
      if (this.tagList[index].keepAlive === '0') {
        this.cacheView = [this.tagList[index].componentName]
      }
      this.tagList = [this.tagList[index]]
    },
    closeAllTags() {
      useTagStore().$reset()
      if (!this.tagList.length) {
        this.init()
      }
    },
    init() {
      const firstRoutes = getFirstDynamicRoutes()
      if (firstRoutes) {
        router.push(firstRoutes.path)
        this.addTag({
          path: firstRoutes.path,
          title: firstRoutes.meta.title as string,
          keepAlive: firstRoutes.meta.keepAlive as string,
          componentName: `${mainRouteName}-${firstRoutes.name as string}`
        })
      } else {
        router.push('/')
      }
    },
    destruction() {
      useTagStore().$reset()
    }
  }
})

interface State {
  tagList: TagList[]
  cacheView: string[]
}
