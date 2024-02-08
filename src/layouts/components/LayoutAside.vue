<template>
  <div class="layout-aside">
    <!-- 头部 -->
    <div class="layout-aside__head">
      <div class="logo" v-show="!state.collapsed">start point</div>
      <mdicon
        class="menu-expanded-btn"
        :name="state.collapsed ? 'menu-open' : 'menu-close'"
        size="28"
        @click="menuExpanded"
      />
    </div>
    <!-- 菜单 -->
    <div class="layout-aside__menu">
      <a-menu
        v-model:openKeys="state.openKeys"
        v-model:selectedKeys="state.selectedKeys"
        :mode="state.mode"
        :items="items"
        :theme="state.theme"
        @click="menuClick"
      >
      </a-menu>
    </div>
  </div>
</template>

<script setup lang="ts">
import { h, reactive } from 'vue'
import type { MenuMode, MenuTheme } from 'ant-design-vue'
import { type ItemType } from 'ant-design-vue'
import { useRoute, useRouter, type RouteLocationMatched } from 'vue-router'
import MDIcon from '@/components/MDIcon/index.vue'
import type { MenuInfo } from 'ant-design-vue/es/menu/src/interface'

const route = useRoute()

const selectedKeys: string = route.path
const openKeys: string[] = getParentPaths(route.matched)

function getParentPaths(data: RouteLocationMatched[]) {
  return data.reduce((pre: string[], cur: RouteLocationMatched) => {
    const parentPath = cur.meta.parentPath as string
    if (parentPath) {
      return pre.concat(parentPath)
    }
    return pre
  }, [])
}

const emit = defineEmits(['update:collapsed'])
const props = withDefaults(defineProps<Props>(), {
  collapsed: true
})

const state = reactive({
  mode: 'inline' as MenuMode,
  theme: 'light' as MenuTheme,
  selectedKeys: [selectedKeys],
  openKeys: openKeys,
  collapsed: props.collapsed
})

const menuExpanded = () => {
  state.collapsed = !state.collapsed
  emit('update:collapsed', state.collapsed)
}

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
  getItem('仪表盘', '/dashboard', h(MDIcon, { name: 'chart-donut', size: 18 })),
  getItem('系统管理', '/system', h(MDIcon, { name: 'cog-outline', size: 18 }), [
    getItem('菜单管理', '/menu')
  ])
])

const router = useRouter()
const menuClick = (info: MenuInfo) => {
  router.push({
    path: info.key as string
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
  @include divInitialization();

  &__head {
    height: $head-height;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #1677ff;
    background-color: #fcfcfc;

    .logo {
      flex: 1;
      text-align: center;
      font-size: 30px;
      white-space: nowrap;
    }

    .menu-expanded-btn {
      margin: 5px 10px 0;
      cursor: pointer;
    }
  }

  &__menu {
    height: calc(100% - $head-height);
    overflow-y: scroll;
    @include scrollbar();

    .ant-menu {
      padding-left: 5px;
      border-inline-end: none;
    }
  }
}
</style>
