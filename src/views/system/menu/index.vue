<template>
  <div class="container">
    <n-form
      ref="formRef"
      :model="queryParams"
      label-placement="left"
      :show-feedback="false"
      class="search-form"
    >
      <n-flex>
        <n-form-item path="title" label="页面标题">
          <n-input v-model:value="queryParams.title" placeholder="请输入标题"></n-input>
        </n-form-item>

        <n-form-item path="fullPath" label="路由地址">
          <n-input v-model:value="queryParams.fullPath" placeholder="请输入标题"></n-input>
        </n-form-item>

        <n-form-item path="status" label="状态">
          <n-select
            v-model:value="queryParams.status"
            :options="statusOptions"
            clearable
            :label-field="statusSelectFieldNames.labelField"
            :value-field="statusSelectFieldNames.valueField"
            placeholder="请选择状态"
            style="width: 140px"
          />
        </n-form-item>

        <n-form-item>
          <n-button type="primary" @click="getData">搜索</n-button>
          <n-button style="margin: 0 8px" @click="resetForm">重置</n-button>
        </n-form-item>
      </n-flex>
    </n-form>

    <TableHeader
      :isNoSelection="!checkData.length"
      @refresh-click="refresh"
      @add-click="addRow"
      @edit-click="batchEditRow"
      @delete-click="batchDeleteRow"
    ></TableHeader>

    <n-spin :show="show" :delay="delay">
      <n-data-table
        :columns="columns"
        :data="data"
        :row-key="rowKey"
        :pagination="false"
        :scroll-x="scrollX"
        bordered
        :single-line="false"
        :checked-row-keys="checkData"
        @update:checked-row-keys="handleCheck"
      >
      </n-data-table>
    </n-spin>
    <Pagination
      v-model:page="queryParams.pageNum"
      v-model:pageSize="queryParams.pageSize"
      :pageSizes="pageSizes"
      :total="total"
      @update-page="getData"
      @update-page-size="getData"
    ></Pagination>
    <MenuAdd ref="menuAddRef" @success="getData"></MenuAdd>
    <MenuEdit ref="menuEditRef" @success="getData"></MenuEdit>
    <MenuBatchEdit ref="menuBatchEditRef" @success="getData"></MenuBatchEdit>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, h } from 'vue'
import type { GetRoutesParams, RoutesInfo } from '@/types/system/routes'
import { useMessage, type FormInst, NTooltip, NButton, NPopconfirm, NTag } from 'naive-ui'
import type { RowData } from 'naive-ui/es/data-table/src/interface'
import { getRoutesListApi, deleteRoutesApi, batchDeleteRoutesApi } from '@/api/system/routes'
import TableHeader from '@/components/TableHeader/index.vue'
import MenuAdd from './add/index.vue'
import MenuEdit from './edit/index.vue'
import MenuBatchEdit from './batchEdit/index.vue'
import MSIcon from '@/components/MSIcon/index.vue'
import Pagination from '@/components/Pagination/index.vue'
import { mainRouteName } from '@/permission'
import type { DictDataInfo } from '@/types/system/dictData'
import { useDictStore } from '@/plugins/stores'

const formRef = ref<FormInst>()
const show = ref<boolean>(false)
const delay = 500
const rowKey = (row: IRowData) => row.id
// 表格
const columns = [
  {
    type: 'selection',
    width: 50
  },
  {
    title: '页面标题',
    key: 'title',
    width: 180,
    ellipsis: true
  },
  {
    title: '路由地址',
    key: 'fullPath',
    width: 200,
    align: 'center',
    ellipsis: true
  },
  {
    title: '图标',
    key: 'icon',
    width: 80,
    align: 'center',
    render: (row: IRowData) => {
      if (row.icon) {
        return h(MSIcon, { name: row.icon, size: 18 })
      }
      return row.icon
    }
  },
  {
    title: '类型',
    key: 'type',
    width: 100,
    align: 'center',
    render: (row: IRowData) => {
      const item = routesTypeOptions.value.find((item) => item.dictValue == row.type)
      return h(
        NTag,
        { type: item ? item.listClass : 'default' },
        {
          default: () => (item ? item.dictTag : '未知')
        }
      )
    }
  },
  {
    title: '缓存',
    key: 'keepAlive',
    width: 80,
    align: 'center',
    render: (row: IRowData) => {
      const item = keepAliveOptions.value.find((item) => item.dictValue == row.keepAlive)
      return h(
        NTag,
        { type: item ? item.listClass : 'default' },
        {
          default: () => (item ? item.dictTag : '未知')
        }
      )
    }
  },
  {
    title: '状态',
    key: 'status',
    width: 80,
    align: 'center',
    render: (row: IRowData) => {
      const item = statusOptions.value.find((item) => item.dictValue == row.status)
      return h(
        NTag,
        { type: item ? item.listClass : 'default' },
        {
          default: () => (item ? item.dictTag : '未知')
        }
      )
    }
  },
  {
    title: '排序',
    key: 'orderIndex',
    width: 100,
    align: 'center'
  },
  {
    title: '创建时间',
    key: 'createTime',
    width: 180,
    align: 'center'
  },
  {
    title: '操作',
    key: 'operation',
    align: 'center',
    fixed: 'right',
    width: 160,
    render(row: IRowData) {
      return h('div', null, [
        // 编辑
        h(
          NTooltip,
          { placement: 'top', trigger: 'hover' },
          {
            trigger: () =>
              h(
                NButton,
                {
                  type: 'primary',
                  size: 'tiny',
                  style: 'margin:0 8px;vertical-align:sub;',
                  onClick: () => editRow(row)
                },
                {
                  icon: () => h(MSIcon, { name: 'Edit', size: 18 })
                }
              ),
            default: () => '编辑'
          }
        ),
        // 删除
        h(
          NTooltip,
          { placement: 'top', trigger: 'hover' },
          {
            trigger: () =>
              h(
                NPopconfirm,
                {
                  positiveButtonProps: {
                    type: 'error'
                  },
                  onPositiveClick: () => deleteRow(row)
                },
                {
                  trigger: () =>
                    h(
                      NButton,
                      { type: 'error', size: 'tiny', style: 'margin:0 8px;vertical-align:sub;' },
                      {
                        icon: () => h(MSIcon, { name: 'Delete', size: 18 })
                      }
                    ),
                  default: () => '确定删除选中记录？'
                }
              ),
            default: () => '删除'
          }
        )
      ])
    }
  }
]
// 计算宽度
const scrollX = columns.reduce((pre, cur) => {
  if (cur.width) {
    return pre + (cur.width as number)
  }
  return pre
}, 0)

