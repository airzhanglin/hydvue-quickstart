/*
* HTTP响应拦截
* 1、在此处理公共的异常状态，如登录失效、权限不足等
* */
export function resInterceptors(response) {
  if (!response.data) {
    return response;
  }
  return response.data;
}

export function reqInterceptors(config) {
  return config;
}
