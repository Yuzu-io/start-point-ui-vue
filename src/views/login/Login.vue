<template>
  <div class="container">
    <div class="g-bg">
      <div class="g-polygon g-polygon-1"></div>
      <div class="g-polygon g-polygon-2"></div>
      <div class="g-polygon g-polygon-3"></div>
    </div>
    <div class="context">
      <div class="login">
        <t-card :bordered="false" hover-shadow :style="{ width: '400px' }">
          <div class="title title-top">登录到</div>
          <div class="title">Start Point</div>
          <t-form
            ref="form"
            :data="formData"
            :rules="FORM_RULES"
            :colon="true"
            :label-width="0"
            @submit="onSubmit"
          >
            <t-form-item name="account">
              <t-input v-model="formData.account" clearable size="large" placeholder="请输入账户名">
                <template #prefix-icon>
                  <mdicon name="monitor" size="16"></mdicon>
                </template>
              </t-input>
            </t-form-item>

            <t-form-item name="password">
              <t-input
                v-model="formData.password"
                type="password"
                clearable
                size="large"
                placeholder="请输入密码"
              >
                <template #prefix-icon>
                  <mdicon name="lock-outline" size="16"></mdicon>
                </template>
              </t-input>
            </t-form-item>

            <t-form-item name="captcha">
              <t-input
                v-model="formData.captcha"
                clearable
                size="large"
                placeholder="请输入密码"
                style="width: 207px"
              >
                <template #prefix-icon>
                  <mdicon name="lock-outline" size="16"></mdicon>
                </template>
              </t-input>
              <!-- 验证码 -->
              <img class="img-code" :src="imgCode" @click="getValidateCode" />
            </t-form-item>

            <div class="check-container">
              <t-checkbox v-model="rbPassword">记住密码</t-checkbox>
            </div>

            <t-form-item>
              <t-button theme="primary" type="submit" size="large" block>登录</t-button>
            </t-form-item>
          </t-form>
        </t-card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { MessagePlugin, type SubmitContext } from 'tdesign-vue-next'
import type { LoginParams } from '@/types/auth'
import { useRouter } from 'vue-router'
import { getValidateCodeApi } from '@/api/auth'
import { onMounted } from 'vue'
import { useUserStore } from '@/plugins/stores'
import { md5 } from 'js-md5'

const formData = reactive<LoginParams>({
  account: 'yuzu',
  password: '123',
  captcha: '',
  codeKey: ''
})
const imgCode = ref<string>('')
const rbPassword = ref<boolean>(false)

const FORM_RULES = {
  account: [{ required: true, message: '请输入账号' }],
  password: [{ required: true, message: '请输入密码' }],
  captcha: [{ required: true, message: '请输入验证码' }]
}

const getValidateCode = () => {
  getValidateCodeApi().then((res) => {
    formData.codeKey = res.data.codeKey
    imgCode.value = res.data.codeValue
  })
}

const userStore = useUserStore()
const router = useRouter()
const onSubmit = async ({ validateResult, firstError }: SubmitContext) => {
  if (validateResult === true) {
    let params = {
      ...formData,
      password: md5(formData.password).toLocaleUpperCase()
    }
    await userStore.login(params)
    await userStore.getUserInfo()
    MessagePlugin.success('登录成功')
    router.push('/layout')
  } else {
    console.log('Validate Errors: ', firstError, validateResult)
    MessagePlugin.warning(firstError!)
  }
}

onMounted(() => {
  getValidateCode()
})
</script>

<style lang="scss" scoped>
.container {
  position: relative;
  height: 100vh;
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
      font: var(--td-font-headline-large);
      font-weight: 400;
      color: var(--td-text-color-primary);
      margin-top: var(--td-comp-margin-xs);

      &-top {
        margin: 0;
      }
    }
    .t-form {
      margin: var(--td-comp-margin-xxxxl) 0 var(--td-comp-margin-xxl);
      .mdi {
        color: var(--td-text-color-placeholder);
      }

      // 图片验证码
      .img-code {
        height: 40px;
        // border: 1px solid #000;
        // box-sizing: border-box;
        margin-left: 20px;
        cursor: pointer;
      }

      .t-button {
        margin-top: var(--td-comp-margin-xxxl);
      }
    }
  }
}
</style>
