<template>
  <mdicon :name="props.name" :size="props.size" />
</template>

<script setup lang="ts">
/**
 * 该组件用于需要传入图标组件的方法，对于不能使用标签的地方引入改组件即可
 */
const props = withDefaults(defineProps<Props>(), {
  name: '',
  size: 16
})
</script>
<script lang="ts">
interface Props {
  name: string
  size: number | string
}
</script>
