import { login } from '@/api/sys'
import md5 from 'md5'
import { getItem, setItem } from '@/utils/storage'
import { TOKEN } from '@/constant'

export default {
  namespaced: true,
  state: () => ({
    token: getItem(TOKEN) || ''
  }),
  mutations: {
    setToken(state, token) {
      state.token = token
      setItem(TOKEN, token)
    }
  },
  actions: {
    login(context, userInfo) {
      const { username, password } = userInfo
      return new Promise((resolve, reject) => {
        login({
          username,
          password: md5(password)
        })
          .then((res) => {
            this.commit('user/setToken', res.data.data.token)
            resolve()
          })
          .catch((err) => {
            reject(err)
          })
      })
    }
  }
}