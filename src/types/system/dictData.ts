import type { PageParams } from '../page'

export interface DictDataInfo {
  /*字典编号 */
  id: string

  /*字典类型 */
  dictType: string

  /*字典编码 */
  dictCode?: number

  /*字典标签 */
  dictTag: string

  /*字典键值 */
  dictValue: string

  /*字典排序 */
  dictOrder: number

  /*回显样式 */
  listClass: 'default' | 'error' | 'primary' | 'info' | 'success' | 'warning'

  /*备注 */
  remark: string

  /*状态 */
  status: string

  /*逻辑删除 */
  isDelete?: string

  /*创建时间 */
  createTime?: string

  /*修改时间 */
  updateTime?: string
}

export interface DictDataInfoRes extends DictDataInfo {}

export interface GetDictDataParams extends PageParams {
  /*字典类型 */
  dictType?: string

  /*字典标签 */
  dictTag?: string

  /*状态 */
  status?: string | null
}

type OmitAddIrrelevantFields = 'id' | 'createTime' | 'updateTime'
export interface AddDictDataParams extends Omit<DictDataInfoRes, OmitAddIrrelevantFields> {}

export interface EditDictDataParams extends AddDictDataParams {
  /*用户编号 */
  id: string
}
