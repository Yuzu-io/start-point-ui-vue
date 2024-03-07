import type { GetUserInfoRes, GetValidateCodeRes, LoginParams, LoginRes } from '@/types/auth'
import createAxios from '@/utils/axios'

const Api = {
  login: '/auth/login',
  validateCode: '/auth/getValidateCode',
  userInfo: '/auth/getUserInfo',
  logout: '/auth/logout'
}

export function loginApi(data: LoginParams) {
  return createAxios<LoginRes>(
    {
      url: Api.login,
      method: 'post',
      data
    },
    {
      showCodeMessage: true
    }
  )
}

export function getValidateCodeApi() {
  return createAxios<GetValidateCodeRes>({
    url: Api.validateCode,
    method: 'get'
  })
}

export function getUserInfoApi() {
  return createAxios<GetUserInfoRes>(
    {
      url: Api.userInfo,
      method: 'get'
    },
    {
      showCodeMessage: true
    }
  )
}

export function logout() {
  return createAxios<GetUserInfoRes>(
    {
      url: Api.logout,
      method: 'get'
    },
    {
      showCodeMessage: true
    }
  )
}
