/**
 * @description: 存储数据
 * @param {*} key
 * @param {*} value
 * @return {*}
 */
export const setItem = (key, value) => {
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(key, value)
}

/**
 * @description: 获取数据
 * @param {*} key
 * @return {*}
 */
export const getItem = (key) => {
  const data = window.localStorage.getItem(key)
  try {
    return JSON.parse(data)
  } catch {
    return data
  }
}

/**
 * @description: 删除指定数据
 * @param {*} key
 * @return {*}
 */
export const removeItem = (key) => {
  window.localStorage.removeItem(key)
}

/**
 * @description: 删除所有数据
 * @return {*}
 */
export const removeAllItem = () => {
  window.localStorage.clear()
}
