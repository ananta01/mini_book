import { BookModel } from '../../models/book.js';
import { LikeModel } from '../../models/like.js';

const bookModel = new BookModel();
const likeModel = new LikeModel();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    book: null,
    comments: [],
    likeStatus: false,
    likeCount: 0,
    posting: false
  },

  onLike (ev) {
    const like_or_cancel = ev.detail.behavior;
    likeModel.like(like_or_cancel, this.data.book.id, 400);
  },

  onPostFake () {
    this.setData({
      posting: true
    })
  },

  onCancelPosting () {
    this.setData({
      posting: false
    })
  },

  

  onPostText (ev) {
    const text = ev.detail.text || ev.detail.value;

    if (!text) {
      return;
    }

    if (text.length > 12) {
      wx.showToast({
        title: '短评最多12个字',
        icon: 'none'
      })
      return;
    }

    bookModel.postComment(this.data.book.id, text)
    .then(res => {
      wx.showToast({
        title: '+1',
        icon: 'none'
      });
    });

    this.data.comments.unshift({
      content: text,
      nums: 1
    })

    this.setData({
      comments: this.data.comments,
      posting: false
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading();
    const bid = options.bid;

    const detail = bookModel.getDetail(bid);
    const comments = bookModel.getComments(bid);
    const like = bookModel.getLikeStatus(bid);

    Promise.all([detail, comments, like])
      .then(res => {
        this.setData({
          book: res[0],
          comments: res[1].comments,
          likeStatus: res[2].like_status,
          likeCount: res[2].fav_nums
        })
        wx.hideLoading();
      })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})