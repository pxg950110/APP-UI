<template>
<div>
  <div style="width: auto; text-align: center">
    <el-container>
      <el-aside width="200px">
        <div ></div>
      </el-aside>
      <el-main>
      <div>
    <el-form  :model="kettlefilelist"
              label-width="100px"
              size="300px">
      <el-form-item label="作业id">
        <el-input v-model="kettlefilelist.id"
                  readonly="true"
        >
        </el-input>
      </el-form-item>
      <el-form-item label="名称" prop="name">
      <el-input v-model="kettlefilelist.name"  readonly="true" >
      </el-input>
    </el-form-item>
      <el-form-item label="描述" prop="id">
        <el-input v-model="kettlefilelist.description" readonly="true" >
        </el-input>
      </el-form-item>
      <el-form-item label="上传时间">
        <el-input v-model="uploadTimeStr"  readonly="true">
        </el-input>
      </el-form-item>
      <el-form-item label="文件内容" prop="fileText" >
        <textarea v-model="kettlefilelist.fileText" readonly="true"
        style="width: 600px;min-height: 300px;background-color: #90928b">
        </textarea>
      </el-form-item>
      <el-form-item>
        <el-button @click="runKettleFileListById(kettlefilelist.id)">运行</el-button>
        <el-button type="primary"  @click="submitData()">修改</el-button>
        <el-button @click="downloadFile()">下载</el-button>
      </el-form-item>
    </el-form>
      </div></el-main>
    </el-container>
  </div>
</div>
</template>

<script src="../js/kettlefilevue.js">
</script>

<style scoped>
@import "../style/kettlefilevue.css";
</style>
