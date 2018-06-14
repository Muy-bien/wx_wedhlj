const utils = require("../../../utils/util.js");
const app = getApp();
Page({
  data: {
    taskType: ["主持人", "化妆师", "摄像师", "婚礼执行", "道具", "摄影师", "花艺师", "婚礼管家", "舞美"],
    this_taskType: "主持人",
    thisDate: utils.getNowFormatDate(),
    money: ["500以下", "500-1000元", "1000-1500元", "1500-2000元", "2000-2500元", "2500-3000元", "3000-3500元", "4000以上"],
    region: ["四川省", "成都市", "金牛区"]
  },
  onLoad: function (options) {

  },
  TaskTypeTap: function (event) {
    var this_tasktype = event.target.dataset.tasktype;
    this.setData({
      this_taskType: this_tasktype
    })
  },
  catchDateChange: function (event) {
    this.setData({
      date: event.detail.value,
    })
  },
  catchMoneyChange: function (event) {
    var index = event.detail.value;
    this.setData({
      index: index,
      this_money: this.data.money[index],
    })
  },
  catchRegionChange: function (event) {
    var this_region = event.detail.value;
    this.setData({
      this_region: this_region,
      show_region: this_region.join(","),
    })
  },
  bindHotel_name: function (event) {
    this.setData({
      Hotel_name: event.detail.value
    })
  },
  bindHotel_address: function (event) {
    this.setData({
      Hotel_address: event.detail.value
    })
  },
  bindRequirement: function (event) {
    this.setData({
      Requirement: event.detail.value
    })
  },
  ReleaseTap: function (event) {
    var this_taskType = this.data.this_taskType;//任务类型
    var date = this.data.date;//时间
    var this_money = this.data.this_money;//价格
    var Hotel_name = this.data.Hotel_name;//酒店名称
    var show_region = this.data.show_region;//酒店地址
    var Hotel_address = this.data.Hotel_address;//详细地址
    var Requirement = this.data.Requirement;//要求
    if (!date) {
      this.showToast("请选择时间");
    } else if (!this_money) {
      this.showToast("请选择价格");
    } else if (!Hotel_name) {
      this.showToast("请输入酒店名称");
    } else if (!show_region) {
      this.showToast("请选择酒店地址");
    } else if (!Hotel_address) {
      this.showToast("请输入酒店详情");
    } else if (!Requirement) {
      this.showToast("请输入任务要求");
    } else {
      var data = {
        takeType: this_taskType,
        entranceTime: date,
        takePrice: this_money,
        hotelName: Hotel_name,
        hotelAddress: show_region + "," + Hotel_address,
        takeRequire: Requirement,
        token: "123"
      }
      console.log(data)
      utils.http("/task/addTask", "ReturnRelease", data);
    }
    
  },
  ReturnRelease:function(e){
    console.log(e);
  },
  showToast: function (title) {
    wx.showToast({
      title: title,
      icon: 'none',
      duration: 1000
    })
    return false;
  }
})