const utils = require("../../../utils/util.js");
const app = getApp();
Page({
  data: {

  },
  onLoad: function (options) {
    this.setData({
      taskId: options.taskid
    })
    var data = {
      Id: options.taskid
    }
    utils.http("/testboot/particularsTask", this.showTaskDetails, data)
    wx.showNavigationBarLoading()
  },
  showTaskDetails: function (e) {
    var tasks = JSON.parse(e.tasks);
    console.log(tasks)
    if (tasks.length > 0) {
      var data = tasks[0];
      var move = {
        address: data.address.split(",").join(""),
        headPortrait: data.headPortrait,
        name1: data.name1,
        price: data.price,
        require1: data.require1,
        taskType: data.taskType,
        time1: data.time1,
        userName1: data.userName1
      }
      this.setData({
        tasksData: move
      })
    }
    wx.hideNavigationBarLoading();
    wx.stopPullDownRefresh();
  },
  onShareAppMessage: function () {
    return {
      title: '任务详情',
      path: '/pages/user/Task_details/Task_details?taskid=' + this.data.taskId
    }
  }
})