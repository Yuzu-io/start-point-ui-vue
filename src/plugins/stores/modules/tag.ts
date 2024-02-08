import type { RoutesInfo } from '@/types/routes'
import { defineStore } from 'pinia'

export const useTagStore = defineStore('tagStore', {
  state: (): State => ({
    tagList: [
      {
        id: 'string',
        title: 'string',
        icon: 'string',
        fullPath: 'string',
        componentPath: 'string',
        parentId: 'string',
        showStatus: 'string',
        isExternalLink: 'string',
        keepAlive: 'string',
        redirect: 'string',
        type: 'string',
        authMark: 'string',
        orderIndex: 1,
        createTime: 'string',
        updateTime: 'string'
      },
      {
        id: 'string',
        title: 'string',
        icon: 'string',
        fullPath: 'string',
        componentPath: 'string',
        parentId: 'string',
        showStatus: 'string',
        isExternalLink: 'string',
        keepAlive: 'string',
        redirect: 'string',
        type: 'string',
        authMark: 'string',
        orderIndex: 1,
        createTime: 'string',
        updateTime: 'string'
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
  tagList: RoutesInfo[]
}
