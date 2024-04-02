<template>
  <div class="upload-img">
    <n-upload
      v-model:file-list="fileList"
      :action="uploadConfig.action"
      :method="uploadConfig.method"
      :accept="uploadConfig.accept"
      :headers="uploadConfig.headers"
      :max="uploadConfig.max"
      list-type="image-card"
      @finish="handleFinish"
      @error="handleError"
      @preview="handlePreview"
      @remove="handleRemove"
      @update:file-list="handeUpdateFileList"
    />
    <n-modal v-model:show="showModal" preset="card" style="width: 600px" title="预览">
      <img :src="previewImageUrl" style="width: 100%" />
    </n-modal>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import { useMessage, type UploadFileInfo } from 'naive-ui'
import { useUserStore } from '@/plugins/stores'
import { deleteImgApi } from '@/api/file'

const showModal = ref(false)
const message = useMessage()
const userStore = useUserStore()

const fileList = ref<UploadFileInfo[]>([])
const previewImageUrl = ref('')

const fileData = defineModel<string | string[]>('fileData')
const props = withDefaults(defineProps<Props>(), {
  max: 1
})

const uploadConfig = reactive({
  url: import.meta.env.VITE_FILE_PATH_BASE_URL,
  action: import.meta.env.VITE_FILE_PATH_BASE_URL + '/upload/img',
  method: 'post',
  accept: 'image/*',
  headers: {
    token: userStore.token
  },
  max: props.max
})

watch(
  () => fileData.value,
  (val) => {
    if (!fileData.value) return
    if (Array.isArray(fileData.value)) {
      fileList.value = []
      fileData.value.forEach((item) => {
        fileList.value.push({
          id: item,
          name: item,
          status: 'finished',
          url: uploadConfig.url + '/images/' + item
        })
      })
    } else if (fileData.value) {
      if (fileList.value.length) {
        fileList.value[0].id = fileData.value
        fileList.value[0].name = fileData.value
        fileList.value[0].url = uploadConfig.url + '/images/' + fileData.value
      } else {
        fileList.value.push({
          id: fileData.value,
          name: fileData.value,
          status: 'finished',
          url: uploadConfig.url + '/images/' + fileData.value
        })
      }
    }
  }
)

// 图片上传成功
const handleFinish = ({ file, event }: OnFinish) => {
  const result = JSON.parse((event?.target as XMLHttpRequest).response)
  if (result.code === 200) {
    message.success('上传成功')
    file.name = result.data
    file.fullPath = '/' + result.data
    file.url = uploadConfig.url + '/images/' + result.data
  } else {
    handleError({ file, event })
  }
  return file
}

// 图片上传失败
const handleError = ({ file, event }: OnError) => {
  message.error('上传失败')
  file.status = 'error'
}

// 预览图片
const handlePreview = (file: UploadFileInfo) => {
  const { url } = file
  previewImageUrl.value = url as string
  showModal.value = true
}

// 删除图片
const handleRemove = async (options: OnRemove) => {
  // 无论成功与否都删除图片
  try {
    await deleteImgApi(options.file.name)
    return true
  } catch (error) {
    return true
  }
}

// 更新图片列表
const handeUpdateFileList = (fileList: UploadFileInfo[]) => {
  let isArray = Array.isArray(fileData.value)
  if (!fileList.length) {
    if (isArray) {
      fileData.value = []
    } else {
      fileData.value = ''
    }
    return
  }

  if (isArray) {
    fileData.value = fileList.reduce((pre: string[], cur) => {
      if (cur.status === 'finished') {
        return pre.concat(cur.name)
      }
      return pre
    }, [])
  } else {
    fileData.value = fileList[0].name
  }
}
</script>
<script lang="ts">
interface Props {
  max?: number
}

interface OnFinish {
  file: UploadFileInfo
  event?: ProgressEvent
}

interface OnError {
  file: UploadFileInfo
  event?: ProgressEvent
}

interface OnRemove {
  file: UploadFileInfo
  fileList: Array<UploadFileInfo>
}
</script>

<style scoped></style>
