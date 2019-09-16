/**
*此方法为小程序拦截器对 请求进行拦截
*/
const  app = getApp();
/**封装请求方法**/
function requestfrom(apiurl, apidata, urltype) {
  if(isEmpty(apiurl)){return false;}
 return new Promise(function (resolve, reject) {
   //填充url
   if (apiurl.indexOf("被填充路由是否存在") == -1) {apiurl = '填充路由'+apiurl;}
   //默认指定请求方式 post
    if (isEmpty(urltype)){ urltype = 'POST';}
    //指定用户下标
   if (isEmpty(apidata.token)) {
     if(isEmpty(app.globalData.token)){
       apidata.token = wx.getStorageSync('token');
     }else{
     apidata.token = app.globalData.token;
      }
  }
    wx.request({
      //后台接口地址
      url: apiurl,
      data: apidata,
      method: urltype,
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      success: function (res) {
          // wx.setStorageSync('token', res.data)
          resolve(res.data);
      }
    })
  })
}


/**主请求方法 重写*/
function requestad(apiurl,apidata,urltype){
  var token = null;
  if(isEmpty(app.globalData.token)){
    token = wx.getStorageSync('token');
  }else{
    token = app.globalData.token;
  }
 return new Promise(function (resolve, reject) {
    /**判断userid*/
  if(isEmpty(token) && isEmpty(apidata.token)){
     customlogin().then(ees=>{
        apidata.token = ees.data;
        requestfrom(apiurl, apidata, urltype).then(values=>{
     if(values.code ==13){
        requestfrom('重新获取信息',{login:1}).then(item=>{
         if (isEmpty(item)) { resolve({code:13,msg:'token获取失败'})
         }else{
          if(!isEmpty(item)){
             wx.setStorageSync('token', item);
             app.globalData.token = item;
             apidata.token = item;
          }
           requestfrom(apiurl, apidata, urltype).then(items=>{resolve(items);})
         }  
        })
     }else if(values.code == 14){
          //token空 重新登录
        customlogin().then(vales=>{apidata.token = vales.data;requestfrom(apiurl, apidata, urltype).then(items => {resolve(items); })})
     }else if(values.code == 15){
        //用户未绑定手机号
     wx.navigateTo({
       url: "注册路由",
     }) 
     }else{//返回数据
      resolve(values)}
  })
     })
  }else{
        /**判断userid*/
    requestfrom(apiurl, apidata, urltype).then(values=>{
     if(values.code ==13){
        requestfrom('更新token接口',{login:1}).then(item=>{
         if (isEmpty(item)) { resolve({code:13,msg:'token获取失败'})
         }else{
           if(!isEmpty(item)){
            wx.setStorageSync('token', item);
            app.globalData.token = item;
            apidata.token = item;
          }
           requestfrom(apiurl, apidata, urltype).then(items=>{resolve(items);})
         }  
        })
     }else if(values.code == 14){
          //token空 重新登录
        customlogin().then(vales=>{apidata.token = vales.data;requestfrom(apiurl, apidata, urltype).then(items => {resolve(items); })})
     }else if(values.code == 15){
        //用户未绑定手机号
     wx.navigateTo({
       url: "注册路由",
     }) 
     }else{//返回数据
      resolve(values)}
  })
  }
 })
}

/**登录方法 */
function customlogin(aurl){
  return new Promise(function (resolve, reject) { 
  wx.getSetting({
    success: function (setting) {
      if (setting.authSetting['scope.userInfo']) { 
        //已授权
        loginuserinfo().then(values => {
          resolve(values)
        });
      }else{
         //登录异常跳转至登录页面授权登录
          wx.navigateTo({
             url: '登录路由',
          })
      }
    }
  })
  })
}
/**登录方法 */
function loginuserinfo(){
  return new Promise(function (resolve, reject) { 
    wx.login({
      success: function (loginRes) {
        if (loginRes.code) {
          wx.getUserInfo({
            withCredentials: true,
            success: function (res_user) {
              requestfrom('登录接口', { code: loginRes.code, encryptedData: res_user.encryptedData, iv: res_user.iv,login:1 }).then(values=>{
               if(values.code !=1){resolve({code:11,msg:'登录失败'});return false; }
                wx.setStorageSync('token', values.data)
                wx.setStorageSync('userinfo', values.userinfo)
                if(!isEmpty(values.data) && !isEmpty(values.userinfo)){
                  app.globalData.token = values.data;
                 app.globalData.userinfo = values.userinfo;
                }
                resolve(values)
              })
             
            }
          })
        }
      }
    })
  });
}
/**判断是否为空 */
function isEmpty(obj) {
  if (typeof obj == "undefined" || obj == null || obj == "") {
    return true;
  } else {
    return false;
  }
}

module.exports = {
  request: requestad,
  customlogin: customlogin,
  isEmpty: isEmpty
}
