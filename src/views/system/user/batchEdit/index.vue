<template>
  <n-modal v-model:show="show" title="编辑用户" preset="card" style="width: 500px" @ok="onSubmit">
    <n-form
      ref="formRef"
      :model="formState"
      :rules="rules"
      label-placement="left"
      label-width="auto"
    >
      <n-form-item label="用户名" path="username">
        <n-flex vertical :size="[0, 0]" style="width: 100%">
          <n-input v-model:value="formState.username" placeholder="请输入用户名" />
          <span class="hint">用户名为空则默认为账号</span>
        </n-flex>
      </n-form-item>

      <n-form-item label="账号" path="account">
        <n-input v-model:value="formState.account" placeholder="请输入账号" />
      </n-form-item>

      <n-form-item label="密码" path="password">
        <n-flex vertical :size="[0, 0]" style="width: 100%">
          <n-input v-model:value="formState.password" placeholder="请输入密码" />
          <span class="hint">密码为空则默认原始密码</span>
        </n-flex>
      </n-form-item>

      <n-form-item label="性别" path="sex">
        <n-radio-group v-model:value="formState.sex">
          <n-radio v-for="item in sexOptions" :key="item.id" :value="item.dictValue">{{
            item.dictTag
          }}</n-radio>
        </n-radio-group>
      </n-form-item>

      <n-form-item label="头像" path="avatar">
        <n-flex vertical :size="[0, 0]" style="width: 100%">
          <UploadImg v-model:file-data="formState.avatar" />
          <span class="hint">删除图片时图片存储文件会被删除，请谨慎</span>
        </n-flex>
      </n-form-item>

      <n-form-item label="年龄" path="age">
        <n-input-number
          v-model:value="formState.age"
          :min="1"
          :max="200"
          placeholder="请输入年龄"
        />
      </n-form-item>

      <n-form-item label="邮箱" path="email">
        <n-input v-model:value="formState.email" placeholder="请输入邮箱" />
      </n-form-item>

      <n-form-item label="手机号" path="phone">
        <n-input v-model:value="formState.phone" placeholder="请输入手机号" />
      </n-form-item>

      <n-form-item label="角色组" path="roleIdList">
        <n-select
          v-model:value="formState.roleIdList"
          multiple
          :label-field="selectFieldNames.label"
          :value-field="selectFieldNames.value"
          :children-field="selectFieldNames.children"
          :options="roleOptions"
          placeholder="请选择角色组"
        />
      </n-form-item>

      <n-form-item label="状态" path="status">
        <n-radio-group v-model:value="formState.status">
          <n-radio v-for="item in statusOptions" :key="item.id" :value="item.dictValue">{{
            item.dictTag
          }}</n-radio>
        </n-radio-group>
      </n-form-item>

      <n-form-item label="排序" path="orderIndex">
        <n-input-number
          v-model:value="formState.orderIndex"
          :min="0"
          :max="100"
          placeholder="请输入排序"
        />
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
import UploadImg from '@/components/UploadImg/index.vue'
import type { EditUserParams } from '@/types/system/user'
import { editUserApi, findByIdUserApi } from '@/api/system/user'
import type { RoleInfo } from '@/types/system/role'
import { getRoleListApi } from '@/api/system/role'
import { md5 } from 'js-md5'
import type { DictDataInfo } from '@/types/system/dictData'
import { useDictStore } from '@/plugins/stores'

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
const formState = ref<EditUserParams>({
  id: '',
  username: '',
  account: '',
  password: '',
  sex: '0',
  avatar: '',
  age: undefined,
  email: undefined,
  phone: undefined,
  status: '0',
  orderIndex: 1,
  roleIdList: []
})
const rules: FormRules = {
  account: [{ required: true, message: '账号不能为空', trigger: 'blur' }],
  orderIndex: [{ type: 'number', required: true, message: '排序不能为空', trigger: 'blur' }],
  roleIdList: [{ type: 'array', required: true, message: '角色组不能为空', trigger: 'blur' }]
}

const selectFieldNames = { children: 'children', label: 'roleName', value: 'id' }
const roleOptions = ref<RoleInfo[]>([])

const statusOptions = ref<DictDataInfo[]>([])
const sexOptions = ref<DictDataInfo[]>([])
const dictStore = useDictStore()

const getDictData = async () => {
  statusOptions.value = await dictStore.getDictData('sys_normal_disable')
  sexOptions.value = await dictStore.getDictData('sys_user_sex')
}

const getData = async () => {
  const roleParams = {
    all: true
  }
  const roleResult = await getRoleListApi(roleParams)
  if (roleResult.code === 200) {
    roleOptions.value = roleResult.data.list
  }
  const userResult = await findByIdUserApi(idsList.value[currentIndex.value])
  if (userResult.code === 200) {
    formState.value = userResult.data
  }
}

const emit = defineEmits(['success'])
const message = useMessage()
const onSubmit = () => {
  formRef.value
    .validate()
    .then(async () => {
      let params = formState.value
      if (formState.value.password) {
        params = {
          ...formState.value,
          password: md5(formState.value.password).toLocaleUpperCase()
        }
      }
      const result = await editUserApi(params)
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
    username: '',
    account: '',
    password: '',
    sex: '0',
    avatar: '',
    age: undefined,
    email: undefined,
    phone: undefined,
    status: '0',
    orderIndex: 1,
    roleIdList: []
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

<style lang="scss" scoped>
.hint {
  color: rgba(0, 0, 0, 0.45);
  font-size: 14px;
}
</style>
