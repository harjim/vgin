<template>
  <a-result :status="status" :subtitle="$t(`result.${status}`)">
    <template #extra>
      <a-space>
        <a-button type="text" @click="goBack">{{ $t('btn.back') }}</a-button>
        <a-button type="primary" @click="goHome">{{ $t('btn.home') }}</a-button>
      </a-space>
    </template>
  </a-result>
</template>

<script setup lang="ts">
const router = useRouter()
const route = useRoute()

const status = ref(route.meta.status)

const goBack = () => {
  router.back()
}

const goHome = async () => {
  await router.push({ name: 'Home' })
}
</script>
