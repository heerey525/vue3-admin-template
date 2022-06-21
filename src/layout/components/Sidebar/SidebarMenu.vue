<template>
  <el-menu
    :unique-opened="true"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <sidebar-item
      v-for="item in routes"
      :key="item.path"
      :route="item"
    ></sidebar-item>
  </el-menu>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { filterRouters, generateMenus } from '@/utils/route'
import SidebarItem from './SidebarItem'
const router = useRouter()

const routes = computed(() => {
  const fRouters = filterRouters(router.getRoutes())
  return generateMenus(fRouters)
})
console.log(routes.value)
</script>

<style lang="scss" scoped></style>
