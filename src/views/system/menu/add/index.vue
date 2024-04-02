<template>
  <n-modal v-model:show="show" title="添加菜单" preset="card" style="width: 500px" @ok="onSubmit">
    <n-form
      ref="formRef"
      :model="formState"
      :rules="rules"
      label-placement="left"
      label-width="auto"
    >
      <n-form-item label="上级菜单" path="parentId">
        <n-flex vertical :size="[0, 0]" style="width: 100%">
          <n-tree-select
            v-model:value="formState.parentId"
            placeholder="请选择上级菜单"
            :fieldNames="treeSelectFieldNames"
            :options="treeData"
            clearable
            :label-field="treeSelectFieldNames.label"
            :key-field="treeSelectFieldNames.value"
            :children-field="treeSelectFieldNames.children"
          >
          </n-tree-select>
          <span class="hint">没有上级菜单则为空</span>
        </n-flex>
      </n-form-item>

      <n-form-item label="菜单类型" path="type">
        <n-radio-group v-model:value="formState.type">
          <n-radio value="0">目录</n-radio>
          <n-radio value="1">菜单</n-radio>
          <n-radio value="2">按钮</n-radio>
        </n-radio-group>
      </n-form-item>

      <n-form-item label="页面标题" path="title">
        <n-input v-model:value="formState.title" placeholder="请输入页面标题" />
      </n-form-item>

      <n-form-item label="路由名称" path="routesName">
        <n-input v-model:value="formState.routesName" placeholder="请输入路由名称" />
      </n-form-item>

      <n-form-item ref="icon" label="图标" path="icon" v-show="formState.type !== MenuType.Button">
        <n-input-group>
          <n-input
            v-model:value="formState.icon"
            placeholder="请输入图标，仅支持material图标"
            style="width: 90%"
          />
          <n-button type="primary" style="width: 10%" @click="searchIcon">
            <template #icon>
              <MSIcon name="Search" size="20"></MSIcon>
            </template>
          </n-button>
        </n-input-group>
      </n-form-item>

      <n-form-item label="路由地址" path="fullPath">
        <n-flex vertical :size="[0, 0]" style="width: 100%">
          <n-input
            v-model:value="formState.fullPath"
            placeholder="需要填写完整路径，如：/system/sysRoutes/list"
          />
          <span class="hint">将注册为web端路由地址，同时作为server端API验权使用</span>
        </n-flex>
      </n-form-item>

      <n-form-item label="组件路径" path="componentPath" v-show="formState.type === MenuType.Menu">
        <n-flex vertical :size="[0, 0]" style="width: 100%">
          <n-input v-model:value="formState.componentPath" placeholder="请输入组件路径" />
          <span class="hint">web端组件路径，请以/src开头，如:/src/views/dashboard/index.vue</span>
        </n-flex>
      </n-form-item>

      <n-form-item label="显示状态" path="showStatus" v-show="formState.type !== MenuType.Button">
        <n-radio-group v-model:value="formState.showStatus">
          <n-radio value="0">显示</n-radio>
          <n-radio value="1">隐藏</n-radio>
        </n-radio-group>
      </n-form-item>

      <n-form-item
        label="是否为外链"
        path="isExternalLink"
        v-show="formState.type !== MenuType.Button"
      >
        <n-radio-group v-model:value="formState.isExternalLink">
          <n-radio value="0">是</n-radio>
          <n-radio value="1">否</n-radio>
        </n-radio-group>
      </n-form-item>

      <n-form-item label="是否缓存" path="keepAlive" v-show="formState.type === MenuType.Menu">
        <n-radio-group v-model:value="formState.keepAlive">
          <n-radio value="0">是</n-radio>
          <n-radio value="1">否</n-radio>
        </n-radio-group>
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
import type { AddRoutesParams, RoutesInfoRes } from '@/types/routes'
import { ref } from 'vue'
import { getParentRoutesListApi, addRoutesApi } from '@/api/system/routes'
import { recursiveTree } from '@/utils/recursiveTree'
import { useMessage, type FormRules } from 'naive-ui'
import MSIcon from '@/components/MSIcon/index.vue'

const show = ref(false)

const formRef = ref()
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
const rules: FormRules = {
  title: [{ required: true, message: '页面标题不能为空', trigger: 'blur' }],
  fullPath: [{ required: true, message: '路由地址不能为空', trigger: 'blur' }],
  orderIndex: [{ type: 'number', required: true, message: '菜单排序不能为空', trigger: 'blur' }]
}

const treeSelectFieldNames = { children: 'children', label: 'title', value: 'id' }
const treeData = ref<RoutesInfoRes[]>([])

const getData = async () => {
  const result = await getParentRoutesListApi()
  if (result.code === 200) {
    treeData.value = recursiveTree<RoutesInfoRes>(result.data, '')
  }
}

const iconUrl =
  'https://fonts.google.com/icons?icon.set=Material+Symbols&selected=Material+Symbols+Outlined:search:FILL@0;wght@400;GRAD@0;opsz@20&icon.query=Search'
const searchIcon = () => {
  window.open(iconUrl, '_blank')
}

const emit = defineEmits(['success'])
const message = useMessage()
const onSubmit = () => {
  formRef.value
    .validate()
    .then(async () => {
      // 菜单类型不为目录时，默认关闭缓存
      if (formState.value.type !== MenuType.Menu) {
        formState.value.keepAlive = '1'
      }
      const result = await addRoutesApi(formState.value)
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
