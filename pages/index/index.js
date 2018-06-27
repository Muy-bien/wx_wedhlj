const utils = require("../../utils/util.js");
const app = getApp();
Page({
  data: {
    tasksData: [],
    pageNo: 1,
    content: false
  },
  onLoad: function (options) {
    this.getTasks("1")
    wx.showNavigationBarLoading();
  },
  onPullDownRefresh: function (event) {
    this.setData({
      tasksData: [],
      pageNo: 1,
      content: false
    })
    this.getTasks("1")
    wx.showNavigationBarLoading();
  },
  getTasks: function (pageNo) {
    var data = {
      pageNo: pageNo,
      pageSize: 15
    }
    utils.http("/testboot/allTask", this.showTasks, data)
  },
  showTasks: function (e) {
    var tasks = JSON.parse(e.tasks);
    if (tasks.length > 0) {
      var NewTasks = [];
      for (let data of tasks) {
        var move = {
          address: data.address.split(",").join(""),
          headPortrait: data.headPortrait,
          name1: data.name1,
          price: data.price,
          require1: data.require1,
          taskType: data.taskType,
          time1: data.time1,
          userName1: data.userName1,
          id: data.id
        }
        NewTasks.push(move);
      }
      var tasksData = this.data.tasksData;
      var thisData = tasksData.concat(NewTasks);
      this.setData({
        tasksData: thisData
      })
    } else {
      this.setData({
        content: true
      })
    }
    wx.hideNavigationBarLoading();
    wx.stopPullDownRefresh();
  },
  onReachBottom: function (event) {
    if (!this.data.content) {
      var this_pageNo = this.data.pageNo + 1
      //加载更多
      this.setData({
        pageNo: this_pageNo
      })
      this.getTasks(this_pageNo)
      wx.showNavigationBarLoading();
    }
  },
  onShareAppMessage: function (res) {
    return {
      title: '婚礼匠',
      path: 'pages/index/index'
    }
  },
  taskDetailsTap:function(event){
    wx.navigateTo({
      url: '/pages/user/Task_details/Task_details?taskid=' + event.currentTarget.dataset.taskid,
    })
  }
})