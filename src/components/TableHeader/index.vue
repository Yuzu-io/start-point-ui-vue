<template>
  <div class="table-header">
    <a-button type="primary" @click="refreshClick">
      <template #icon>
        <mdicon name="cached" size="20" />
      </template>
    </a-button>

    <a-button type="primary" style="margin: 0 8px" @click="addClick">
      <template #icon>
        <mdicon name="plus" size="20" />
      </template>
      <span> 添加 </span>
    </a-button>
  </div>
</template>

<script lang="ts" setup>
const emit = defineEmits(['refreshClick', 'addClick'])

const refreshClick = () => {
  emit('refreshClick')
}
const addClick = () => {
  emit('addClick')
}
</script>

<style lang="scss" scoped>
.table-header {
  margin: 10px;
}
</style>
