import { getUserInfoApi, loginApi } from '@/api/auth'
import type { GetUserInfoRes, LoginParams } from '@/types/auth'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('userStore', {
  state: (): State => ({
    accessToken: '',
    userInfo: {
      id: '',
      username: '',
      account: '',
      sex: '',
      avatar: '',
      age: 0,
      email: '',
      phone: '',
      createTime: '',
      updateTime: ''
    }
  }),
  actions: {
    async login(params: LoginParams) {
      const res = await loginApi(params).catch((e) => console.warn(e))
      if (!res) return Promise.reject()
      this.accessToken = res.data.token
      return Promise.resolve()
    },
    async getUserInfo() {
      const res = await getUserInfoApi().catch((e) => console.log(e))
      if (!res) return Promise.reject()
      this.userInfo = res.data
      return Promise.resolve()
    }
  },
  persist: true
})

interface State {
  accessToken: string
  userInfo: GetUserInfoRes
}
