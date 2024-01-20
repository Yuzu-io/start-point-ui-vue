<template>
  <div class="system-operation">
    <div class="system-operation__item lang">
      <mdicon name="translate" />
    </div>
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
import { useUserStore } from '@/plugins/stores'
import { message } from 'ant-design-vue'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()
const logout = async () => {
  await userStore.logout()
  message.success('已登出')
  router.push('/login')
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
      background-color: var(--td-bg-color-container-hover);
    }
  }
}
</style>
