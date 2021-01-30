//index.js
const app = getApp()

Page({
  data: {
    avatarUrl: '',
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: ''
  },

  onLoad: function () {
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // console.log(res.signature)
              // console.log(res.rawData)
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo
              })
            }
          })
        }
      }
    })
  },

  onLogin: function (e) {
    var self = this
    //1. 调用登录接口获取临时登录code
    wx.login({
      success: res => {
        if (res.code) {
          console.log(res.code)
          let code = res.code;
          //2. 访问登录凭证校验接口获取session_key、openid
          wx.request({
            url: "https://sports.mjktech.com.cn/mp/user/wx46532c9e99063773/login?code=code",
            // url: "https://api.weixin.qq.com/sns/jscode2session",
            data: {
              appid: "wx46532c9e99063773",
              secret: "d6fdc516c3d7ed040908e0e409f72875",
              code: res.code,
              grant_type: "authorization_code"
            },
            method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            header: {
              'content-type': 'application/json'
            }, // 设置请求的 header
            success: function (data) {
              console.log("data", data)
              wx.showToast({
                title: '登录成功',
                icon: 'success',
                duration: 2000                        
              })
             
              var openid=data.data.openid;
              console.log(''+openid);
              if(openid){
                wx.request({
                  url: "https://sports.mjktech.com.cn/mp/user/wx46532c9e99063773/getWxPhone?openId=openId",
                  data: {
                    openId:data.data.openid
                  },
                  method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
                  header: {
                    'content-type': 'application/json'
                  }, // 设置请求的 header
                  success: (res) => {
                    console.log('22222'+JSON.stringify(res))
                    console.log('myhone'+res.data.data);
                    if(res.data.data){
                      wx.redirectTo({
                        url: '/pages/detail/detail',
                      })

                    }else{
                      wx.redirectTo({
                        url: '/pages/index/index',
                      })
                      
                    }
                  
                  }
               
                })
              }

            
             
            },
            fail: function (err) {
              console.log(err);
            }
          })
        }

      }



    })
  }

})