import { getDictTypeDataApi } from '@/api/system/dictData'
import type { DictDataInfo } from '@/types/system/dictData'
import { defineStore } from 'pinia'

export const useDictStore = defineStore('dictStore', {
  state: (): State => ({
    dictDataMap: new Map<string, DictDataInfo[]>()
  }),
  actions: {
    async getDictData(dictType: string) {
      const dictData = this.dictDataMap.get(dictType)
      if (dictData) {
        return Promise.resolve(dictData)
      }
      const result = await getDictTypeDataApi(dictType).catch(() => Promise.reject([]))
      if (result.code === 200) {
        this.dictDataMap.set(dictType, result.data)
        return Promise.resolve(result.data)
      }
      return Promise.reject([])
    }
  }
})

interface State {
  dictDataMap: Map<string, DictDataInfo[]>
}
