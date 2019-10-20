<template>
    <div  class="systemdict-top">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane name="first">
          <span slot="label"><i class="el-icon-user"></i>  用户管理</span>
          <div class="systemdict-div-user-set">
            <div>
              <el-button @click="addUserDiagVisible=true"><span>添加</span></el-button>
              <el-button><span>修改</span></el-button>
            </div>
            <el-table :data="userWithRoleList" >
              <el-table-column
                width="55">
                <template scope="scope">
                  <el-radio :label="scope.row" v-model="multipleTable" @change.native="getTemplateRow(scope.$index,scope.row)">&nbsp;</el-radio>
                </template>
              </el-table-column>
              <el-table-column width="200px"
              prop="tbUser.userName"
              label="用户名">
              </el-table-column>
              <el-table-column width="200px"
              prop="tbRole.roleName"
              label="权限">
              </el-table-column>
              <el-table-column width="200px"
              prop="tbRole.note"
              label="备注">
              </el-table-column>
            </el-table>

            <div>
              <el-dialog   class="systemdict-user-addUserDiagVisible"
                           :visible.sync="addUserDiagVisible"
                           :modal-append-to-body="false"
                           :before-close="handleClose"
                           title="注册用户">
                <el-form ref="addUserFormData"
                         :model="addUserFormData"
                         :rules="rules"
                         label-width="100px"
                         class="demo-ruleForm">
                  <el-form-item   prop="tbUser.userName" label="用户名">
                    <el-input  v-model="addUserFormData.tbUser.userName"></el-input>
                  </el-form-item>
                  <el-form-item   prop="tbUser.userPassword" label="密  码">
                    <el-input  v-model="addUserFormData.tbUser.userPassword" type="password"></el-input>
                  </el-form-item>

                  <el-form-item   prop="userPassword2" label="确认密码">
                    <el-input  v-model="addUserFormData.userPassword2" type="password"></el-input>
                  </el-form-item>
                  <el-form-item label="用户权限" prop="tbRole.rid">
                    <template v-for="item in roleDataList">
                      <el-radio v-model="addUserFormData.tbRole.rid" :label="item.rid" name="item.note">
                        <el-tooltip  effect="dark"  placement="bottom" :content="item.note" >
                          <el-button> {{item.roleName}}</el-button>
                        </el-tooltip>
                      </el-radio>
                    </template>
                  </el-form-item>

                  <el-form-item>
                    <el-button @click="addUserPostFunction('addUserFormData')"><i></i><span>提交</span></el-button>
                    <el-button @click="formDataReset('addUserFormData')"><i></i><span>清空</span></el-button>
                  </el-form-item>

                </el-form>

              </el-dialog>

            </div>

          </div>
          </el-tab-pane>
        <el-tab-pane >
          <span slot="label"><i class="el-icon-date"></i> 邮箱配置</span>
          <div class="systemdict-div-mail-set">
          </div>
        </el-tab-pane>
      </el-tabs>

    </div>
</template>

<script src="../../js/systemdict/systemdict.js">

</script>

<style scoped>
  @import url("../../style/systemdict.css");
</style>
