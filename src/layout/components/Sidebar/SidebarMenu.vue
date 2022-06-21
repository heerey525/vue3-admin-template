<template>
  <el-menu
    :unique-opened="true"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <el-submenu index="1">
      <template #title>
        <i class="el-icon-location"></i>
        <span>导航一</span>
      </template>
      <el-menu-item index="1-1">选项一</el-menu-item>
      <el-menu-item index="1-2">选项二</el-menu-item>
    </el-submenu>
    <el-menu-item index="2">
      <i class="el-icon-location"></i>
      <span>导航二</span>
    </el-menu-item>
  </el-menu>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { filterRouters, generateMenus } from '@/utils/route'
const router = useRouter()

const routes = computed(() => {
  const fRouters = filterRouters(router.getRoutes())
  return generateMenus(fRouters)
})
console.log(routes.value)
</script>

<style lang="scss" scoped></style>
