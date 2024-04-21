import type { PageInfo } from '@/types/page'
import type {
  AddDictParams,
  DictInfo,
  DictInfoRes,
  EditDictParams,
  GetDictParams
} from '@/types/system/dict'
import createAxios from '@/utils/axios'

const prefix = '/system/sysDict'
const Api = {
  list: prefix + '/list',
  add: prefix + '/add',
  edit: prefix + '/edit',
  delete: prefix + '/delete',
  batchDelete: prefix + '/batchDelete',
  findById: prefix + '/findById',
  typeOptionSelect: prefix + '/type/optionSelect'
}

export function getDictListApi(params: GetDictParams) {
  return createAxios<PageInfo<DictInfoRes>>({
    url: Api.list,
    method: 'get',
    params
  })
}

export function addDictApi(data: AddDictParams) {
  return createAxios<void>(
    {
      url: Api.add,
      method: 'post',
      data
    },
    {
      showCodeMessage: true
    }
  )
}

export function editDictApi(data: EditDictParams) {
  return createAxios<void>(
    {
      url: Api.edit,
      method: 'put',
      data
    },
    {
      showCodeMessage: true
    }
  )
}

export function deleteDictApi(id: string) {
  return createAxios<void>(
    {
      url: Api.delete,
      method: 'delete',
      params: { id }
    },
    {
      showCodeMessage: true
    }
  )
}

export function batchDeleteDictApi(ids: string[]) {
  return createAxios<void>(
    {
      url: Api.batchDelete,
      method: 'delete',
      data: ids
    },
    {
      showCodeMessage: true
    }
  )
}

export function findByIdApi(id: string) {
  return createAxios<DictInfo>({
    url: Api.findById,
    method: 'get',
    params: { id }
  })
}

export function getTypeOptionSelectApi() {
  return createAxios<DictInfo[]>({
    url: Api.typeOptionSelect,
    method: 'get'
  })
}
