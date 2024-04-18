<template>
  <n-modal
    v-model:show="show"
    title="编辑字典数据"
    preset="card"
    style="width: 500px"
    @ok="onSubmit"
  >
    <n-form
      ref="formRef"
      :model="formState"
      :rules="rules"
      label-placement="left"
      label-width="auto"
    >
      <n-form-item label="字典类型" path="dictType">
        <n-input v-model:value="formState.dictType" disabled placeholder="请输入字典类型" />
      </n-form-item>

      <n-form-item label="字典标签" path="dictTag">
        <n-input v-model:value="formState.dictTag" placeholder="请输入字典标签" />
      </n-form-item>

      <n-form-item label="字典键值" path="dictValue">
        <n-input v-model:value="formState.dictValue" placeholder="请输入字典键值" />
      </n-form-item>

      <n-form-item label="字典排序" path="dictOrder">
        <n-input-number
          v-model:value="formState.dictOrder"
          :min="0"
          :max="100"
          placeholder="请输入排序"
        />
      </n-form-item>

      <n-form-item label="回显样式" path="listClass">
        <n-select
          v-model:value="formState.listClass"
          :options="listClassOptions"
          placeholder="请选择回显样式"
        />
      </n-form-item>

      <n-form-item label="状态" path="status">
        <n-radio-group v-model:value="formState.status">
          <n-radio value="0">正常</n-radio>
          <n-radio value="1">停用</n-radio>
        </n-radio-group>
      </n-form-item>

      <n-form-item label="备注" path="remark">
        <n-input v-model:value="formState.remark" type="textarea" placeholder="请输入备注" />
      </n-form-item>

      <div>
        <n-flex justify="end">
          <n-button @click="show = false">取消</n-button>
          <n-button type="primary" @click="onSubmit"> 保存 </n-button>
        </n-flex>
      </div>
    </n-form>
  </n-modal>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useMessage, type FormRules } from 'naive-ui'
import type { EditDictDataParams } from '@/types/system/dictData'
import { editDictDataApi, findByIdApi } from '@/api/system/dictData'

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
const formState = ref<EditDictDataParams>({
  id: '',
  dictType: '',
  dictTag: '',
  dictValue: '',
  dictOrder: 1,
  listClass: '',
  status: '0',
  remark: ''
})
const rules: FormRules = {
  dictTag: [{ required: true, message: '字典标签不能为空', trigger: 'blur' }],
  dictValue: [{ required: true, message: '字典键值不能为空', trigger: 'blur' }]
}

const listClassOptions = [
  { label: '默认(default)', value: '' },
  {
    label: '主要(primary)',
    value: 'primary'
  },
  {
    label: '成功(success)',
    value: 'success'
  },
  {
    label: '信息(info)',
    value: 'info'
  },
  {
    label: '警告(warning)',
    value: 'warning'
  },
  {
    label: '异常(error)',
    value: 'error'
  }
]

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
      const result = await editDictDataApi(formState.value)
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
    dictType: '',
    dictTag: '',
    dictValue: '',
    dictOrder: 1,
    listClass: '',
    status: '0',
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
}

defineExpose({
  showModal
})
</script>

<style lang="scss" scoped></style>
