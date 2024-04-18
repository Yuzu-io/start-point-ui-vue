<template>
  <div class="content">
    <div class="not-found" v-if="isMenuRoutes">
      <div class="left">
        <img :src="notFoundImg" alt="" />
      </div>
      <div class="right">
        <div class="hint">404错误!</div>
        <div class="title">找不到页面!</div>
        <div class="info">
          对不起，您正在寻找的页面不存在。尝试检查URL的错误，然后按浏览器上的刷新按钮或尝试在我们的应用程序中找到其他内容。
        </div>
        <n-button type="primary" round @click="goBack"> 返回首页 </n-button>
      </div>
    </div>
    <div class="not-auth" v-else>
      <div class="left">
        <div class="hint">没有菜单权限!</div>
        <div class="title">您没有访问菜单权限!</div>
        <div class="info">对不起，您没有访问菜单权限！您可以返回登录页面登录其他账号</div>
        <n-button type="primary" round @click="switchAccounts"> 返回登录 </n-button>
      </div>
      <div class="right">
        <img :src="notAuthImg" alt="" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { MenuTypeEnum } from '@/constants/routesEnum'
import { usePermissionStore, useUserStore } from '@/plugins/stores'
import { getAssetsFile } from '@/utils/assetsUtils'
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const notFoundImg = getAssetsFile('images/error/404.png')
const notAuthImg = getAssetsFile('images/error/not-auth.gif')

const permissionStore = usePermissionStore()
const userStore = useUserStore()
const router = useRouter()

// 判断是否有关联菜单
const isMenuRoutes = computed(() => {
  return permissionStore.menuRouters.find(
    (item) =>
      item.type === MenuTypeEnum.Menu && item.isExternalLink === '1' && item.showStatus === '0'
  )
})

const goBack = () => {
  router.replace('/')
}
const switchAccounts = () => {
  userStore.logout()
}
</script>

<style lang="scss" scoped>
.content {
  overflow: hidden;
}
.not-found {
  width: 1200px;
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;

  .left {
    width: 600px;

    img {
      width: 100%;
    }
  }
  .right {
    width: 300px;

    .hint {
      color: #18a058;
      font-weight: 700;
      font-size: 32px;
      margin-bottom: 20px;
      line-height: 40px;
    }

    .title {
      color: #222;
      font-weight: 700;
      font-size: 20px;
      margin-bottom: 10px;
      line-height: 24px;
    }

    .info {
      color: grey;
      font-size: 13px;
      margin-bottom: 30px;
      line-height: 21px;
    }
  }
}

.not-auth {
  width: 800px;
  margin: 150px auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .left {
    width: 400px;

    .hint {
      color: #484848;
      font-weight: 700;
      font-size: 60px;
      margin: 40px 0;
      line-height: 1.1;
    }

    .title {
      font-weight: 500;
      font-size: 20px;
      margin-bottom: 10px;
      line-height: 1.1;
    }

    .info {
      font-weight: 500;
      font-size: 13px;
      margin: 20px 0 30px 0;
      line-height: 21px;
    }
  }
}
</style>
