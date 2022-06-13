/**
 * 判断是否为外部资源
 * @params {*} path
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}
