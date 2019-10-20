<template>
  <div class="Appmenu">
    <el-header>
      <div class="app-menu-header-div">
        <el-row>
          <el-col  :xs="8" :sm="6" :md="4" :lg="3" :xl="1"></el-col>
          <el-col>

            <span class="app-menu-span">调度监控平台</span></el-col>
        </el-row>
    </div>
    </el-header>
    <el-container>
      <el-aside width="200px" class="el-aside-appmenu-class">
        <el-menu :collapse="false" default-active="0"
                 class="el-menu-vertical-demo"
                 router>
          <template v-for="(item,index) in this.$router.options.routes" >
            <template>
              <el-submenu :index="index+''" :key="index" v-if="item.children.length>1">
                <template slot="title">
                  <i :class="item.meta.icon"></i>
                  <span>{{item.meta.title}}</span>
                </template>
                <el-menu-item v-for="child in item.children"
                              :index="child.path"   :key="child.path">
                  <i :class="child.meta.icon"></i>
                  <span>{{child.meta.title}}</span>
                </el-menu-item>
              </el-submenu>
              <template v-else>
                <el-menu-item :index="item.children[0].path">
                  <i :class="item.children[0].meta.icon"></i>
                  <span>
                {{item.children[0].meta.title}}
              </span>
                </el-menu-item>
              </template>
            </template>
          </template>
        </el-menu>
      </el-aside>
      <el-container>
        <el-main class="el-container-appmenu-class">
          <el-container >
          <router-view></router-view>
          </el-container>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'AppMenu'
}
</script>

<style>
  .Appmenu{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0px;
    left: 0px;
  }
  .el-header {
    background-color: #20a0ff;
    color: #333;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .el-aside-appmenu-class{
    background-color: #ECECEC;
    width: 100%;
    position: fixed;
    height: 90%;

  }
  .el-menu-vertical-demo{
    background-color: #ECECEC;
  }
  .el-container-appmenu-class{
    margin-left: 200px;
    position: fixed;
    width: 90%;
    height: 90%;
  }
  .app-menu-span{
    font-family: "Essays 1743", "Linux Libertine", Palatino, "Palatino Linotype", "Book Antiqua", Georgia, "Times New Roman", serif;
    font-size: 24px;
    text-align: center;
    color: white;
  }
</style>
