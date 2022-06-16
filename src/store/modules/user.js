import { login } from '@/api/sys'
import md5 from 'md5'

export default {
  namespace: true,
  state: () => ({}),
  mutations: {},
  actions: {
    login(context, userInfo) {
      const { username, password } = userInfo
      return new Promise((resolve, reject) => {
        login({
          username,
          password: md5(password)
        })
          .then((res) => {
            resolve()
          })
          .catch((err) => {
            reject(err)
          })
      })
    }
  }
}
