import type { RoleInfo } from './role'

export interface UserInfo {
  /*用户编号 */
  id: string

  /*用户名 */
  username: string

  /*账号 */
  account: string

  /*性别 */
  sex: string

  /*头像 */
  avatar: string

  /*年龄 */
  age: number

  /*邮箱 */
  email: string

  /*手机号 */
  phone: string

  /*状态 */
  status: string

  /*逻辑删除 */
  isDelete: string

  /*用户登录请求参数 */
  createTime: string

  /*用户登录请求参数 */
  updateTime: string
}

// 响应接口
export interface UserInfoRes extends UserInfo {
  /*角色信息 */
  roleList: RoleInfo[]
}
