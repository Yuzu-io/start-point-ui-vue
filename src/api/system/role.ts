import type { PageInfo } from '@/types/page'
import type {
  AddRoleParams,
  EditRoleParams,
  GetRoleParams,
  RoleInfo,
  RoleInfoRes
} from '@/types/system/role'
import createAxios from '@/utils/axios'

const prefix = '/system/sysRole'
const Api = {
  list: prefix + '/list',
  add: prefix + '/add',
  edit: prefix + '/edit',
  delete: prefix + '/delete',
  batchDelete: prefix + '/batchDelete',
  findById: prefix + '/findById'
}

export function getRoleListApi(params: GetRoleParams) {
  return createAxios<PageInfo<RoleInfoRes>>({
    url: Api.list,
    method: 'get',
    params
  })
}

export function addRoleApi(data: AddRoleParams) {
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

export function editRoleApi(data: EditRoleParams) {
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

export function deleteRoleApi(id: string) {
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

export function batchDeleteRoleApi(ids: string[]) {
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
  return createAxios<RoleInfo>({
    url: Api.findById,
    method: 'get',
    params: { id }
  })
}
