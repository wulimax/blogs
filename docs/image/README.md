# fs2
imgUp.js 和 imgPulgin.js 为上传图片的js插件 使用需要 jquery 示例
window.od_pic =new Array();
    //图片上传处理
    $("#file").takungaeImgup({
        formData: {
            "path": "/upimg/",
            "name": "img[]",
        },
        url: "/order/update",
        success: function(data) {
        },
        error: function(err) {

        }
    });
    //删除图片地址
    $('.wsdel-ok').on('click',function(e){
        window.od_pic = [];
        $('.up-img').each(function(){
            window.od_pic.push($(this).attr('src'))
        })
    });
