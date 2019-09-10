import JobUtilVue from '@/page/JobUtilVue'

/**
 "kJob": {
        "jobId": 2,
        "categoryId": 0,
        "jobRepositoryId": 2,
        "jobName": "作业 1",
        "jobType": 1,
        "jobDescription": null,
        "jobPath": null,
        "objectId": "1",
        "addUser": 1,
        "addTime": "2019-06-02T11:58:48.694+0000",
        "editUser": 1,
        "editTime": "2019-06-02T12:28:41.743+0000",
        "delFlag": 1
      },
 "kRepositoryName": "kettle_test",
 "categoryName": "default"
 }

 */

export default {
  name: 'jobInfo',
  components: {JobUtilVue},
  data () {
    return {
      jobData: [],
      categoryData: [],
      fullscreenLoading: false,
      jobCount: 0,
      pathFiltersData: [],
      search: '',
      logdata: [],
      pageSize: 5, // 每页的数据条数
      currentPage: 1// 默认开始页面,

    }
  },
  created () {
    this.getJobList()
  },
  methods: {
    updateJobInfo () {
      var _this = this
      _this.$confirm('确认更新作业列表(可能需要一点时间)', '更新作业列表', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        _this.fullscreenLoading = true
        setTimeout(
          _this.$ajax.post('/api/kettle/repository/jobortrans/update/J').then(function (res) {
            alert('增加数量:' + res.data.data.addCount + '\r\n' +
              '更新数量:' + res.data.data.updateCount)
            _this.fullscreenLoading = false
            window.location.reload()
          }).catch(function (errors) {
            alert(errors)
            _this.fullscreenLoading = false
          }), 200)
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

    indexMethod (index) {
      return index * 1 + 1
    },

    // 获取job列表
    getJobList () {
      var _this = this
      _this.$ajax.get('/api/kettle/repository/job/list').then(function (res) {
        if (res.data.code == 200) {
          _this.jobData = res.data.data
          _this.jobCount = res.data.data.length
        } else {
          alert('errors')
        }
      }).catch(function (errors) {
        alert(errors)
      })
    },
    handleSizeChange (val) {
      var _this = this
      _this.pageSize = val
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      var _this = this
      _this.currentPage = val
      console.log(`当前页: ${val}`)
    },

    // editJobInfo
    editJobInfo (jobId) {
      var _this = this
      _this.$ajax.get('/api/kcategory/all').then(function (res) {
        _this.categoryData = res.data.data
      }).catch(function (errors) {
        alert(errors)
      })
      this.$alert('<h1>修改</h1>', '修改作业分类', {
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
    runJobByObjectIdAndrepositoryId (objectId, jobRepositoryId) {
      var _this = this
      var requestData = {
        objectId: objectId,
        repositoryId: jobRepositoryId,
        logLevel: 'Rowlevel'
      }
      _this.fullscreenLoading = true
      // 确认窗口
      _this.$confirm('是否执行该转换', '执行', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 确认
        // 设置loading

        setTimeout(
          _this.$ajax.post('/api/kettle/repository/job/run/objectId', requestData)
            .then(function (res) {
              if (res.code == 200) {
                _this.$alert(
                  _this.logHtml(res.data.data.startDate,
                    res.data.data.endDate, res.data.data.logText, res.data.data.logType),
                  'info', {
                    dangerouslyUseHTMLString: true,
                    showCancelButton: true
                  })
              } else {
                _this.$alert(
                  _this.logHtml(res.data.data.startDate,
                    res.data.data.endDate, res.data.data.logText, res.data.data.logType), 'info', {
                    dangerouslyUseHTMLString: true,
                    showCancelButton: true
                  })
              }

              _this.fullscreenLoading = false
              _this.$message({
                type: 'success',
                message: '成功'
              })
            }).catch(function (errors) {
              alert(errors)
              _this.fullscreenLoading = false
            }), 500)
      }).catch(() => {
        _this.$message({
          type: 'info',
          message: '取消'
        })
        _this.fullscreenLoading = false
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
