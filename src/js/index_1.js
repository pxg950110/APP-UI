/**
 * @author pxg
 * @emil pxg950110@163.com
 * @date 2019/9/28
 * @version v1.0
 * @description
 */

export default {
  name: 'index',
  data () {
    return {
      initData: [],
      websocket: null,
      charts: null,
      /*  opinion: ["1", "3", "3", "4", "5"], */
      xalixs: [],
      yalixs1: [],
      yalixs2: []
    }
  },
  created () {
    this.$nextTick(function () {
      // this.dranLine('memoryinfo')
      this.initWebsocket()
    })
  },
  destroyed: function () {
    // 页面销毁时关闭长连接
    this.websocketclose()
  },
  methods: {
    // 初始化websocket
    initWebsocket () {
      var _this = this
      var wsuri = 'ws://127.0.0.1:59380/websocket/sid123'.replace('http', 'ws')
      console.log(wsuri)
      _this.websocket = new WebSocket(wsuri)
      if (typeof (_this.websocket) === 'undefined') {
        console.log('您的浏览器不支持WebSocket')
      } else {
        _this.websocket.onerror = this.websocketonerror
        _this.websocket.onopen = this.websocketonopen
        _this.websocket.onmessage = this.websocketonmessage
        _this.websocket.onclose = this.websocketclose
      }
    },
    websocketonopen () {
      console.log('websocket打开成功')
    },
    websocketonerror (e) {
      console.log('WebSocket连接发生错误')
    },
    websocketonmessage (e) {
      if (e.data === '连接成功') {
        return null
      }
      var resdata = JSON.parse(e.data)
      if (this.xalixs.length < 30) {
        // {"id":null,"dateInfo":"2019-09-29","timeInfo":"23:31:42","totalMemory":8032.18,"usedMemory":6825.2,"freeMemory":1206.98}
        this.xalixs.push(resdata.timeInfo)
        this.yalixs1.push(resdata.usedMemory)
        this.yalixs2.push(resdata.freeMemory)
      } else {
        this.xalixs.splice(0, 1)
        this.xalixs.push(resdata.timeInfo)
        this.yalixs1.splice(0, 1)
        this.yalixs1.push(resdata.usedMemory)
        this.yalixs2.splice(0, 1)
        this.yalixs2.push(resdata.freeMemory)
      }
      this.dranLine('memoryinfo')
      // if (this.initData.length < 15) {
      //   this.initData.push(e.data)
      // } else {
      //   this.initData.splice(0, 1)
      //   this.initData.push(e.data)
      // }
      console.log('接收消息' + e.data)
    },
    websocketclose (e) {
      console.log('关闭连接')
    },
    // 画图
    dranLine (id) {
      var _this = this
      _this.charts = _this.$echarts.init(document.getElementById(id))
      var Option = {
        title: {
          text: '内存使用情况'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['已用内存', '剩余内存']
        },
        color: ['red', 'blue'],
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          data: _this.xalixs
        },
        yAxis: {type: 'value'},
        series: [{
          name: '已用内存',
          type: 'line',
          data: _this.yalixs1
        },
        {
          name: '剩余内存',
          type: 'line',
          data: _this.yalixs2
        }
        ]
      }
      console.log(JSON.stringify(Option))
      _this.charts.setOption(Option)
    }
  }
}
