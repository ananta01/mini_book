import { SearchModel } from '../../models/keyWord.js';
import { BookModel } from '../../models/book.js';

const searchModel = new SearchModel();
const bookModel = new BookModel();

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    more: {
      type: String,
      observer: '_loadMore'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    historyWord: [],
    hotList: [],
    searchBook: [],
    inputVal: '',
    loadingCenter: false
  },

  attached () {
    searchModel.getHot().then(res => {
        this.setData({
          hotList: res.hot
        })
      });
    this.setData({
      historyWord: searchModel.getHistory()
    })  
  },

  /**
   * 组件的方法列表
   */
  methods: {
    _loadMore: function () {
      console.log(1111);
      if (!this.data.q) {
        return
      }
      let hasMore = this.hasMore()
      if (!hasMore) {
        return
      }
      this.setData({
        loading: true
      })
      http.request({
        url: 'book/search?summary=1',
        data: {
          q: this.data.q,
          start: this.getCurrentStart()
        },
        success: (data) => {
          this.setMoreData(data.books)
          this.setData({
            loading: false
          })
        }
      })
    },

    onCancelSearch() {
      this.triggerEvent('cancelSearch');
    },

    onConfirm (ev) {
      const inputVal = ev.detail.value || ev.detail.text;
      this._showOrHideLoading(true);
      // 获取搜索书籍
      bookModel.searchBook(0, inputVal)
        .then(res => {
          this._showOrHideLoading(false);          
          res = res.books;
          if (res.length) {
            this.setData({
              searchBook: res,
              inputVal
            })
            searchModel.setHistory(inputVal);                      
          } else {
            wx.showToast({
              title: '暂无结果',
              icon: 'none'
            })
            this.setData({
              inputVal: ''
            })
          }
        })
    },

    _showOrHideLoading (bool) {
      this.setData({
        loadingCenter: bool
      })
    },

    clearBooks () {
      this.setData({
        searchBook: [],
        inputVal: ''
      })
    }
  }
})
