<template>
  <div class="system-operation">
    <a-dropdown placement="bottomRight" trigger="click">
      <div class="system-operation__item lang">
        <mdicon name="translate" />
      </div>
      <template #overlay>
        <a-menu>
          <a-menu-item v-for="(item, index) in langList" :key="index" @click="switchLanguage(item)">
            {{ item.content }}
          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
    <a-popover placement="bottomRight" trigger="click">
      <template #content>
        <a-button type="text" @click="logout"> 退出登录 </a-button>
      </template>
      <div class="system-operation__item user">
        <a-avatar>U</a-avatar>
        Admin
      </div>
    </a-popover>
  </div>
</template>

<script setup lang="ts">
import { langList, useLocale } from '@/locales/useLocale'
import { useLoadingStore, useUserStore } from '@/plugins/stores'
import type { LangList } from '@/types/lang'
import { message } from 'ant-design-vue'

const loadingStore = useLoadingStore()
const { cutoverLang } = useLocale()
const switchLanguage = (item: LangList) => {
  cutoverLang(item.value)
}

const userStore = useUserStore()
const logout = async () => {
  await userStore.logout()
  message.success('已登出')
}
</script>

<style lang="scss" scoped>
.system-operation {
  @include flexInit($ais: center);
  @include divInitialization();
  background-color: #fff;

  &__item {
    padding: 0 20px;
    height: 45px;
    cursor: pointer;
    @include flexInit($ais: center);

    &:hover {
      background-color: rgba(0, 0, 0, 0.06);
    }
  }
}
</style>
