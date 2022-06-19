// 快捷访问

const getters = {
  token: (state) => state.user.token,
  hasUserInfo: (state) => {
    return JSON.stringify(state.user.userInfo !== '{}')
  },
  userInfo: (state) => {
    return state.user.userInfo
  }
}

export default getters
