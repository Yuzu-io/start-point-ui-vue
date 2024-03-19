<template>
  <div class="container">
    <a-form
      ref="formRef"
      name="advanced_search"
      class="search-form"
      layout="inline"
      :model="queryParams"
      @finish="getData"
    >
      <a-row :gutter="[0, 24]">
        <a-form-item name="title" label="页面标题">
          <a-input v-model:value="queryParams.title" placeholder="请输入标题"></a-input>
        </a-form-item>

        <a-form-item name="title" label="路由地址">
          <a-input v-model:value="queryParams.fullPath" placeholder="请输入标题"></a-input>
        </a-form-item>

        <a-form-item name="title" label="状态">
          <a-input v-model:value="queryParams.status" placeholder="请输入标题"></a-input>
        </a-form-item>

        <a-form-item>
          <a-button type="primary" html-type="submit">搜索</a-button>
          <a-button style="margin: 0 8px" @click="() => formRef!.resetFields()">重置</a-button>
        </a-form-item>
      </a-row>
    </a-form>

    <TableHeader @refresh-click="refresh" @add-click="add"></TableHeader>

    <a-table
      :columns="columns"
      :data-source="data"
      rowKey="id"
      :row-selection="rowSelection"
      :pagination="false"
      bordered
    />
    <a-pagination
      class="pagination"
      v-model:current="queryParams.pageNum"
      v-model:pageSize="queryParams.pageSize"
      show-quick-jumper
      :total="total"
      @change="getData"
    />
  </div>
  <MenuAdd ref="menuAddRef"></MenuAdd>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import type { FormInstance } from 'ant-design-vue'
import { getRoutesListApi } from '@/api/routes'
import TableHeader from '@/components/TableHeader/index.vue'
import type { RoutesInfo } from '@/types/routes'
import MenuAdd from './add/index.vue'

const formRef = ref<FormInstance>()

// 表格
const columns = [
  {
    title: '页面标题',
    dataIndex: 'title',
    key: 'title',
    width: '120px'
  },
  {
    title: '路由地址',
    dataIndex: 'fullPath',
    key: 'fullPath',
    width: '120px'
  },
  {
    title: '图标',
    dataIndex: 'icon',
    key: 'icon',
    width: '50px'
  },
  {
    title: '类型',
    dataIndex: 'type',
    key: 'type',
    width: '50px'
  },
  {
    title: '缓存',
    dataIndex: 'keepAlive',
    key: 'keepAlive',
    width: '50px'
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    width: '50px'
  },
  {
    title: '修改时间',
    dataIndex: 'updateTime',
    key: 'updateTime',
    width: '100px'
  }
]

const data = ref<RoutesInfo[]>([])
const rowSelection = ref({
  checkStrictly: false,
  onChange: (selectedRowKeys: (string | number)[], selectedRows: RoutesInfo[]) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
  },
  onSelect: (record: RoutesInfo, selected: boolean, selectedRows: RoutesInfo[]) => {
    console.log(record, selected, selectedRows)
  },
  onSelectAll: (selected: boolean, selectedRows: RoutesInfo[], changeRows: RoutesInfo[]) => {
    console.log(selected, selectedRows, changeRows)
  }
})

// 分页
const total = ref<number>(0)
const queryParams = reactive({
  pageNum: 1,
  pageSize: 10,
  orderBy: '',
  title: '',
  fullPath: '',
  status: ''
})

onMounted(() => {
  getData()
})
const getData = async () => {
  const result = await getRoutesListApi(queryParams)
  if (result.code === 200) {
    data.value = result.data.list
    total.value = result.data.total
  }
}

const refresh = () => {
  getData()
}

const menuAddRef = ref()
const add = () => {
  menuAddRef.value.showModal()
}
</script>

<style lang="scss" scoped>
.container {
  background-color: #fff;
}

.search-form {
  padding: 20px 10px;
}

.pagination {
  padding: 16px 10px 16px 0;
  text-align: right;
}
</style>
