<template>
  <n-pagination
    class="pagination"
    v-model:page="pageNum"
    v-model:page-size="pageSize"
    :page-sizes="props.pageSizes"
    :item-count="props.total"
    show-quick-jumper
    show-size-picker
    @update:page="updatePage"
    @update:page-size="updatePageSize"
  >
    <template #prefix="{ itemCount }"> {{ t('pagination.total', { total: itemCount }) }} </template>
  </n-pagination>
</template>

<script setup lang="ts">
import { t } from '@/locales/index'
const pageNum = defineModel<number>('pageNum')
const pageSize = defineModel<number>('pageSize')

const props = withDefaults(defineProps<Props>(), {
  pageSizes: () => [10, 20, 30, 50]
})

const emit = defineEmits(['updatePage', 'updatePageSize'])

const updatePage = (page: number) => {
  emit('updatePage', page)
}
const updatePageSize = (pageSize: number) => {
  emit('updatePageSize', pageSize)
}
</script>
<script lang="ts">
interface Props {
  pageSizes?: number[]
  total: number
}
</script>

<style lang="scss" scoped>
.pagination {
  padding: 16px 10px 16px 0;
  justify-content: flex-end;
}
</style>
