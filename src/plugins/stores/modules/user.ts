import { getUserInfoApi, loginApi, logout } from '@/api/auth'
import type { LoginParams, LoginUserInfoRes } from '@/types/auth'
import { defineStore } from 'pinia'
import router from '@/plugins/router/index'
import { usePermissionStore, useTagStore } from '..'

export const useUserStore = defineStore('userStore', {
  state: (): State => ({
    token: '',
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
      orderIndex: 0,
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
      this.token = res.data.token
      return Promise.resolve()
    },
    async getUserInfo() {
      const res = await getUserInfoApi().catch((e) => console.log(e))
      if (!res) return Promise.reject()
      this.userInfo = res.data
      return Promise.resolve()
    },
    /**
     * 退出登录
     * @param flag 是否需要登出请求
     * @returns Promise
     */
    async logout(flag: boolean = true) {
      const res = flag ? await logout().catch((e) => console.log(e)) : null
      useUserStore().$reset()
      usePermissionStore().destruction()
      useTagStore().destruction()
      router.replace('/login') // 返回登录页
      if (!res) return Promise.reject()
      return Promise.resolve()
    }
  },
  persist: true
})

interface State {
  token: string
  userInfo: LoginUserInfoRes
}
