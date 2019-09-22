/**
 * @author pxg
 * @emil pxg950110@163.com
 * @date 2019-09-22
 * @version v1.0
 * @description  通用api接口调用
 */
import axios from 'axios'
// eslint-disable-next-line no-unused-vars
let base = '' // 基本路径
/**
 * body方式传参
 * @param url
 * @param params
 * @returns {Promise<AxiosResponse<T>>}
 */
export const postRequest = (url, params) => {
  let options = {}
  params.header = {'Content-Type': 'application/json'}
  return axios.post(url, params, options)
}
/**
 * url方式传参 POST方法
 * @param url
 * @param params
 * @returns {Promise<AxiosResponse<T>>}
 */
export const postUrlRequest = (url, params) => {
  let options = {}
  if (params) {
    options.params = params
  }
  // console.log(JSON.stringify(params))
  options.header = {'Content-Type': 'application/x-www-form-urlencoded'}
  return axios.post(url, null, options)
}
/**
 * get方法调用
 * @param url
 * @param params
 * @returns {Promise<AxiosResponse<T>>}
 */
export const getRequest = (url, params) => {
  let options = {}
  if (params) {
    options.params = params
  }
  options.header = {'Content-Type': 'application/x-www-form-urlencoded'}
  return axios.get(url, options)
}
/**
 * put方法
 * @param url
 * @param params
 * @returns {Promise<AxiosResponse<T>>}
 */
export const putRequest = (url, params) => {
  let options = {}
  options.header = {'Content-Type': 'application/json'}
  // eslint-disable-next-line no-undef
  return axios.put(url, params, options)
}

/**
 * delete调用方法
 * @param url
 * @param params
 * @returns {Promise<AxiosResponse<T>>}
 */
export const deleteRequest = (url, params) => {
  let options = {}
  if (params) {
    options.params = params
  }
  // console.log(JSON.stringify(params))
  options.header = {'Content-Type': 'application/x-www-form-urlencoded'}
  return axios.delete(url, options)
}
/**
 * 上传文件
 * @param url
 * @param params
 * @returns {Promise<AxiosResponse<T>>}
 */
export const uploadRequest = (url, params) => {
  let options = {}
  if (params) {
    options.params = params
  }
  // console.log(JSON.stringify(params))
  options.header = {'Content-Type': 'multipart/form-data'}
  return axios.post(url, params, options)
}
/**
 *
 * @param url
 * @param params
 * @param params2
 * @returns {Promise<AxiosResponse<T>>}
 */
export const postHttpRequest = (url, params, params2) => {
  let options = {}
  if (params2) {
    options.params = params2
  }
  options.header = {'Content-Type': 'application/json'}
  return axios.post(url, params, options)
}
