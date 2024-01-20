<template>
  <div class="layout-aside">
    <t-menu
      theme="light"
      :default-value="route.name"
      :defaultExpanded="['system']"
      style="height: calc(100vh - 20px)"
      :collapsed="collapsed"
      @change="changeHandler"
    >
      <template #logo>
        <img :width="collapsed ? 35 : 136" :src="iconUrl" alt="logo" />
      </template>

      <t-menu-item value="dashboard" to="dashboard">
        <template #icon>
          <t-icon name="dashboard" />
        </template>
        仪表盘
      </t-menu-item>

      <t-submenu value="system">
        <template #icon>
          <t-icon name="control-platform" />
        </template>
        <template #title>
          <span>系统管理</span>
        </template>
        <t-menu-item value="menu" to="menu">
          <template #icon>
            <t-icon name="server" />
          </template>
          菜单管理
        </t-menu-item>
      </t-submenu>

      <template #operations>
        <t-button
          class="t-demo-collapse-btn"
          variant="text"
          shape="square"
          @click="changeCollapsed"
        >
          <template #icon><t-icon name="view-list" /></template>
        </t-button>
      </template>
    </t-menu>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const collapsed = ref(false)
const iconUrl = ref('https://tdesign.gtimg.com/site/baseLogo-light.png')

const route = useRoute()

const changeCollapsed = () => {
  collapsed.value = !collapsed.value
  iconUrl.value = collapsed.value
    ? 'https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/logo%402x.png'
    : 'https://tdesign.gtimg.com/site/baseLogo-light.png'
}

const changeHandler = (active: any) => {
  console.log('change', active)
}
</script>

<style lang="scss" scoped>
.layout-aside {
  @include divInitialization();
}
</style>
