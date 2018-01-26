import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login'
import Index from '@/components/index'
import templateMake from '@/components/Template/templateMake'
import programMack from '@/components/Template/programMack'
import resource from '@/components/Resource/resource'         //资源管理
import userLog from '@/components/Log/userLog'                //系统设置
import operatingLog from '@/components/Log/operatingLog'
import generalSet from '@/components/SystemSet/generalSet'    //系统设置
import departmentSet from '@/components/SystemSet/terGroupSet'
import userSet from '@/components/SystemSet/userSet'
import roleSet from '@/components/SystemSet/roleSet'
import terminal from '@/components/Terminal/terminal'         //终端管理
import activeCode from '@/components/Terminal/activeCode'
import template from '@/components/Template/template'         //模板管理
import play from '@/components/Program/play'          //节目列表
import programList from '@/components/Program/programList'
import auditList from '@/components/Program/auditList'
import release from '@/components/Program/release'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '登录',
      component: Login
    },
    {
      path: '/index',
      name: '首页',
      component: Index
    },
    {
      path: '/templateMake',
      name: '模板制作',
      component: templateMake
    },
    {
      path: '/programMack',
      name: '节目制作',
      component: programMack
    },
    {
      path: '/resource',
      name: '资源管理',
      component: resource
    },
    {
      path: '/userLog',
      name: '用户日志',
      component: userLog
    },
    {
      path: '/operatingLog',
      name: '系统日志',
      component: operatingLog
    },
    {
      path: '/generalSet',
      name: '系统设置',
      component: generalSet
    },
    //用户设置
    {
      path: '/terGroupSet',
      name: '终端设置',
      component: departmentSet
    },
    {
      path: '/userSet',
      name: '用户设置',
      component: userSet
    },
    {
      path: '/roleSet',
      name: '角色设置',
      component: roleSet
    },
    //终端管理
    {
      path: '/terminal',
      name: '终端管理',
      component: terminal
    },
    {
      path: '/activeCode',
      name: '激活码管理',
      component: activeCode
    },
    //
    {
      path: '/template',
      name: '模板管理',
      component: template
    },
    //节目管理
    {
      path: '/play',
      name: '节目列表',
      component: play
    },
    {
      path: '/programList',
      name: '发布管理',
      component: programList
    },
    {
      path: '/auditList',
      name: '审核列表',
      component: auditList
    },
    {
      path: '/release',
      name: '节目发布',
      component: release
    }

  ]
})
