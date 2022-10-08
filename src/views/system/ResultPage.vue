<template>
  <a-result :status="status" :subtitle="$t(`result.${status}`)">
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
const { t } = useI18n()

const status = ref(route.meta.status)

const goBack = () => {
  router.back()
}

const goHome = async () => {
  await router.push({ name: 'Home' })
}
</script>
