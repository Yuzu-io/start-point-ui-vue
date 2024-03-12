import type { PageInfo } from '@/types/pageInfo'
import type { RoutesInfo } from '@/types/routes'
import createAxios from '@/utils/axios'

const prefix = '/system/sysRoutes'
const Api = {
  list: prefix + '/list'
}

export function getRoutesListApi() {
  return createAxios<PageInfo<RoutesInfo[]>>({
    url: Api.list,
    method: 'get'
  })
}
