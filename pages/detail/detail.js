// pages/detail/detail.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
     list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
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
                      let phone = res.data.data;                    
                       wx.request({
                        url: "https://sports.mjktech.com.cn/mp/user/wx46532c9e99063773/getCheckingIn?phone=phone",
                        data: {
                          phone:phone
                        },
                        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
                        header: {
                          'content-type': 'application/json'
                        }, // 设置请求的 header
                        success:(res)=>{
                          console.log(res)
                          if(res.data.data==''){
                            wx.showToast({
                              title: '您没有考勤信息',
                              icon: 'success',
                              duration: 2000                        
                            })
                          }
                          that.setData({
                            list:res.data.data
                          })                        
                        }
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
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})