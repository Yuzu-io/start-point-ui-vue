<template>
  <div class="tag" ref="tagRef" @wheel.passive="wheelTag">
    <div class="tag-list">
      <div
        class="tag-list__item"
        ref="tagItemRef"
        :class="{ 'tag-list__item--active': currentTagIndex === index }"
        v-for="(item, index) in tagStore.tagList"
        :key="index"
        @click="chooseTag(item, index)"
        @contextmenu="openTagMenu(index, $event)"
      >
        <span>
          {{ item.title }}
        </span>
        <div class="close" v-if="tagStore.tagList.length > 1" @click.stop @click="closeTag(index)">
          <MSIcon name="Close" size="14"></MSIcon>
        </div>
      </div>
      <div class="tag-active-box" :style="{ width: tagWidth, left: tagLeftPosition }"></div>
    </div>
  </div>
  <div
    class="tag-dropdown-box"
    ref="tagDropdownBox"
    v-show="showTagMenu"
    :style="{ left: tagMenuPosition.x, top: tagMenuPosition.y }"
  >
    <n-space vertical>
      <n-button
        quaternary
        block
        :disabled="!isCurrentTag"
        @click="tagMenuOperation(TagMenuType.Refresh)"
      >
        <template #icon>
          <MSIcon name="Refresh" size="18"></MSIcon>
        </template>
        重新加载
      </n-button>
      <n-button quaternary block @click="tagMenuOperation(TagMenuType.Close)">
        <template #icon>
          <MSIcon name="Close" size="18"></MSIcon>
        </template>
        关闭标签
      </n-button>
      <n-button
        quaternary
        block
        :disabled="tagStore.tagList.length <= 1"
        @click="tagMenuOperation(TagMenuType.Other)"
      >
        <template #icon>
          <MSIcon name="Remove" size="18"></MSIcon>
        </template>
        关闭其他标签
      </n-button>
      <n-button
        quaternary
        block
        :disabled="tagStore.tagList.length <= 1"
        @click="tagMenuOperation(TagMenuType.All)"
      >
        <template #icon>
          <MSIcon name="Crop_Square" size="18"></MSIcon>
        </template>
        关闭全部标签
      </n-button>
    </n-space>
  </div>
</template>

<script setup lang="ts">
import type { ProvideTag } from '@/types/layouts/tag'
import { ref, onMounted, reactive, inject, watch, nextTick } from 'vue'
import { useTagStore } from '@/plugins/stores/index'
import MSIcon from '@/components/MSIcon/index.vue'
import { useMessage } from 'naive-ui'

const tagStore = useTagStore()

const message = useMessage()

const { collapsedWidth, width, collapsed, refresh } = inject<ProvideTag>('provideTag', {
  refresh: () => {
    message.warning('加载失败!', {
      duration: 1000
    })
  }
})

const tagItemRef = ref<HTMLDivElement[]>([])
const tagWidth = ref<string>('0px')
const tagLeftPosition = ref<string>('0px')
const currentTagIndex = ref<number>(0)

const tagRef = ref<HTMLDivElement>()
// 滑动鼠标
const wheelTag = (event: WheelEvent) => {
  tagRef.value!.scrollLeft += event.deltaY
}

// 获取标签宽度
const getTagWidth = () => {
  nextTick(() => {
    const currentTag = tagItemRef.value[currentTagIndex.value]
    if (currentTag) {
      currentTag.scrollIntoView()
      const width = currentTag ? currentTag.offsetWidth : 0
      const left = currentTag ? currentTag.offsetLeft : 0
      tagLeftPosition.value = `${left}px`
      tagWidth.value = `${width}px`
    }
  })
}

// 选择标签
const chooseTag = (item: any, index: number) => {
  if (index === currentTagIndex.value) return
  currentTagIndex.value = index
  getTagWidth()
  // 跳转路由
  console.log(item)
}

// 关闭标签
const closeTag = (index: number) => {
  tagStore.closeTag(index)
  if (index === currentTagIndex.value) {
    currentTagIndex.value = tagStore.tagList.length - 1
  } else if (index < currentTagIndex.value) {
    currentTagIndex.value--
  }
  getTagWidth()
}

