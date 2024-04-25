<template>
  <div class="layout-aside">
    <!-- 头部 -->
    <div class="layout-aside__head">
      <div class="logo" v-show="!props.collapsed">start point</div>
      <div v-show="props.collapsed">
        <MSIcon name="Radio_Button_Checked" size="30"></MSIcon>
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
import { h, reactive, ref, watch, type VNode } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { type MenuOption } from 'naive-ui'
import type { RoutesInfoRes } from '@/types/system/routes'
import MSIcon from '@/components/MSIcon/index.vue'
import ScrollBar from '@/components/ScrollBar/index.vue'
import { usePermissionStore } from '@/plugins/stores'
import { MenuTypeEnum } from '@/constants/routesEnum'

const route = useRoute()
const currentRoutes = ref<string>(route.path)

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
  type?: string,
  link?: boolean
): MenuOption => {
  return {
    fullPath,
    icon,
    children,
    title,
    type,
    link
  } as MenuOption
}
const renderIcon = (icon: string) => {
  return () => h(MSIcon, { name: icon, size: '18' })
}
const generateMenu = (item: RoutesInfoRes[]) => {
  const data: MenuOption[] = []
  item.forEach((item) => {
    const { icon, fullPath, children, title, type, showStatus, isExternalLink } = item
    if (showStatus === '0') {
      let currentChildren = undefined
      if (Array.isArray(children)) {
        currentChildren = generateMenu(children)
      } else if (type == MenuTypeEnum.Directory && isExternalLink === '1') {
        currentChildren = []
      }
      const menuItem = getItem(
        title,
        fullPath,
        icon ? renderIcon(icon) : undefined,
        currentChildren
      )
      menuItem.link = isExternalLink === '0' // 判断是否为外链 是则为true，否则为false
      data.push(menuItem)
    }
  })
  return data
}
const items = reactive<MenuOption[]>(generateMenu(menuList))

const router = useRouter()
const menuClick = (key: string, item: MenuOption) => {
  if (item.link) {
    window.open(item.fullPath as string, '_blank')
  } else {
    router.push({
      path: key
    })
  }
}

watch(
  route,
  () => {
    currentRoutes.value = route.path
  },
  {
    immediate: true
  }
)
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
