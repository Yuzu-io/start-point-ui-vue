import type { PageInfo } from '@/types/page'
import type { GetRoleParams, RoleInfoRes } from '@/types/role'
import createAxios from '@/utils/axios'

const prefix = '/system/sysRole'
const Api = {
  list: prefix + '/list'
}

export function getRoleListApi(params: GetRoleParams) {
  return createAxios<PageInfo<RoleInfoRes>>({
    url: Api.list,
    method: 'get',
    params
  })
}
