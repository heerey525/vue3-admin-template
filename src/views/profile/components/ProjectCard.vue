<template>
  <div>
    <pan-thumb
      :image="$store.getters.userInfo.avatar || require('@/assets/logo.png')"
      :height="'100px'"
      :width="'100px'"
      :hoverable="false"
    >
      <div>Hello</div>
      {{ $store.getters.userInfo.title || 'admin' }}
    </pan-thumb>
  </div>
</template>

<script setup>
import PanThumb from '@/components/PanThumb/index.vue'
</script>

<style lang="scss" scoped></style>
