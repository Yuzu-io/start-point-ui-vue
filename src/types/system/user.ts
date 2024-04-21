import type { PageParams } from '../page'
import type { RoleInfo } from './role'

export interface UserInfo {
  /*用户编号 */
  id: string

  /*用户名 */
  username: string

  /*账号 */
  account: string

  /*性别 */
  sex?: string

  /*头像 */
  avatar: string

  /*年龄 */
  age?: number

  /*邮箱 */
  email?: string

  /*手机号 */
  phone?: string

  /*状态 0正常 1禁用 */
  status: string

  /*排序 */
  orderIndex: number

  /*逻辑删除 */
  isDelete?: string

  /*创建时间 */
  createTime?: string

  /*修改时间 */
  updateTime?: string
}

// 响应接口
export interface UserInfoRes extends UserInfo {
  /*角色信息 */
  roleIdList: String[]
}

export interface GetUserParams extends PageParams {
  /*用户名 */
  username?: string
  /*状态 0正常 1禁用 */
  status?: string | null
}

type OmitAddIrrelevantFields = 'id' | 'createTime' | 'updateTime' | 'isDelete'
export interface AddUserParams extends Omit<UserInfoRes, OmitAddIrrelevantFields> {
  /*密码 */
  password: string
}

export interface EditUserParams extends WithPartial<AddUserParams, 'password'> {
  /*用户编号 */
  id: string
}

type WithPartial<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>
