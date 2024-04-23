<template>
  <n-modal v-model:show="show" title="编辑字典" preset="card" style="width: 500px" @ok="onSubmit">
    <n-form
      ref="formRef"
      :model="formState"
      :rules="rules"
      label-placement="left"
      label-width="auto"
    >
      <n-form-item label="字典名称" path="dictName">
        <n-input v-model:value="formState.dictName" placeholder="请输入字典名称" />
      </n-form-item>

      <n-form-item label="字典类型" path="dictType">
        <n-input v-model:value="formState.dictType" placeholder="请输入字典类型" />
      </n-form-item>

      <n-form-item label="状态" path="status">
        <n-radio-group v-model:value="formState.status">
          <n-radio v-for="item in statusOptions" :key="item.id" :value="item.dictValue">{{
            item.dictTag
          }}</n-radio>
        </n-radio-group>
      </n-form-item>

      <n-form-item label="备注" path="remark">
        <n-input v-model:value="formState.remark" type="textarea" placeholder="请输入备注" />
      </n-form-item>

      <div>
        <n-flex justify="end">
          <n-button @click="show = false">取消</n-button>
          <n-button type="primary" @click="onSubmit"> {{ submitText }} </n-button>
        </n-flex>
      </div>
    </n-form>
  </n-modal>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useMessage, type FormRules } from 'naive-ui'
import type { EditDictParams } from '@/types/system/dict'
import { editDictApi, findByIdApi } from '@/api/system/dict'
import { useDictStore } from '@/plugins/stores'
import type { DictDataInfo } from '@/types/system/dictData'

const show = ref(false)
const isMultiple = ref(false)
const currentIndex = ref(0)
const idsList = ref<string[]>([])
const submitText = ref('保存')

watch(
  () => currentIndex.value,
  () => {
    isMultiple.value = idsList.value.length - 1 === currentIndex.value
    submitText.value = isMultiple.value ? '保存' : '保存并编辑下一页'
  }
)

const formRef = ref()
const formState = ref<EditDictParams>({
  id: '',
  dictName: '',
  dictType: '',
  status: '',
  remark: ''
})
const rules: FormRules = {
  dictName: [{ required: true, message: '字典名称不能为空', trigger: 'blur' }],
  dictType: [{ required: true, message: '字典类型不能为空', trigger: 'blur' }]
}

const statusOptions = ref<DictDataInfo[]>([])
const dictStore = useDictStore()

const getDictData = async () => {
  statusOptions.value = await dictStore.getDictData('sys_normal_disable')
}

const getData = async () => {
  const dictInfo = await findByIdApi(idsList.value[currentIndex.value])
  if (dictInfo.code === 200) {
    formState.value = dictInfo.data
  }
}

const emit = defineEmits(['success'])
const message = useMessage()
const onSubmit = () => {
  formRef.value
    .validate()
    .then(async () => {
      const result = await editDictApi(formState.value)
      if (result.code === 200) {
        message.success(result.message)
        emit('success')
        if (isMultiple.value) {
          show.value = false
        } else {
          currentIndex.value++
          getData()
        }
      } else {
        message.success(result.message)
      }
    })
    .catch((error: any) => {
      console.log('error', error)
    })
}

const formInit = () => {
  formState.value = {
    id: '',
    dictName: '',
    dictType: '',
    status: '',
    remark: ''
  }
}

const showModal = (ids: string[]) => {
  show.value = true
  formInit()
  currentIndex.value = 0
  idsList.value = ids
  isMultiple.value = idsList.value.length - 1 === currentIndex.value
  submitText.value = isMultiple.value ? '保存' : '保存并编辑下一页'
  getData()
  getDictData()
}

defineExpose({
  showModal
})
</script>

<style lang="scss" scoped></style>
