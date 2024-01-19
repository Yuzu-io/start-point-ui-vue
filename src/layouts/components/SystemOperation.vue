<template>
  <div class="system-operation">
    <div class="system-operation__item lang">
      <mdicon name="translate" />
    </div>
    <t-popup trigger="click" destroy-on-close>
      <div class="system-operation__item user">
        <t-avatar>W</t-avatar>
        Admin
      </div>
      <template #content> 123 </template>
    </t-popup>
  </div>
</template>

<script setup lang="ts">
import { MessagePlugin } from 'tdesign-vue-next'
</script>

<style lang="scss" scoped>
.system-operation {
  @include flexInit($ais: center);
  @include divInitialization();
  background-color: #fff;

  &__item {
    padding: 0 20px;
    height: 56px;
    cursor: pointer;
    @include flexInit($ais: center);

    &:hover {
      background-color: var(--td-bg-color-container-hover);
    }
  }
}
</style>
