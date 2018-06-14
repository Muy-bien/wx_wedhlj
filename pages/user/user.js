Page({
  data: {
  
  },
  onLoad: function (options) {
  
  },
  myReleaseTask:function(event){
    wx.navigateTo({
      url: 'user_MyReleaseTask/user_MyReleaseTask',
    })
  },
  ReleaseTask: function (event) {
    wx.navigateTo({
      url: 'user_ReleaseTask/user_ReleaseTask',
    })
  }
})