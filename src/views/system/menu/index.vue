<template>
  <div class="container">
    <a-form
      ref="formRef"
      name="advanced_search"
      class="search-form"
      layout="inline"
      :model="searchParams"
      @finish="onFinish"
    >
      <a-row :gutter="[0, 24]">
        <a-form-item name="title" label="标题">
          <a-input v-model:value="searchParams.title" placeholder="请输入标题"></a-input>
        </a-form-item>

        <a-form-item name="title" label="标题">
          <a-input v-model:value="searchParams.title" placeholder="请输入标题"></a-input>
        </a-form-item>

        <a-form-item name="title" label="标题">
          <a-input v-model:value="searchParams.title" placeholder="请输入标题"></a-input>
        </a-form-item>

        <a-form-item name="title" label="标题">
          <a-input v-model:value="searchParams.title" placeholder="请输入标题"></a-input>
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
      :row-selection="rowSelection"
      :pagination="false"
      bordered
    />
    <a-pagination
      class="pagination"
      v-model:current="current"
      v-model:pageSize="pageSize"
      show-quick-jumper
      :total="total"
      @change="onChange"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import type { FormInstance } from 'ant-design-vue'
import { getRoutesListApi } from '@/api/routes'
import TableHeader from '@/components/TableHeader/index.vue'
import type { RoutesInfo } from '@/types/routes'

const formRef = ref<FormInstance>()
const searchParams = reactive({
  title: ''
})
const onFinish = (values: any) => {
  console.log('Received values of form: ', values)
  console.log('formState: ', searchParams)
}

// 表格
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
    width: '12%'
  },
  {
    title: 'Address',
    dataIndex: 'address',
    width: '30%',
    key: 'address'
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
const current = ref<number>(1)
const pageSize = ref<number>(10)
const total = ref<number>(100)

const onChange = (page: number, pageSize: number) => {
  console.log('page: ', page)
  console.log('pageSize: ', pageSize)
}

onMounted(() => {
  getData()
})
const getData = async () => {
  const result = await getRoutesListApi().catch((e) => console.warn(e))
  console.log(result)
}

const refresh = () => {
  getData()
}
const add = () => {}
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
