<template>
  <a-layout class="layout">
    <a-layout-sider class="aside" v-model:collapsed="collapsed" :width="210">
      <LayoutAside />
    </a-layout-sider>
    <a-layout>
      <a-layout-header class="header">
        <LayoutHeader />
      </a-layout-header>
      <a-layout-content class="content">
        <LayoutContent />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script setup lang="ts">
import LayoutAside from './components/LayoutAside.vue'
import LayoutHeader from './components/LayoutHeader.vue'
import LayoutContent from './components/LayoutContent.vue'
import { provide, ref } from 'vue'
import type { ProvideTag } from '@/types/layouts/tag'
import { message } from 'ant-design-vue'
import { useTagStore } from '@/plugins/stores'

const tagStore = useTagStore()

const data = [
  {
    id: 1,
    name: '首页'
  },
  {
    id: 1,
    name: '仪表盘'
  },
  {
    id: 1,
    name: '资源列表'
  },
  {
    id: 1,
    name: '根目录'
  },
  {
    id: 1,
    name: '根目录'
  },
  {
    id: 1,
    name: '根目录'
  }
]

tagStore.addTag(data)

const collapsed = ref<boolean>(false)
const demo = ref(0)
const refresh = () => {
  message.success({
    content: '刷新成功!',
    duration: 1000
  })
  demo.value++
  console.log(demo)
}

provide<ProvideTag>('provideTag', {
  refresh
})
</script>

<style lang="scss" scoped>
.layout {
  height: 100vh;

  .aside,
  .header,
  .content {
    background: transparent;
    line-height: 1;
  }

  .aside {
    padding: 10px 0 10px 10px;
  }
  .header {
    padding: 10px 10px 0;
  }
  .content {
    padding: 10px;
  }
}
</style>
