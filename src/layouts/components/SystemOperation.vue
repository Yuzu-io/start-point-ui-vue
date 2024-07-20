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

    <div class="system-operation__item lang" @click="handleFullscreen">
      <MSIcon name="Fullscreen" size="18" v-show="!fullScreen"></MSIcon>
      <MSIcon name="Fullscreen_Exit" size="18" v-show="fullScreen"></MSIcon>
    </div>

    <n-popover trigger="click" placement="bottom-end">
      <template #trigger>
        <div class="system-operation__item user">
          <n-avatar round :src="avatar"></n-avatar>
          <span class="username">{{ username }}</span>
        </div>
      </template>
      <div class="user-popover">
        <n-avatar :size="50" round :src="avatar"></n-avatar>
        <div class="username">{{ username }}</div>
        <div class="time">{{ time }}</div>
        <n-button type="error" ghost @click="logout"> 退出登录 </n-button>
      </div>
    </n-popover>
  </div>
</template>

<script setup lang="ts">
import { langList, useLocale } from '@/locales/useLocale'
import { useLoadingStore, useUserStore } from '@/plugins/stores'
import type { LangList } from '@/types/lang'
import { useMessage } from 'naive-ui'
import MSIcon from '@/components/MSIcon/index.vue'
import { onMounted, onUnmounted, ref } from 'vue'
import dayjs from 'dayjs'

const message = useMessage()
const loadingStore = useLoadingStore()
const userStore = useUserStore()
const username = userStore.userInfo.username // 用户名
const avatar = import.meta.env.VITE_FILE_PATH_BASE_URL + '/images/' + userStore.userInfo.avatar // 头像
const fullScreen = ref<boolean>(false)
const time = ref<string>('')
const timeInterval = ref<number>(0)

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

const handleFullscreen = () => {
  if (!document.fullscreenElement) {
    // 进入全屏
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen().then(() => (fullScreen.value = true))
    }
  } else {
    // 退出全屏
    if (document.exitFullscreen) {
      document.exitFullscreen().then(() => (fullScreen.value = false))
    }
  }
}

// 处理时间
const handleTime = () => {
  const date = dayjs(new Date().getTime())
  time.value = date.format('YYYY-MM-DD HH:mm:ss')
}

// 退出登录
const logout = async () => {
  await userStore.logout()
  message.success('已登出')
}

onMounted(() => {
  handleTime()
  timeInterval.value = setInterval(() => {
    handleTime()
  }, 1000)
})

onUnmounted(() => {
  clearInterval(timeInterval.value)
})
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

.user-popover {
  text-align: center;
  padding: 0 20px;

  .time {
    margin-bottom: 15px;
  }

  .username {
    font-weight: bold;
    font-size: 20px;
    margin-bottom: 10px;
  }
}
</style>
