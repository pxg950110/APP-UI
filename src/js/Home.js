// eslint-disable-next-line no-unused-vars
import {getRequest, postHttpRequest, postRequest, postUrlRequest} from '@/js/util/api'
import {} from '@/js/util/utils'
export default {
  name: 'Home',
  data () {
    return {
      currentUserName: '张三',
      kettleFileData: {pageId: 1, pageCount: 10, status: 1},
      pageNumber: 1,
      kettleFileListData: [],
      multipleSelection: [],
      search: '',
      dialogVisible1: false,
      textarea1:''
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
      _this.kettleFileData.pageId = `${val}`
      getRequest('/api/kettle/file/all/page', _this.kettleFileData).then((res) => {
        // console.log(JSON.stringify(res.data.data.pageNumber))
        _this.pageNumber = res.data.data.pageNumber
        // console.log(_this.pageNumber)
        _this.kettleFileListData = res.data.data.data
        console.log(JSON.stringify(_this.kettleFileListData))
      })
    },
    handleSizeChange: function (val) {
      var _this = this
      // eslint-disable-next-line no-undef
      _this.kettleFileData.pageCount = `${val}`
      _this.kettleFileData.pageId = 1
      getRequest('/api/kettle/file/all/page', _this.kettleFileData).then((res) => {
        _this.pageNumber = res.data.data.pageNumber
        _this.kettleFileListData = res.data.data.data
        console.log(JSON.stringify(_this.kettleFileListData))
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
      getRequest('/api/kettle/file/all/page', fileData).then((res) => {
        _this.pageNumber = res.data.data.pageNumber
        _this.kettleFileListData = res.data.data.data
      })
    }
  }

}
