<template>
  <div class="login-box">
    <a-typography>
      <a-typography-title>
        {{ title }}
      </a-typography-title>
    </a-typography>
    <a-card class="w-full max-w-md" :bordered="false">
      <a-form ref="formRef" :model="form" layout="vertical" :rules="rules" @submit="onLogin">
        <a-form-item field="username" label="用户名">
          <a-input v-model="form.username" placeholder="请输入用户名" />
        </a-form-item>
        <a-form-item field="password" label="密码">
          <a-input-password v-model="form.password" placeholder="请输入密码" />
        </a-form-item>
        <a-form-item>
          <span class="w-full flex items-center justify-between">
            <a-checkbox v-model="form.isRead">记住我</a-checkbox>
            <a-link :hoverable="false">忘记密码</a-link>
          </span>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" long html-type="submit">登录</a-button>
        </a-form-item>
      </a-form>
      <a-divider />
      <a-space class="w-full ml-auto">
        <IconGithub size="24" />
        <IconWechat size="24" style="color: #62b900" />
        <IconGoogle size="24" />
        <IconTwitter size="24" style="color: #00acee" />
      </a-space>
    </a-card>
    <div class="flex justify-center items-center mt-4 md:mt-8">
      <a-typography-text type="secondary"> 还没有账号？</a-typography-text>
      <a-link :hoverable="false">注册</a-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IconGithub, IconWechat, IconTwitter, IconGoogle } from '@arco-design/web-vue/es/icon'
import { FieldRule, ValidatedError } from '@arco-design/web-vue'
import { FormValue } from '@/types/user'
import { login } from '@/apis/user'

interface FormValidateData {
  values: Record<keyof FormValue, FormValue>
  errors: Record<string, ValidatedError> | undefined
}

const form = reactive<FormValue>({
  username: '',
  password: '',
  isRead: false
})
const title = ref(import.meta.env.APP_TITLE)
const rules = ref<Record<string, FieldRule[]>>({
  username: [
    { required: true, message: '请输入用户名' },
    { type: 'string', minLength: 4, maxLength: 16, message: '请输入4-16位用户名' },
    {
      validator: (value: string, cb) => {
        const pasReg = /^[a-zA-Z0-9_-]{4,16}$/
        if (!pasReg.test(value)) {
          cb('用户名由数字、字母、下划线、减号组合,')
        }
      }
    }
  ],
  password: [
    { required: true, message: '请输入用户密码' },
    { type: 'string', minLength: 6, maxLength: 16, message: '请输入6-16位密码' },
    {
      validator: (value: string, cb) => {
        const pasReg = /^\S*(?=\S{6,})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])(?=\S*[!@#$%^&*? ])\S*$/
        if (!pasReg.test(value)) {
          cb('密码至少包括1个大写字母、小写字母、数字、特殊字符')
        }
      }
    }
  ]
})

const onLogin = ({ values, errors }: FormValidateData) => {
  console.log('🚀 ~ file: LoginPage.vue ~ line 52 ~ login ~ values, errors', values, errors)
  if (!errors) {
    login(values as unknown as FormValue)
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }
}
</script>

<style lang="scss" scoped>
.login-box {
  @apply h-screen w-screen flex flex-col justify-center items-center px-4;

  & :deep(.arco-card-body) {
    @apply px-4 py-6 md:px-8 md:py-10;
  }
}
</style>
