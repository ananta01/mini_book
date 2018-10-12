import { HTTP } from '../util/http-p.js';

class SearchModel extends HTTP {
  constructor () {
    super()
    this.key = 'q';
    this.maxLength = 10;
  }

  getHistory () {
    const value = wx.getStorageSync(this.key);
    if (!value) {
      return []
    }
    return value;
  }

  getHot () {
    return this.request({
      url: 'book/hot_keyword'
    })
  }

  setHistory (val) {
    let valueArr = this.getHistory();
    const hasKey = valueArr.includes(val);
    if (!hasKey) {
      if (valueArr.length >= this.maxLength) {
        valueArr.pop()
      }
      valueArr.unshift(val);
      wx.setStorageSync(this.key, valueArr)
    }
  }
}

export { SearchModel }