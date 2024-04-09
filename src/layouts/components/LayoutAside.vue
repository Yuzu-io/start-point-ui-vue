<template>
  <div class="layout-aside">
    <!-- 头部 -->
    <div class="layout-aside__head">
      <div class="logo" v-show="!props.collapsed">start point</div>
      <div v-show="props.collapsed">
        <img width="30" src="https://www.naiveui.com/assets/naivelogo-XQ1U1Js8.svg" alt="" />
      </div>
    </div>
    <!-- 菜单 -->
    <div class="layout-aside__menu">
      <ScrollBar>
        <n-menu
          v-model:value="currentRoutes"
          :collapsed="props.collapsed"
          :collapsed-width="64"
          :collapsed-icon-size="22"
          :options="items"
          key-field="fullPath"
          label-field="title"
          children-field="children"
          @update:value="menuClick"
        />
      </ScrollBar>
    </div>
  </div>
</template>

<script setup lang="ts">
import { h, reactive, ref, type VNode } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { type MenuOption } from 'naive-ui'
import type { RoutesInfoRes } from '@/types/system/routes'
import MSIcon from '@/components/MSIcon/index.vue'
import ScrollBar from '@/components/ScrollBar/index.vue'
import { usePermissionStore } from '@/plugins/stores'
import { MenuTypeEnum } from '@/constants/routesEnum'

const route = useRoute()
const currentRoutes = ref<string>(route.fullPath)

const props = withDefaults(defineProps<Props>(), {
  collapsed: true
})
// 处理菜单数据
const permissionStore = usePermissionStore()

const menuList = permissionStore.menuRouters
const getItem = (
  title: string,
  fullPath: string,
  icon?: () => VNode,
  children?: MenuOption[] | null,
  type?: string
): MenuOption => {
  return {
    fullPath,
    icon,
    children,
    title,
    type
  } as MenuOption
}
const renderIcon = (icon: string) => {
  return () => h(MSIcon, { name: icon, size: '18' })
}
const generateMenu = (item: RoutesInfoRes[]) => {
  const data: MenuOption[] = []
  item.forEach((item) => {
    const { icon, fullPath, children, title, type } = item

    let currentChildren = undefined
    if (Array.isArray(children)) {
      currentChildren = generateMenu(children)
    } else if (type == MenuTypeEnum.Directory) {
      currentChildren = []
    }

    const menuItem = getItem(title, fullPath, icon ? renderIcon(icon) : undefined, currentChildren)
    data.push(menuItem)
  })
  return data
}
const items = reactive<MenuOption[]>(generateMenu(menuList))

const router = useRouter()
const menuClick = (key: string, item: MenuOption) => {
  router.push({
    path: key
  })
}
</script>
<script lang="ts">
interface Props {
  collapsed: boolean
}
</script>

<style lang="scss" scoped>
$head-height: 54px;
.layout-aside {
  height: 100%;
  background-color: #fff;

  &__head {
    height: $head-height;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #18a058;
    background-color: #fcfcfc;

    .logo {
      flex: 1;
      text-align: center;
      font-size: 30px;
      white-space: nowrap;
    }
  }

  &__menu {
    height: calc(100% - $head-height);
  }
}
</style>
