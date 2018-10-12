import { BookModel } from '../../models/book.js';
import { ClassicModel } from '../../models/classic.js';

const bookModel = new BookModel();
const classicModel = new ClassicModel();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    clickMe: true,
    imgUrl: '',
    userName: '',
    bookCount: 0,
    classics: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.userAuthorized();
    this.getBookCount();
    this.getMyFavor();
  },

  userAuthorized () {
    wx.getSetting({
      success: data => {
        if (data.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: res => {
              this.setData({
                imgUrl: res.userInfo['avatarUrl'],
                userName: res.userInfo['nickName'],
                clickMe: false
              })
            }
          })
        }
      }
    })
  },

  getBookCount () {
    bookModel.getMyBookCount()
      .then(res => {
        this.setData({
          bookCount: res.count
        })
      })
  },

  onGetUserInfo (ev) {
    const user = ev.detail.userInfo;
    if (user) {
      this.setData({
        imgUrl: user.avatarUrl,
        userName: user.nickName,
        clickMe: false
      })
    }
  },

  getMyFavor () {
    classicModel.getMyFavor(res => {
      this.setData({
        classics: res
      })
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