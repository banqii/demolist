   alert('hahaha');
   alert('hehehe');
$(document).ready(function() {

    //标记是否登陆
    var ifLogin = false;
    // loginFun();
    //更多产品  与浏览器同高
    $(".morep").hover(function(e) {
        $(".morediv").css("height", window.innerHeight - 1);
    });

    //-------------------登陆begin-------------------//


    //点击登录
    $(".inner_login").click(function(e) {
        loginFun();
        //添加滚动监听
        add_scroll();
        //加载皮肤
        $("body").css("background-image", "url(" + localStorage.skinPath + ")");
        $("div.hint").addClass("hint_hidden").removeClass("hint");
        return false;
    });

    //点击退出
    $(".logout").click(function(e) {
        window.location = "baidu.html";
    });

    //-------------------登陆ending-------------------//


    //-------------------换肤begin-------------------//

    var skin = ["611.jpg", "634.jpg", "766.jpg", "611.jpg", "634.jpg", "766.jpg",
        "611.jpg", "634.jpg", "766.jpg", "611.jpg", "634.jpg", "766.jpg",
        "611.jpg", "634.jpg", "766.jpg", "611.jpg", "634.jpg", "766.jpg"
    ];
    var skinP = "image\/skin\/";
    // localStorage.skinPath = skinP + skin[0];

    //点击出现换肤box
    $(".change_skin").on("click", function() {
        //动态加载图片
        for (var i = 0; i < 18; i++) {
            var li = $("<li>").appendTo(".skin_focus2");
            var img = $("<img>").attr("src", skinP + skin[i]).appendTo(li);
        }
        hoverView(); //为新加载的图片添加hover预览事件
        $(".change_skin_box").animate({ top: 0, opacity: 1 }, 500);
        return false;
    });

    //点击隐藏换肤box
    $(".change_skin_hidden").on("click", function() {
        $(".change_skin_box").animate({ top: "-300px", opacity: 0 }, 500);
    });
    $(".wrapper").on("click", function(e) {
        $(".change_skin_box").animate({ top: "-300px", opacity: 0 }, 500); //显示皮肤框
        // 加载皮肤
    });
    //阻止冒泡
    $(".change_skin_box").on("click", function(e) {
        e.stopPropagation();
    });
    //换肤的tab切换
    $(".change_skin_box_topinner ul li").each(function(index) {
        $(this).on("click", function() {
            $(".change_skin_box_topinner ul li.skin_focus1").removeClass('skin_focus1');
            $(this).addClass('skin_focus1');
            $(".contentinner_left ul.skin_focus2").removeClass("skin_focus2");
            $(".contentinner_left ul").eq(index).addClass("skin_focus2");
            //循环加载图片
            for (var i = 0; i < 18; i++) {
                var li = $("<li>").appendTo(".skin_focus2");
                var img = $("<img>").attr("src", skinP + skin[i]).appendTo(li);

                hoverView();
            }
        })
    });
    //皮肤预览加载
    if (localStorage.skinPath) {
        $(".contentinner_right img").attr("src", localStorage.skinPath);
    } else {
        localStorage.skinPath = skinP + skin[0];
        $(".contentinner_right img").attr("src", localStorage.skinPath);
    }
    //应用背景
    if (ifLogin) {
        $("body").css("background-image", "url(" + localStorage.skinPath + ")");
    }



    //-------------------换肤ending-------------------//

    ////////////////////////////////////////////////////////////
    //                                                        //
    // 问题在下边新闻部分↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓  //
    // 新闻的tab切换在页面中滚动事件触发后不起作用了          //
    //                                                        //
    ////////////////////////////////////////////////////////////


    //-------------------新闻begin-------------------//

    //监控浏览器宽度，控制新闻显示和隐藏
    $(window).on("resize", function() {
        if (window.innerWidth < 800 && ifLogin == true) {
            $(".center_news").css("display", "none");
        }
        if (window.innerWidth > 800 && ifLogin == true) {
            $(".center_news").css("display", "block");
        }
    });

    //新闻的tab切换
    $(".main_top span").each(function(index) {
        $(this).on("click", function() {
            // $(".main_top span.tab_focus1").removeClass('tab_focus1');
            // $(this).addClass('tab_focus1');
            // $(".main_content div.tab_focus2").removeClass("tab_focus2");
            // $(".main_content div").eq(index).addClass("tab_focus2");
            $(this).addClass("tab_focus1").siblings().removeClass("tab_focus1");
            $(".main_content>div").eq(index).addClass("tab_focus2").siblings().removeClass("tab_focus2");
        })
    });
    //新闻滚动加载
    //添加内容
    function add_news() {
        $("<div>").addClass("testdiv").appendTo($(".tab_focus2"));
    }
    //判断滚动条是否到底
    function scrollside() {
        $(".wrapper").scroll(function() {
            var viewH = $(this).height(); //可见高度
            // console.log("可见高度：" + viewH);
            var contentH = $(this).get(0).scrollHeight; //内容高度
            // console.log("内容高度：" + contentH);
            var scrollTop = $(this).scrollTop(); //滚动高度
            // console.log("滚动高度：" + scrollTop);
            if (contentH - viewH - scrollTop <= 50) {
                $(".main_buttom").addClass("main_buttom_hidden");
                $(".tab_focus2").addClass('scroll_focrse');
                add_news();
            }
        });
    }
    var scrollFunc = function(e) {
            ee = e || window.event;
            if (e.wheelDelta) { //判断浏览器IE，谷歌滑轮事件               
                if (e.wheelDelta > 0) { //当滑轮向上滚动时
                }
                if (e.wheelDelta < 0) { //当滑轮向下滚动时  
                    console.log("滑轮向下滚动");
                    scrollside();//判断滚动条是否到底
                }
            } else if (e.detail) { //Firefox滑轮事件  
                if (e.detail > 0) { //当滑轮向上滚动时 
                }
                if (e.detail < 0) { //当滑轮向下滚动时  
                    console.log("滑轮向下滚动");
                    scrollside();//判断滚动条是否到底
                }
            }
        }
    //给页面绑定滑轮滚动事件函数  
    function add_scroll() {

        if (document.addEventListener) { //firefox  
            document.addEventListener('DOMMouseScroll', scrollFunc, false);
        }
        //滚动滑轮触发scrollFunc方法  //ie 谷歌  
        window.onmousewheel = document.onmousewheel = scrollFunc;
    }


    //-------------------新闻ending-------------------//

});
//hover预览
function hoverView() {
    $(".contentinner_left_inner li img").each(function(index) {
        //点击确定
        $(this).click(function() {
            $(".contentinner_right img").attr("src", $(this).attr("src"));
            localStorage.skinPath = $(this).attr("src");
            //应用背景
            $("body").css("background-image", "url(" + localStorage.skinPath + ")");
        });
        //hover预览
        $(this).hover(function() {
            $(".contentinner_right img").attr("src", $(this).attr("src"));
        }, function() {
            $(".contentinner_right img").attr("src", localStorage.skinPath);
        });
    });
}

