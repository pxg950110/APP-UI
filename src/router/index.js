import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Logfile from '@/components/log/Logfile'
import Kettle1 from '@/components/kettle/kettle1'
import SystemDict from '@/components/systemconfig/systemdict'
import KettleRepository from '@/components/kettle/kettleRepository'
import KettleEmial from '@/components/email/kettleEmail'
// eslint-disable-next-line no-unused-vars
import Kettle2 from '@/components/kettle/kettle2'
import AppMenu from '@/components/AppMenu'
import Index from '@/components/index'
import Kettlefilevue from '@/components/file/kettlefilevue'
import kettlefilelist from '@/components/file/kettlefilelist'
Vue.use(Router)
export const menuMap = [

  {
    path: '/',
    name: 'AppMenu',
    component: AppMenu,
    meta: {title: '首页', icon: 'el-icon-s-home'},
    children: [
      {
        path: '/',
        name: 'index',
        component: Index,
        meta: {title: '首页', icon: 'el-icon-s-home'}
      }
    ]
  },
  {
    path: '/',
    name: 'AppMenu',
    component: AppMenu,
    meta: {title: '文件管理', icon: 'el-icon-film'},
    children: [
      {
        path: 'filelist',
        name: 'filelist',
        component: kettlefilelist,
        meta: {title: '文件列表', icon: 'el-icon-document'}
      },
      {
        path: 'fileedit',
        name: 'fileedit',
        component: Kettlefilevue,
        meta: {title: '文件编辑', icon: 'el-icon-edit-outline'}
      }
    ]
  },
  {
    path: '/',
    name: 'AppMenu',
    component: AppMenu,
    meta: {title: '资源管理', icon: 'el-icon-menu'},
    children: [
      {
        path: 'aaa',
        name: 'aaa',
        component: Kettle1,
        meta: {title: '测试1', icon: 'el-icon-menu'}
      },
      {
        path: 'bbb',
        name: 'bbb',
        component: Kettle2,
        meta: {title: '测试2', icon: 'el-icon-menu'}
      },
      {
        path: 'kettlerepositorylist',
        name: 'bbb',
        component: KettleRepository,
        meta: {title: '资源配置', icon: 'el-icon-menu'}
      }
    ]
  },
  {
    path: '/',
    name: 'AppMenu',
    component: AppMenu,
    meta: {title: '定时管理', icon: 'el-icon-user'},
    children: [
      {
        path: 'filelist2',
        name: 'filelist',
        component: Home,
        meta: {title: '文件列表', icon: 'el-icon-document'}
      },
      {
        path: 'fileedit',
        name: 'fileedit',
        component: Kettlefilevue,
        meta: {title: '文件编辑', icon: 'el-icon-edit-outline'}
      }
    ]
  },
  {
    path: '/',
    name: 'AppMenu',
    component: AppMenu,
    meta: {title: '用户管理', icon: 'el-icon-user'},
    children: [
      {
        path: 'filelist2',
        name: 'filelist',
        component: Home,
        meta: {title: '文件列表', icon: 'el-icon-document'}
      },
      {
        path: 'fileedit',
        name: 'fileedit',
        component: Kettlefilevue,
        meta: {title: '文件编辑', icon: 'el-icon-edit-outline'}
      }
    ]
  },
  {
    path: '/',
    name: 'AppMenu',
    component: AppMenu,
    meta: {title: '日志管理', icon: 'el-icon-s-platform'},
    children: [
      {
        path: 'logfile',
        name: 'logfile',
        component: Logfile,
        meta: {title: '日志列表', icon: 'el-icon-s-platform'}
      },
      {
        path: 'fileedit',
        name: 'fileedit',
        component: Kettlefilevue,
        meta: {title: '文件编辑', icon: 'el-icon-edit-outline'}
      }
    ]
  },
  {
    path: '/',
    name: 'AppMenu',
    component: AppMenu,
    meta: {title: '邮件管理', icon: 'el-icon-user'},
    children: [
      {
        path: 'emailsetting',
        name: 'KettleEmial',
        component: KettleEmial,
        meta: {title: '邮箱配置', icon: 'el-icon-document'}
      },
      {
        path: 'fileedit',
        name: 'fileedit',
        component: Kettlefilevue,
        meta: {title: '文件编辑', icon: 'el-icon-edit-outline'}
      }
    ]
  },
  {
    path: '/',
    name: 'AppMenu',
    component: AppMenu,
    meta: {title: '视图配置', icon: 'el-icon-user'},
    children: [
      {
        path: 'filelist2',
        name: 'filelist',
        component: Home,
        meta: {title: '文件列表', icon: 'el-icon-document'}
      },
      {
        path: 'fileedit',
        name: 'fileedit',
        component: Kettlefilevue,
        meta: {title: '文件编辑', icon: 'el-icon-edit-outline'}
      }
    ]
  },
  // {
  //   path: '/',
  //   name: 'AppMenu',
  //   component: AppMenu,
  //   meta: {title: '组件开发', icon: 'el-icon-user'},
  //   children: [
  //     {
  //       path: 'filelist2',
  //       name: 'filelist',
  //       component: Home,
  //       meta: {title: '文件列表', icon: 'el-icon-document'}
  //     },
  //     {
  //       path: 'fileedit',
  //       name: 'fileedit',
  //       component: Kettlefilevue,
  //       meta: {title: '文件编辑', icon: 'el-icon-edit-outline'}
  //     }
  //   ]
  // },
  {
    path: '/',
    name: 'AppMenu',
    component: AppMenu,
    meta: {title: '系统配置', icon: 'el-icon-s-tools'},
    children: [
      {
        path: '/systemdict',
        name: 'systemdict',
        component: SystemDict,
        meta: {title: '系统配置', icon: 'el-icon-s-tools'}
      }
    ]
  }
]
export default new Router({
  routes: menuMap
})
