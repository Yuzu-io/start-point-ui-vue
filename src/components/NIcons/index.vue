<template>
  <n-icon
    class="n-icons"
    :component="materialIcon[props.component]"
    :size="props.size"
    :depth="props.depth"
    :color="props.color"
    :style="props.style"
  />
</template>

<script setup lang="ts">
// import * as material from '@vicons/material'
import {
  InsertChartFilled,
  SettingsFilled,
  CachedFilled,
  PlusFilled,
  EditFilled,
  DeleteFilled,
  MenuFilled
} from '@vicons/material'
import type { Component } from 'vue'

// const materialIcon = material as Record<string, Component>
const materialIcon: Record<string, Component> = {
  InsertChartFilled,
  SettingsFilled,
  CachedFilled,
  PlusFilled,
  EditFilled,
  DeleteFilled,
  MenuFilled
}

const props = withDefaults(defineProps<Props>(), {
  component: '',
  size: 18
})
</script>
<script lang="ts">
interface Props {
  component: string
  size?: string | number
  depth?: string
  color?: string
  style?: string
}
</script>

<style scoped></style>
