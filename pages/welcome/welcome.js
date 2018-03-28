Page({
  tapEnterJourney(){
    // wx.navigateTo({
    //   url: '../posts/post',
    // })

    wx.redirectTo({
      url: '../posts/post',
    })
  },

  onSubTap(event){
    console.log("subTap")
  },

  onUnload(){
  },

  onHide() {    //被隐藏-->navigateTo
    // console.log("onHide")
  }
})