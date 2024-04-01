<template>
  <n-modal v-model:show="show" title="添加用户" preset="card" style="width: 500px" @ok="onSubmit">
    <n-form
      ref="formRef"
      :model="formState"
      :rules="rules"
      label-placement="left"
      label-width="auto"
    >
      <n-form-item label="用户名" path="username">
        <n-input v-model:value="formState.username" placeholder="请输入用户名" />
      </n-form-item>

      <n-form-item label="账号" path="account">
        <n-input v-model:value="formState.account" placeholder="请输入账号" />
      </n-form-item>

      <n-form-item label="密码" path="password">
        <n-input v-model:value="formState.password" placeholder="请输入密码" />
      </n-form-item>

      <n-form-item label="性别" path="sex">
        <n-radio-group v-model:value="formState.sex">
          <n-radio value="0">未知</n-radio>
          <n-radio value="1">男</n-radio>
          <n-radio value="2">女</n-radio>
        </n-radio-group>
      </n-form-item>

      <n-form-item label="头像" path="avatar">
        <UploadImg v-model:file-data="formState.avatar" />
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

      <n-form-item label="角色组" path="roleList">
        <n-select
          v-model:value="formState.roleList"
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
          <n-radio value="0">正常</n-radio>
          <n-radio value="1">停用</n-radio>
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
          <n-button type="primary" @click="onSubmit"> 保存 </n-button>
        </n-flex>
      </div>
    </n-form>
  </n-modal>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useMessage, type FormRules } from 'naive-ui'
import type { AddUserParams } from '@/types/user'
import { addUserApi } from '@/api/system/user'
import { getRoleListApi } from '@/api/system/role'
import UploadImg from '@/components/UploadImg/index.vue'
import type { RoleInfo } from '@/types/role'

const show = ref(false)

const formRef = ref()
const formState = ref<AddUserParams>({
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
  roleList: []
})
const rules: FormRules = {
  account: [{ required: true, message: '账号不能为空', trigger: 'blur' }],
  password: [{ required: true, message: '密码不能为空', trigger: 'blur' }],
  orderIndex: [{ type: 'number', required: true, message: '排序不能为空', trigger: 'blur' }],
  roleList: [{ type: 'array', required: true, message: '角色组不能为空', trigger: 'blur' }]
}

const selectFieldNames = { children: 'children', label: 'roleName', value: 'id' }
const roleOptions = ref<RoleInfo[]>([])

const getData = async () => {
  const roleParams = {
    all: true
  }
  const roleResult = await getRoleListApi(roleParams)
  if (roleResult.code === 200) {
    roleOptions.value = roleResult.data.list
  }
}

const emit = defineEmits(['success'])
const message = useMessage()
const onSubmit = () => {
  formRef.value
    .validate()
    .then(async () => {
      const result = await addUserApi(formState.value)
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
    roleList: []
  }
}
const showModal = () => {
  show.value = true
  formInit()
  getData()
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
