//import {HTTP} from '../util/http-p.js';
import { HTTP } from '../util/http.js';

class ClassicModel extends HTTP {
  // 获得期刊
  getLatest(callback) {
    this.request({
      url: 'classic/latest',
      method: 'GET',
      success: (res) => {
        callback(res)
        this._setLatestIndex('latestIndex', res.index);
        // 写入缓存
        this._setLatestIndex(this._getKey(res.index), res);
      }
    })
  }

  // 获取每一期
  getClassic(nextOrPrev, index, callback) {
    // 缓存
    let key = nextOrPrev == 'next' ? this._getKey(index + 1) : this._getKey(index - 1);
    let classic = this._getLatestIndex(key);
    if (!classic) {
      this.request({
        url: `classic/${index}/${nextOrPrev}`,
        success: (res) => {
          this._setLatestIndex(this._getKey(res.index), res);
          callback(res)
        }
      })
    } else {
      callback(classic);
    }
  }

  getMyFavor (success) {
    const params = {
      url: 'classic/favor',
      success: success
    }
    this.request(params)
  }

  isFirst(index) {
    return index == '1' ? true : false;
  }

  isLatest(index) {
    let latestIndex = this._getLatestIndex('latestIndex');
    return index == latestIndex ? true : false;
  }

  _setLatestIndex(name, index) {
    wx.setStorageSync(name, index);
  }

  _getLatestIndex(name) {
    return wx.getStorageSync(name);
  }

  _getKey(index) {
    return 'classic' + index;
  }
}

export {ClassicModel}