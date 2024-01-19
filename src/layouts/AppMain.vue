<template>
  <t-layout>
    <t-aside class="aside">
      <LayoutAside />
    </t-aside>
    <t-layout>
      <t-header class="header">
        <LayoutHeader />
      </t-header>
      <t-content class="content">
        <LayoutContent />
      </t-content>
      <!-- <t-footer>Footer</t-footer> -->
    </t-layout>
  </t-layout>
</template>

<script setup lang="ts">
import LayoutAside from './components/LayoutAside.vue'
import LayoutHeader from './components/LayoutHeader.vue'
import LayoutContent from './components/LayoutContent.vue'
import { provide, ref } from 'vue'
import type { ProvideTag } from '@/types/layouts/tag'
import { MessagePlugin } from 'tdesign-vue-next'
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
  },
  {
    id: 1,
    name: '资源列表'
  },
  {
    id: 1,
    name: '资源列表'
  },
  {
    id: 1,
    name: '资源列表'
  },
  {
    id: 1,
    name: '资源列表'
  },
  {
    id: 1,
    name: '资源列表'
  },
  {
    id: 1,
    name: '资源列表'
  }
]

tagStore.addTag(data)

const demo = ref(0)
const refresh = () => {
  MessagePlugin.success({
    content: '刷新成功!',
    placement: 'top-right',
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
.t-layout {
  height: 100vh;

  .aside,
  .header,
  .content {
    background: transparent;
  }

  .aside {
    width: auto;
    padding: 15px 0 15px 15px;
  }
  .header {
    padding: 15px 15px 0;
  }
  .content {
    padding: 15px;
  }
}
</style>
