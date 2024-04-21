import type { PageParams } from '../page'

export interface RoleInfo {
  id: string

  /*角色名称 */
  roleName: string

  /*权限字符 */
  roleKey: string

  /*状态 */
  status: string

  /*排序 */
  orderIndex: number

  /*创建时间 */
  createTime: string

  /*修改时间 */
  updateTime: string

  /*权限菜单列表 */
  routesIdList: string[]
}

export interface RoleInfoRes extends RoleInfo {}

export interface GetRoleParams extends PageParams {
  /*角色名称  */
  roleName?: string

  /*权限字符 */
  roleKey?: string

  /*状态 */
  status?: string | null

  /*是否查询所有 */
  all?: boolean
}

type OmitAddIrrelevantFields = 'id' | 'createTime' | 'updateTime'
export interface AddRoleParams extends Omit<RoleInfoRes, OmitAddIrrelevantFields> {}

export interface EditRoleParams extends AddRoleParams {
  /*用户编号 */
  id: string
}
