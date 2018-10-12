import {classicBeh} from '../classic-beh.js';

let xBm = wx.getBackgroundAudioManager();
Component({
  /**
   * 组件的属性列表
   */
  behaviors: [classicBeh],
  properties: {
   src: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    playSrc: '../../images/player@waitting.png',
    pauseSrc: '../../images/player@playing.png',
    playing: false
  },

  attached () {
    this._getPlaying();
    this._monitorSwitch();
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onPlay () {
      // 图片切换
      if (!this.data.playing) {
        xBm.src = this.properties.src
      } else {
        xBm.pause()
      }
      this.setData({
        playing: !this.data.playing
      })
    },

    // 切换期刊图标问题
    _getPlaying () {
      if (xBm.paused) {
        this.setData({
          playing: false
        })
      } else if (xBm.src == this.properties.src) {
        this.setData({
          playing: true
        })
      }
    },

    _monitorSwitch () {
      xBm.onPlay(() => {
        this._getPlaying()
      })
      xBm.onPause(() => {
        this._getPlaying()
      })
      xBm.onStop(() => {
        this._getPlaying()
      })
      xBm.onEnded(() => {
        this._getPlaying()
      })
    }
  }
})
