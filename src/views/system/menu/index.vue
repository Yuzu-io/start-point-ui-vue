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

    <div class="table-header">
      <a-button type="primary">
        <template #icon>
          <mdicon name="cached" size="20" />
        </template>
      </a-button>

      <a-button type="primary" style="margin: 0 8px">
        <template #icon>
          <mdicon name="plus" size="20" />
        </template>
        <span> 添加 </span>
      </a-button>
    </div>
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

interface DataItem {
  key: number
  name: string
  age: number
  address: string
  children?: DataItem[]
}

const data: DataItem[] = [
  {
    key: 1,
    name: 'John Brown sr.',
    age: 60,
    address: 'New York No. 1 Lake Park',
    children: [
      {
        key: 11,
        name: 'John Brown',
        age: 42,
        address: 'New York No. 2 Lake Park'
      },
      {
        key: 12,
        name: 'John Brown jr.',
        age: 30,
        address: 'New York No. 3 Lake Park',
        children: [
          {
            key: 121,
            name: 'Jimmy Brown',
            age: 16,
            address: 'New York No. 3 Lake Park'
          }
        ]
      },
      {
        key: 13,
        name: 'Jim Green sr.',
        age: 72,
        address: 'London No. 1 Lake Park',
        children: [
          {
            key: 131,
            name: 'Jim Green',
            age: 42,
            address: 'London No. 2 Lake Park',
            children: [
              {
                key: 1311,
                name: 'Jim Green jr.',
                age: 25,
                address: 'London No. 3 Lake Park'
              },
              {
                key: 1312,
                name: 'Jimmy Green sr.',
                age: 18,
                address: 'London No. 4 Lake Park'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    key: 2,
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park'
  },
  {
    key: 3,
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park'
  },
  {
    key: 4,
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park'
  },
  {
    key: 5,
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park'
  }
]

const rowSelection = ref({
  checkStrictly: false,
  onChange: (selectedRowKeys: (string | number)[], selectedRows: DataItem[]) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
  },
  onSelect: (record: DataItem, selected: boolean, selectedRows: DataItem[]) => {
    console.log(record, selected, selectedRows)
  },
  onSelectAll: (selected: boolean, selectedRows: DataItem[], changeRows: DataItem[]) => {
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
