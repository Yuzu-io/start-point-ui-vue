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
          :label-field="listClassSelectFieldNames.labelField"
          :value-field="listClassSelectFieldNames.valueField"
          placeholder="请选择回显样式"
        />
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
          <n-button type="primary" @click="onSubmit"> 保存 </n-button>
        </n-flex>
      </div>
    </n-form>
  </n-modal>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useMessage, type FormRules } from 'naive-ui'
import type { DictDataInfo, EditDictDataParams } from '@/types/system/dictData'
import { editDictDataApi, findByIdApi } from '@/api/system/dictData'
import { useDictStore } from '@/plugins/stores'

const show = ref(false)

const formRef = ref()
const formState = ref<EditDictDataParams>({
  id: '',
  dictType: '',
  dictTag: '',
  dictValue: '',
  dictOrder: 1,
  listClass: 'default',
  status: '0',
  remark: ''
})
const rules: FormRules = {
  dictTag: [{ required: true, message: '字典标签不能为空', trigger: 'blur' }],
  dictValue: [{ required: true, message: '字典键值不能为空', trigger: 'blur' }]
}

const listClassSelectFieldNames = {
  labelField: 'dictTag',
  valueField: 'dictValue'
}
const listClassOptions = ref<DictDataInfo[]>([])
const statusOptions = ref<DictDataInfo[]>([])
const dictStore = useDictStore()

const getDictData = async () => {
  listClassOptions.value = await dictStore.getDictData('sys_style_type')
  statusOptions.value = await dictStore.getDictData('sys_normal_disable')
}

const getData = async () => {
  const dictInfo = await findByIdApi(formState.value.id)
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
    id: '',
    dictType: '',
    dictTag: '',
    dictValue: '',
    dictOrder: 1,
    listClass: 'default',
    status: '0',
    remark: ''
  }
}
const showModal = (id: string) => {
  show.value = true
  formInit()
  formState.value.id = id
  getData()
  getDictData()
}

defineExpose({
  showModal
})
</script>

<style lang="scss" scoped></style>
