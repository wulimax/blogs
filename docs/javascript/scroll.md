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
function getClientHeight() {
                 var clientHeight = 0;
                 if(document.body.clientHeight && document.documentElement.clientHeight) {
                         clientHeight = Math.min(document.body.clientHeight, document.documentElement.clientHeight);
                     } else {
                         clientHeight = Math.max(document.body.clientHeight, document.documentElement.clientHeight);
                     }
                 return clientHeight;
             }
function getScrollHeight() {
                return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
             }
var lock = true;
//开始使用 windows.scroll发现在荣耀 小米个别型号无法触发
$(window).scroll(function () {
    if(getScrollTop() + getClientHeight() >= getScrollHeight()-100) {
        if(parseInt($('#loaded').data('page')) != 0){
            //加一个lock锁防止重复触发
            if(lock == false){return; }
            lock = false;
            asloading($('#loaded').data('page'));
            var timename=setTimeout(function () {
                lock = true;
                clearInterval(timename);
            },500);

        }
    }else{
        //console.log(getScrollHeight()+'_'+(getScrollTop() + getClientHeight()))
    }
});
```