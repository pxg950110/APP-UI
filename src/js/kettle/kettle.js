/**
 * @author pxg
 * @emil pxg950110@163.com
 * @date 2019/9/22
 * @version v1.0
 * @description
 */
import {getRequest, postRequest} from '@/js/util/api'

export default {
  name: 'kettleRepository',
  data () {
    return {
      repositoryPostData: {
        kAccess: '',
        kDb: '', // 非空限制
        kHost: '', // 非空限制
        kName: '',
        kPort: '', // 非空限制
        kPwd: '', // 非空限制
        kRepPassword: '', // 非空限制
        kRepUser: '', // 非空限制
        kTypeId: null,
        kTypeName: '',
        kUser: ''
      },
      kettleDataBaseTypeList: [],
      // 连接类型列表
      kettleAccessTypeList: [],
      // 资源库弹窗 boolean
      kettleDataBaseTypeDiagVisible: false,
      formLabelWidth: '120px',
      rules: {
        kDb: [
          { required: true, message: '请输入数据库名称', trigger: 'blur' }
        ], // 非空限制
        kHost: [
          { required: true, message: '请输入数据库地址', trigger: 'blur' }
        ], // 非空限制
        kPort: [
          { required: true, message: '请输入数据库端口', trigger: 'blur' }
        ], // 非空限制
        kPwd: [
          { required: true, message: '请输入数据库密码', trigger: 'blur' }
        ], // 非空限制
        kRepPassword: [
          { required: true, message: '请输入资源库密码', trigger: 'blur' }
        ], // 非空限制
        kRepUser: [
          { required: true, message: '请输入资源库用户名', trigger: 'blur' }
        ], // 非空限制
        kTypeId: [
          { required: true, message: '请选择数据库类型', trigger: 'change' }
        ],
        kUser: [
          { required: true, message: '请输入数据库用户名', trigger: 'blur' }
        ]
      },
      kettleRepositoryTableList: []
    }
  },
  created () {
    this.getAllKettleReposiotryTableList()
    this.getAllDataBaseTypeList()
    this.getAllAccessTypeList()
  },
  methods: {
    getAllAccessTypeList () {
      var _this = this
      var data = {}
      // 调用的接口 /api/kettle/database/dict/type
      postRequest('/api/kettle/database/access/type', data).then((res) => {
        _this.kettleAccessTypeList = res.data.data
      })
    },
    getAllDataBaseTypeList: function () {
      var _this = this
      var data = {}
      // 调用的接口 /api/kettle/database/dict/type
      postRequest('/api/kettle/database/dict/type', data).then((res) => {
        _this.kettleDataBaseTypeList = res.data.data
      })
    },
    // 数据库类型和数据库的默认端口绑定
    getPortWithDataBaseType () {
      var _this = this
      // 获取选择的内容
      var id = _this.repositoryPostData.kTypeId
      // 通过id查询list获取单个内容
      for (var i = 0; i < _this.kettleDataBaseTypeList.length; i++) {
        var item1 = _this.kettleDataBaseTypeList[i]
        console.log(item1)
        if (item1.idDatabaseType === id) {
          _this.repositoryPostData.kPort = item1.descriptionText
        } else {
          continue
        }
      }
    },
    checkRepositoryPostData () {
      // 检测是否有效 暂时禁用掉
    },
    handlekettleDataBaseTypeDiagVisibleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          this.clearrepositoryPostData()
          done()
        })
        .catch(_ => {})
    },
    clearrepositoryPostData () {
      var _this = this
      _this.repositoryPostData = {
        kAccess: '',
        kDb: '', // 非空限制
        kHost: '', // 非空限制
        kName: '',
        kPort: '', // 非空限制
        kPwd: '', // 非空限制
        kRepPassword: '', // 非空限制
        kRepUser: '', // 非空限制
        kTypeId: null,
        kTypeName: '',
        kUser: ''
      }
    },
    repositoryPostDataSubmmit (formData) {
      // if (this.$refs[formData].valid) {
      //   return false
      // }
      postRequest('/api/kettle/database/repository/add', formData).then((res) => {
        this.$message.success(res.data.message)
      }).catch(() => {
        this.$message.error('错误')
        // this.kettleDataBaseTypeDiagVisible
      })
    },
    getAllKettleReposiotryTableList () {
      getRequest('/api/kettle/database/repository/all/list').then((res) => {
        this.kettleRepositoryTableList = res.data.data
      }).catch(() => {

      })
    },
    /**
     * 检测是否有效
     * @param data
     */
    checkKettleReposiotryTable (data) {
      postRequest('/api/kettle/database/repository/check/valid', data).then((res) => {
        if (res.data.code === 200) { this.$message.success('资源库有效') } else {
          this.$message.warning('资源库无效')
        }
      }).catch(() => {
        this.$message.error('error')
      })
    }
  }
}
// {
//   "id": 3,
//   "kName": "aa",
//   "kTypeId": 25,
//   "kTypeName": "POSTGRESQL",
//   "kAccess": "Native",
//   "kHost": "127.0.0.1",
//   "kDb": "app",
//   "kPort": "5432",
//   "kUser": "postgres",
//   "kPwd": "123456",
//   "status": 1,
//   "createTime": 1571061465092,
//   "kRepUser": "admin",
//   "kRepPassword": "admin"
// }
