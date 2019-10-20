<template>
<div>
<div>
  <el-button @click="kettleDataBaseTypeDiagVisible=true">
    <i class="el-icon-circle-plus"></i>
    <span>资源库</span>
  </el-button>
  <div class="kettle-rep-div-replist">
    <el-table :data="kettleRepositoryTableList">
      <el-table-column
      prop="kName" label="名称" >
      </el-table-column>
      <el-table-column
      prop="kTypeName" label="数据库类型" >
      </el-table-column>
      <el-table-column
      prop="kAccess" label="连接方式" >
      </el-table-column>
      <el-table-column
      prop="kDb" label="数据库名称" >
      </el-table-column>
      <el-table-column
        prop="kPort" label="数据库端口" >
      </el-table-column>
      <el-table-column
      prop="kUser" label="数据库用户名" >
      </el-table-column>
      <el-table-column
      prop="kRepUser" label="资源库用户名" >
      </el-table-column>
      <el-table-column width="200px" fixed="right">
        <template slot-scope="scope">
          <el-button
            size="mini" icon="el-icon-edit">Edit
          </el-button>
          <el-button
            size="mini"
            @click="checkKettleReposiotryTable(scope.row)" ><i class="el-icon-view" ></i><span>check</span>
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</div>

  <div class="kettle-rep-diag-list">
<!--  添加资源库的弹出窗口  -->
    <el-dialog  :visible.sync="kettleDataBaseTypeDiagVisible" class="kettle-databasetype-diagvisible-top"
                title="添加资源库" modal="true"
                :modal-append-to-body="false"
    :before-close="handlekettleDataBaseTypeDiagVisibleClose">

      <div class="kettle-databasetype-diagvisible-top-div">
      <el-form :model="repositoryPostData"
               :rules="rules"
               ref="repositoryPostData">
        <el-form-item label="名称" :label-width="formLabelWidth" prop="kName">
          <el-input v-model="repositoryPostData.kName" style="width: 50%"
                    placeholder="请输入名称..." :clearable="true"></el-input>
        </el-form-item>
        <el-form-item label="数据库类型" :label-width="formLabelWidth" prop="kTypeId">
          <el-select
            style="width: 50%" placeholder="请选择数据库类型..." v-model="repositoryPostData.kTypeId"
          :clearable="false" @change="getPortWithDataBaseType"
            filterable="true" >
            <el-option
              v-for="item in kettleDataBaseTypeList"
              :key="item.idDatabaseType"
              :label="item.description"
              :value="item.idDatabaseType">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="连接类型" :label-width="formLabelWidth" prop="kAccess">
          <el-select
            style="width: 50%" placeholder="请选择连接类型..." v-model="repositoryPostData.kAccess"
            :clearable="true" filterable>
            <el-option
              v-for="item in kettleAccessTypeList"
              :key="item.code"
              :label="item.description"
              :value="item.code">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="数据库地址" :label-width="formLabelWidth" prop="kHost">
          <el-input v-model="repositoryPostData.kHost" style="width: 50%"
                    placeholder="请输入数据库地址..." :clearable="true"></el-input>
        </el-form-item>
        <el-form-item label="数据库端口" :label-width="formLabelWidth" prop="kPort">
          <el-input v-model="repositoryPostData.kPort" style="width: 50%"
                    placeholder="请输入数据库端口..." :clearable="true"></el-input>
        </el-form-item>
        <el-form-item
          label="数据库名称"
          :label-width="formLabelWidth"
        prop="kDb">
          <el-input v-model="repositoryPostData.kDb" style="width: 50%"
                    placeholder="请输入数据库名称..." :clearable="true"></el-input>
        </el-form-item>
        <el-form-item label="数据库用户名" :label-width="formLabelWidth" prop="kUser">
          <el-input v-model="repositoryPostData.kUser" style="width: 50%"
                    placeholder="请输入数据库用户名..." :clearable="true"></el-input>
        </el-form-item>
        <el-form-item label="数据库密码" :label-width="formLabelWidth" prop="kPwd" >
          <el-input v-model="repositoryPostData.kPwd" style="width: 50%"
                    placeholder="请输入数据库密码..." :clearable="true" type="password"></el-input>
        </el-form-item>
        <el-form-item label="资源库用户名" :label-width="formLabelWidth"  prop="kRepUser">
          <el-input v-model="repositoryPostData.kRepUser" style="width: 50%"
                    placeholder="请输入资源库用户名..." :clearable="true"></el-input>
        </el-form-item>
        <el-form-item label="资源库密码" :label-width="formLabelWidth"
        prop="kRepPassword">
          <el-input v-model="repositoryPostData.kRepPassword" style="width: 50%"
                    placeholder="请输入资源库密码..." :clearable="true" type="password"></el-input>
        </el-form-item>
        <el-form-item style="text-align: center">
    <el-button  @click="kettleDataBaseTypeDiagVisible = false">取 消</el-button>
    <el-button type="primary" @click="repositoryPostDataSubmmit(repositoryPostData)">确 定</el-button>
        </el-form-item>
      </el-form>
      </div>
    </el-dialog>
  </div>
</div>
</template>

<script src="../../js/kettle/kettle.js">
</script>

<style>
  @import url("../../style/kettle.css");
</style>
