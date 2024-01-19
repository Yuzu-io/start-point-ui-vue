<template>
  <div class="tag" ref="tagRef" @wheel="wheelTag">
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
          {{ item.name }}
        </span>
        <div class="close" v-if="tagStore.tagList.length > 1" @click.stop @click="closeTag(index)">
          <mdicon class="close-icon" name="close" size="14" />
        </div>
      </div>
      <div class="tag-active-box" :style="{ width: tagWidth, left: tagLeftPosition }"></div>
    </div>
    <div
      class="tag-dropdown-box"
      ref="tagDropdownBox"
      v-show="showTagMenu"
      :style="{ left: tagMenuPosition.x, top: tagMenuPosition.y }"
    >
      <t-button
        block
        variant="text"
        @click="tagMenuOperation(TagMenuType.Refresh)"
        :disabled="!isCurrentTag"
      >
        <mdicon class="btn-icon" name="reload" size="18" />
        重新加载
      </t-button>
      <t-button block variant="text" @click="tagMenuOperation(TagMenuType.Close)">
        <mdicon class="btn-icon" name="close" size="18" />
        关闭标签
      </t-button>
      <t-button
        block
        variant="text"
        @click="tagMenuOperation(TagMenuType.Other)"
        :disabled="tagStore.tagList.length <= 1"
      >
        <mdicon class="btn-icon" name="minus" size="18" />
        关闭其他标签
      </t-button>
      <t-button
        block
        variant="text"
        @click="tagMenuOperation(TagMenuType.All)"
        :disabled="tagStore.tagList.length <= 1"
      >
        <mdicon class="btn-icon" name="square" size="18" />
        关闭全部标签
      </t-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ProvideTag } from '@/types/layouts/tag'
import { MessagePlugin } from 'tdesign-vue-next'
import { ref, onMounted, reactive, inject, watch, nextTick } from 'vue'
import { useTagStore } from '@/plugins/stores/index'

const tagStore = useTagStore()

const tagItemRef = ref<HTMLDivElement[]>([])
const tagWidth = ref<string>('0px')
const tagLeftPosition = ref<string>('0px')
const currentTagIndex = ref<number>(0)

const tagRef = ref<HTMLDivElement>()
// 滑动鼠标
const wheelTag = (event: WheelEvent) => {
  event.preventDefault()
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
  const x = event!.clientX
  const y = event!.clientY
  tagMenuPosition.x = `${x}px`
  tagMenuPosition.y = `${y}px`
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

const { refresh } = inject<ProvideTag>('provideTag', {
  refresh: () => {
    MessagePlugin.warning({
      content: '加载失败!',
      placement: 'top-right',
      duration: 1000
    })
  }
})
const tagMenuRefresh = () => {
  refresh()
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
  height: 56px;
  margin-right: 15px;

  &::-webkit-scrollbar {
    height: 5px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background-color: rgba($color: #c8c9cc, $alpha: 0.5);

    &:hover {
      background-color: rgba($color: #c8c9cc, $alpha: 1);
    }
  }

  &-list {
    position: relative;
    @include flexInit($ais: center);
    flex-wrap: nowrap;

    &__item {
      flex: none;
      padding: 10px 20px;
      position: relative;
      z-index: 3;
      cursor: pointer;
      @include flexInit($ais: center);
      @include divInitialization($bs: none);
      transition: all 0.3s;

      color: var(--td-text-color-secondary);
      &--active {
        color: var(--td-text-color-primary);
      }
      &:hover {
        color: var(--td-text-color-primary);
      }

      .close {
        height: 16px;
        width: 16px;
        border-radius: 50%;
        overflow: hidden;
        margin-left: 5px;
        color: var(--td-text-color-secondary);
        @include flexInit($ais: center, $jc: center);

        &:hover {
          color: #fff;
          background-color: var(--td-brand-color-active);
        }

        &-icon {
          transform: translateY(-1px);
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

  .tag-dropdown-box {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 4;
    background-color: #fff;
    padding: 10px 0;
    @include divInitialization();

    .t-button {
      width: 100%;
      justify-content: flex-start;
      border: none;
      border-radius: 0;

      .btn-icon {
        transform: translateY(-1px);
      }
    }
  }
}
</style>
