<template>
  <div class="scroll-bar">
    <div ref="scrollBarArea" class="scroll-bar__area" @scroll="calcScrollOffset">
      <slot></slot>
    </div>
    <div ref="scrollBarTrack" class="scroll-bar__track" @click="clickTrack">
      <div ref="scrollBarThumb" class="scroll-bar__thumb" @mousedown="dragSlider"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

const scrollBarArea = ref<HTMLElement | null>(null) // 滚动区域
const scrollBarTrack = ref<HTMLElement | null>(null) // 滚动条轨道
const scrollBarThumb = ref<HTMLElement | null>(null) // 滚动条

/**
 * 计算滚动条偏移量
 * @param e 获取滚动事件
 */
const calcScrollOffset = (e: Event) => {
  const viewHeight = scrollBarArea.value?.clientHeight as number
  const wrapHeight = scrollBarArea.value?.scrollHeight as number
  const wrapOffset = (e.target as HTMLElement).scrollTop
  const thumbOffset = (wrapOffset * viewHeight) / wrapHeight
  ;(scrollBarThumb.value as HTMLElement).style.top = `${thumbOffset}px`
}

/**
 * 计算滚动条高度
 */
const calcScrollBarHeight = () => {
  const viewHeight = scrollBarArea.value?.clientHeight as number
  const wrapHeight = scrollBarArea.value?.scrollHeight as number
  const trackHeight = scrollBarTrack.value?.scrollHeight as number
  let thumbHeight = (trackHeight * viewHeight) / wrapHeight
  // 滚动条长度和轨道长度一直时隐藏滚动条 让滚动条高度为0
  if (trackHeight === thumbHeight) {
    thumbHeight = 0
  }
  ;(scrollBarThumb.value as HTMLElement).style.height = `${thumbHeight}px`
}

let offsetY = 0
let downY = 0
let moveY = 0
let originY = 0
const dragSlider = (e: MouseEvent) => {
  downY = e.clientY //记录点击位置
  originY = scrollBarArea.value?.scrollTop as number //记录原本的偏移量
  window.addEventListener('mousemove', mousemoveListener)
  window.addEventListener('mouseup', mouseupListener)
}

const mousemoveListener = (e: MouseEvent) => {
  moveY = e.clientY // 获取鼠标移动时的位置
  offsetY = moveY - downY // 计算偏移量
  const wrapHeight = scrollBarArea.value?.scrollHeight as number
  const trackHeight = scrollBarTrack.value?.scrollHeight as number
  const distance = (wrapHeight * offsetY) / trackHeight + originY
  ;(scrollBarArea.value as HTMLElement).scrollTop = distance
}
const mouseupListener = () => {
  window.removeEventListener('mousemove', mousemoveListener)
  window.removeEventListener('mouseup', mouseupListener)
}

// 点击滚动条轨道
const clickTrack = (e: MouseEvent) => {
  if (e.target !== scrollBarTrack.value) return
  const downTrack = (e.clientY - (scrollBarThumb.value as HTMLElement).scrollHeight) as number
  const thumbHeight = scrollBarThumb.value?.scrollHeight as number
  const trackHeight = scrollBarTrack.value?.scrollHeight as number
  const originOffset = scrollBarArea.value?.scrollTop as number //记录原本的偏移量
  if (downTrack > thumbHeight || downTrack < thumbHeight) {
    const distance = (thumbHeight * downTrack) / trackHeight + originOffset
    ;(scrollBarArea.value as HTMLElement).scrollTop = distance
  }
}

onMounted(() => {
  calcScrollBarHeight()
})

// 浏览器窗口变化时
window.onresize = () => {
  calcScrollBarHeight()
}
</script>

<style lang="scss" scoped>
.scroll-bar {
  position: relative;
  overflow: hidden;
  height: 100%;
  width: 100%;

  &:hover {
    .scroll-bar__track {
      opacity: 1;
    }
  }

  &__area {
    height: 100%;
    overflow-y: scroll;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  &__track {
    width: 6px;
    height: 100%;
    position: absolute;
    top: 0;
    right: 0;
    z-index: 1;
    opacity: 0;
    transition: opacity 0.3s;

    &:active {
      opacity: 1;
    }
  }

  &__thumb {
    width: 5px;
    height: 0;
    border-radius: 15px;
    background-color: #dbdbdb;
    position: absolute;
    left: 0;
    top: 0;
    user-select: none;
  }
}
</style>
