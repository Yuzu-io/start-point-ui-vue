<template>
  <RouterView v-if="route.meta.keepAlive === '0'" v-slot="{ Component }">
    <KeepAlive>
      <component :is="Component" />
    </KeepAlive>
  </RouterView>
  <RouterView v-if="!(route.meta.keepAlive === '0')" />
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<style scoped></style>