// 分页
const pageSizes = [10, 20, 30, 50]
const total = ref<number>(0)
const queryParams = reactive<GetRoutesParams>({
  pageNum: 1,
  pageSize: 10,
  orderBy: '',
  title: '',
  fullPath: '',
  status: null
})

const statusSelectFieldNames = {
  labelField: 'dictTag',
  valueField: 'dictValue'
}
const statusOptions = ref<DictDataInfo[]>([])
const routesTypeOptions = ref<DictDataInfo[]>([])
const keepAliveOptions = ref<DictDataInfo[]>([])

const dictStore = useDictStore()
const getDictData = async () => {
  statusOptions.value = await dictStore.getDictData('sys_normal_disable')
  routesTypeOptions.value = await dictStore.getDictData('sys_routes_type')
  keepAliveOptions.value = await dictStore.getDictData('sys_routes_keep_alive')
}

onMounted(() => {
  getData()
  getDictData()
})
const data = ref<RoutesInfo[]>([])
const checkData = ref<string[]>([])
const handleCheck = (rowKeys: string[]) => {
  checkData.value = rowKeys
}
const getData = async () => {
  show.value = true
  const result = await getRoutesListApi(queryParams)
  if (result.code === 200) {
    data.value = result.data.list
    total.value = result.data.total
  }
  show.value = false
}
const resetForm = () => {
  queryParams.title = ''
  queryParams.fullPath = ''
  queryParams.status = null
  getData()
}

const refresh = () => {
  getData()
}

const menuAddRef = ref()
const addRow = () => {
  menuAddRef.value.showModal()
}

const menuEditRef = ref()
const editRow = (item: IRowData) => {
  menuEditRef.value.showModal(item.id)
}

const menuBatchEditRef = ref()
const batchEditRow = () => {
  menuBatchEditRef.value.showModal(checkData.value)
}

const message = useMessage()
const deleteRow = async (item: IRowData) => {
  const result = await deleteRoutesApi(item.id)
  if (result.code === 200) {
    message.success(result.message)
    checkData.value = []
    // 判断当前页数据是否已经为空，如果为空则跳转到上一页
    if (queryParams.pageNum && queryParams.pageSize) {
      let totalPage = Math.ceil((total.value - 1) / queryParams.pageSize)
      let currentPage = queryParams.pageNum > totalPage ? totalPage : queryParams.pageNum
      queryParams.pageNum = currentPage < 1 ? 1 : currentPage
    }
    getData()
  }
}
const batchDeleteRow = async () => {
  const result = await batchDeleteRoutesApi(checkData.value)
  if (result.code === 200) {
    message.success(result.message)
    checkData.value = []
    // 判断当前页数据是否已经为空，如果为空则跳转到上一页
    if (queryParams.pageNum && queryParams.pageSize) {
      let totalPage = Math.ceil((total.value - 1) / queryParams.pageSize)
      let currentPage = queryParams.pageNum > totalPage ? totalPage : queryParams.pageNum
      queryParams.pageNum = currentPage < 1 ? 1 : currentPage
    }
    getData()
  }
}

defineOptions({
  name: `${mainRouteName}-menu`
})
</script>
<script lang="ts">
interface IRowData extends RoutesInfo, RowData {}
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
  justify-content: flex-end;
}
</style>
