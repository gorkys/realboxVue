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
      name: 'nav.Home',
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
      name: 'nav.Resource',
      component: (resolve) => require(['@/components/Resource/resource'], resolve)
    },
    {
      path: '/template',
      name: 'nav.Template',
      component: (resolve) => require(['@/components/Template/template'], resolve)
    },
    {
      path: '/generalSet',
      name: 'nav.System',
      component: (resolve) => require(['@/components/SystemSet/generalSet'], resolve)
    },
    //日志管理
    {
      path: '',
      name: 'nav.Log',
      component: App,
      children: [
        {
          path: '/userLog',
          name: 'nav.UserLog',
          component: (resolve) => require(['@/components/Log/userLog'], resolve),
        },
        {
          path: '/operatingLog',
          name: 'nav.SystemLog',
          component: (resolve) => require(['@/components/Log/operatingLog'], resolve),
        },
      ]
    },
    //用户设置
    {
      path: '',
      name: 'nav.User',
      component: App,
      children: [
        {
          path: '/terGroupSet',
          name: 'nav.TerminalSet',
          component: (resolve) => require(['@/components/SystemSet/terGroupSet'], resolve)
        },
        {
          path: '/userSet',
          name: 'nav.UserSet',
          component: (resolve) => require(['@/components/SystemSet/userSet'], resolve)
        },
        {
          path: '/roleSet',
          name: 'nav.RoleSet',
          component: (resolve) => require(['@/components/SystemSet/roleSet'], resolve)
        }
      ]
    },
    //终端管理
    {
      path: '',
      name: 'nav.Terminal',
      component: App,
      children: [
        {
          path: '/terminal',
          name: 'nav.Terminal',
          component: (resolve) =>require(['@/components/Terminal/terminal'], resolve)
        },
        {
          path: '/activeCode',
          name: 'nav.ActiveCode',
          component: (resolve) =>require(['@/components/Terminal/activeCode'], resolve)
        },
      ]
    },
    //节目管理
    {
      path: '',
      name: 'nav.Program',
      component: App,
      children: [
        {
          path: '/programList',
          name: 'nav.ProgramList',
          component: (resolve) =>require(['@/components/Program/programList'], resolve)
        },
        {
          path: '/releaseMng',
          name: 'nav.Release',
          component: (resolve) =>require(['@/components/Program/releaseMng'], resolve)
        },
        {
          path: '/auditList',
          name: 'nav.AuditList',
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
