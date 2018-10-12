// components/LikeHeart/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    curLike: {
      type: Boolean,
      value: false
    },
    count: {
      type: Number,
      value: 0
    },
    readOnly: {
      type: Boolean,
      default: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    trueLikeUrl: '../images/likeHeart-1@2x.png',
    falseLikeUrl: '../images/likeHeart@2x.png'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onClickLike () {
      if (this.properties.readOnly != true) {
        let count = this.properties.count;
        let curLike = this.properties.curLike;
        curLike ? count -= 1 : count += 1;
        this.setData({
          count,
          curLike: !curLike
        })
        let behavior = this.properties.curLike ? 'trueLike' : 'falseLike';
        this.triggerEvent('like', { behavior })
      } 
    }
  }
})
