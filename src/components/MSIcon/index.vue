<template>
  <span class="material-symbols-outlined m-s-icon" :style="style">
    {{ props.name }}
  </span>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = withDefaults(defineProps<Props>(), {
  name: 'Warning',
  size: 16,
  color: ''
})

const style = ref<Style>({
  fontSize: `${props.size}px`,
  color: props.color
})
</script>
<script lang="ts">
interface Props {
  name: string
  size: number | string
  color?: string
}

interface Style {
  fontSize: string
  color: string
}
</script>

<style lang="scss" scoped></style>
