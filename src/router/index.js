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
import departmentSet from '@/components/SystemSet/departmentSet'
import userSet from '@/components/SystemSet/userSet'
import roleSet from '@/components/SystemSet/roleSet'
import terminal from '@/components/Terminal/terminal'         //终端管理
import activeCode from '@/components/Terminal/activeCode'
import template from '@/components/Template/template'         //模板管理
import playList from '@/components/Program/playList'          //节目列表
import programList from '@/components/Program/programList'
import auditList from '@/components/Program/auditList'
import release from '@/components/Program/release'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/index',
      name: 'Index',
      component: Index
    },
    {
      path: '/templateMake',
      name: 'TemplateMake',
      component: templateMake
    },
    {
      path: '/programMack',
      name: 'ProgramMack',
      component: programMack
    },
    {
      path: '/resource',
      name: 'Resource',
      component: resource
    },
    {
      path: '/userLog',
      name: 'UserLog',
      component: userLog
    },
    {
      path: '/operatingLog',
      name: 'OperatingLog',
      component: operatingLog
    },
    {
      path: '/generalSet',
      name: 'GeneralSet',
      component: generalSet
    },
    {
      path: '/departmentSet',
      name: 'DepartmentSet',
      component: departmentSet
    },
    {
      path: '/userSet',
      name: 'UserSet',
      component: userSet
    },
    {
      path: '/roleSet',
      name: 'RoleSet',
      component: roleSet
    },
    {
      path: '/terminal',
      name: 'Terminal',
      component: terminal
    },
    {
      path: '/activeCode',
      name: 'ActiveCode',
      component: activeCode
    },
    {
      path: '/template',
      name: 'Template',
      component: template
    },
    {
      path: '/playList',
      name: 'PlayList',
      component: playList
    },
    {
      path: '/programList',
      name: 'ProgramList',
      component: programList
    },
    {
      path: '/auditList',
      name: 'AuditList',
      component: auditList
    },
    {
      path: '/release',
      name: 'Release',
      component: release
    }

  ]
})
