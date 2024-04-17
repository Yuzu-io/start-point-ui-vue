import type { PageParams } from '../page'

// 响应接口
export interface DictInfo {
  /*字典编号 */
  id: string

  /*字典名称 */
  dictName: string

  /*字典类型 */
  dictType: string

  /*状态 */
  status: string

  /*备注 */
  remark: string

  /*创建时间 */
  createTime: string

  /*修改时间 */
  updateTime: string
}

export interface DictInfoRes extends DictInfo {}

export interface GetDictParams extends PageParams {
  /*字典名称 */
  dictName: string

  /*字典类型 */
  dictType: string

  /*状态 */
  status: string
}
