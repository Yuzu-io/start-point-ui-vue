<template>
  <div class="layout-header">
    <div class="layout-header__tag">
      <Tag />
    </div>
    <SystemOperation class="layout-header__system-operation" />
  </div>
</template>

<script setup lang="ts">
import Tag from './Tag.vue'
import SystemOperation from './SystemOperation.vue'
</script>

<style lang="scss" scoped>
.layout-header {
  width: 100%;
  height: 100%;
  @include flexInit($ais: center, $jc: space-between);

  &__tag {
    flex: 1;
  }
}
</style>
