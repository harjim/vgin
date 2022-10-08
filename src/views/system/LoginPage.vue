<template>
  <div class="h-screen w-screen flex justify-center items-center px-4">
    <a-card :bordered="false">
      <img class="mx-auto" :src="LoginImage" alt="登录图片" />
      <a-form :model="form">
        <a-form-item field="username" label="用户名">
          <a-input v-model="form.username" placeholder="请输入用户名" />
        </a-form-item>
        <a-form-item field="password" label="密码">
          <a-input v-model="form.password" placeholder="请输入密码" />
        </a-form-item>
        <a-form-item>
          <a-space>
            <a-button type="primary">登录</a-button>
            <a-button type="text">注册</a-button>
          </a-space>
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import LoginImage from '@/assets/login_img.png'

const form = reactive({
  username: '',
  password: ''
})
</script>
