<template>
    <!--<div>index page-->

    <div>

      <div><h1>{{dataTime}}</h1></div>
    </div>
    <!--</div>-->

</template>

<script>
import Stomp from 'stompjs'
import App from '../App'
import Title from './main_menu '
export default{
  components: {Title, App},

  data () {
    return {
      client: Stomp.client('ws://127.0.0.1:15674/ws'),
      dataTime: '初始化'
    }
  },
  created () {
    this.connect()
  },
  methods: {
    onConnected: function (frame) {
      // 订阅频道
      const queqe = 'mystring'
      this.client.subscribe(queqe, this.responseCallBack, this.onFailed)
      //
    },
    onFailed: function (frame) {
      console.log('MQ Failed:' + frame)
    },
    responseCallBack: function (frame) {
      var vm = this
      vm.dataTime = frame.body
      console.log('MQ  msg=>' + frame.body)
    },
    connect: function () {
      // 初始化连接mqtt客服端 并连接mqtt服务
      const headers = {
        login: 'guest',
        passcode: 'guest'
      }
      this.client.connect(headers, this.onConnected, this.onFailed)
    }
  }
}

</script>

<style lang="css">
</style>
