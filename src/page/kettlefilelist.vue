<template>
  <div>
    <el-container>
    <el-main class="kettlefilelist_el_main">
    <div>
      <el-button @click="uploadVisible=true">上传文件</el-button>
      <el-table
        :data="kettleFileListAll"
      class="el-table-kettlefilelist"
      >
        <el-table-column
          type="index"
          width="50">
        </el-table-column>
        <el-table-column
          label="id"
          width="100px"
          prop="kettleFileList.id">
        </el-table-column>
        <el-table-column
          label="name"
          width="100px"
          prop="kettleFileList.name">
        </el-table-column>
        <el-table-column
          label="description"
          width="100px"
          prop="kettleFileList.description"
        >
        </el-table-column>
        <el-table-column
          label="类别"
          width="100px"
          prop="appDict.code">
        </el-table-column>
        <el-table-column
          label="类别名称"
          width="100px"
          prop="appDict.name">
        </el-table-column>
        <el-table-column
          width="200">
          <template slot="header" slot-scope="scope" >
            <el-input
              v-model="search"
              size="mini"
              placeholder="输入关键字搜索"/>
          </template>
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row.kettleFileList.id)" type="text" size="small">查看</el-button>
            <el-button type="text" size="small" @click="editChange(scope.row.kettleFileList.id,scope.row.kettleFileList.name,scope.row.kettleFileList.description,
            scope.row.appDict.id)">编辑</el-button>
          </template>
        </el-table-column>
        <el-table-column
                          width="100">

          <el-button @click="taskSetFunction()" type="text" size="small">设置</el-button>
        </el-table-column>
      </el-table>
      <div><el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="60%"
        :before-close="handleClose">
        <span>修改工程部分配置</span>
        <el-form>
          <el-form-item label="主键" prop="id">
            <el-input v-model="formData.kFileList.id" readonly="true">
            </el-input>
          </el-form-item>
          <el-form-item label="名称" prop="name">
            <el-input v-model="formData.kFileList.name"  >
            </el-input>
          </el-form-item>
          <el-form-item label="描述" prop="description">
            <el-input v-model="formData.kFileList.description"  >
            </el-input>
          </el-form-item>
          <el-form-item label="作业类型" prop="jobclass">
            <el-select placeholder="请选择分类"
                       v-model="formData.adict.jobclassid"
            >
              <el-option
                v-for="jobclass in jobrunclassList"
                :key="jobclass.code"
                :label="jobclass.name"
                :value="jobclass.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitFromData()">确 定</el-button>
  </span>
      </el-dialog></div>
      <div><el-dialog  title="提示"
                       :visible.sync="uploadVisible"
                       width="60%"
                       :before-close="handleClose">
        <span>上传文件</span>
         <span>名称 <el-input v-model="uploadData.fileName"></el-input></span>
        <span>
          <el-upload
          action="http://127.0.0.1:59380/api/kettle/kettlefile/upload"
          multiple="false"
          data="uploadData"
          :auto-upload="false">
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        </el-upload>

      </span>
        <span slot="footer" class="dialog-footer">

          <el-button @click="uploadVisible = false">取 消</el-button>
        <el-button type="primary" @click="uploadVisible=false">确 定</el-button>
  </span>
      </el-dialog></div>
      <!--定时任务-->
      <div><el-dialog
        title="提示"
        :visible.sync="taskSetVisible"
        width="60%"
        :before-close="handleClose">
        <span>定时任务设置</span>
        <ul>
          <li>
            <span>定时策略</span>
            <el-select
              placeholder="请选择策略"
              v-model="taskSetData.cronId"
               >
              <el-option
                v-for="cron in taskCronList"
                :key="cron.cron"
              :value="cron.id"
              :label="cron.description">
              </el-option>
            </el-select>
          </li>
          <li>
            <span>策略信息</span>
            <span>
              <el-input-number v-model="cronTextData.cronText" />
              <el-select v-model="cronTextData.cronType" style="width: 70px">
                <el-option v-for="timeut in timeUnit"
                :key="timeut.id" :label="timeut.name"
                :value="timeut.code">
                </el-option>

              </el-select>
            </span>
          </li>
        </ul>

        <el-button @click="taskSetVisible = false">取 消</el-button>
        <el-button type="primary" @click="taskSetSubmit()">确 定</el-button>

      </el-dialog></div>
    </div>
    </el-main>
    </el-container>
  </div>
</template>

<script  src="../js/kettlefilelist.js">

</script>

<style >
@import "../style/kettlefilelist.css";
</style>
