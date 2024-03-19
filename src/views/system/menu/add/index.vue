<template>
  <a-modal v-model:open="open" title="添加菜单" destroyOnClose @ok="onSubmit">
    <a-form ref="formRef" :model="formState" :rules="rules" :label-col="labelCol">
      <a-form-item ref="parentId" label="上级菜单" name="parentId">
        <a-tree-select
          v-model:value="formState.parentId"
          show-search
          style="width: 100%"
          :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
          placeholder="请选择上级菜单"
          allow-clear
          :fieldNames="treeSelectFieldNames"
          :tree-data="treeData"
          :tree-node-filter-prop="treeSelectFieldNames.label"
        >
        </a-tree-select>
        <span class="hint">没有上级菜单则为空</span>
      </a-form-item>

      <a-form-item ref="type" label="菜单类型" name="type">
        <a-radio-group v-model:value="formState.type">
          <a-radio value="0">目录</a-radio>
          <a-radio value="1">菜单</a-radio>
          <a-radio value="2">按钮</a-radio>
        </a-radio-group>
      </a-form-item>

      <a-form-item ref="title" label="页面标题" name="title">
        <a-input v-model:value="formState.title" placeholder="请输入页面标题" />
      </a-form-item>

      <a-form-item ref="routesName" label="路由名称" name="routesName">
        <a-input v-model:value="formState.routesName" placeholder="请输入路由名称" />
      </a-form-item>

      <a-form-item ref="icon" label="图标" name="icon" v-show="formState.type !== MenuType.Button">
        <a-input-group compact>
          <a-input v-model:value="formState.icon" placeholder="请输入图标" style="width: 90%" />
          <a-button type="primary" target="_blank" :href="iconUrl" style="width: 10%">
            <template #icon>
              <mdicon name="magnify" size="20" />
            </template>
          </a-button>
        </a-input-group>
      </a-form-item>

      <a-form-item ref="fullPath" label="路由地址" name="fullPath">
        <a-input
          v-model:value="formState.fullPath"
          placeholder="需要填写完整路径，如：/system/sysRoutes/list"
        />
        <span class="hint">将注册为web端路由地址，同时作为server端API验权使用</span>
      </a-form-item>

      <a-form-item
        ref="componentPath"
        label="组件路径"
        name="componentPath"
        v-show="formState.type === MenuType.Menu"
      >
        <a-input v-model:value="formState.componentPath" placeholder="请输入组件路径" />
        <span class="hint">web端组件路径，请以/src开头，如:/src/views/dashboard/index.vue</span>
      </a-form-item>

      <a-form-item
        ref="showStatus"
        label="显示状态"
        name="showStatus"
        v-show="formState.type !== MenuType.Button"
      >
        <a-radio-group v-model:value="formState.showStatus">
          <a-radio value="0">显示</a-radio>
          <a-radio value="1">隐藏</a-radio>
        </a-radio-group>
      </a-form-item>

      <a-form-item
        ref="isExternalLink"
        label="是否为外链"
        name="isExternalLink"
        v-show="formState.type !== MenuType.Button"
      >
        <a-radio-group v-model:value="formState.isExternalLink">
          <a-radio value="0">是</a-radio>
          <a-radio value="1">否</a-radio>
        </a-radio-group>
      </a-form-item>

      <a-form-item
        ref="keepAlive"
        label="是否缓存"
        name="keepAlive"
        v-show="formState.type === MenuType.Menu"
      >
        <a-radio-group v-model:value="formState.keepAlive">
          <a-radio value="0">是</a-radio>
          <a-radio value="1">否</a-radio>
        </a-radio-group>
      </a-form-item>

      <a-form-item ref="status" label="状态" name="status">
        <a-radio-group v-model:value="formState.status">
          <a-radio value="0">正常</a-radio>
          <a-radio value="1">停用</a-radio>
        </a-radio-group>
      </a-form-item>

      <a-form-item ref="orderIndex" label="排序" name="orderIndex">
        <a-input-number
          id="inputNumber"
          v-model:value="formState.orderIndex"
          :min="0"
          :max="100"
          placeholder="请输入排序"
        />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup lang="ts">
import type { AddRoutesParams, RoutesInfoRes } from '@/types/routes'
import { message, type TreeSelectProps } from 'ant-design-vue'
import type { Rule } from 'ant-design-vue/es/form'
import { ref } from 'vue'
import { getParentRoutesListApi, addRoutesApi } from '@/api/routes'
import { recursiveTree } from '@/utils/recursiveTree'

const open = ref(false)

const formRef = ref()
const labelCol = { span: 5 }
const formState = ref<AddRoutesParams>({
  title: '',
  routesName: '',
  icon: '',
  fullPath: '',
  componentPath: '',
  parentId: '',
  showStatus: '0',
  isExternalLink: '1',
  keepAlive: '0',
  status: '0',
  type: '0',
  orderIndex: 1
})
const rules: Record<string, Rule[]> = {
  title: [{ required: true, message: '页面标题不能为空', trigger: 'change' }],
  fullPath: [{ required: true, message: '路由地址不能为空', trigger: 'blur' }],
  orderIndex: [{ required: true, message: '菜单排序不能为空', trigger: 'blur' }]
}

const treeSelectFieldNames = { children: 'children', label: 'title', value: 'id' }
const treeData = ref<TreeSelectProps['treeData']>([
  {
    id: '',
    title: '空'
  }
])
const iconUrl = 'https://pictogrammers.com/library/mdi/'

const getData = async () => {
  const result = await getParentRoutesListApi()
  if (result.code === 200) {
    treeData.value = recursiveTree<RoutesInfoRes>(result.data, '')
  }
}

const emit = defineEmits(['success'])
const onSubmit = () => {
  formRef.value
    .validate()
    .then(async () => {
      const result = await addRoutesApi(formState.value)
      if (result.code === 200) {
        message.success(result.message)
        emit('success')
        open.value = false
      } else {
        message.success(result.message)
      }
    })
    .catch((error: any) => {
      console.log('error', error)
    })
}

const showModal = () => {
  open.value = true
  formState.value = {
    title: '',
    routesName: '',
    icon: '',
    fullPath: '',
    componentPath: '',
    parentId: '',
    showStatus: '0',
    isExternalLink: '1',
    keepAlive: '0',
    status: '0',
    type: '0',
    orderIndex: 1
  }
  getData()
}

defineExpose({
  showModal
})
</script>
<script lang="ts">
enum MenuType {
  Directory = '0',
  Menu = '1',
  Button = '2'
}
</script>

<style lang="scss" scoped>
.hint {
  color: rgba(0, 0, 0, 0.45);
  font-size: 14px;
}
</style>
