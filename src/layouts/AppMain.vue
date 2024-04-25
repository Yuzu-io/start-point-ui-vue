<template>
  <n-layout has-sider class="layout">
    <n-layout-sider
      class="aside"
      bordered
      collapse-mode="width"
      :collapsed-width="collapsedWidth"
      :width="width"
      :collapsed="collapsed"
      show-trigger
      @collapse="collapsed = true"
      @expand="collapsed = false"
    >
      <LayoutAside :collapsed="collapsed" />
    </n-layout-sider>
    <n-layout>
      <n-layout-header class="header"> <LayoutHeader /> </n-layout-header>
      <n-layout-content class="content">
        <LayoutContent />
      </n-layout-content>
    </n-layout>
  </n-layout>
</template>

<script setup lang="ts">
import LayoutAside from './components/LayoutAside.vue'
import LayoutHeader from './components/LayoutHeader.vue'
import LayoutContent from './components/LayoutContent.vue'
import { provide, ref } from 'vue'
import type { ProvideTag } from '@/types/layouts/tag'
import { useMessage } from 'naive-ui'

const collapsed = ref<boolean>(false)
const collapsedWidth = 64
const width = 240
const message = useMessage()
const refresh = () => {
  message.success('刷新成功!', {
    duration: 1000
  })
}

provide<ProvideTag>('provideTag', {
  collapsedWidth,
  width,
  collapsed,
  refresh
})
</script>

<style lang="scss" scoped>
.layout {
  height: 100%;
  background-color: #f5f5f5;

  .aside,
  .header,
  .content {
    background-color: #f5f5f5;
  }

  .aside {
    margin: 10px 0 10px 10px;
    box-sizing: content-box;
    :deep(.n-layout-sider-scroll-container) {
      @include divInitialization();
    }
  }

  .header {
    padding: 10px 10px 0;
  }

  .content {
    height: calc(100% - 56px);
    overflow: hidden;
    padding: 10px;
    :deep(.n-layout-scroll-container) {
      margin-inline-end: -5px;
      overflow-y: scroll;
      @include scrollbar();
    }
  }
}
</style>
