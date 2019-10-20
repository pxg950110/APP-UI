// eslint-disable-next-line no-unused-vars
import {getRequest, postHttpRequest, postRequest, postUrlRequest} from '@/js/util/api'
import {} from '@/js/util/utils'
export default {
  name: 'Home',
  data () {
    return {
      currentUserName: 'guest',
      kettleFileData: {pageId: 1, pageCount: 10, status: 1},
      pageNumber: 1,
      kettleFileListData: [],
      multipleSelection: [],
      search: '',
      // 时间单位类别
      timeUtilPost: {classType: 'timeunitl'},
      dialogVisible1: false,
      dialogVisible2: false,
      dialogVisible3: false,
      dialogVisible4: false,
      loading1: false,
      timeData: {
        timeNumber: 0,
        timeUtil: ''
      },
      timeUtilData: []
    }
  },
  created () {

  },

  /**
   *
   * @param common
   */
  mounted: function (common) {
    var _this = this
    getRequest('/api/kettle/file/all/page', _this.kettleFileData).then((res) => {
      // console.log(JSON.stringify(res.data.data.pageNumber))
      _this.pageNumber = res.data.data.pageNumber
      // console.log(_this.pageNumber)
      _this.kettleFileListData = res.data.data.data
      console.log(JSON.stringify(_this.kettleFileListData))
    })
    var data = {classType: 'timeunitl'}
    postUrlRequest('/api/dict/class/all', data)
  },
  methods: {
    handleCurrentChange: function (val) {
      var _this = this
      console.log(`当前页: ${val}`)
      _this.kettleFileData.pageId = parseInt(`${val}`)
      _this.loading1 = true
      getRequest('/api/kettle/file/all/page', _this.kettleFileData).then((res) => {
        // console.log(JSON.stringify(res.data.data.pageNumber))
        _this.pageNumber = parseInt(res.data.data.pageNumber)
        // console.log(_this.pageNumber)
        _this.kettleFileListData = res.data.data.data
        console.log(JSON.stringify(_this.kettleFileListData))
        _this.loading1 = false
      }).catch(() => {
        _this.$message.warning('查询失败')
        _this.loading1 = false
      })
    },
    handleSizeChange: function (val) {
      var _this = this
      // eslint-disable-next-line no-undef
      _this.kettleFileData.pageCount = parseInt(`${val}`)
      _this.kettleFileData.pageId = 1
      _this.loading1=true
      getRequest('/api/kettle/file/all/page', _this.kettleFileData).then((res) => {
        _this.pageNumber = res.data.data.pageNumber
        _this.kettleFileListData = res.data.data.data
        console.log(JSON.stringify(_this.kettleFileListData))
        _this.loading1 = false
      }).catch(() => {
        _this.$message.warning('查询失败')
        _this.loading1 = false
      })
    },
    toggleSelection (rows) {
      this.$refs.multipleTable.clearSelection()
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
      console.log(this.multipleSelection)
    },
    quartzSetByList (rows) {
      // 判断选择是否为空
      var _this = this
      _this.$message.success('成功')
      var len1 = _this.multipleSelection.length
      if (len1 > 0) {
        _this.dialogVisible1 = true
        // 获取时间单位
        postUrlRequest('/api/dict/class/all', _this.timeUtilPost).then(res => {
          _this.timeUtilData = res.data.data
        }).catch(() => {

        })
      } else {
        _this.$message.warning('请选择需要设置的内容')
        return null
      }
    },
    mytest (rows) {
      var params2 = {
        cornText: '122312',
        classTypeId: 1
      }
      var _this = this
      postHttpRequest('/api/task/quartz/set/add/list', _this.multipleSelection, params2).then(res => {
        _this.$message.success('成功')
        _this.$refs.multipleTable.clearSelection()
      }).catch(() => {
        _this.$message.error('失败')
      })
    },
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    kettleFileListDataSearch () {
      // eslint-disable-next-line no-unused-vars
      var _this = this
      var fileData = _this.kettleFileData
      fileData.name = _this.search
      _this.loading1 = true
      getRequest('/api/kettle/file/all/page', fileData).then((res) => {
        _this.pageNumber = res.data.data.pageNumber
        _this.kettleFileListData = res.data.data.data
        _this.loading1 = false
      }).catch(() => {
        _this.$message.warning('查询失败')
        _this.loading1 = false
      })
    },
    eldiag1_submit (done) {
      var _this = this
      // 判断
      if (_this.timeData.timeNumber <= 0 || _this.timeData.timeUtil === null ||
      _this.timeData.timeUtil === '') {
        _this.$message.warning('请输入设置的时间')
        return null
      }

      var postHtmlData = {
        classTypeId: 1
      }
      postHtmlData.cornText = JSON.stringify(_this.timeData)
      postHttpRequest('/api/task/quartz/set/add/list', _this.multipleSelection, postHtmlData)
        .then(res => {
          console.log(res.code)
          console.log(JSON.stringify(res.data))
          _this.timeData.timeUtil = null
          _this.timeData.timeNumber = null
          var resultData =
            `<h3>成功数量  ${res.data.data.successCount}</h3>` +
            `<h3>集合  ${JSON.stringify(res.data.data.successlist)}</h3>` +
            `<h3>已设置数量  ${res.data.data.exsitCount}</h3>` +
            `<h3>集合  ${res.data.data.exsitList}</h3>`
          this.$alert(resultData, '结果', {
            dangerouslyUseHTMLString: true,
            confirmButtonText: '确定',
            callback: action => {
              this.$message({
                type: 'success',
                message: `action: 成功`
              })
            }})
          _this.$refs.multipleTable.clearSelection()
        })
      _this.dialogVisible1 = false
    },
    searchEnterFun (e) {
      var _this = this

      var keyCode = window.event ? e.keyCode : e.which
      if (keyCode === 13) {
        _this.kettleFileListDataSearch()
      }
    }
  }
}
