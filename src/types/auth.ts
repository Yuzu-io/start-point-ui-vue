import type { RoleInfo } from './system/role'
import type { UserInfo } from './system/user'

// 参数接口
export interface LoginParams {
  /*账号 */
  account: string

  /*密码 */
  password: string

  /*提交验证码 */
  captcha: string

  /*验证码key */
  codeKey: string
}

// 响应接口
export interface LoginRes {
  /*令牌 */
  token: string

  /*刷新令牌，可以为空 */
  refreshToken: string
}

// 响应接口
export interface GetValidateCodeRes {
  /*验证码key */
  codeKey: string

  /*验证码value */
  codeValue: string
}

// 响应接口
export interface LoginUserInfoRes extends UserInfo {
  /*角色信息 */
  roleList: RoleInfo[]
}
