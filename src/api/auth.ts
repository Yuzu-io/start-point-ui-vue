import type { GetValidateCodeRes, LoginParams, LoginRes } from '@/types/auth'
import type { RoutesInfoRes } from '@/types/routes'
import type { UserInfoRes } from '@/types/user'
import createAxios from '@/utils/axios'

const Api = {
  login: '/auth/login',
  validateCode: '/auth/getValidateCode',
  userInfo: '/auth/getUserInfo',
  routes: '/auth/getRoutes',
  logout: '/auth/logout'
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
  return createAxios<UserInfoRes>(
    {
      url: Api.userInfo,
      method: 'get'
    },
    {
      showCodeMessage: true
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
      showCodeMessage: true
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
