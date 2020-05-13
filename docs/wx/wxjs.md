小程序拦截器

```js
const  app = getApp();
var  errrorNum = 1;//异常重试次数
/**封装请求方法**/
 function requestfrom(apiurl, apidata, urltype) {
  if(isEmpty(apiurl)){return false;}
   //填充url
   if (apiurl.indexOf("http://192.168.1.51:1702/") == -1) { apiurl = 'http://192.168.1.51:1702/'+apiurl;}
   //默认指定请求方式 post
    if (isEmpty(urltype)){ urltype = 'POST';}
  return new Promise(function (resolve, reject) {
    wx.request({
      //后台接口地址
      url: apiurl,
      data: apidata,
      method: urltype,
      header: {
        'content-type': 'application/json',
        'Accept': 'application/json',
        'moaitoken': gettoken()
      },
      success: function (res) {
        if(res.statusCode != 200){ 
          // navigate("/pages/index_first/index_first");
          return resolve(false);
        }else{
          return resolve(res.data);
        }
      },
      fail:function(rese){
        // navigate("/pages/index_first/index_first");
        return resolve(rese);
      },
      complete:function(){
        wx.hideLoading()
      }
    })
  })
}

/**主请求方法同步方法*/
async function requestad(apiurl, apidata, urltype) {
 let resData = await requestfrom(apiurl, apidata, urltype);
 if(resData.code > 0){ return resData; } 
 //判断是否存在token
 if(resData.code == -1 || resData.code == -2 || resData.code == -3 ||  resData.code == -4 || resData.code == -7){
    // 自动登录
    customlogin();
    //重新发起请求
    resData = await requestfrom(apiurl, apidata, urltype);
    if(resData.code > 0){ return resData; } 
 }
//判断token 过期
 if(resData.code == -6){
  //延期token
      getnewtoken()
  //重新发起请求
      resData = await requestfrom(apiurl, apidata, urltype);
    if(resData.code > 0){ return resData; } 
  }
  //判断是否绑定手机号
   if(resData.code == -8){
      //跳转到绑定页
      navigate("/pages/index/register/register");
   }
   //未知异常
   return resData;
}

/**延期token方法*/
async function getnewtoken(){
    let  reqdata = {};
   if(isEmpty(app.globalData.moaid)){
       reqdata.token = wx.getStorageSync('token ]');
     }else{
       reqdata.token = app.globalData.moaid;
      }
   let newtoken = await requestfrom('token延期地址',reqdata);
   if(newtoken > 0){
       wx.setStorage({key:'token',data:newtoken.data});
       app.globalData.moaid = userinfo.data;
   }else{ 
     customlogin();
   }
}

/**微信自带lognin方法再封装 */
async function customlogin(qdata = null){
    if(isEmpty(qdata)){
      //判断是否授权
      qdata = await getauthSetting();
      if(qdata == false){
        //跳转到授权
        navigate('/pages/index/login/login');
        return;
        }
    }
    let reqdata = {} 
    reqdata.iv = qdata.iv;
    reqdata.encryptedData = qdata.encryptedData;
    if(isEmpty(app.globalData.macno)){
       reqdata.macno = wx.getStorageSync('token'); 
    }else{
      reqdata.macno = app.globalData.macno;
    }
    reqdata.code = await getcode();
    //获取 iv encryptedData
     if(isEmpty(reqdata.iv) || isEmpty(reqdata.encryptedData)){
      let useriv = await getUserInfoe(); 
      reqdata.iv  = useriv.iv;
      reqdata.encryptedData = useriv.encryptedData
    }
    
    /**返回请求**/
   let  userinfo =  await  requestfrom('注册登录请求地址',reqdata);
   if(!userinfo || userinfo.code < 1){ 
      reqdata.code = await getcode();
      let useriv = await getUserInfoe(); 
      reqdata.iv  = useriv.iv;
      reqdata.encryptedData = useriv.encryptedData;
       userinfo =  await  requestfrom('注册登录请求地址',reqdata);   
       if(!userinfo) return false;  
    }
  if (userinfo.code < 1) { navigate('/pages/index/login/login'); }
   wx.setStorage({key:'token',data:userinfo.data});
   app.globalData.moaid = userinfo.data;
   //获取用户信息
  reqdata = { token: userinfo.data};
  userinfo = await requestfrom('用户信息接口地址', reqdata); 
   if(userinfo.code == 200){ userinfo = userinfo.data;}
   wx.setStorage({ key: 'phonestatus', data: userinfo.phonestatus });
   app.globalData.userinfo = userinfo
   wx.setStorage({key:'userinfo',data:userinfo});
   return userinfo; 
}
/**已授权的微信用户获取iv方法**/
function getUserInfoe(){
  return new Promise(function (resolve, reject) { 
    wx.getUserInfo({
       withCredentials: true,
        success: function (res_user) {
              let resdata = { 
                encryptedData: res_user.encryptedData, 
                iv: res_user.iv
                }
                //返回结果
              resolve(resdata);
        }
    })
  })
}
/*****获取需要授权的code******/
function getcode(){
  return new Promise(function (resolve, reject) { 
  wx.login({
      success: function (loginRes) {
        resolve(loginRes.code);
      }
  })
 })
}
//判断是否授权；
function getauthSetting(){
  return new Promise(function (resolve, reject) { 
      wx.getSetting({
       success: function (setting) {
        if (setting.authSetting['scope.userInfo']) { 
              resolve(true);
          }else{
            resolve(false);
          }
        }
      })
 })
}

/**判断是否为空 */
function isEmpty(obj) {
  if (typeof obj == "undefined" || obj == null || obj == "") {
    return true;
  } else {
    return false;
  }
}
//获取当前时间戳
function timestampe(){
    return  parseInt(new Date().getTime());
}
/**获取url参数 */
function getUrlParam(obj) {
  var timestamp = timestampe()
  var macno_times = 0;
  var macno = '';
  if(isEmpty(app.globalData.macno_time)){
     macno_times = isEmpty(wx.getStorageSync('time'))?0:wx.getStorageSync('time');
  }else{
    macno_times =  app.globalData.macno_time;
  }
   var chatime = timestamp- macno_times;
    if ( chatime > (1000*60*60)){
      wx.clearStorage('macno');
      wx.clearStorage('time');
      app.globalData.macno_time = 0;
      app.globalData.macno = '';
  }
  
  if(isEmpty(obj)){
    if(isEmpty(app.globalData.macno)){
       return wx.getStorageSync('macno'); 
    }else{
      return app.globalData.macno;
    }
  }
  var reg = new RegExp('(^|&)macno=([^&]*)(&|$)');
  /**重新逻辑*/
  if (typeof (obj) == 'object'){
    obj = isEmpty(obj.q)?obj.macno:obj.q;
    if(isEmpty(obj)){ return false;}
    if(isNaN(obj)){
      if(obj.indexOf("%") != -1){ obj = decodeURIComponent(obj); }
     if (obj.indexOf('?') > 0) { obj = obj.slice(obj.indexOf('?') + 1);}
           obj = obj.match(reg);
         if (!isEmpty(obj[2])) { macno = unescape(obj[2]); }

    }else{
      macno = obj;
    }
  }else if(!isNaN(obj)){
   macno = obj;
  }else if(obj.indexOf("http") != -1){
     if(obj.indexOf("%") != -1){ obj = decodeURIComponent(obj); }
     if (obj.indexOf("?") > 0) { obj = obj.slice(obj.indexOf('?') + 1); }
     obj = obj.match(reg);
     if(!isEmpty(obj[2])){ macno = unescape(obj[2]);}
  }else{
    if(isEmpty(app.globalData.macno)){
       return wx.getStorageSync('macno'); 
    }else{
      return app.globalData.macno;
    }
  }
  wx.setStorage({key:'macno',data:macno})
  wx.setStorage({key:'macno_time',data:timestamp})
  if(!isEmpty(macno)){
    app.globalData.macno = macno;
    app.globalData.macno_time = timestamp;
  }
  return macno;
}
//封装跳转公共的跳转方法
function navigate(navurl){
   wx.reLaunch({
     url: navurl,
  })
}
//有赞跳转
function youzan_navigate(customUrl = ''){  
  if(!app.globalData.lock){ return false;}else{
    app.globalData.lock = false;
  }
   requestad('youzan/user_info',{}).then(a =>{
    app.globalData.lock = true;
    if(isEmpty(customUrl)){//支持自定义路由
      customUrl = 'pages/home/dashboard/index';
    }
         wx.navigateToMiniProgram({
      appId: 'appid',
           path: customUrl,
      success(res) {
    // 打开成功
      }
    })
   })   
}
/**获取当前url type 1:查询当前 2:存储,3:查询写入页面url,4查询写入页面参数,5删除 */
function getCurrentPageUrlWithArgs(type = 1, datas = '') {
  var pages = getCurrentPages() //获取加载的页面 
  var currentPage = pages[pages.length - 1] //获取当前页面的对象 
  var url = currentPage.route //当前页面url 
  var options = currentPage.options //如果要获取url中所带的参数可以查看options
  //拼接url的参数 
  var urlWithArgs = url + '?'
  for (var key in options) {
    var value = options[key]
    urlWithArgs += key + '=' + value + '&'
  }
  urlWithArgs = urlWithArgs.substring(0, urlWithArgs.length - 1)
  if(type == 1){
    return urlWithArgs;
  }
  if (type == 5) {
    app.globalData.skipurl = null;
    wx.clearStorage('skipurl'); 
  }
  var skipurl = {
    url: urlWithArgs,
    time: timestampe()
  }
  if (!isEmpty(datas)) { skipurl.data = datas; }
  var urldata = wx.getStorageSync('skipurl');
  if(isEmpty(urldata)){
    urldata = app.globalData.skipurl;
  }
  if (!isEmpty(urldata)) {
    urldata = JSON.parse(urldata);
    //超过一分钟删除
    if ((timestampe() - urldata.time) > 600000) {
      app.globalData.skipurl = null;
       wx.clearStorage('skipurl'); 
       } else {
      if (type == 3) { //返回跳转的url
        return urldata.url;
      } else if (type == 2) { //返回参数
        app.globalData.skipurl = JSON.stringify(skipurl);
        wx.setStorageSync('skipurl',JSON.stringify(skipurl));
      }else if(type == 4){ //返回参数
        return urldata.data;
      }
    }
  }
  if(type ==2){
    app.globalData.skipurl = JSON.stringify(skipurl);
    wx.setStorageSync('skipurl', JSON.stringify(skipurl));
    return '';
  } else if(type == 3) { //返回跳转的url
    return '';
  }else if (type == 4) { // 返回参数
    return '';
  }
  return '';
}
function gettoken(){
  if (isEmpty(app.globalData.moaid)) {
     return wx.getStorageSync('moaid');
  } else {
    return app.globalData.moaid;
  }
  return '';
}
/**更新当前用户信息 */
function reloeduserinfo(udata){
   if(isEmpty(udata)){ return false; }
   if(isEmpty(udata.token)){ return false; }
   if(!isEmpty(udata.token)){
     app.globalData.moaid = udata.token;
     //异步存储
     wx.setStorageSync('moaid', udata.token);
     delete udata.token;
   }
  app.globalData.userinfo = udata;
  wx.setStorageSync('userinfo',udata);
}

function getuserinfo(){
  if (isEmpty(app.globalData.userinfo)){
    return  wx.getStorageSync('userinfo')
  }else{
    return app.globalData.userinfo;
  }
}
module.exports = {
  getcode: getcode, 
  gettoken:gettoken,
  request: requestad,
  customlogin: customlogin,
  isEmpty: isEmpty,
  getUrlParam: getUrlParam,
  timestamp: timestampe,
  navigate: navigate,
  youzan_navigate: youzan_navigate,
  getCurrentPageUrlWithArgs: getCurrentPageUrlWithArgs,
  reloeduserinfo: reloeduserinfo,
  getuserinfo: getuserinfo,
  getauthSetting: getauthSetting
}
```

