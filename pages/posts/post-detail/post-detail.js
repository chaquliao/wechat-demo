var postsData = require('../../../data/posts-data.js')
var app = getApp();
Page({
  data: {
    isPlayingMusic: false
  },

  onLoad: function (options) {
    var globalData = app.globalData;
    var postId = options.id;
    this.setData({
      currentPostId: postId
    });
    var postData = postsData.postList[postId];
    this.setData({
      postData: postData
    });

    var postsCollected = wx.getStorageSync('posts_collected')
    console.log(postsCollected)
    if (postsCollected) {
      var postCollected = postsCollected[postId];
      this.setData({
        collected: postCollected
      })
    } else {
      var postsCollected = {};
      postsCollected[postId] = false;
      wx.setStorageSync("posts_collected", postsCollected)
    }

    if (app.globalData.g_isPlayingMusic && app.globalData.g_currentMusicPostId === this.data.currentPostId){
      this.setData({
        isPlayingMusic:true
      })
    }

    this.setAudioStatus();
  },

  setAudioStatus() {
    var that = this;
    wx.onBackgroundAudioPlay(function () {
      that.setData({
        isPlayingMusic: true
      })
      app.globalData.g_isPlayingMusic = true;
      app.globalData.g_currentMusicPostId = that.data.currentPostId;
    })
    wx.onBackgroundAudioPause(function () {
      that.setData({
        isPlayingMusic: false
      })
      app.globalData.g_isPlayingMusic = false;
      app.globalData.g_currentMusicPostId = null;
    })
    wx.onBackgroundAudioStop(function () {
      that.setData({
        isPlayingMusic: false
      })
      app.globalData.g_isPlayingMusic = false;
    })
  },

  onCollectionTap() {
    // var name = wx.getStorageSync('key');
    // console.log(name)
    var postsCollected = wx.getStorageSync("posts_collected");
    var postCollected = postsCollected[this.data.currentPostId];
    postCollected = !postCollected;
    postsCollected[this.data.currentPostId] = postCollected;
    // wx.setStorageSync("posts_collected", postsCollected);
    // this.setData({
    //   collected: postCollected
    // })
    this.showModal(postsCollected, postCollected);
    // wx.showToast({
    //   title: postCollected?"收藏成功":"取消成功",
    //   duration:1000,
    //   icon:"success"
    // })

    // wx.showModal({
    //   title: '收藏',
    //   content: '是否收藏该文章',
    //   showCancel: true,
    //   cancelText: "不收藏",
    //   confirmText: "收藏"
    // })
  },

  showToast(postCollected) {
    wx.showToast({
      title: postCollected ? "收藏成功" : "取消成功",
      duration: 1000,
      icon: "success"
    })
  },

  showModal(postsCollected, postCollected) {
    var that = this;
    wx.showModal({
      title: postCollected ? '收藏' : '取消收藏',
      content: postCollected ? '是否收藏该文章' : '是否取消收藏',
      showCancel: true,
      cancelText: postCollected ? "不收藏" : "不取消",
      confirmText: postCollected ? "收藏" : "取消收藏",
      success: function (res) {
        if (res.confirm) {
          wx.setStorageSync("posts_collected", postsCollected);
          that.setData({
            collected: postCollected
          })
          that.showToast(postCollected)
        }
      }
    })
  },

  onShareTap() {
    var itemList = ["发送给朋友", "分享到朋友圈", "在Safari中打开", "分享到手机QQ"]
    wx.showActionSheet({
      itemList: itemList,
      itemColor: "#c62f2f",
      success: function (res) {
        wx.showModal({
          title: '用户分享',
          content: `是否${itemList[res.tapIndex]}`,
        })
      }
    })
  },

  onMusicTap(event) {
    var currentPostId = this.data.currentPostId;
     var postData = postsData.postList[currentPostId];
    var isPlayingMusic = this.data.isPlayingMusic;
    if (isPlayingMusic) {
      wx.pauseBackgroundAudio();
      this.setData({
        isPlayingMusic: false
      });
    } else {
      wx.playBackgroundAudio({
        dataUrl: postData.music.dataUrl,
        title: postData.music.title,
        coverImgUrl: postData.music.coverImgUrl
      })
      this.setData({
        isPlayingMusic: true
      });
    }

  }

})