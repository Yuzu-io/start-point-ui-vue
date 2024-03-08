import { getUserInfoApi, loginApi, logout } from '@/api/auth'
import type { LoginParams } from '@/types/auth'
import type { UserInfoRes } from '@/types/user'
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
      status: '',
      isDelete: '',
      createTime: '',
      updateTime: '',
      roleList: []
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
    },
    async logout() {
      const res = await logout().catch((e) => console.log(e))
      if (!res) return Promise.reject()
      useUserStore().$reset()
      return Promise.resolve()
    }
  },
  persist: {
    paths: ['accessToken']
  }
})

interface State {
  accessToken: string
  userInfo: UserInfoRes
}
