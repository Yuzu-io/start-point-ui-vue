import type { PageInfo } from '@/types/page'
import type {
  AddRoutesParams,
  EditRoutesParams,
  GetRoutesParams,
  RoutesInfo,
  RoutesInfoRes
} from '@/types/routes'
import createAxios from '@/utils/axios'

const prefix = '/system/sysRoutes'
const Api = {
  list: prefix + '/list',
  add: prefix + '/add',
  edit: prefix + '/edit',
  parentRoutesList: prefix + '/parentRoutesList'
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
  return createAxios<any>({
    url: Api.add,
    method: 'post',
    data
  })
}

export function editRoutesApi(data: EditRoutesParams) {
  return createAxios<any>({
    url: Api.edit,
    method: 'put',
    data
  })
}
