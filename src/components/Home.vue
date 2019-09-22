<template>
  <div>
    <el-container class="home_container">
      <el-header class="home_el_header">
        <div class="home_title">欢迎使用调度管理软件</div>
        <span class="el-dropdown-link home_userinfo">
    {{currentUserName}}<i class="el-icon-arrow-down el-icon--right home_userinfo"></i>
  </span>
      </el-header>
      <el-container>
        <el-aside class="el-aside" width="200px">

          <el-menu class="home_el_menu">
            <el-menu-item><span>1</span></el-menu-item>
            <el-menu-item><span>2</span></el-menu-item>
            <el-menu-item><span>3</span></el-menu-item>
            <el-menu-item><span>4</span></el-menu-item>
            <el-menu-item><span>5</span></el-menu-item>
            <el-menu-item><span>6</span></el-menu-item>
            <el-menu-item><span>7</span></el-menu-item>
            <el-menu-item><span>8</span></el-menu-item>
            <el-menu-item><span>9</span></el-menu-item>
            <el-menu-item><span>10</span></el-menu-item>
          </el-menu>

        </el-aside>
        <el-container>
          <el-header class="home_el_header-main">
            <span class="home_span_1">首页</span>
          </el-header>
          <el-container>
            <el-main class="el-main">
              <el-button @click="toggleSelection">清除所有选择</el-button>
              <el-button @click="quartzSetByList">编辑</el-button>
              <el-table class="home_el_table"
                        :data="kettleFileListData"
                        ref="multipleTable"
                        @selection-change="handleSelectionChange"
                        max-height="500px">
                <el-table-column
                  type="selection"
                  width="55" fixed="left">
                </el-table-column>
                <el-table-column
                  label="编号"
                  prop="kettleFileList.id" width="100px" fixed="left">
                </el-table-column>
                <el-table-column
                  label="名称"
                  prop="kettleFileList.name" width="200px" fixed="left">
                </el-table-column>
                <el-table-column
                  label="类别编码"
                  prop="appDict.code" width="100px">
                </el-table-column>
                <el-table-column
                  label="类别名称"
                  prop="appDict.name" width="100px">
                </el-table-column>
                <el-table-column
                  label="时间"
                  width="200px">
                  <template slot-scope="scope">{{ scope.row.kettleFileList.uploadTime | dateTimeFormat}}</template>
                </el-table-column>
                <el-table-column
                  label="描述"
                  prop="kettleFileList.description" width="300px">
                </el-table-column>
                <el-table-column fixed="right" min-width="200px">
                  <template slot="header" slot-scope="scope">
                    <div style="margin-top: 15px;">
                      <el-input placeholder="请输入内容" v-model="search" class="input-with-search">
                        <el-button slot="suffix" icon="el-icon-search" class="home_input-with-search-button"
                                   @click="kettleFileListDataSearch"></el-button>
                      </el-input>

                    </div>
                  </template>
                  <template slot-scope="scope">
                    <el-button
                      size="mini">Edit
                    </el-button>
                    <el-button
                      size="mini"
                      type="success">view
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
              <el-pagination
                class="home_el_pagination"
                background
                layout="prev, pager, next,jumper,sizes"
                :total="pageNumber"
                :current-page="kettleFileData.pageId"
                :page-size="kettleFileData.pageCount"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :page-sizes="[10,20,50, 100, 200, 400, 1000]">
              </el-pagination>
            </el-main>
          </el-container>
        </el-container>
      </el-container>
    </el-container>
    <div>
      <div class="home_el-dialog">
        <el-dialog
          class="home_el_dialog_1"
          :visible.sync="dialogVisible1"
          :before-close="handleClose"
          title="批量设置定时任务"
        >
          <div>
            <div style="text-align: center">
              <el-table :data="multipleSelection" width="600px" height="300px"
                        class="home_el_dialog_1_table">
                <el-table-column label="编号" width="200px" prop="kettleFileList.id">
                </el-table-column>
                <el-table-column label="名称" width="200px" prop="kettleFileList.name">
                </el-table-column>
                <el-table-column label="类型" width="200px" prop="appDict.name">
                </el-table-column>
              </el-table>
            </div>
            <div class="home_el_dialog_1_time-set">
              <el-input-number lable="设置定时"></el-input-number>
            </div>
            <div class="home_el_dialog_1_dialog-footer">
               <span slot="footer"  class="dialog-footer">
              <el-button @click="dialogVisible1 = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible1 = false">确 定</el-button>
  </span>
            </div>
          </div>
        </el-dialog>

        <el-dialog></el-dialog>

        <el-dialog></el-dialog>

        <el-dialog></el-dialog>

        <el-dialog></el-dialog>

        <el-dialog></el-dialog>

        <el-dialog></el-dialog>

        <el-dialog></el-dialog>

        <el-dialog></el-dialog>
      </div>
    </div>
  </div>
</template>

<script src="../js/Home.js">

</script>

<style scoped>
  @import "../style/Home.css";
</style>
