/**
 * "repositoryId": 2,
 "repositoryName": "kettle_test",
 "repositoryUsername": "admin",
 "repositoryPassword": "admin",
 "repositoryType": "POSTGRESQL",
 "databaseAccess": "",
 "databaseHost": "127.0.0.1",
 "databasePort": "5432",
 "databaseName": "java_test",
 "databaseUsername": "postgres",
 "databasePassword": "123456",
 "addTime": 1559025088225,
 "addUser": 0,
 "editTime": 1559025088225,
 "editUser": 0,
 "delFlag": 1
 */
export default {
  name: 'repository',
  data () {
    return {
      kRepositoryData: [],
      fullscreenLoading: false
    }
  },
  created () {
    this.getKRepository()
  },
  methods: {
    // 获取全部资源的配置
    getKRepository () {
      var _this = this
      _this.$ajax.get('/api/kettle/repository/all')
        .then(function (res) {
          if (res.data.code == 200) {
            _this.kRepositoryData = res.data.data
          }
        }).catch(function (errors) {
          alert(errors)
        })
    },
    // 判断资源库是否有效
    isBooleanRepository: function (repositoryId) {
      // 判断是否有效
      var _this = this
      _this.fullscreenLoading = true
      // 设置2s延迟
      // setTimeout(2000)
      setTimeout(function () {
        _this.$ajax.post('/api/kettle/repository/isvalid/' + repositoryId)
          .then(function (res) {
            _this.fullscreenLoading = false
            var is_valid = res.data.code
            if (is_valid == 200) {
              _this.$message({
                type: 'success',
                message: '资源库有效'
              })
            } else {
              _this.$message({
                type: 'info',
                message: '资源库无效'
              })
            }
          }).catch(function (errors) {
            _this.fullscreenLoading = false
            _this.$message({
              type: 'info',
              message: '资源库无效'
            })
          })
      }, 200)
    }
  }
}
