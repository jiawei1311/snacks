import axios from 'axios'
// import router from '../router'
import { Toast } from 'vant';

function startLoading(){
  //TODO 加载动画
  Toast.loading({
    mask: true,
    message: '加载中...',
    duration:0
  });
}
function endLoading(){
  // TODO 结束加载动画
  //loading.close()
  Toast.clear();
}

//请求拦截
axios.interceptors.request.use(
  config => {
    startLoading()
    // if(localStorage.token){
    //   //设置统一的请求header
    //   config.headers.Authorization = localStorage.token;
    // }
    return config;
  },
  error => {
    endLoading();
    return Promise.reject(error)
  }
);

// 响应拦截
axios.interceptors.response.use(
  response =>{
    endLoading()
    return response
  },
  error => {
    endLoading()
    //TODO 错误提醒

    // // 获取错误状态码
    // const { status } = error.response;
    // if(status === 401 ){
    //   // token失效
    //   localStorage.removeItem('token')
    //   //跳转到登录页面
    //   // router.push('/login')
    // }

    return Promise.reject(error)
  }
)

export default axios;
