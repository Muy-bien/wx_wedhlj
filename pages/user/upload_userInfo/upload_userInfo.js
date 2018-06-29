const utils = require("../../../utils/util.js");
const app = getApp();
Page({
  data: {
    taskType: ["主持人", "化妆师", "摄像师", "婚礼执行", "道具", "摄影师", "花艺师", "婚礼管家", "舞美"],
    this_taskType: "0",
    Sex: [
      { sex: "男", img_on: "/images/user/Man_on.png", img_off: "/images/user/Man_off.png" },
      { sex: "女", img_on: "/images/user/Woman_on.png", img_off: "/images/user/Woman_off.png" }
    ],
    this_sex: 0,
    TenXun_number: 1,
    this_TenXun: "",
    TenXun_Video: [],
    YouKu_number: 1,
    this_YouKu: "",
    YouKu_Video: [],
  },
  onLoad: function (options) {
    var data = {
      //openId: app.globalData.openid
      openId: "o1Bs34zK1CkyI6BXWbm21ws_OM5E"
    }
    console.log(data);
    utils.http("/user/findMyProfile", this.getUserInfo, data)
    this.setData({
      userInfo: app.globalData.userInfo
    })
  },
  getUserInfo: function (e) {
    console.log(e);
    if (e.status == 200) {
      var move = e.myProfile
      console.log()
      this.setData({
        userId: move.id,
        name: move.nickName ? move.nickName : app.globalData.userInfo.nickName,
        this_taskType: move.userType,
        money: move.price,
        phone: move.telephone,
        this_sex: move.gender,
        TenXun_number: JSON.parse(move.tencentVideo).Number,
        TenXun_Video: JSON.parse(move.tencentVideo).video,
        YouKu_number: JSON.parse(move.youkuVideo).Number,
        YouKu_Video: JSON.parse(move.youkuVideo).video,
      })
    }
  },
  TaskTypeTap: function (event) {
    this.setData({
      this_taskType: event.target.dataset.tasktype
    })
  },
  sexTap: function (event) {
    this.setData({
      this_sex: event.target.dataset.sextype
    })
  },
  bindTenXun_video: function (event) {
    // 获取腾讯视频
    this.setData({
      this_TenXun: event.detail.value
    })
  },
  tapTenXun_video: function (event) {
    //添加地址
    var this_TenXun = this.data.this_TenXun;
    if (!this_TenXun) {
      this.showToast("请输入内容")
    } else {
      var TenXun_Video = this.data.TenXun_Video
      var TenXun_number = this.data.TenXun_number
      var modle = {
        id: TenXun_number,
        url: this_TenXun
      }
      TenXun_Video.push(modle)
      this.setData({
        TenXun_Video: TenXun_Video,
        this_TenXun: "",
        TenXun_number: TenXun_number + 1
      })
    }
  },
  tapVideoDelete: function (event) {
    //删除视频
    var id = event.currentTarget.dataset.videoid
    var TenXun_Video = this.data.TenXun_Video
    for (let i = 0; i < TenXun_Video.length; i++) {
      if (id == TenXun_Video[i].id) {
        TenXun_Video.splice(i, 1)
        this.setData({
          TenXun_Video: TenXun_Video
        })
        return false
      }
    }
  },
  bindYouKu_video: function (event) {
    // 获取优酷视频
    this.setData({
      this_YouKu: event.detail.value
    })
  },
  tapYouKu_video: function (event) {
    //添加优酷地址
    var this_YouKu = this.data.this_YouKu;
    if (!this_YouKu) {
      this.showToast("请输入内容")
    } else {
      var YouKu_Video = this.data.YouKu_Video
      var YouKu_number = this.data.YouKu_number
      var modle = {
        id: YouKu_number,
        url: this_YouKu
      }
      YouKu_Video.push(modle)
      this.setData({
        YouKu_Video: YouKu_Video,
        this_YouKu: "",
        YouKu_number: YouKu_number + 1
      })
    }
  },
  tapYouKuVideoDelete: function (event) {
    //删除优酷视频
    var id = event.currentTarget.dataset.videoid
    var YouKu_Video = this.data.YouKu_Video
    for (let i = 0; i < YouKu_Video.length; i++) {
      if (id == YouKu_Video[i].id) {
        YouKu_Video.splice(i, 1)
        this.setData({
          YouKu_Video: YouKu_Video
        })
        return false
      }
    }
  },
  showToast: function (title) {
    //提示
    wx.showToast({
      title: title,
      icon: 'none',
      duration: 1000
    })
  },
  addImgTap: function (event) {
    //添加图片
    wx.chooseImage({
      count: 5, // 默认9
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        //console.log(res)
        // for (let i = 0; i < tempFilePaths.length; i++) {
        //   wx.uploadFile({
        //     url: app.globalData.apiUrl + "/user/updateMyProfile",
        //     filePath: tempFilePaths[i],//图片路径，如tempFilePaths[0]
        //     name: 'newImg',
        //     header: {
        //       "Content-Type": "multipart/form-data"
        //     },
        //     success: function (res) {
        //       console.log(res);
        //     },
        //     fail: function (res) {
        //       console.log(res);
        //     },
        //     complete: function (res) {

        //     }
        //   })
        // }
      }
    })
  },
  ReleaseTap: function (event) {
    //确认修改
    var tencentVideo = {
      video: this.data.TenXun_Video,
      Number: this.data.TenXun_number
    }
    var youkuVideo = {
      video: this.data.YouKu_Video,
      Number: this.data.YouKu_number
    }
    //验证类型
    //从0开始，顺序为展示内容顺序
    var data = {
      id: this.data.userId,
      nickName: this.data.name,
      userType: this.data.this_taskType,
      price: this.data.money,
      gender: this.data.this_sex,
      telephone: this.data.phone,
      tencentVideo: JSON.stringify(tencentVideo),
      youkuVideo: JSON.stringify(youkuVideo),
      headPortrait: app.globalData.userInfo.avatarUrl
    }
    console.log(data);
    utils.http("/user/updateMyProfile", this.ReleaseSuccse, data)
  },
  ReleaseSuccse: function (e) {
    console.log(e)
    if(e.status==200){
      this.showToast("修改成功")
    }else if(e.status == 500){
      this.showToast("修改失败")
    }
    
  },
  nameChange: function (event) {
    this.setData({
      name: event.detail.value
    })
  },
  moneyChange: function (event) {
    this.setData({
      money: event.detail.value
    })
  },
  phoneChange: function (event) {
    this.setData({
      phone: event.detail.value
    })
  }
})