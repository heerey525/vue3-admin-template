import router from '@/router'
import store from '@/store'

// 白名单
const whiteList = ['/login']

/**
 * @description: 路由前置
 * @return {*} to 即将要进入的目标
 * @return {*} form 当前导航正要离开的路由
 * @return {*} next 是否继续执行
 */
router.beforeEach(async (to, form, next) => {
  // 用户已登录不允许进入login
  if (store.getters.token) {
    if (to.path === '/login') {
      next('/layout')
    } else {
      // 判断用户资料是否存在，如果不存在，则获取用户信息
      if (!store.getters.hasUserInfo) {
        await store.dispatch('user/getUserInfo')
      }
      next()
    }
  } else {
    // 未登录则只允许进入login
    if (whiteList.indexOf(to.path) > -1) {
      next()
    } else {
      next('/login')
    }
  }
})
