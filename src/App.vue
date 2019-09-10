<template>
  <div id="app">
    <!--加入头部图片-->
    <div>
    <el-header
     style="background-color: #339913" height="30px"></el-header>
      <div>
        <div v-if="$route.meta.keepAlive">
          <main_menu></main_menu>
          <router-view></router-view>
        </div>
          <router-view  v-if="!$route.meta.keepAlive"></router-view>
      </div>
      <!--<el-footer style="width: 10px;text-align: center"  ><div><p>pxg950110@163.com</p></div></el-footer>-->
  </div>
  </div>
</template>
<script >
/* eslint-disable camelcase */

import main_menu from './page/main_menu '
export default {
  components: {main_menu},
  name: 'App',
  data () {
    return {
      isCollapse: true,
      menuData: false
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    indexMethod () {

    }

  }
}
</script>

<style lang="css">
@import "style/app.css";
</style>
