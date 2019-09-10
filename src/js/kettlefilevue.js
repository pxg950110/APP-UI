export default {
  name: 'kettlefilevue',
  data () {
    return {
      queryId: 0,
      uploadTimeStr: '',
      kettlefilelist: {
        description: '',
        fileText: '',
        id: null,
        jobTypeId: null,
        name: '',
        status: null,
        uploadTime: null
      }
    }
  },
  created () {
    this.getParams()
    this.getKettleFileList()
  },
  watch: {
    '$route': 'getParams'
  },
  methods: {
    getParams: function () {
      var _this = this
      let pid = this.$route.query.pid
      _this.queryId = pid
      console.log('参数内容' + pid)
    },
    runKettleFileListById: function (id) {
      var _this = this
      _this.$ajax.get('/api/kettle/run/trans?id=' + id).then(response => {
        _this.$message.success('运行成功')
        _this.$alert(_this.logHtml(response.data.data)
          , 'info', {
            dangerouslyUseHTMLString: true,
            showCancelButton: true,
            customClass: 'customClass_info',
            closeOnPressEscape: true
          })
      }).catch(() => {
        _this.$message.error('失败')
      })
    },
    downloadFile () {
      var _this = this
      window.open('http://127.0.0.1:59380/api/kettle/download?id=' + _this.kettlefilelist.id)
    },
    submitData () {
      var _this = this
      _this.$ajax.post('/api/kettle/kettle/update', _this.kettlefilelist)
        .then((result) => {
          window.location.reload(true)
        }).catch(() => {

        })
    },
    getKettleFileList () {
      var _this = this
      _this.$ajax.get('/api/kettle/kettlefile/info?id=' + _this.queryId)
        .then((result) => {
          _this.kettlefilelist.id = result.data.data.id
          _this.kettlefilelist.name = result.data.data.name
          _this.kettlefilelist.description = result.data.data.description
          _this.kettlefilelist.jobTypeId = result.data.data.jobTypeId
          _this.kettlefilelist.status = result.data.data.status
          _this.kettlefilelist.fileText = result.data.data.fileText
          _this.kettlefilelist.uploadTime = result.data.data.uploadTime
          _this.uploadTimeStr = new Date(_this.kettlefilelist.uploadTime).toISOString()
        }).catch((e) => {
          alert(e)
        })
    },
    logHtml (logInfo, logType) {
      var html = '<h1 style="align-content: center">日志记录</h1>'

      html += '<textarea style="width: 100%;height: 400px ">' +
        logInfo + '</textarea>'

      return html
    },
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },

  }
}
