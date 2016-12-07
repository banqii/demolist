$(document).ready(function() {
    // 轮播操作dom样式
    // <div class="scroll1">
        // <div class="tabimgs">
    	   //  <a href="#"><img src="image/slide1.jpg"></a>
    	   //  <a href="#"><img src="image/slide2.jpg"></a>
    	   //  <a href="#"><img src="image/slide3.jpg"></a>
    	   //  <a href="#"><img src="image/slide4.jpg"></a>
        // </div>
        //     <div class="tabs"></div>
        //     <div class="tabl tabstyle"></div>
        //     <div class="tabr tabstyle"></div>
    // </div>
    // 
    // ！！！！！！！！！！！！！！！！！！！！！
    // 多图时要求父元素的宽度略小于显示图片的总宽
    
    // 最上边的轮播
    var scroll1 = {
        tabl: ".tabl", //左键
        tabr: ".tabr", //右键
        ftabspan: ".tabs", //小滑块父元素
        tabspan: ".tabs span", //小滑块 span
        img: ".tabimgs a", //滑动元素
        imgouter: ".tabimgs", //图片outer
        ifmuchimg: false, //是否多图同时显示
        fother: ".scroll1", //父元素
        imglength: 560, //移动长度
        playatuo: true, //是否自动轮播
        iftabspan: true, //是否有小滑块
        tabspanact: "click", //小滑块触发方式（click...）
        tabspanstyle: 'on', //小滑块滑过加载样式
        playtelayed: 2000, //轮播动画延时
        acttelayed: 500 //动画用时
    }
    //调用轮播函数
    banner(scroll1);

    // 第二个轮播
    var scroll2 = {
        tabl: ".tabl2", //左键
        tabr: ".tabr2", //右键
        ftabspan: "", //小滑块父元素
        tabspan: "", //小滑块 span
        img: ".tabimgs2 a", //滑动元素
        imgouter: ".tabimgs2", //图片outer
        ifmuchimg: true, //是否多图同时显示
        fother: ".scroll2", //父元素
        imglength: 187, //移动长度
        playatuo: false, //是否自动轮播
        iftabspan: false, //是否有小滑块
        tabspanact: "", //小滑块触发方式（click...）
        tabspanstyle: '', //小滑块滑过加载样式
        playtelayed: 2000, //轮播动画延时
        acttelayed: 500 //动画用时
    }

    banner(scroll2);

    // 第三个轮播
    var scroll3 = {
        tabl: ".tabl3", //左键
        tabr: ".tabr3", //右键
        ftabspan: "", //小滑块父元素
        tabspan: "", //小滑块 span
        img: ".tabimgs3 a", //滑动元素
        imgouter: ".tabimgs3", //图片outer
        ifmuchimg: true, //是否多图同时显示
        fother: ".scroll3", //父元素
        imglength: 160, //移动长度
        playatuo: false, //是否自动轮播
        iftabspan: false, //是否有小滑块
        tabspanact: "", //小滑块触发方式（click...）
        tabspanstyle: '', //小滑块滑过加载样式
        playtelayed: 2000, //轮播动画延时
        acttelayed: 500 //动画用时
    }

    banner(scroll3);

    // 第四个轮播
    var scroll4 = {
        tabl: ".tabl4", //左键
        tabr: ".tabr4", //右键
        ftabspan: "", //小滑块父元素
        tabspan: "", //小滑块 span
        img: ".tabimgs4 a", //滑动元素
        imgouter: ".tabimgs4", //图片outer
        ifmuchimg: true, //是否多图同时显示
        fother: ".scroll4", //父元素
        imglength: 137, //移动长度
        playatuo: false, //是否自动轮播
        iftabspan: false, //是否有小滑块
        tabspanact: "", //小滑块触发方式（click...）
        tabspanstyle: '', //小滑块滑过加载样式
        playtelayed: 2000, //轮播动画延时
        acttelayed: 500 //动画用时
    }

    banner(scroll4);





    //封装好的轮播函数
    function banner(ban) {
        var fotherWidth = $(ban.fother).width();
        var showImgSun = (Math.floor(fotherWidth / ban.imglength));
        if (ban.ifmuchimg) { showImgSun += 1; }
        for (var i = 0; i < showImgSun; i++) {
            var clone = $(ban.img).eq(i).clone();
            $(ban.imgouter).append(clone);
        }

        var imgSize = $(ban.img).size(); //图片个数
        if (ban.iftabspan) {

            for (var j = 0; j < imgSize - 1; j++) {
                $(ban.ftabspan).append("<span></span>");
            }
            var tabSpan = $(ban.tabspan); //获取tab小条
            tabSpan.first().addClass(ban.tabspanstyle); //给第一个添加样式	   
        }
        var i = 0; //正在显示图片的id
        // 点击事件
        $(ban.tabl).on("click", function() {
            i--;
            move();
        });

        $(ban.tabr).on("click", function() {
            i++;
            move();
        });
        if (ban.iftabspan) {
            $(ban.tabspan).on(ban.tabspanact, function() {
                var index = $(this).index();
                $(ban.imgouter).stop().animate({ left: -index * ban.imglength }, ban.acttelayed);
                $(this).addClass(ban.tabspanstyle).siblings().removeClass(ban.tabspanstyle);
            });
        }
        if (ban.playatuo) {
            // 自动轮播（计时器）
            var timer = setInterval(function() {
                i++;
                move();
            }, ban.playtelayed);
            //hover时，关闭自动轮播
            $(ban.fother).hover(function() {
                clearInterval(timer);
            }, function() {
                timer = setInterval(function() {
                    i++;
                    move();
                }, ban.playtelayed);
            });
        }
        // 移动函数
        function move() {
        	//判断无缝滑动时的边界位置
            if (ban.ifmuchimg) {//判断是否为多图模式
                if (i == (-1)) {
                    $(ban.imgouter).css({ left: -(imgSize - showImgSun) * ban.imglength });
                    i = imgSize - showImgSun-1;
                }
                //因为Match.floor会把不是整数的showImgSun舍去小数部分
                //所以多图这里的showImgSun都要加一
                if (i == (imgSize - showImgSun + 1)) {
                    $(ban.imgouter).css({ left: 0 });
                    i = 1;
                }
            } else {
                if (i == (-1)) {
                    $(ban.imgouter).css({ left: -(imgSize - 1) * ban.imglength });
                    i = imgSize - 2;
                }
                if (i == imgSize) {
                    $(ban.imgouter).css({ left: 0 });
                    i = 1;
                }
            }
            //动画移动
            $(ban.imgouter).stop().animate({ left: -i * ban.imglength }, ban.acttelayed);
            //设置当前小滑块的样式并删除其他小滑块的样式
            if (ban.iftabspan) {//判断是否有小滑块
                if (i == (imgSize - 1)) {//判断滑动边界值
                    tabSpan.eq(0).addClass(ban.tabspanstyle).siblings().removeClass(ban.tabspanstyle);
                } else {
                    tabSpan.eq(i).addClass(ban.tabspanstyle).siblings().removeClass(ban.tabspanstyle);
                }
            }
        }
    }
});
