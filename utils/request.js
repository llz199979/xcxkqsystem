const app = getApp();
export function request(config){
// 解构赋值
let{
  url = '',
  data = {},
  method = 'POST',
  token = ""
} = { ...config }
return new Promise((resolve,reject)=>{
  wx.request({
    url:port + url,
    method:method,
    data: {...data},
    header : {
      'content-type':'application/json',
      'token':token
    },
    success:(res)=>{
      resolve(res.data)
      if(res.data.code==-2){
        wx.showToast({
          title: '登录状态过期，请重新登录',
          icon:"none"
        });
        wx.removeStorage('openId')
        setTimeout(() => {
          wx.reLaunch({ url: '/pages/index/index'})
        },1000)
      }
    },
    fail:(err)=>{
      reject(err)
    }
  })
})
}