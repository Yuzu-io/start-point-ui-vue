<template>
  <div class="layout-aside">
    <a-menu
      v-model:openKeys="state.openKeys"
      v-model:selectedKeys="state.selectedKeys"
      :mode="state.mode"
      :items="items"
      :theme="state.theme"
    ></a-menu>
  </div>
</template>

<script setup lang="ts">
import { h, reactive, ref } from 'vue'
import {
  MailOutlined,
  CalendarOutlined,
  AppstoreOutlined,
  SettingOutlined
} from '@ant-design/icons-vue'
import type { MenuMode, MenuTheme } from 'ant-design-vue'
import { type ItemType } from 'ant-design-vue'
import { useRoute } from 'vue-router'

const collapsed = ref(false)

const route = useRoute()

//

const state = reactive({
  mode: 'inline' as MenuMode,
  theme: 'light' as MenuTheme,
  selectedKeys: ['1'],
  openKeys: ['sub1']
})

function getItem(
  label: string,
  key: string,
  icon?: any,
  children?: ItemType[],
  type?: 'group'
): ItemType {
  return {
    key,
    icon,
    children,
    label,
    type
  } as ItemType
}

const items: ItemType[] = reactive([
  getItem('Navigation One', '1', h(MailOutlined)),
  getItem('Navigation Two', '2', h(CalendarOutlined)),
  getItem('Navigation Two', 'sub1', h(AppstoreOutlined), [
    getItem('Option 3', '3'),
    getItem('Option 4', '4'),
    getItem('Submenu', 'sub1-2', null, [getItem('Option 5', '5'), getItem('Option 6', '6')])
  ]),
  getItem('Navigation Three', 'sub2', h(SettingOutlined), [
    getItem('Option 7', '7'),
    getItem('Option 8', '8'),
    getItem('Option 9', '9'),
    getItem('Option 10', '10')
  ]),
  getItem('Navigation Three', 'sub20', h(SettingOutlined), [
    getItem('Option 7', '7'),
    getItem('Option 8', '8'),
    getItem('Option 9', '9'),
    getItem('Option 10', '10')
  ]),
  getItem('Navigation Three', 'sub211', h(SettingOutlined), [
    getItem('Option 7', '7'),
    getItem('Option 8', '8'),
    getItem('Option 9', '9'),
    getItem('Option 10', '10')
  ])
])
</script>

<style lang="scss" scoped>
.layout-aside {
  height: 100%;
  @include divInitialization();

  .ant-menu {
    height: 100%;
    overflow-y: scroll;
    @include scrollbar();
  }
}
</style>
