<template>
  <a-config-provider :locale="getLocale">
    <a-spin :spinning="loadingStore.loading" :delay="loadingStore.delay" :tip="loadingStore.tip">
      <RouterView :key="locale" />
    </a-spin>
  </a-config-provider>
</template>

<script lang="ts" setup>
import { useLocale } from './locales/useLocale'
import { useLoadingStore } from './plugins/stores'

const loadingStore = useLoadingStore()

const { getLocale, locale } = useLocale()
</script>
