/*
 Created by Gorky on 2018/8/13
*/
import axios from 'axios'
import {Message, MessageBox} from 'element-ui'

// 创建axios实例
const service = axios.create({
  baseURL: window.config.serverURL, // api的base_url
  timeout: 15000 // 请求超时时间
});

// request拦截器
service.interceptors.request.use(config => {
  config.withCredentials = true;  // 让每个请求携带跨域请求时需要使用的凭证
  if (sessionStorage.getItem('token')) {
    config.headers['token'] = sessionStorage.getItem('token');
    config.headers['name'] = sessionStorage.getItem('name')
  }
  return config
}, error => {
  console.log(error);
  Promise.reject(error)
});

// respone拦截器
service.interceptors.response.use(
  response => {
    /**
     * code为非0000是抛错 可结合自己业务进行修改
     */
    const res = response.data;
    if (res.code !== '0000') {
      Message({
        message: res.infor,
        type: 'error',
        showClose: true,
        center: true,
        duration: 5 * 1000
      });

      // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('FedLogOut').then(() => {
            location.reload()// 为了重新实例化vue-router对象 避免bug
          })
        })
      }
      return Promise.reject('error')
    } else {
      return response.data
    }
  },
  error => {
    console.log('err' + error);// for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    });
    return Promise.reject(error)
  }
);

export default service
