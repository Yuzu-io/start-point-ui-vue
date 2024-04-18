<template>
  <n-modal
    v-model:show="show"
    title="添加字典数据"
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
import { ref } from 'vue'
import { useMessage, type FormRules } from 'naive-ui'
import type { AddDictDataParams } from '@/types/system/dictData'
import { addDictDataApi } from '@/api/system/dictData'

const show = ref(false)

const formRef = ref()
const formState = ref<AddDictDataParams>({
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

const emit = defineEmits(['success'])
const message = useMessage()
const onSubmit = () => {
  formRef.value
    .validate()
    .then(async () => {
      const result = await addDictDataApi(formState.value)
      if (result.code === 200) {
        message.success(result.message)
        emit('success')
        show.value = false
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
    dictType: '',
    dictTag: '',
    dictValue: '',
    dictOrder: 1,
    listClass: '',
    status: '0',
    remark: ''
  }
}
const showModal = (dictType: string) => {
  show.value = true
  formInit()
  formState.value.dictType = dictType
}

defineExpose({
  showModal
})
</script>

<style lang="scss" scoped></style>
