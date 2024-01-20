import type { GetUserInfoRes, GetValidateCodeRes, LoginParams, LoginRes } from '@/types/auth'
import createAxios from '@/utils/axios'

const Api = {
  login: '/system/sysUser/login',
  validateCode: '/system/sysUser/getValidateCode',
  userInfo: '/system/sysUser/getUserInfo'
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
