import JobUtilVue from '@/page/JobUtilVue'
export default {
  name: 'categoryList',
  components: {JobUtilVue},
  data () {
    return {
      categorylistData: []
    }
  },
  created () {
    this.getCategorylistData()
  },
  methods: {
    indexMethod (index) {
      return 1 * index + 1
    },
    getCategorylistData () {
      var _this = this
      _this.$ajax.get('/api/kcateory/categoryutil/all').then(function (res) {
        if (res.data.code == 200) {
          _this.categorylistData = res.data.data
        }
      })
    }

  }
}
