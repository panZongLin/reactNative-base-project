/**
 * 
 * 请求统一配置
 */
import axios from 'axios';

axios.defaults.timeout = 5000;
axios.defaults.withCredentials = true; // 跨域请求，允许保存cookie

let baseUrl = '';
function options (url, payload) {
    return {
        url: url,
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        data: JSON.stringify({...payload}) 
    }
}

export default function request(params) {
    return axios(params)
        .then(checkStatus)
        .then(checkCode)
        .catch(err => {
            // TODO: 报错
            handleError(err)
        })
}

//检查返回状态
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    //...
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

//对返回的data中的code处理
function checkCode(response) {
    console.log(response)
    //...
    return response.data;
}

//处理请求中抛出的错误
function handleError(error) {
    console.log(error)
    //...
}

// 请求拦截
axios.interceptors.request.use(config => {
    //...
    return config
}, error => {
    return Promise.reject(error)
})

// 响应拦截
axios.interceptors.response.use(res => {
    return res
}, error => {
    return error
})