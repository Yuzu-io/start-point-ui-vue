<template>
  <t-config-provider :global-config="getLocale">
    <RouterView :key="locale" />
  </t-config-provider>
</template>

<script lang="ts" setup>
import { useLocale } from './locales/useLocale'
const { getLocale, locale } = useLocale()
</script>
