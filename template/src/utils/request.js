// 请求
import axios from 'axios';
import {resInterceptors, reqInterceptors} from './http-interceptors';

let API_BASE = process.env.VUE_APP_API_BASE || '/api';

// 创建axios实例，添加设置
const mAxios = axios.create({
  baseURL: API_BASE,
  headers: {'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest'},
  timeout: 40000
});
// http request 拦截
mAxios.interceptors.request.use(config => {
  return reqInterceptors(config);
}, error => {
  return Promise.reject(error);
});
// http respone 拦截
mAxios.interceptors.response.use(
  response => {
    // 拦截器
    return resInterceptors(response);
  },
  error => {
    switch (error.response && error.response.status) {
      case 403:
        Toast('无权限请求该资源！');
        break;
      case 404:
        Toast('请求地址未找到！');
        break;
      case 405:
        Toast('请求方式错误！');
        break;
      case 429:
        Toast('请求次数过多，请稍后重试！');
        break;
      case 500:
        Toast('服务器错误，请稍后重试');
        break;
      case 502:
        Toast('服务器暂不可用，请稍后重试！');
        break;
      case 503:
        Toast('网关错误！');
        break;
      case 200:
        //xhr.success(JSON.parse(xhr.responseText));
        break;
      case 0:
        // 0可能是网络错误? 可能是连接超时
        if (error.code === 'ECONNABORTED') {
          // 超时
          Toast('请求超时，请稍后重试');
        }  else {
          console.log(error);
          // 其他未知错误，通常为无网络
          Toast('请求资源失败，请检查网络状况，稍后重试');
        }
        break;
      default:
        // 0可能是网络错误? 可能是连接超时
        if (error.code === 'ECONNABORTED') {
          // 超时
          Toast('请求超时，请稍后重试');
        }  else {
          console.log(error);
          // 其他未知错误，通常为无网络
          Toast('请求资源失败，请检查网络状况，稍后重试');
        }
    }
    return Promise.reject(error);
  }
);
export default mAxios;
