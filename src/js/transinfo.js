import JobUtilVue from '@/page/JobUtilVue'
export default {
  name: 'TranInfo',
  data () {
    return {
      tranData: [],
      categoryData: [],
      fullscreenLoading: false,
      fullscreenLoading2: false,
      tranCount: 0,
      pathFiltersData: [],
      search: '',
      logdata: [],
      pageSize: 5, // 每页的数据条数
      currentPage: 1// 默认开始页面,

    }
  },
  created () {
    this.getAllTranInfo()
  },
  components: {JobUtilVue},
  methods: {
    getAllTranInfo () {
      var _this = this
      _this.$ajax.get('/api/kettle/repository/trans/list').then(
        function (res) {
          if (res.data.code == 200) {
            _this.tranData = res.data.data
            _this.tranCount = res.data.data.length
          }
        }
      ).catch(function (errors) {
        alert(errors)
      })
    },
    indexMethod (index) {
      return index * 1 + 1
    },
    updateTranInfo () {
      var _this = this
      _this.$confirm('确认更新转换列表(可能需要一点时间)', '更新转换列表', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        _this.fullscreenLoading = true
        setTimeout(
          _this.$ajax.post('/api/kettle/repository/jobortrans/update/T').then(function (res) {
            alert('增加数量:' + res.data.data.addCount + '\r\n' +
            '更新数量:' + res.data.data.updateCount)
            _this.fullscreenLoading = false
            window.location.reload()
          }).catch(function (errors) {
            alert(errors)
            _this.fullscreenLoading = false
          }), 500)
        _this.$message({
          type: 'success',
          message: '成功'
        })
      }).catch(() => {
        _this.$message({
          type: 'info',
          message: '取消'
        })
      })
    },
    eidtTransInfo (transId) {
      var _this = this
      _this.$ajax.get('/api/kcategory/all').then(function (res) {
        _this.categoryData = res.data.data
      }).catch(function (errors) {
        alert(errors)
      })
      this.$alert('<h1>修改</h1>', '修改转换分类', {
        dangerouslyUseHTMLString: true
      }).then(function () {

      }).catch(() => {
        _this.$message({
          type: 'info',
          message: '已取消修改'
        })
      })
      return null
    },
    handleSizeChange (val) {
      var _this = this
      _this.pageSize = val
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      this.currentPage = val
      console.log(`当前页: ${val}`)
    },
    runTransInfo (objectId, repositoryId) {
      var _this = this
      var requestData = {
        objectId: objectId,
        repositoryId: repositoryId,
        logLevel: 'Rowlevel'
      }
      _this.fullscreenLoading2 = true
      // 确认窗口
      _this.$confirm('是否执行该转换', '执行', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 确认
        // 设置loading

        setTimeout(
          _this.$ajax.post('/api/kettle/repository/trans/run/objectId', requestData)
            .then(function (res) {
              if (res.code == 200) {
                _this.$alert(
                  _this.logHtml(res.data.data.startTime,
                    res.data.data.endTime, res.data.data.logInfo, res.data.data.logType), 'info', {
                    dangerouslyUseHTMLString: true,
                    showCancelButton: true
                  })
              } else {
                _this.$alert(
                  _this.logHtml(res.data.data.startTime,
                    res.data.data.endTime, res.data.data.logInfo, res.data.data.logType), 'info', {
                    dangerouslyUseHTMLString: true,
                    showCancelButton: true
                  })
              }

              _this.fullscreenLoading2 = false
              _this.$message({
                type: 'success',
                message: '成功'
              })
            }).catch(function (errors) {
              alert(errors)
              _this.fullscreenLoading2 = false
            }), 500)
      }).catch(() => {
        _this.$message({
          type: 'info',
          message: '取消'
        })
        _this.fullscreenLoading2 = false
      })
    },
    logHtml (startTime, endTime, logInfo, logType) {
      var html = '<h1 style="align-content: center">日志记录</h1>'
      html += '<p>开始时间:' + startTime + '</p>'
      html += '<p>结束时间:' + endTime + '</p>'
      if (logType == 'T') {
        html += '<textarea style="width: 100%;height: 300px ">' + logInfo + '</textarea>'
      }
      if (logType == 'F') {
        html += '<textarea style="width: 100%;height: 300px;color: red">' + logInfo + '</textarea>'
      }
      return html
    }
  }

}
