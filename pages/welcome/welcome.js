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

  onUnload(){  //被关闭或者卸载-->redirectTo
    // console.log("onUnload")
  },

  onHide() {    //被隐藏-->navigateTo
    // console.log("onHide")
  }
})