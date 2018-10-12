import {ClassicModel} from '../../models/classic.js';
import {LikeModel} from '../../models/like.js';

let classicModel = new ClassicModel();
let likeModel = new LikeModel();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    classicData: null,
    latest: true,
    first: false,
    likeCount: 0,
    likeStatus: false    
  },

  onClickLike (ev) {
    let like_or_cancel = ev.detail.behavior;
    let id = this.data.classicData.id;
    let type = this.data.classicData.type;
    // 提交点赞
    likeModel.like(like_or_cancel, id, type);
  },

  onNext () {
    this._updataClassic('next');
  },

  onPrev () {
    this._updataClassic('previous');
  },

  _updataClassic (nextOrPrev) {
    let index = this.data.classicData.index;
    classicModel.getClassic(nextOrPrev, index, (res) => {
      this.getLikeStatus(res.id, res.type);
      this.setData({
        classicData: res,
        latest: classicModel.isLatest(res.index),
        first: classicModel.isFirst(res.index)
      })
    })
  },

  getLikeStatus (id, type) {
    likeModel.getClassicLikeStatus(id, type, (res) => {
      this.setData({
        likeStatus: res.like_status,
        likeCount: res.fav_nums
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */ 
  onLoad: function (options) {
    // 获取期刊信息
    classicModel.getLatest((res) => {
      this.setData({
        classicData: res,
        likeCount: res.fav_nums,
        likeStatus: res.like_status
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