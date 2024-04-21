import type { PageInfo } from '@/types/page'
import type {
  AddRoutesParams,
  EditRoutesParams,
  GetRoutesParams,
  RoutesInfo,
  RoutesInfoRes
} from '@/types/system/routes'
import createAxios from '@/utils/axios'

const prefix = '/system/sysRoutes'
const Api = {
  list: prefix + '/list',
  add: prefix + '/add',
  edit: prefix + '/edit',
  delete: prefix + '/delete',
  batchDelete: prefix + '/batchDelete',
  parentRoutesList: prefix + '/parentRoutesList',
  findById: prefix + '/findById'
}

export function getRoutesListApi(params: GetRoutesParams) {
  return createAxios<PageInfo<RoutesInfoRes>>({
    url: Api.list,
    method: 'get',
    params
  })
}

export function getParentRoutesListApi() {
  return createAxios<RoutesInfo[]>({
    url: Api.parentRoutesList,
    method: 'get'
  })
}

export function addRoutesApi(data: AddRoutesParams) {
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

export function editRoutesApi(data: EditRoutesParams) {
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

export function deleteRoutesApi(id: string) {
  return createAxios<void>(
    {
      url: Api.delete,
      method: 'delete',
      params: {
        id
      }
    },
    {
      showCodeMessage: true
    }
  )
}

export function batchDeleteRoutesApi(data: string[]) {
  return createAxios<void>(
    {
      url: Api.batchDelete,
      method: 'delete',
      data
    },
    {
      showCodeMessage: true
    }
  )
}

export function findByIdApi(id: string) {
  return createAxios<RoutesInfo>({
    url: Api.findById,
    method: 'get',
    params: {
      id
    }
  })
}
