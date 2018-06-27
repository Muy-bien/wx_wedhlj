const utils = require("../../../utils/util.js");
const app = getApp();
Page({
  data: {
    taskType: ["主持人", "化妆师", "摄像师", "婚礼执行", "道具", "摄影师", "花艺师", "婚礼管家", "舞美"],
    this_taskType: "主持人"
  },
  onLoad: function (options) {
    this.setData({
      userInfo: app.globalData.userInfo
    })
  },
  TaskTypeTap: function (event) {
    var this_tasktype = event.target.dataset.tasktype;
    this.setData({
      this_taskType: this_tasktype
    })
  }
})