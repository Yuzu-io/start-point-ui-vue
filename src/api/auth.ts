import type { GetValidateCodeRes, LoginParams, LoginRes, LoginUserInfoRes } from '@/types/auth'
import type { RoutesInfoRes } from '@/types/system/routes'
import createAxios from '@/utils/axios'

const prefix = '/auth'
const Api = {
  login: prefix + '/login',
  validateCode: prefix + '/getValidateCode',
  userInfo: prefix + '/getUserInfo',
  routes: prefix + '/getRoutes',
  logout: prefix + '/logout'
}

// 登录接口
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

// 获取验证码接口
export function getValidateCodeApi() {
  return createAxios<GetValidateCodeRes>({
    url: Api.validateCode,
    method: 'get'
  })
}

// 获取用户信息接口
export function getUserInfoApi() {
  return createAxios<LoginUserInfoRes>(
    {
      url: Api.userInfo,
      method: 'get'
    },
    {
      showCodeMessage: true,
      loading: true
    }
  )
}

// 获取路由接口
export function getRoutesApi() {
  return createAxios<RoutesInfoRes[]>(
    {
      url: Api.routes,
      method: 'get'
    },
    {
      showCodeMessage: true,
      loading: true
    }
  )
}

// 退出登录接口
export function logout() {
  return createAxios<null>(
    {
      url: Api.logout,
      method: 'get'
    },
    {
      showCodeMessage: true
    }
  )
}
