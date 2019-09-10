<template>
    <div id="login_top">
      <div id="login">
        <h1>登陆界面</h1>
        <form>
          <label for="username">用户名</label>
          <input type="text"  v-model.trim="loginData.userName" name ="username"/>

          <label for="password">密码</label>
          <input type="password" v-model.trim="loginData.password" name ="password"/>
          <input type="button" value="登陆" @click="dologin"/>

        </form>
      </div>
    </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      loginData: {
        userName: '',
        password: ''
      }
    }
  },
  methods: {
    dologin () {
      var vm = this
      // 用户名和密码不为空
      if (vm.loginData.userName === '' || vm.loginData.password === '') {
        alert('用户名和密码不能为空')
      }
      vm.$ajax.get('/api/user/login/check?userName=' +
        vm.loginData.userName + '&password=' + vm.loginData.password).then(// 成功
        () => {
          alert('成功')
          // window.location.href = '/'
        }
      ).catch(() => {
        alert('error')
      })
    }
  }
}
</script>

<style scoped>

</style>
