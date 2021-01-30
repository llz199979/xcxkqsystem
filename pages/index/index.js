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

  onLoad: function() {
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
  formSubmit: function (e) {
      var self=this
      //1. 调用登录接口获取临时登录code
      wx.login({
        success: res => {
          if(res.code){
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
                if(data.statusCode==200){
                    //3. 解密           
                    var result=JSON.stringify(e.detail.value);
                    console.log('res'+JSON.parse(result));

                    var newPhone=JSON.parse(result).phone;
                   
                  var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
                  if (newPhone == 0) {
                    wx.showToast({
                      title: '手机号不能为空',
                      icon: 'none',
                      duration: 1500
                    })
                    return false;
                  } else if (newPhone.length < 11) {
                    wx.showToast({
                      title: '手机号长度有误！',
                      icon: 'none',
                      duration: 1500
                    })
                    return false;
                  } else if (!myreg.test(newPhone)) {
                    wx.showToast({
                      title: '手机号有误！',
                      icon: 'none',
                      duration: 1500
                    })
                    return false;
                  } else {
                    wx.showToast({
                      title: '绑定成功',
                      icon: 'success',
                      duration: 1500
                    })
                  }

                  wx.request({
                    url: "https://sports.mjktech.com.cn/mp/user/wx46532c9e99063773/addApplets",
                    data: {
                      openId:data.data.openid,
                      phone:newPhone
                    },
                    method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
                    header: {
                      'content-type': 'application/x-www-form-urlencoded'
                    }, // 设置请求的 header
                    success: (res) => {
                    if(res.error){
                      wx.showToast({
                        title: res.phone.msg,
                        icon: 'none',
                        duration: 2000
                      })
                      }else{
                        wx.showToast({
                          title: '绑定成功',
                          icon: 'success',
                          duration: 2000                        
                        })
                        wx.redirectTo({
                          url: '/pages/detail/detail'                          
                        })
                      }
                    },          
                    fail: function (err) {
                      console.log(err);                   
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
