<template>
  <div class="layout-aside">
    <t-menu
      theme="light"
      default-value="item2"
      style="height: calc(100vh - 30px)"
      :collapsed="collapsed"
      @change="changeHandler"
    >
      <template #logo>
        <img :width="collapsed ? 35 : 136" :src="iconUrl" alt="logo" />
      </template>

      <t-menu-item value="item1">
        <template #icon>
          <t-icon name="dashboard" />
        </template>
        仪表盘
      </t-menu-item>
      <t-menu-item value="resource">
        <template #icon>
          <t-icon name="server" />
        </template>
        资源列表
      </t-menu-item>
      <t-menu-item value="root">
        <template #icon>
          <t-icon name="root-list" />
        </template>
        根目录
      </t-menu-item>
      <t-submenu value="2">
        <template #icon>
          <t-icon name="control-platform" />
        </template>
        <template #title>
          <span>调度平台</span>
        </template>
        <t-menu-item value="2-1"> 二级菜单内容 </t-menu-item>
        <t-menu-item value="2-2"> 二级菜单内容 </t-menu-item>
        <t-menu-item value="2-3"> 二级菜单内容 </t-menu-item>
      </t-submenu>
      <t-menu-item value="precise-monitor">
        <template #icon>
          <t-icon name="precise-monitor" />
        </template>
        精准监控
      </t-menu-item>
      <t-submenu title="消息区" value="3" disabled>
        <template #icon>
          <t-icon name="mail" />
        </template>
        <template #title>
          <span>消息区</span>
        </template>
        <t-menu-item value="3-1"> 二级菜单内容 </t-menu-item>
        <t-menu-item value="3-2"> 二级菜单内容 </t-menu-item>
        <t-menu-item value="3-3"> 二级菜单内容 </t-menu-item>
      </t-submenu>
      <t-menu-item value="user-circle">
        <template #icon>
          <t-icon name="user-circle" />
        </template>
        个人中心
      </t-menu-item>
      <t-submenu value="4">
        <template #icon>
          <t-icon name="play-circle" />
        </template>
        <template #title>
          <span>视频区</span>
        </template>
        <t-menu-item value="4-1"> 二级菜单内容 </t-menu-item>
        <t-menu-item value="4-2"> 二级菜单内容 </t-menu-item>
        <t-menu-item value="4-3"> 二级菜单内容 </t-menu-item>
      </t-submenu>
      <t-menu-item value="edit1">
        <template #icon>
          <t-icon name="edit-1" />
        </template>
        资源编辑
      </t-menu-item>

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

const collapsed = ref(false)
const iconUrl = ref('https://tdesign.gtimg.com/site/baseLogo-light.png')

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
