<template>

  <div>
    <div>
      <div style="width: 400px">
        <h1>用户注册页面</h1>
        <!--{rid: 1, roleName: "admin", note: "管理员账号"}-->
        <el-form  :model="registData"
                  label-width="100px"
                    size="300px"
                  rules="rules"
                  ref="roleForm"
        >
          <el-form-item label="用户名" prop="userName">
            <el-input v-model="registData.tbUser.userName"  ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="userPassword" >
            <el-input v-model="registData.tbUser.userPassword"  type="password"></el-input>
          </el-form-item>
          <el-form-item label="再输一次"   prop="userPassword2" >
            <el-input  type="password" v-model="password2"></el-input>
          </el-form-item>
          <el-form-item label="权限信息">
            <el-select v-model="registData.tbRole.rid" placeholder="请选择权限">
              <el-option
                v-for="role in roleList"
                :key="role.rid"
                :label="role.note"
                :value="role.rid">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="registerFunction()" >提交</el-button>
            <el-button>重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>

  </div>
</template>

<script src="../js/register.js">
</script>

<style scoped>

</style>
