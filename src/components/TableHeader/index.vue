<template>
  <div class="table-header">
    <a-tooltip placement="top">
      <template #title>
        <span>刷新</span>
      </template>
      <a-button type="primary" @click="refreshClick">
        <template #icon>
          <mdicon name="cached" size="20" />
        </template>
      </a-button>
    </a-tooltip>

    <a-tooltip placement="top">
      <template #title>
        <span>添加</span>
      </template>
      <a-button type="primary" style="margin: 0 0 0 8px" @click="addClick">
        <template #icon>
          <mdicon name="plus" size="20" />
        </template>
        <span> 添加 </span>
      </a-button>
    </a-tooltip>

    <a-tooltip placement="top">
      <template #title>
        <span>编辑选中行</span>
      </template>
      <a-button
        type="primary"
        :disabled="props.isNoSelection"
        style="margin: 0 0 0 8px"
        @click="editClick"
      >
        <template #icon>
          <mdicon name="pencil" size="20" />
        </template>
        <span> 编辑 </span>
      </a-button>
    </a-tooltip>

    <a-tooltip placement="top">
      <template #title>
        <span>删除选中行</span>
      </template>
      <a-button
        type="primary"
        danger
        :disabled="props.isNoSelection"
        style="margin: 0 0 0 8px"
        @click="addClick"
      >
        <template #icon>
          <mdicon name="delete" size="20" />
        </template>
        <span> 删除 </span>
      </a-button>
    </a-tooltip>
  </div>
</template>

<script lang="ts" setup>
const props = withDefaults(defineProps<Props>(), {
  isNoSelection: true
})
const emit = defineEmits(['refreshClick', 'addClick', 'editClick'])

const refreshClick = () => {
  emit('refreshClick')
}
const addClick = () => {
  emit('addClick')
}

const editClick = () => {
  emit('editClick')
}
</script>
<script lang="ts">
interface Props {
  isNoSelection: boolean
}
</script>

<style lang="scss" scoped>
.table-header {
  margin: 10px;
}
</style>
