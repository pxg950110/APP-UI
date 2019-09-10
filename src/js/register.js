
// noinspection JSAnnotator
export default {
  name: 'registVue',
  data () {
    return {
      roleList: [],
      roleChoose: [],
      password2: '',
      registData: {
        tbRole: {
          note: '',
          rid: null,
          roleName: ''
        },
        tbUser: {
          createTime: new Date(),
          id: null,
          isDeleted: false,
          isLocked: false,
          userName: '',
          userPassword: ''
        }
      },
      rules: {
      }
    }
  },
  created () {
    this.roleListFunction()
  },
  methods: {
    roleListFunction () {
      var _this = this
      _this.$ajax.get('/api/user/role/list').then((result) => {
        _this.roleList = result.data.data
      })
    },
    registerFunction: function () {
      var _this = this
      console.log(JSON.stringify(_this.registData))
      console.log(_this.roleChoose)
      // 调用用户注册的接口
      _this.$ajax.post('/api/user/regist',
        _this.registData)
        .then((result) => {
          var code = result.data.code
          if (code === 200) {
            window.location.href = '/'
          } else {
            _this.$message.warning(
              result.data.message)
          }
        }).catch(() => {
        }
        )
    }
  }
}
