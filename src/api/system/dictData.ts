import type { PageInfo } from '@/types/page'
import type {
  AddDictDataParams,
  DictDataInfo,
  DictDataInfoRes,
  EditDictDataParams,
  GetDictDataParams
} from '@/types/system/dictData'
import createAxios from '@/utils/axios'

const prefix = '/system/sysDictData'
const Api = {
  list: prefix + '/list',
  add: prefix + '/add',
  edit: prefix + '/edit',
  delete: prefix + '/delete',
  batchDelete: prefix + '/batchDelete',
  findById: prefix + '/findById',
  dictTypeData: prefix + '/dictTypeData'
}

export function getDictDataListApi(params: GetDictDataParams) {
  return createAxios<PageInfo<DictDataInfoRes>>({
    url: Api.list,
    method: 'get',
    params
  })
}

export function addDictDataApi(data: AddDictDataParams) {
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

export function editDictDataApi(data: EditDictDataParams) {
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

export function deleteDictDataApi(id: string) {
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

export function batchDeleteDictDataApi(ids: string[]) {
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
  return createAxios<DictDataInfo>({
    url: Api.findById,
    method: 'get',
    params: { id }
  })
}

export function getDictTypeDataApi(dictType: string) {
  return createAxios<DictDataInfo[]>({
    url: Api.dictTypeData,
    method: 'get',
    params: {
      dictType
    }
  })
}
