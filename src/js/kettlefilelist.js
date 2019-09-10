export default {
  name: 'kettlefilelist',
  data () {
    return {
      uploadData: {
        appDictId: null,
        description: null,
        fileName: null
      },
      formData: {
        kFileList: {
          id: null,
          name: '',
          description: ''
        },
        adict: {
          jobclassid: null
        }

      },
      jobrunclassList: [],
      selectOnVisible: false,
      dialogVisible: false,
      uploadVisible: false,
      taskSetVisible: false,
      taskCronList: [],
      // 表格列表
      tableColumn: [{'date': '1'}, {'date': '1'},
        {'date': '1'}, {'date': '1'}],

      kettleFileListAll: [],
      taskdataTest: [],
      // 定时设置内容
      taskSetData: {
        cronId: 0,
        cronText: null,
        jobId: 0,
        jobTypeId: 0,
        startPlanTime: null,
        status: 0
      },
      timeUnit: [],
      cronTextData: {
        cronText: null,
        cronType: null
      }
    }
  },

  created () {
    this.getKettleFileListAll()
  },
  methods: {
    /**
     * <p>
     *     测试
     * </p>
     */
    taskSetSubmit () {
      var _this = this
      // 数据清空
      _this.taskSetData = {
        cronId: 0,
        cronText: null,
        jobId: 0,
        jobTypeId: 0,
        startPlanTime: null,
        status: 0
      }
      _this.cronTextData = {
        cronText: null,
        cronType: null
      }
      _this.taskSetVisible = false
    },

    /**
     * <p>
     *    设置定时任务相关配置
     * </p>
     */
    taskSetFunction: function () {
      var _this = this
      _this.$ajax.get('/api/task/cron/all?status=1').then(response => {
        if (response.data.code === 200) {
          _this.taskCronList = response.data.data
        }
      }).catch(() => {
      })
      _this.$ajax.post('/api/dict/class/all?classType=timeunitl').then(response => {
        _this.timeUnit = response.data.data
      }).catch(() => {

      })
      _this.taskSetVisible = true
    },

    // 头部最后2列合并

    // 获取文件kettle列表
    getKettleFileListAll: function () {
      var _this = this
      _this.$ajax.get('/api/kettle/file/all')//
        .then(response => {
          _this.kettleFileListAll = response.data.data
        }).catch(() => {

        })
    },
    handleClick (in_id) {
      var _this = this
      _this.$router.push({
        path: '/kettle/file/info',
        query: {
          pid: in_id
        }
      })
    },
    handleClose: function (done) {
      this.$confirm('确认关闭？')
        .then(() => {
          done()
        })
        .catch(() => {
        })
    },
    editChange (var1, var2, var3, var4) {
      var _this = this
      _this.formData.kFileList.id = var1
      _this.formData.kFileList.name = var2
      _this.formData.kFileList.description = var3
      _this.formData.adict.jobclassid = var4
      // 查询类型字典
      _this.$ajax.post('/api/dict/class/all?classType=jobrunclass')
        .then(response => {
          _this.jobrunclassList = response.data.data
        }).catch(() => {

        })
      _this.dialogVisible = true
    },

    submitFromData: function () {
      var _this = this
      _this.$confirm('确认提交').then(() => {
        console.log(JSON.stringify(_this.formData))
        // post接口更新内容
        var kettePostData = {
          description: _this.formData.kFileList.description,
          fileText: null,
          id: _this.formData.kFileList.id,
          jobTypeId: _this.formData.adict.jobclassid,
          name: _this.formData.kFileList.name,
          status: null,
          uploadTime: null
        }
        _this.$ajax.post('/api/kettle/kettle/update', kettePostData).then(() => {
          _this.getKettleFileListAll()
        }).catch(() => {

        })
        _this.dialogVisible = false
      }).catch(() => {

      })
    }

  }
}
