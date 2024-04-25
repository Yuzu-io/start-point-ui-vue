<template>
  <div class="dashboard">
    <n-grid x-gap="12" :cols="2">
      <n-gi>
        <n-flex vertical>
          <n-card size="medium" title="起点后台管理框架">
            <div>
              一款后台管理系统,可以用于所有的Web应用程序,，如网站管理后台，网站会员中心，CMS，CRM，OA等等
            </div>
            <div class="version">
              <span class="version-title">当前版本：</span>
              <span class="version-number">v1.0.0</span>
            </div>
            <template #footer>
              <n-button type="primary" @click="accessGit">
                <template #icon>
                  <MSIcon name="Cloud"></MSIcon>
                </template>
                访问Github
              </n-button>
            </template>
          </n-card>
          <n-card size="medium" title="联系信息"> QQ：1581523609 </n-card>
        </n-flex>
      </n-gi>
      <n-gi>
        <n-card size="medium" title="技术选型">
          <n-grid x-gap="12" :cols="2">
            <n-gi>
              <n-card :bordered="false" size="small" title="前端技术">
                Vue
                <br />
                TypeScript
                <br />
                Vite
                <br />
                Pinia
                <br />
                Naive UI
                <br />
                Axios
                <br />
                Sass
                <br />
                ...
              </n-card>
            </n-gi>
            <n-gi>
              <n-card :bordered="false" size="small" title="后端技术">
                Spring Boot
                <br />
                MyBatis-Plus
                <br />
                Druid
                <br />
                fastjson2
                <br />
                lombok
                <br />
                ...
              </n-card>
            </n-gi>
          </n-grid>
        </n-card>
      </n-gi>
    </n-grid>
  </div>
</template>

<script setup lang="ts">
import MSIcon from '@/components/MSIcon/index.vue'

const accessGit = () => {
  window.open('https://github.com/Yuzu-io/start-point-ui', '_blank')
}

defineOptions({
  name: 'dashboard'
})
</script>

<style lang="scss" scoped>
.version {
  margin-top: 10px;
  &-title {
    font-weight: bold;
  }
}
</style>
