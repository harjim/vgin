<template>
  <a-result :status="status" :subtitle="subtitle">
    <template #extra>
      <a-space>
        <a-button type="text" @click="goBack">Back</a-button>
        <a-button type="primary" @click="goHome">Home</a-button>
      </a-space>
    </template>
  </a-result>
</template>

<script setup lang="ts">
const router = useRouter()
const route = useRoute()

const status = ref(route.meta.status)
const subtitle = ref(route.meta.msg || '')

const goBack = () => {
  router.back()
}

const goHome = async () => {
  await router.push({ name: 'Home' })
}
</script>
