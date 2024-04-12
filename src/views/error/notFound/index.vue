<template>
  <div>
    <div>404错误!</div>
    <div>找不到页面!</div>
    <div>
      对不起，您正在寻找的页面不存在。尝试检查URL的错误，然后按浏览器上的刷新按钮或尝试在我们的应用程序中找到其他内容。
    </div>
    <button v-if="permissionStore.menuRouters.length" @click="goBack">返回上一页</button>
    <button v-else @click="switchAccounts">切换账号</button>
  </div>
</template>

<script setup lang="ts">
import { usePermissionStore, useUserStore } from '@/plugins/stores'
import { useRouter } from 'vue-router'

const permissionStore = usePermissionStore()
const userStore = useUserStore()
const router = useRouter()
const goBack = () => {
  router.back()
}
const switchAccounts = () => {
  userStore.logout()
}
</script>

<style scoped></style>
