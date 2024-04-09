<template>
  <div class="system-operation">
    <n-dropdown
      trigger="click"
      :options="langList"
      key-field="value"
      label-field="content"
      @select="switchLanguage"
    >
      <div class="system-operation__item lang">
        <MSIcon name="Translate" size="18"></MSIcon>
      </div>
    </n-dropdown>

    <n-dropdown
      trigger="click"
      :options="systemOptions"
      key-field="value"
      label-field="content"
      @select="systemOptionsFun"
    >
      <div class="system-operation__item user">
        <n-avatar round>U</n-avatar>
        Admin
      </div>
    </n-dropdown>
  </div>
</template>

<script setup lang="ts">
import { langList, useLocale } from '@/locales/useLocale'
import { useLoadingStore, usePermissionStore, useUserStore } from '@/plugins/stores'
import type { LangList } from '@/types/lang'
import { useMessage, type DropdownOption } from 'naive-ui'
import MSIcon from '@/components/MSIcon/index.vue'

const message = useMessage()
const loadingStore = useLoadingStore()
const { cutoverLang } = useLocale()
const switchLanguage = (key: string | number, option: LangList) => {
  cutoverLang(option.value)
}

const systemOptions = [
  {
    content: '退出登录',
    value: 'logout'
  }
]
const systemOptionsFun = (key: string | number, option: DropdownOption) => {
  switch (key) {
    case SystemOptions.Logout:
      logout()
      break
  }
}

const userStore = useUserStore()
const permissionStore = usePermissionStore()
const logout = async () => {
  await userStore.logout()
  await permissionStore.$reset()
  message.success('已登出')
}
</script>
<script lang="ts">
enum SystemOptions {
  Logout = 'logout'
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
