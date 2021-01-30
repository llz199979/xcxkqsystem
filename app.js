App({
  onLaunch:function(){
  //   var that=this;
    
  //   //进入页面获取是否授权----------------------------
  //   wx.getSetting({
  //     success(res) {//authSetting用户授权结果
  //       console.log(res.authSetting);
  //       //scope.userInfo
  //       if (res.authSetting['scope.userInfo']) {//授权过
  //         console.log('授权过信息');
  //         // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
  //         wx.getUserInfo({
  //           success: function (res) {
  //             console.log(res.userInfo);
  //             //存储到本地
  //             that.globalData.userInfo = res.userInfo;
             
  //             // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
  //             // 所以此处加入 callback 以防止这种情况
  //             if (that.userInfoReadyCallback) {
  //               that.userInfoReadyCallback(res)
  //             }
  //           }
  //         })
  //       } else {
  //         console.log('没有授权')
  //       }
  //     }
  //   })
  //   wx.showModal({
  //     title: '是否允许授权获取你的信息',
  //     content: '',
  //   })
  },
  // globalData: {
  //   cityInfo: '',
  //   userInfo:null,
  // }
})