import config from '../config.js';

const tips = {
  1: "错误，网络出现异常！",
  1005: "appkey无效",
  3000: "期刊不存在"
}

class HTTP {
  request (params) {
    wx.request({
      url: config.api_base_url + params.url,
      header: {
        "content-type": "application/json",
        "appkey": config.appkey
      },
      method: params.method,
      data: params.data,
      success: (res) => {
        let code = res.statusCode.toString();
        if (code.startsWith('2')) {
          params.success && params.success(res.data)
        } else {
          let error_code = res.data.error_code;
          this._show_error(error_code);
        }
      },
      fail: (err) => {
        this._show_error(1);
      }
    })
  }

// 处理请求错误
  _show_error (error_code) {
    if (!error_code) {
      error_code = 1;
    }
    wx.showToast({
      title: tips[error_code],
      icon: 'none',
      duration: 2000
    })
  }
}

export {HTTP};