const showTagMenu = ref<boolean>(false)
const tagMenuPosition = reactive<TagMenuPosition>({
  x: '0px',
  y: '0px'
})

// 打开标签菜单
const isCurrentTag = ref<boolean>(false)
const currentTagMenuIndex = ref<number>(0)
const openTagMenu = (index: number, event: MouseEvent) => {
  event.preventDefault()
  if (index === currentTagIndex.value) {
    isCurrentTag.value = true
  } else {
    isCurrentTag.value = false
  }
  currentTagMenuIndex.value = index
  showTagMenu.value = true
  console.log(collapsed)
  if (
    collapsed instanceof Object &&
    typeof collapsedWidth === 'number' &&
    typeof width === 'number'
  ) {
    const x = event!.clientX - (collapsed.value ? collapsedWidth : width) - 10
    const y = event!.clientY
    tagMenuPosition.x = `${x}px`
    tagMenuPosition.y = `${y}px`
  }
}

// tag菜单操作方法
const tagMenuOperation = (type: TagMenuType) => {
  switch (type) {
    case TagMenuType.Refresh:
      tagMenuRefresh()
      break
    case TagMenuType.Close:
      tagMenuCloseTag()
      break
    case TagMenuType.Other:
      tagMenuCloseOtherTags()
      break
    case TagMenuType.All:
      tagMenuCloseAllTags()
      break
  }
  getTagWidth()
  showTagMenu.value = false
}

const tagMenuRefresh = () => {
  if (refresh instanceof Function) {
    refresh()
  }
}
const tagMenuCloseTag = () => {
  tagStore.closeTag(currentTagMenuIndex.value)
  if (currentTagMenuIndex.value === currentTagIndex.value) {
    currentTagIndex.value = tagStore.tagList.length - 1
  } else if (currentTagMenuIndex.value < currentTagIndex.value) {
    currentTagIndex.value--
  }
}
const tagMenuCloseOtherTags = () => {
  tagStore.closeOtherTags(currentTagMenuIndex.value)
  currentTagIndex.value = 0
}
const tagMenuCloseAllTags = () => {
  tagStore.$reset()
}

// 判断是否点击在非菜单元素中
const tagDropdownBox = ref<HTMLElement>()
const focusTagMenu = (event: MouseEvent) => {
  const clickedElement = event.target as HTMLElement // 获取被点击的元素
  if (!tagDropdownBox.value!.contains(clickedElement)) {
    showTagMenu.value = false
  }
}
watch(showTagMenu, (val) => {
  if (val) {
    document.addEventListener('click', focusTagMenu)
  } else {
    document.removeEventListener('click', focusTagMenu)
  }
})

onMounted(() => {
  getTagWidth()
})
</script>
<script lang="ts">
interface TagMenuPosition {
  x: string
  y: string
}

enum TagMenuType {
  Refresh = 'refresh',
  Close = 'close',
  Other = 'other',
  All = 'all'
}
</script>

<style lang="scss" scoped>
.tag {
  overflow-x: scroll;
  height: 45px;
  margin-right: 15px;
  position: relative;

  @include scrollbar();

  &-list {
    position: absolute;
    @include flexInit($ais: center);
    flex-wrap: nowrap;

    &__item {
      flex: none;
      padding: 10px 16px;
      position: relative;
      z-index: 3;
      cursor: pointer;
      @include flexInit($ais: center);
      @include divInitialization($bs: none);
      transition: all 0.3s;

      &--active {
        color: #18a058;
      }
      &:hover {
        color: #18a058;
      }

      .close {
        height: 16px;
        width: 16px;
        border-radius: 50%;
        overflow: hidden;
        margin-left: 5px;
        @include flexInit($ais: center, $jc: center);

        &:hover {
          color: #fff;
          background-color: #18a058;
        }
      }
    }
  }

  .tag-active-box {
    width: 80px;
    height: 100%;
    background-color: #fff;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1;
    transition: all 0.3s;
    @include divInitialization();
  }
}

.tag-dropdown-box {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 4;
  background-color: #fff;
  padding: 10px 0;
  @include divInitialization();

  .n-button {
    border-radius: 0;
  }
}
</style>
