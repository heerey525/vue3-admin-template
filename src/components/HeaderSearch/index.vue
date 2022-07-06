<template>
  <div :class="{ show: isShow }" class="header-search">
    <span @click.stop="onShowClick">
      <svg-icon id="guide-search" class-name="search-icon" icon="search" />
    </span>

    <el-select
      ref="headerSearchSelectRef"
      class="header-search-select"
      v-model="search"
      filterable
      default-first-option
      remote
      :placeholder="$t('msg.guide.searchTitle')"
      :remote-method="querySearch"
      @change="onSelectChange"
    >
      <el-option
        v-for="option in searchOptions"
        :key="option.item.path"
        :label="option.item.title.join(' > ')"
        :value="option.item"
      ></el-option>
    </el-select>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import Fuse from 'fuse.js'
import { filterRouters } from '@/utils/route'
import { generateRoutes } from './FuseData'
import { watchSwitchLang } from '@/utils/i18n'

// 检索数据源
const router = useRouter()
let searchPool = () => {
  const filterRoutes = filterRouters(router.getRoutes())
  return generateRoutes(filterRoutes)
}
const filterRoutes = filterRouters(router.getRoutes())
console.log(generateRoutes(filterRoutes))

/**
 * 搜索库相关
 */
let fuse
const initFuse = (searchPool) => {
  fuse = new Fuse(searchPool, {
    // 是否按优先级进行排序
    shouldSort: true,
    // 匹配算法放弃的时机， 阈值 0.0 需要完美匹配（字母和位置），阈值 1.0 将匹配任何内容。
    threshold: 0.4,
    // 匹配长度超过这个值的才会被认为是匹配的
    minMatchCharLength: 1,
    // 将被搜索的键列表。 这支持嵌套路径、加权搜索、在字符串和对象数组中搜索。
    // name：搜索的键
    // weight：对应的权重
    keys: [
      {
        name: 'title',
        weight: 0.7
      },
      {
        name: 'path',
        weight: 0.3
      }
    ]
  })
}
initFuse(searchPool())

// 控制 search 显示
const isShow = ref(false)
// el-select 实例
const headerSearchSelectRef = ref(null)
const onShowClick = () => {
  isShow.value = !isShow.value
  headerSearchSelectRef.value.focus()
}

// search 相关
const search = ref('')
// 搜索结果
const searchOptions = ref([])
// 搜索方法
const querySearch = (query) => {
  if (!query) return (searchOptions.value = [])
  searchOptions.value = fuse.search(query)
}
// 选中回调
const onSelectChange = (val) => {
  router.push(val.path)
  onClose()
}

/**
 * 关闭 search 的处理事件
 */
const onClose = () => {
  headerSearchSelectRef.value.blur()
  isShow.value = false
  searchOptions.value = []
  search.value = ''
}
/**
 * 监听 search 打开，处理 close 事件
 */
watch(isShow, (val) => {
  if (val) {
    document.body.addEventListener('click', onClose)
  } else {
    document.body.removeEventListener('click', onClose)
  }
})

// 处理国际化
watchSwitchLang(() => {
  searchPool = () => {
    const filterRoutes = filterRouters(router.getRoutes())
    return generateRoutes(filterRoutes)
  }
  initFuse(searchPool())
})
</script>

<style lang="scss" scoped>
.header-search {
  font-size: 0 !important;
  ::v-deep(.search-icon) {
    cursor: pointer;
    font-size: 18px;
    vertical-align: middle;
  }
  .header-search-select {
    font-size: 18px;
    transition: width 0.2s;
    width: 0;
    overflow: hidden;
    background: transparent;
    border-radius: 0;
    display: inline-block;
    vertical-align: middle;

    ::v-deep(.el-input__inner) {
      border-radius: 0;
      border: 0;
      padding-left: 0;
      padding-right: 0;
      box-shadow: none !important;
      border-bottom: 1px solid #d9d9d9;
      vertical-align: middle;
    }
  }
  &.show {
    .header-search-select {
      width: 210px;
      margin-left: 10px;
    }
  }
}
.search-icon-box {
  width: 18px;
  height: 18px;
}
</style>
