import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/page/index'
import UserControl from '@/page/user'
import Repository from '@/page/repository'
import KettleJob from '@/page/kettlejob'
import KQuartz from '@/page/kquartz'
import JobList from '@/page/joblist'
import JobMonitor from '@/page/jobmonitor'
import LogDetail from '@/page/logDetail'
import JobInfo from '@/page/jobInfo'
import TranInfo from '@/page/tranInfo'
import LogDetailInfoShow from '@/page/LogDetailInfoShow'
import CateGoryList from '@/page/categoryList'
import Message from '@/page/message'
import Login from '@/page/login'
import Register from '@/page/registVue'
import Kettlefilevue from '@/page/kettlefilevue'
import Kettlefilelist from '@/page/kettlefilelist'
import Kettleuitl from '@/page/kettleuitl'
Vue.use(Router)
export default new Router({

  routes: [
    {
      path: '/login',
      // 调度首页
      component: Login,
      meta: {
        keepAlive: false
      }
    }, {
      path: '/register',
      // 注册
      component: Register,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/kettleuitl',
      // 注册
      component: Kettleuitl,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/',
      // 调度首页
      component: Index,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/kettle/file/list',
      // 调度首页
      component: Kettlefilelist,
      meta: {
        keepAlive: true
      }
    },

    {
      // 用户管理
      path: '/user/controller',
      component: UserControl,
      meta: {
        keepAlive: true
      }
    },
    {
      // 分类信息
      path: '/kettle/file/info',
      component: Kettlefilevue,
      meta: {
        keepAlive: true
      }
    },
    {
    // 资源信息
      path: '/krepository',
      component: Repository,
      meta: {
        keepAlive: true
      }
    },
    {
    // 工程信息
      path: '/kettle/job',
      component: KettleJob,
      meta: {
        keepAlive: true
      }
    },
    {
      // 分类信息
      path: '/kettle/job/category',
      component: CateGoryList,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/kettle/job/info',
      component: JobInfo,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/kettle/job/tran',
      component: TranInfo,
      meta: {
        keepAlive: true
      }
    },
    // 日志
    {
      path: '/logdetailinfoshow',
      component: LogDetailInfoShow,
      meta: {
        keepAlive: true
      }
    },

    {
      // 任务列表
      path: '/job/list',
      component: JobList,
      meta: {
        keepAlive: true
      }
    },

    {
      // 定时策略
      path: '/kquartz',
      component: KQuartz,
      meta: {
        keepAlive: true
      }
    },
    {
      // 运行监控
      path: '/job/monitor',
      component: JobMonitor,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/log',
      component: LogDetail,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/message',
      component: Message,
      meta: {
        keepAlive: true
      }
    }
  ]
})
