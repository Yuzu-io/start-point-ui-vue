import type { PageInfo } from '@/types/page'
import type { AddUserParams, EditUserParams, GetUserParams, UserInfoRes } from '@/types/system/user'
import createAxios from '@/utils/axios'

const prefix = '/system/sysUser'
const Api = {
  list: prefix + '/list',
  add: prefix + '/add',
  edit: prefix + '/edit',
  delete: prefix + '/delete',
  batchDelete: prefix + '/batchDelete',
  findById: prefix + '/findById'
}

export function getUserListApi(params: GetUserParams) {
  return createAxios<PageInfo<UserInfoRes>>({
    url: Api.list,
    method: 'get',
    params
  })
}

export function addUserApi(data: AddUserParams) {
  return createAxios<void>({
    url: Api.add,
    method: 'post',
    data
  })
}

export function editUserApi(data: EditUserParams) {
  return createAxios<void>({
    url: Api.edit,
    method: 'put',
    data
  })
}

export function deleteUserApi(id: string) {
  return createAxios<void>({
    url: Api.delete,
    method: 'delete',
    params: { id }
  })
}

export function batchDeleteUserApi(ids: string[]) {
  return createAxios<void>({
    url: Api.batchDelete,
    method: 'delete',
    data: ids
  })
}

export function findByIdUserApi(id: string) {
  return createAxios<UserInfoRes>({
    url: Api.findById,
    method: 'get',
    params: { id }
  })
}
