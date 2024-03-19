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

    <a-spin :spinning="spinning" :delay="delayTime">
      <a-table
        :columns="columns"
        :data-source="data"
        rowKey="id"
        :row-selection="rowSelection"
        :pagination="false"
        bordered
      >
        <template #bodyCell="{ record, column }">
          <template v-if="column.key === 'operation'">
            <a-tooltip placement="top">
              <template #title>
                <span>编辑</span>
              </template>
              <a-button type="primary" size="small" style="margin: 0 5px" @click="edit(record)">
                <template #icon>
                  <mdicon name="pencil" size="18" />
                </template>
              </a-button>
            </a-tooltip>

            <a-tooltip placement="top">
              <template #title>
                <span>删除</span>
              </template>
              <a-button type="primary" danger size="small" style="margin: 0 5px">
                <template #icon>
                  <mdicon name="delete" size="18" />
                </template>
              </a-button>
            </a-tooltip>
          </template>
        </template>
      </a-table>
    </a-spin>
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
  <MenuEdit ref="menuEditRef"></MenuEdit>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import type { FormInstance } from 'ant-design-vue'
import { getRoutesListApi } from '@/api/routes'
import TableHeader from '@/components/TableHeader/index.vue'
import type { RoutesInfo } from '@/types/routes'
import MenuAdd from './add/index.vue'
import MenuEdit from './edit/index.vue'

const formRef = ref<FormInstance>()
const spinning = ref<boolean>(false)
const delayTime = 500
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
    width: '120px',
    align: 'center'
  },
  {
    title: '图标',
    dataIndex: 'icon',
    key: 'icon',
    width: '80px',
    align: 'center'
  },
  {
    title: '类型',
    dataIndex: 'type',
    key: 'type',
    width: '80px',
    align: 'center'
  },
  {
    title: '缓存',
    dataIndex: 'keepAlive',
    key: 'keepAlive',
    width: '80px',
    align: 'center'
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    width: '80px',
    align: 'center'
  },
  {
    title: '修改时间',
    dataIndex: 'updateTime',
    key: 'updateTime',
    width: '160px',
    align: 'center'
  },
  {
    title: '操作',
    key: 'operation',
    align: 'center'
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
  spinning.value = true
  const result = await getRoutesListApi(queryParams)
  if (result.code === 200) {
    data.value = result.data.list
    total.value = result.data.total
  }
  spinning.value = false
}

const refresh = () => {
  getData()
}

const menuAddRef = ref()
const add = () => {
  menuAddRef.value.showModal()
}
const menuEditRef = ref()
const edit = (item: RoutesInfo) => {
  menuEditRef.value.showModal(item)
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
