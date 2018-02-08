import Vue from 'vue'
import Router from 'vue-router'
import App from '@/App'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '登录',
      component: (resolve) => require(['@/components/login'], resolve)
    },
    {
      path: '/index',
      name: '首页',
      component: (resolve) => require(['@/components/index'], resolve)
    },
    {
      path: '/templateMake',
      name: '模板制作',
      component: (resolve) => require(['@/components/Template/templateMake'], resolve)
    },
    {
      path: '/programMack',
      name: '节目制作',
      component: (resolve) => require(['@/components/Template/programMack'], resolve)
    },
    {
      path: '/resource',
      name: '资源管理',
      component: (resolve) => require(['@/components/Resource/resource'], resolve)
    },
    {
      path: '/template',
      name: '模板管理',
      component: (resolve) => require(['@/components/Template/template'], resolve)
    },
    {
      path: '/generalSet',
      name: '系统设置',
      component: (resolve) => require(['@/components/SystemSet/generalSet'], resolve)
    },
    //日志管理
    {
      path: '',
      name: '日志管理',
      component: App,
      children: [
        {
          path: '/userLog',
          name: '用户日志',
          component: (resolve) => require(['@/components/Log/userLog'], resolve),
        },
        {
          path: '/operatingLog',
          name: '系统日志',
          component: (resolve) => require(['@/components/Log/operatingLog'], resolve),
        },
      ]
    },
    //用户设置
    {
      path: '',
      name: '用户设置',
      component: App,
      children: [
        {
          path: '/terGroupSet',
          name: '终端设置',
          component: (resolve) => require(['@/components/SystemSet/terGroupSet'], resolve)
        },
        {
          path: '/userSet',
          name: '用户设置',
          component: (resolve) => require(['@/components/SystemSet/userSet'], resolve)
        },
        {
          path: '/roleSet',
          name: '角色设置',
          component: (resolve) => require(['@/components/SystemSet/roleSet'], resolve)
        }
      ]
    },
    //终端管理
    {
      path: '',
      name: '终端管理',
      component: App,
      children: [
        {
          path: '/terminal',
          name: '终端管理',
          component: (resolve) =>require(['@/components/Terminal/terminal'], resolve)
        },
        {
          path: '/activeCode',
          name: '激活码管理',
          component: (resolve) =>require(['@/components/Terminal/activeCode'], resolve)
        },
      ]
    },
    //节目管理
    {
      path: '',
      name: '节目管理',
      component: App,
      children: [
        {
          path: '/programList',
          name: '节目列表',
          component: (resolve) =>require(['@/components/Program/programList'], resolve)
        },
        {
          path: '/releaseMng',
          name: '发布管理',
          component: (resolve) =>require(['@/components/Program/releaseMng'], resolve)
        },
        {
          path: '/auditList',
          name: '审核列表',
          component: (resolve) =>require(['@/components/Program/auditList'], resolve)
        },
        {
          path: '/release',
          name: '节目发布',
          component: (resolve) =>require(['@/components/Program/release'], resolve)
        }
      ]
    }
  ]
})
