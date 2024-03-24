<template>
  <div class="table-header">
    <n-tooltip placement="top" trigger="hover">
      <template #trigger>
        <n-button type="primary" @click="refreshClick">
          <template #icon>
            <n-icon size="20">
              <CachedFilled />
            </n-icon>
          </template>
        </n-button>
      </template>
      <span>刷新</span>
    </n-tooltip>

    <n-tooltip placement="top" trigger="hover">
      <template #trigger>
        <n-button type="primary" style="margin: 0 0 0 8px" @click="addClick">
          <template #icon>
            <n-icon size="20">
              <PlusFilled />
            </n-icon>
          </template>
          <span> 添加 </span>
        </n-button>
      </template>
      <span>添加</span>
    </n-tooltip>

    <n-tooltip placement="top" trigger="hover">
      <template #trigger>
        <n-button
          type="info"
          :disabled="props.isNoSelection"
          style="margin: 0 0 0 8px"
          @click="editClick"
        >
          <template #icon>
            <n-icon size="20">
              <EditFilled />
            </n-icon>
          </template>
          <span> 编辑 </span>
        </n-button>
      </template>
      <span>编辑选中行</span>
    </n-tooltip>

    <n-tooltip placement="top" trigger="hover">
      <template #trigger>
        <n-button
          type="error"
          danger
          :disabled="props.isNoSelection"
          style="margin: 0 0 0 8px"
          @click="deleteClick"
        >
          <template #icon>
            <n-icon size="20">
              <DeleteFilled />
            </n-icon>
          </template>
          <span> 删除 </span>
        </n-button>
      </template>
      <span>删除选中行</span>
    </n-tooltip>
  </div>
</template>

<script lang="ts" setup>
import { CachedFilled, PlusFilled, EditFilled, DeleteFilled } from '@vicons/material'

const props = withDefaults(defineProps<Props>(), {
  isNoSelection: true
})
const emit = defineEmits(['refreshClick', 'addClick', 'editClick', 'deleteClick'])

const refreshClick = () => {
  emit('refreshClick')
}
const addClick = () => {
  emit('addClick')
}

const editClick = () => {
  emit('editClick')
}
const deleteClick = () => {
  emit('deleteClick')
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
