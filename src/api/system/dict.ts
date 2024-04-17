import type { PageInfo } from '@/types/page'
import type { DictInfoRes, GetDictParams } from '@/types/system/dict'
import createAxios from '@/utils/axios'

const prefix = '/system/sysDict'
const Api = {
  list: prefix + '/list',
  add: prefix + '/add',
  edit: prefix + '/edit',
  delete: prefix + '/delete',
  batchDelete: prefix + '/batchDelete',
  findById: prefix + '/findById'
}

export function getDictListApi(params: GetDictParams) {
  return createAxios<PageInfo<DictInfoRes>>({
    url: Api.list,
    method: 'get',
    params
  })
}
