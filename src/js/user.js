export default {
  name: 'user',
  data () {
    return {
      tableData: [],
      uId: 0,
      last_password: '',
      new_password: '',
      confirm_password: ''
    }
  },
  created () {
    this.getUser()
  },
  methods: {
    indexMethod (index) {
      return index * 1 + 1
    },
    getUser () {
      var _this = this
      _this.$ajax.get('api/user/kuser/all').then(function (res) {
        _this.tableData = res.data.data
      }).catch(function (errors) {
        alert(errors)
      })
    },
    eidtUser (uId) {
      var _this = this
      this.$alert(_this.eidt_user_html(), '修改密码', {
        dangerouslyUseHTMLString: true
      }).then(function () {
        alert(_this.new_password)
      }).catch(() => {
        _this.$message({
          type: 'info',
          message: '已取消修改'
        })
      })
      return null
    },
    deleteUser (uId, password) {
      // 通过uId删除用户
      var _this = this
      _this.$confirm('是否确认删除用户', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        _this.$ajax.delete('/api/user/kuser/delete/' + uId).then(function (res) {
          // alert('成功')
          _this.$message({
            type: 'success',
            message: '删除成功'
          })
          window.location.reload()
        }).catch(function (errors) {
          alert(errors)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    date_format (longTime) {
      try {
        var date = new Date()
        date.setDate(longTime)
        var y = date.getFullYear()
        return y.toLocaleString()
        // return '1223'
      } catch (e) {
        return null
      }
    },
    eidt_user_html () {
      // 修改密码的html
      var html =
        '<ul>' +
        '<li><i>旧&nbsp;密&nbsp;码:&nbsp;&nbsp;</i><input  type="password" v-model="last_password" placeholder="请输入旧密码"/></li>' +
        '<li><i>新&nbsp;密&nbsp;码:&nbsp;&nbsp;</i><input type="password" v-model="new_password" placeholder="请输入新密码"/></li>' +
        '<li><i>确认密码:&nbsp;</i><input type="password" v-model="confirm_password" placeholder="请再输入一次"/></li>' +
        '</ul>'

      return html
    }

  }

}
