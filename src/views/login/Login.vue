<template>
  <div class="container">
    <div class="g-bg">
      <div class="g-polygon g-polygon-1"></div>
      <div class="g-polygon g-polygon-2"></div>
      <div class="g-polygon g-polygon-3"></div>
    </div>
    <div class="context">
      <div class="login">
        <n-card hoverable style="width: 400px">
          <div class="title title-top">登录到</div>
          <div class="title">Start Point</div>

          <n-form
            ref="formRef"
            :model="formData"
            :rules="rules"
            :show-label="false"
            @keyup.enter="onSubmit"
          >
            <n-form-item path="account">
              <n-input v-model:value="formData.account" size="large" placeholder="请输入账户名">
                <template #prefix>
                  <MSIcon name="Monitor" size="16"></MSIcon>
                </template>
              </n-input>
            </n-form-item>

            <n-form-item path="password">
              <n-input
                v-model:value="formData.password"
                type="password"
                size="large"
                placeholder="请输入密码"
              >
                <template #prefix>
                  <MSIcon name="Lock" size="16"></MSIcon>
                </template>
              </n-input>
            </n-form-item>

            <n-form-item path="captcha">
              <n-input
                v-model:value="formData.captcha"
                size="large"
                placeholder="请输入密码"
                style="width: 205px"
              >
                <template #prefix>
                  <MSIcon name="Key" size="16"></MSIcon>
                </template>
              </n-input>
              <!-- 验证码 -->
              <img class="img-code" :src="imgCode" @click="getValidateCode" alt="加载失败。" />
            </n-form-item>

            <div class="check-container">
              <n-checkbox v-model:checked="rbPassword"> 记住密码 </n-checkbox>
            </div>

            <n-form-item>
              <n-button type="primary" size="large" block @click="onSubmit"> 登录 </n-button>
            </n-form-item>
          </n-form>
        </n-card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { type FormInst, type FormRules, useMessage } from 'naive-ui'
import type { LoginParams } from '@/types/auth'
import { getValidateCodeApi } from '@/api/auth'
import { useUserStore } from '@/plugins/stores'
import { md5 } from 'js-md5'
import MSIcon from '@/components/MSIcon/index.vue'

const message = useMessage()
const formRef = ref<FormInst | null>(null)
const formData = reactive<LoginParams>({
  account: 'yuzu',
  password: '123',
  captcha: '',
  codeKey: ''
})
const imgCode = ref<string>('')
const rbPassword = ref<boolean>(false)

const rules: FormRules = {
  account: [{ required: true, message: '请输入账号', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  captcha: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
}

const getValidateCode = () => {
  getValidateCodeApi().then((res) => {
    formData.codeKey = res.data.codeKey
    imgCode.value = res.data.codeValue
  })
}

const userStore = useUserStore()
const router = useRouter()
const route = useRoute()
const onSubmit = () => {
  formRef.value?.validate(async (error) => {
    if (!error) {
      let params = {
        ...formData,
        password: md5(formData.password).toLocaleUpperCase()
      }
      await userStore.login(params)
      message.success('登录成功')
      const redirect = route.query.redirect as string
      if (redirect) {
        const redirectUrl = decodeURIComponent(redirect)
        router.push(redirectUrl)
      } else {
        router.push('/')
      }
    } else {
      if (error) {
        message.warning(error[0][0].message as string)
      }
    }
  })
}

onMounted(() => {
  getValidateCode()
})
</script>

<style lang="scss" scoped>
.container {
  height: 100%;
  position: relative;
  overflow: hidden;
  background: linear-gradient(217deg, rgba(113, 255, 113, 0.8), rgba(113, 255, 113, 0) 70.71%),
    linear-gradient(127deg, rgba(77, 174, 255, 0.8), rgba(77, 174, 255, 0) 70.71%),
    linear-gradient(336deg, rgba(3, 249, 249, 0.8), rgba(3, 249, 249, 0) 70.71%);
}
.g-bg {
  position: absolute;
  height: 100%;
  width: 100%;
  z-index: 1;

  &::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    backdrop-filter: blur(100px);
    z-index: 1;
  }

  .g-polygon {
    position: absolute;
    opacity: 0.5;

    &-1 {
      width: 60%;
      height: 80%;
      position: absolute;
      left: 50%;
      top: 40%;
      transform: translate(-50%, -50%);
      background: #71ff71;
      clip-path: polygon(0 10%, 30% 0, 100% 40%, 70% 100%, 20% 90%);
    }

    &-2 {
      width: 70%;
      height: 50%;
      position: absolute;
      left: 30%;
      top: 70%;
      transform: translate(-50%, -50%);
      background: #4daeff;
      clip-path: polygon(10% 0, 100% 70%, 100% 100%, 20% 90%);
    }
    &-3 {
      width: 70%;
      height: 50%;
      position: absolute;
      left: 64%;
      top: 70%;
      transform: translate(-50%, -50%);
      background: #03f9f9;
      clip-path: polygon(80% 0, 100% 70%, 100% 100%, 20% 90%);
    }
  }
}

.context {
  position: relative;
  height: 100%;
  z-index: 2;

  .login {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    .title {
      font-size: 30px;
      font-weight: 500;
      margin-top: 7px;

      &-top {
        margin: 0;
      }
    }
    .n-form {
      margin: 25px 0 20px;

      .n-icon {
        color: rgba(0, 0, 0, 0.4);
      }

      // 图片验证码
      .img-code {
        height: 40px;
        margin-left: 20px;
        cursor: pointer;
      }

      .n-button {
        margin-top: 25px;
      }
    }
  }
}
</style>
