<template>
  <RouterView v-slot="{ Component }" v-if="route.meta.isExternalLink === '1'">
    <Transition name="fade" mode="out-in">
      <KeepAlive :include="tagStore.cacheView">
        <component :is="Component" :key="route.path" />
      </KeepAlive>
    </Transition>
  </RouterView>
</template>

<script setup lang="ts">
import { useTagStore } from '@/plugins/stores'
import { useRoute } from 'vue-router'

const tagStore = useTagStore()

const route = useRoute()
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
