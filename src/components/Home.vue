<template>
  <div>
    <el-container class="home_container">
            <el-main class="el-main">
              <el-button @click="toggleSelection"
                         class="home-el-selectclear">清除所有选择</el-button>
              <el-button @click="quartzSetByList"
               class="home-el-quartzsetbylist">设置定时</el-button>
              <el-button  class="home-el-upload"  @click="dialogVisible2=true"><template><i class="el-icon-upload"></i><span>上传文件</span></template></el-button>
              <el-table class="home_el_table"
                        :data="kettleFileListData"
                        ref="multipleTable"
                        v-loading="loading1"
                        @selection-change="handleSelectionChange"
                        max-height="550px">
                <el-table-column
                  type="selection"
                  width="55" fixed="left">
                </el-table-column>
                <el-table-column
                  label="编号"
                  prop="kettleFileList.id"
                  width="100px" fixed="left">
                </el-table-column>
                <el-table-column
                  label="名称"
                  prop="kettleFileList.name" width="200px">
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
                <el-table-column fixed="right" min-width="220px">
                  <template slot="header" slot-scope="scope">
                    <div style="margin-top: 15px;">
                      <el-input placeholder="请输入名称搜索"

                                v-model="search" class="input-with-search" icon="search"
                                  @keyup.enter.native="searchEnterFun">
                        <el-button slot="suffix" icon="el-icon-search" class="home_input-with-search-button"
                                   @click="kettleFileListDataSearch"></el-button>
                      </el-input>
                    </div>
                  </template>
                  <template slot-scope="scope">
                    <el-button
                      size="mini" icon="el-icon-edit" @click="dialogVisible3=true">Edit
                    </el-button>
                    <el-button
                      size="mini"
                      type="success" @click="dialogVisible4=true"><i class="el-icon-view"></i><span>view</span>
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
              <el-table :data="multipleSelection" width="600px" max-height="300px"
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
              <template class="home_el_dialog_1_template1">
                <i class="el-icon-time"></i>
                <span>定时任务设置</span>
              </template>
              <template class="home_el_dialog_1_timeste1">
                <span>
              <el-input-number
                 min="0"
                 size="small"
                 max="60"
                lable="设置定时" v-model="timeData.timeNumber"
                 controls-position="right"
               ></el-input-number>
              </span>
              </template>
              <template>
                <el-select v-model="timeData.timeUtil" clearable value-key>
<!--                  {id: 3, code: "s", name: "秒", classtype: "timeunitl", classtypeName: "时间单位", status: 1}-->

                  <el-option v-for="item in timeUtilData"
                             :key="item.id"
                             :label="item.name"
                             :value="item.code"></el-option>
                </el-select>
              </template>
            </div>
            <div class="home_el_dialog_1_dialog-footer">
               <span slot="footer"  class="dialog-footer">
              <el-button @click="dialogVisible1 = false">取 消</el-button>
                 <el-button type="primary" @click="eldiag1_submit">确 定</el-button>
        </span>
            </div>
          </div>
        </el-dialog>

        <!--   上传文件的弹出窗口     -->
        <el-dialog class="home_el_dialog_2"
                   :visible.sync="dialogVisible2"
                   :before-close="handleClose"
                   title="上传kettle文件">
          <div>
            <div class="home_el_dialog_1_dialog-footer">
               <span slot="footer"  class="dialog-footer">
              <el-button @click="dialogVisible2 = false">取 消</el-button>
                 <el-button type="primary" @click="dialogVisible2=false">确 定</el-button>
        </span>
            </div>
          </div>

        </el-dialog>

        <!--   编辑文件的窗口     -->
        <el-dialog class="home_el_dialog_3"
                   :visible.sync="dialogVisible3"
                   :before-close="handleClose"
                   title="编辑">
          <div>
            <div class="home_el_dialog_1_dialog-footer">
               <span slot="footer"  class="dialog-footer">
              <el-button @click="dialogVisible3 = false">取 消</el-button>
                 <el-button type="primary" @click="dialogVisible3=false">确 定</el-button>
        </span>
            </div>
          </div>

        </el-dialog>

        <!--   查看文件的窗口     -->
        <el-dialog class="home_el_dialog_4"
                   :visible.sync="dialogVisible4"
                   :before-close="handleClose"
                   title="VIEW">
          <div>
            <div class="home_el_dialog_1_dialog-footer">
               <span slot="footer"  class="dialog-footer">
              <el-button @click="dialogVisible4 = false">取 消</el-button>
                 <el-button type="primary" @click="dialogVisible4=false">确 定</el-button>
        </span>
            </div>
          </div>

        </el-dialog>

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
