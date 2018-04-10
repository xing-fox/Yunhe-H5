export default class WxJSBridge {
  constructor () {
    console.log('微信')
  }
  /* 拍照或从手机相册中选图 */
  chooseImage (params, callback) {
    /* eslint-disable */
    wx.chooseImage({
      count: params.count,
      sizeType: params.sizeType,
      sourceType: params.sourceType,
      success: function (res) {
        callback && callback(res)
      }
    })
    /* eslint-enable */
  }
  /* 预览图片接口 */
  previewImage (params) {
    /* eslint-disable */
    wx.previewImage(params)
    /* eslint-enable */
  }
  /* 上传图片 */
  uploadImage (params, callback) {
    /* eslint-disable */
    wx.uploadImage({
      localId: params.localId,
      isShowProgressTips: 1,
      success: function (res) {
        callback && callback(res)
      }
    })
    /* eslint-enable */
  }
  /* 获取图片base64 */
  getLocalImgData (localId, callback) {
    /* eslint-disable */
    wx.getLocalImgData({
      localId: localId,
      success: function (res) {
        callback && callback(res)
      }
    })
    /* eslint-enable */
  }
  /* 获取地理位置 */
  getLocation (success, fail) {
    /* 将定位信息放入cookie中，设置5秒超时 */
    /* let location = cookie.get('waiqin365-location') */
    /* eslint-disable */
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        alert(JSON.stringify(res))
        let date = new Date()
        date.setTime(date.getTime() + 10 * 1000)
        // cookie.set('waiqin365-location', JSON.stringify(res), {expires: date})
        success && success(res)
      },
      fail: function (res) {
        alert(JSON.stringify(res))
        fail && fail(res)
      }
    })
  }
  /* 监听页面返回事件 */
  onHistoryBack (callback) {
    /* eslint-disable */
    wx.onHistoryBack(function () {
      return callback ? (callback(), !1) : !0
    })
    /* eslint-enable */
  }
  /* 关闭当前窗口 */
  closeWindow () {
    /* eslint-disable */
    wx.closeWindow()
    /* eslint-enable */
  }
  /* 隐藏右上角菜单 */
  hideAllNonBaseMenuItem () {
    /* eslint-disable */
    wx.hideAllNonBaseMenuItem()
    /* eslint-enable */
  }
  /* 退出登录 */
  /*
  logOut () {
    cookie.delete('x-token')
    cookie.delete('refresh-token')
    cookie.delete('JSESSIONID')
  }
  */
  /* 扫描二维码并返回结果 */
  scanQRCode (params, callback) {
    /* eslint-disable */
    wx.scanQRCode({
      desc: params.desc || '二维码／条码',
      needResult: params.needResult || 0, // 默认为0，扫描结果由企业微信处理，1则直接返回扫描结果，
      scanType: ['qrCode', 'barCode'], // 可以指定扫二维码还是一维码，默认二者都有
      success: function (res) {
        callback && callback(res)
      },
      error: function (res) {
        if (res.errMsg.indexOf('function_not_exist') > 0) {
          alert('版本过低请升级！')
        }
      }
    })
    /* eslint-enable */
  }
  setTitle (title) {
    document.title = title || document.title
    if (/ip(hone|od|ad)/i.test(navigator.userAgent)) {
      var i = document.createElement('iframe')
      i.src = '//m.baidu.com/favicon.ico'
      i.style.display = 'none'
      i.onload = function () {
        setTimeout(function () {
          i.remove()
        }, 9)
      }
      document.body.appendChild(i)
    }
  }
}
