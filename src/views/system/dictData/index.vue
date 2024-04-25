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
        <n-form-item path="dictType" label="字典类型">
          <n-select
            v-model:value="queryParams.dictType"
            :options="typeOptionSelect"
            :label-field="typeOptionSelectFieldNames.label"
            :value-field="typeOptionSelectFieldNames.value"
            placeholder="请选择字典类型"
            style="width: 140px"
          />
        </n-form-item>

        <n-form-item path="dictTag" label="字典标签">
          <n-input v-model:value="queryParams.dictTag" placeholder="请输入字典标签"></n-input>
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
    <DictDataAdd ref="dictDataAddRef" @success="getData"></DictDataAdd>
    <DictDataEdit ref="dictDataEditRef" @success="getData"></DictDataEdit>
    <DictDataBatchEdit ref="dictDataBatchEditRef" @success="getData"></DictDataBatchEdit>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, h } from 'vue'
import { useMessage, type FormInst, NTooltip, NButton, NPopconfirm, NTag } from 'naive-ui'
import type { RowData } from 'naive-ui/es/data-table/src/interface'
import TableHeader from '@/components/TableHeader/index.vue'
import DictDataAdd from './add/index.vue'
import DictDataEdit from './edit/index.vue'
import DictDataBatchEdit from './batchEdit/index.vue'
import MSIcon from '@/components/MSIcon/index.vue'
import Pagination from '@/components/Pagination/index.vue'
import { mainRouteName } from '@/permission'
import type { DictDataInfo, GetDictDataParams } from '@/types/system/dictData'
import {
  batchDeleteDictDataApi,
  deleteDictDataApi,
  getDictDataListApi
} from '@/api/system/dictData'
import { useRoute } from 'vue-router'
import { getTypeOptionSelectApi } from '@/api/system/dict'
import type { DictInfo } from '@/types/system/dict'
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
    title: '字典编码',
    key: 'dictCode',
    width: 160,
    align: 'center',
    ellipsis: true
  },
  {
    title: '字典标签',
    key: 'dictTag',
    width: 160,
    align: 'center',
    ellipsis: true
  },
  {
    title: '字典键值',
    key: 'dictValue',
    width: 160,
    align: 'center',
    ellipsis: true
  },
  {
    title: '字典排序',
    key: 'dictOrder',
    width: 100,
    align: 'center',
    ellipsis: true
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
    title: '备注',
    key: 'remark',
    width: 160,
    align: 'center',
    ellipsis: true
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
const queryParams = reactive<GetDictDataParams>({
  pageNum: 1,
  pageSize: 10,
  orderBy: '',
  dictType: '',
  dictTag: '',
  status: null
})

const typeOptionSelect = ref<DictInfo[]>([])
const typeOptionSelectFieldNames = { label: 'dictName', value: 'dictType' }

const statusSelectFieldNames = {
  labelField: 'dictTag',
  valueField: 'dictValue'
}
const statusOptions = ref<DictDataInfo[]>([])

const dictStore = useDictStore()
const getDictData = async () => {
  statusOptions.value = await dictStore.getDictData('sys_normal_disable')
}

const route = useRoute()
onMounted(() => {
  queryParams.dictType = route.params.dictType as string
  getData()
  getDictData()
})
const data = ref<IRowData[]>([])
const checkData = ref<string[]>([])
const handleCheck = (rowKeys: string[]) => {
  checkData.value = rowKeys
}
const getData = async () => {
  show.value = true
  const typeOptionSelectResult = await getTypeOptionSelectApi()
  if (typeOptionSelectResult.code === 200) {
    typeOptionSelect.value = typeOptionSelectResult.data
  }
  const result = await getDictDataListApi(queryParams)
  if (result.code === 200) {
    data.value = result.data.list
    total.value = result.data.total
  }
  show.value = false
}
const resetForm = () => {
  queryParams.dictType = route.params.dictType as string
  queryParams.dictTag = ''
  queryParams.status = null
  getData()
}

const refresh = () => {
  getData()
}

const dictDataAddRef = ref()
const addRow = () => {
  dictDataAddRef.value.showModal(queryParams.dictType)
}

const dictDataEditRef = ref()
const editRow = (item: IRowData) => {
  dictDataEditRef.value.showModal(item.id)
}

const dictDataBatchEditRef = ref()
const batchEditRow = () => {
  dictDataBatchEditRef.value.showModal(checkData.value)
}

const message = useMessage()
const deleteRow = async (item: IRowData) => {
  const result = await deleteDictDataApi(item.id)
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
  const result = await batchDeleteDictDataApi(checkData.value)
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
  name: `${mainRouteName}-dictData`
})
</script>
<script lang="ts">
interface IRowData extends DictDataInfo, RowData {}
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
