import axios from 'axios'
import { showToast } from 'vant'
import  Common  from '@/assets/js/common.js'
import  Global  from '@/assets/js/global'
import router from '@/router'

const service = axios.create({
  baseURL: process.env.NODE_ENV == 'production' ? window.ipConfigUrl.baseURL : '/',
  timeout: 30 * 1000,
  withCredentials: false
})

const err = error => {
  return Promise.reject(error)
}


// http request 拦截器
service.interceptors.request.use(request => {
 
  let userInfo = Common.getUserInfo();

  request.headers['Pragma'] = 'no-cache';
  request.headers['Cache-Control'] = 'must-revalidate';
  request.headers['Cache-Control'] = 'no-cache';
  request.headers['Cache-Control'] = 'no-store';
  request.headers['Expires'] = 0;
  request.headers['pingtai'] = userInfo.pingtai;
  request.headers['bizhong'] = 'usd';
  request.headers['project-source'] = "yydg";
  request.headers['lang'] = Global.LangTYPE[localStorage.getItem('yydgLanguage')];
  return request;
}, err => {
  return Promise.reject(err);
});

// http response 拦截器
service.interceptors.response.use(response => {

  if(response.data.code == 1) {
    return response.data
  } else {
    showToast(response.data.msg)
    
    throw SyntaxError()
    return
  }

}, error => {

if(error) {
    throw SyntaxError()
    switch (error.response.status) {
    //   case 401:
    //     router.replace({
    //       path: '/login',
    //       query: {redirect: router.currentRoute.fullPath}
    //     });
    }
    return;
  }
  
  return Promise.reject(error.response.data);
});


export default service;
