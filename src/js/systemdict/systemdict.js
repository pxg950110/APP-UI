/**
 * @author pxg
 * @emil pxg950110@163.com
 * @date 2019/9/30
 * @version v1.0
 * @description  获取字典相关内容
 */
import {getRequest, postRequest} from '@/js/util/api'
import json from 'vue-resource/src/http/interceptor/json'
import da from 'element-ui/src/locale/lang/da'

export default {
  name: 'systemdict',
  data () {
    const validatePass = (rule, value, callback) => {
      var _this = this
      if (_this.addUserFormData.tbUser.userPassword === _this.addUserFormData.userPassword2) {
        callback()
      } else {
        callback(new Error('请选择列表中已有的选项'))
      }
    }
    return {
      dictClass: [], // 类别集合
      roleDataList: [], // {rid: 2, roleName: "primary", note: "主要权限"
      userWithRoleList: [],
      activeName: 'first',
      addUserDiagVisible: false,
      multipleTable: null, // 选择的内容
      addUserFormData: { // 用户注册
        tbRole: {
          note: '',
          rid: null,
          roleName: ''
        },
        tbUser: {
          userName: '',
          userPassword: ''
        },
        userPassword2: ''
      },
      rules: {
        tbRole: {
          rid: [
            {required: true, message: '选择权限', trigger: 'change'}
          ]
        },
        tbUser: {
          userName: [
            {required: true, message: '请输入用户名', trigger: 'blur'},
            {min: 3, max: 15, message: '长度在 3 到 5 个字符', trigger: 'blur'}
          ],
          userPassword: [
            {
              required: true, message: '请输入密码', trigger: 'blur'
            }]
        },
        userPassword2: [
          {
            required: true, message: '请输入确认密码', trigger: 'blur'
          },
          {
            required: true, message: '2次密码验证失败', validator: validatePass
          }
        ]
      }
    }
  },
  created () {
    this.getRoleDateList()
    this.getUserWithRoleList()
  },
  destroyed: {},
  methods: {
    // 获取人员角色
    getRoleDateList () {
      var _this = this
      getRequest('/api/user/role/list').then((res) => {
        _this.roleDataList = res.data.data
      }).catch(() => {
        _this.$message.error('调用错误')
      })
    },
    // 获取用户列表
    getUserWithRoleList () {
      var _this = this
      getRequest('/api/user/list/with/role').then((res) => {
        _this.userWithRoleList = res.data.data
      }).catch(() => {
        _this.$message.error('调用错误')
      })
    },
    addUserPostFunction (FormData) {
      this.$refs[FormData].validate((valid) => {
        if (valid) {
          console.log('提交成功')
          var data = this.addUserFormData
          postRequest('/api/user/regist', data).then((res) => {
            if (res.data.code === 200) {
              this.$message.success('注册成功')
              // 表单数据重置
              this.formDataReset(FormData)
              // 刷新列表数据
              this.getUserWithRoleList()
              // 关闭弹窗
              this.addUserDiagVisible = false
            } else {
              this.$message.warning(res.data.message)
            }
          }).catch(() => {
            this.$message.error('错误')
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    formDataReset (FromData) {
      if (this.$refs[FromData] !== undefined) {
        this.$refs[FromData].resetFields()
      }
    }

  }
}
