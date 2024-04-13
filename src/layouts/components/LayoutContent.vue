<template>
  <RouterView v-slot="{ Component }">
    <Transition name="fade" mode="out-in">
      <KeepAlive :include="tagStore.cacheView">
        <component :is="Component" />
      </KeepAlive>
    </Transition>
  </RouterView>
</template>

<script setup lang="ts">
import { useTagStore } from '@/plugins/stores'

const tagStore = useTagStore()
</script>

<style lang="scss" scoped>
.fade--move,
.fade-leave-active,
.fade-enter-active {
  transition: all 0.5s;
}

.fade-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
