/**
 * @author pxg
 * @emil pxg950110@163.com
 * @date 2019/9/22
 * @version v1.0
 * @description 工具类
 */
import Vue from 'vue'
/**
 * 时间转换
 * @param var1
 * @returns {string}
 */

Vue.filter('dateTimeFormat', function dateTimeFormat (var1) {
  var date = new Date(var1)
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
  var hours = date.getHours()
  var minutes = date.getMinutes()
  var seconds = date.getSeconds()
  if (month < 10) {
    month = '0' + month
  }
  if (day < 10) {
    day = '0' + day
  }
  if (hours < 10) {
    hours = '0' + hours
  }
  if (minutes < 10) {
    minutes = '0' + minutes
  }
  if (seconds < 10) {
    seconds = '0' + seconds
  }
  return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds
})
