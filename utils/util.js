const app = getApp();
//获取当前日期，格式为YYYY-MM-DD
function getNowFormatDate() {
  var date = new Date();
  var seperator1 = "-";
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var strDate = date.getDate();
  if (month >= 1 && month <= 9) {
    month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = "0" + strDate;
  }
  var currentdate = year + seperator1 + month + seperator1 + strDate;
  return currentdate;
}
//访问服务器
function http(url, callback, data) {
  wx.request({
    url: app.globalData.apiUrl + url,
    data: data,
    method: "POST",
    header: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    dataType: "json",
    success: function (res) {
      callback(res.data)
    },
    fail: function () {

    },
    complete: function () {

    }
  })
}

module.exports = {
  getNowFormatDate: getNowFormatDate,
  http: http
}