//登录函数
function loginFun() {
    ifLogin = true;
    // e.stopPropagation();
    $("header nav").css("margin", "5px 0 5px 0");
    $(".content input:focus").css("border-color", "#999"); //输入框边框颜色
    $("header nav>a, .weather p, header nav span>span").css("color", "#fff"); //字的颜色显示为白色
    $(".navskin a").css("color", "#fff"); //字的颜色显示为白色
    $(".logo1").css("opacity", "0"); //无登录logo隐藏
    $(".logo2").css("opacity", "1"); //登录logo显示
    $(".content button").css({
        background: "#E9E9E9",
        border: "1px solid #E9E9E9",
        color: "#000"
    });
    $(".content").css({ "height": "290px", "min-height": "290px" });
    $(".content input").css("border-right", "1px solid rgb(209, 208, 208)");
    $(".footposition").css("bottom", "none"); //版权信息跟随
    $(".tdcode").css("display", "none"); //隐藏二维码
    $("nav .navskin").css("display", "block"); //显示天气框
    //背景
    $("body").css({
        "background-image": "url(image/skin/634.jpg)"
    });

    $(".morep").hover(function(e) {
        $(".morediv").css("height", window.innerHeight + 19); //调整 更多 的高度
    });
    $(".center_news").addClass('conter_news_show'); //新闻box显示
    $(".loginm").removeClass("loginm"); //隐藏登录按钮的下拉菜单
}
