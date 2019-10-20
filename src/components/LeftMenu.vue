<template>
  <div><h1>112</h1></div>

</template>

<script>
import {menuMap} from '@/router'
import {MenuItem} from './modules/MenuItem'
export default {
  name: 'LeftMenu',
  components: {
    MenuItem
  },
  computed: {},
  isCollapse () { return !this.barEffect.open },
  data () {
    return {
      // 是否折叠
      collapse: false,
      // 当前菜单数据源
      list: [],
      backgroundColor: '#304156', // 导航菜单背景颜色
      textColor: '#BFCBD9', // 导航菜单文字颜色
      logo: 'LOGO' // logo
    }
  }
}
</script>

<style scoped>

</style>
