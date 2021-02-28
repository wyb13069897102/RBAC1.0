$(
    function(){
        app.initIframe();
        app.initAside();
    }
)

var app = {
    initIframe : function(){
        var heights = document.documentElement.clientHeight;
        document.getElementById("rightIframe").height = heights;
    },
    initAside:function(){
        $('.aside-ul>li:nth-child(-n+10) ul').hide();
        $('.aside h4').click(function(){
            $(this).siblings('ul').slideToggle();
        })
    }
}