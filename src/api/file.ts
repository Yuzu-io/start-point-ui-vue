import createAxios from '@/utils/axios'

const prefix = '/file'
const Api = {
  deleteImg: prefix + '/delete/img'
}

export function deleteImgApi(name: string) {
  return createAxios<void>(
    {
      url: Api.deleteImg,
      method: 'delete',
      params: {
        name
      }
    },
    {
      showCodeMessage: true
    }
  )
}
