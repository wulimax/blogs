移动端下拉加载

```js
//异步加载

    function getScrollTop() {
        var scrollTop = 0;
        if(document.documentElement && document.documentElement.scrollTop) {
            scrollTop = document.documentElement.scrollTop;
        } else if(document.body) {
            scrollTop = document.body.scrollTop;
        }
        return scrollTop;
    }
//获取屏幕高度
    function getClientHeight() {
        var clientHeight = 0;
        if(document.body.clientHeight && document.documentElement.clientHeight) {
            clientHeight = Math.min(document.body.clientHeight, document.documentElement.clientHeight);
        } else {
            clientHeight = Math.max(document.body.clientHeight, document.documentElement.clientHeight);
        }
        return clientHeight;
    }
//获取文档高度
    function getScrollHeight() {
        return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
    }
//获取屏幕宽度
    function getScrollwidth() {
        return $(window).width();
    }
//获取屏幕高度
    function getScrollheight() {
        return $(window).height();
    }
//获取当前手机类型
    function getphonetype(){
        var ua = navigator.userAgent.split("(")[1].split(")")[0];
        var brand = "";
        var phone = [/IPHONE/gi, /huawei/gi, /mi/gi, /vivo/gi, /OPPO/gi, /samsung/gi, /SONY/gi, /Nokia/gi, /HTC/gi, /ZTE/gi, /Lenovo/gi, /ZUK/gi,]
        if (phone[0].test(ua)) {
            brand = "iPhone";
            return true;
        } else if (phone[1].test(ua)) {
            brand = "HUAWEI";
            return true;
        } else if (phone[2].test(ua)) {
            brand = "小米";
        } else if (phone[3].test(ua)) {
            brand = "vivo";
        } else if (phone[4].test(ua)) {
            brand = "OPPO";
        } else if (phone[5].test(ua)) {
            brand = "SAMSUNG";
        } else if (phone[6].test(ua)) {
            brand = "SONY";
        } else if (phone[7].test(ua)) {
            brand = "Nokia";
        } else if (phone[8].test(ua)) {
            brand = "HTC";
        } else if (phone[9].test(ua)) {
            brand = "ZTE";
        } else if (phone[10].test(ua) || phone[11].test(ua)) {
            brand = "Lenovo";
        } else {
            brand = "Android";
        }
        return false;
    }
    var lock = true;
//判断使用 touchmove 还是 scroll 
  //因为 scroll在苹果x 和 荣耀v20上表现不佳所以才加入了 touchmove
  //因为touchmove 比较频所以加入抖动控制
    if(getphonetype() || (getScrollwidth()>370 && getScrollwidth()<380 && getScrollheight()>810 && getScrollheight()<820)){
        $('body').on('touchmove', function (event) {
            if(Math.ceil(getScrollTop() + getClientHeight()) == getScrollHeight() || getScrollHeight()-100  < getScrollTop() + getClientHeight()) {
                if(parseInt($('#loaded').data('page')) != 0){
                    if(lock == false){return; }
                    lock = false;
                    asloading($('#loaded').data('page'),$('#loaded').data('type'))
                    var timename=setTimeout(function () {
                        lock = true;
                        clearInterval(timename);
                    },500);
                }
            }else{

            }
        });
    }else{
        window.onscroll = function() {
            if(Math.ceil(getScrollTop() + getClientHeight()) == getScrollHeight() || getScrollHeight()-1  < getScrollTop() + getClientHeight()) {
                if(parseInt($('#loaded').data('page')) != 0){
                    if(lock == false){return; }
                    lock = false;
                    asloading($('#loaded').data('page'),$('#loaded').data('type'))
                    var timename=setTimeout(function () {
                        lock = true;
                        clearInterval(timename);
                    },500);
                }
            }else{
                console.log(getScrollHeight())
            }
        };
    }

```

[参考文档][http://blog.hooperui.com/%E5%85%B3%E4%BA%8Eios%E8%AE%BE%E5%A4%87window-onscroll%E6%BB%9A%E5%8A%A8%E6%9D%A1%E6%BB%9A%E5%8A%A8%E4%BA%8B%E4%BB%B6%E4%B8%8D%E8%A7%A6%E5%8F%91%E7%9A%84%E9%97%AE%E9%A2%98/]

