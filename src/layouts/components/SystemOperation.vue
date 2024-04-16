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
        <n-avatar round :src="avatar"></n-avatar>
        <span class="username">{{ username }}</span>
      </div>
    </n-dropdown>
  </div>
</template>

<script setup lang="ts">
import { langList, useLocale } from '@/locales/useLocale'
import { useLoadingStore, useUserStore } from '@/plugins/stores'
import type { LangList } from '@/types/lang'
import { useMessage, type DropdownOption } from 'naive-ui'
import MSIcon from '@/components/MSIcon/index.vue'

const message = useMessage()
const loadingStore = useLoadingStore()
const userStore = useUserStore()
const username = userStore.userInfo.username // 用户名
const avatar = import.meta.env.VITE_FILE_PATH_BASE_URL + '/images/' + userStore.userInfo.avatar // 头像

const { cutoverLang } = useLocale()
const switchLanguage = (key: string | number, option: LangList) => {
  loadingStore.isLoading(true)
  setTimeout(() => {
    cutoverLang(option.value)
  }, 500)
  setTimeout(() => {
    loadingStore.isLoading(false)
  }, 1000)
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

const logout = async () => {
  await userStore.logout()
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
  position: relative;
  z-index: 1;
  background-color: #fff;
  user-select: none;

  &__item {
    padding: 0 20px;
    height: 45px;
    cursor: pointer;
    @include flexInit($ais: center);

    &:hover {
      background-color: #f5f5f5;
    }
  }

  .user {
    box-sizing: border-box;
    padding: 0 15px;

    .n-avatar {
      margin: 0 5px;
      width: 25px;
      height: 25px;
    }

    .username {
      max-width: 50px;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }
}
</style>
