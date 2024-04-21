import type { PageParams } from '../page'

export interface RoutesInfo {
  /*路由编号 */
  id: string

  /*页面标题 */
  title: string

  /*路由名称 */
  routesName: string

  /*图标 */
  icon?: string

  /*路由地址 */
  fullPath: string

  /*组件路径 */
  componentPath?: string

  /*父级菜单编号  */
  parentId?: string | null

  /*显示状态 */
  showStatus?: string

  /*是否为外链 */
  isExternalLink?: string

  /*是否缓存 */
  keepAlive?: string

  /*状态 */
  status?: string

  /*菜单类型 */
  type?: string

  /*排序 */
  orderIndex: number

  /*创建时间 */
  createTime?: string

  /*修改时间 */
  updateTime?: string
}

// 响应接口
export interface RoutesInfoRes extends RoutesInfo {
  /*路由子项 */
  children?: RoutesInfoRes[]
}

// 查询路由
export interface GetRoutesParams extends PageParams {
  /*页面标题  */
  title?: string

  /*路由地址 */
  fullPath?: string

  /*状态 */
  status?: string | null

  /*是否查询所有 */
  all?: boolean
}

type OmitAddIrrelevantFields = 'id' | 'createTime' | 'updateTime' | 'children'
// 添加路由
export interface AddRoutesParams extends Omit<RoutesInfoRes, OmitAddIrrelevantFields> {}

export interface EditRoutesParams extends AddRoutesParams {
  /*用户编号 */
  id: string
}
