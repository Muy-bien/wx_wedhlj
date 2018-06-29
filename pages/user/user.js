const utils = require("../../utils/util.js")
const app = getApp();
Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    if (e.detail.userInfo) {
      app.globalData.userInfo = e.detail.userInfo
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })
    }
    //验证是否创建账户
    var data = {
      openId: app.globalData.openid
    }
    utils.http("/user/openIdExists", this.judge, data)
  },
  judge:function(e){
    //验证是否创建账户
    if(e.status == 20000){
      var data = {
        openId: app.globalData.openid
      }
      utils.http("/user/register", this.register, data)
    }
  },
  register:function(e){
    
  },
  myReleaseTask: function (event) {
    this.navigateTo('user_MyReleaseTask/user_MyReleaseTask');
  },
  ReleaseTask: function (event) {
    this.navigateTo('user_ReleaseTask/user_ReleaseTask');
  },
  navigateTo: function (url) {
    var userInfo = app.globalData.userInfo;
    var openid = app.globalData.openid;
    if (!openid) {
      this.showToast("请先登录微信")
    } else if (!userInfo) {
      this.showToast("请先获取头像昵称")
    } else {
      wx.navigateTo({
        url: url,
      })
    }
  },
  userInfoTap: function () {
    this.navigateTo('upload_userInfo/upload_userInfo')
  },
  showToast: function (title) {
    wx.showToast({
      title: title,
      icon: 'none',
      duration: 1000
    })
  },
  makePhoneCall: function (event) {
    wx.makePhoneCall({
      phoneNumber: "18875235621"
    })
  },
  onShareAppMessage: function (res) {
    return {
      title: '婚礼匠',
      path: 'pages/index/index'
    }
  }
})