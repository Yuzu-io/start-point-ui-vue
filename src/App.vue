<template>
  <n-config-provider :locale="getLocale">
    <n-spin
      :show="loadingStore.loading"
      :delay="loadingStore.delay"
      :description="loadingStore.tip"
    >
      <n-message-provider :max="1">
        <RouterView :key="locale" />
      </n-message-provider>
    </n-spin>
  </n-config-provider>
</template>

<script lang="ts" setup>
import { useLocale } from './locales/useLocale'
import { useLoadingStore } from './plugins/stores'

const loadingStore = useLoadingStore()

const { getLocale, locale } = useLocale()
</script>
