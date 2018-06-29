App({
  globalData: {
    apiUrl: "http://172.16.14.16:8080/",
    userInfo: null,
    openid:""
  },
  onLaunch: function () {
    // 登录
    wx.login({
      success: res => {
        var that = this;
        //发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.request({
          //获取openid接口  
          url: 'https://api.weixin.qq.com/sns/jscode2session',
          data: {
            appid: "wx2c70c6bdcb67fe4e",
            secret: "b9b1d8c3a49e601ff4d640d0732f67fd",
            js_code: res.code,
            grant_type: 'authorization_code'
          },
          method: 'GET',
          success: function (res) {
            that.globalData.openid = res.data.openid
          }
        })
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              //console.log(res);
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  }
})