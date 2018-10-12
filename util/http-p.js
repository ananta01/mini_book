import config from '../config.js';

const tips = {
  1: "错误，网络出现异常！",
  1005: "appkey无效",
  3000: "期刊不存在"
}

class HTTP {
  request({url, method = 'GET', data = {}}) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: config.api_base_url + url,
        header: {
          "content-type": "application/json",
          "appkey": config.appkey
        },
        method: method,
        data: data,
        success: (res) => {
          const code = res.statusCode.toString();
          if (code.startsWith('2')) {
            resolve(res.data)
          } else {
            reject();
            const error_code = res.data.error_code;
            this._show_error(error_code);
          }
        },
        fail: (err) => {
          reject();
          this._show_error(1);
        }
      })

    })
  }

  // 处理请求错误
  _show_error(error_code) {
    if (!error_code) {
      error_code = 1;
    }
    const tip = tips[error_code];
    wx.showToast({
      title: tip ? tip : tips[1],
      icon: 'none',
      duration: 2000
    })
  }
}

export {
  HTTP
};