$(document).ready(function() {
    //导航点击显示下滑线
    // $(".index-page-navigator .content-nav table").bind("click", function(e) {
    //     $(".index-page-navigator .content-nav td div span").removeClass("nav-focus");
    //     if (e.target.nodeName == "SPAN") {
    //         $(e.target).addClass('nav-focus');
    //     } else if (e.target.nodeName == "DIV") {
    //         $(e.target).children("span").addClass('nav-focus');
    //     }
    // });
    var newstype;
    $(".index-page-navigator .content-nav table tbody td").each(function(index, el) {

        $(el).click(function() {
            $(".index-page-navigator .content-nav table tbody td").each(function(index, el) {
                $(this).find("span").removeClass('nav-focus');
            });
            newstype = $(this).find("span").addClass('nav-focus').html(); //在设置选中样式的同时取到span中的内容
            //传到后台搜索
            // console.log(newstype);
            getNwes(newstype);
            newscount = 9; //当前页面显示了多少新闻的计数变量
        });
    });
    //收起导航栏
    $(".less").click(function(event) {
        $(".content-nav table tbody").children(".tr3,.tr4,.tr5").css("display", "none");
        $(".bottomline,.footer-top").css("display", "none");
        $(".more").css("display", "").siblings('span').css("display", "none");
    });
    //展开导航栏
    $(".more").click(function() {
        event.stopPropagation();
        $(".content-nav table tbody").children(".tr3,.tr4,.tr5").css("display", "");
        $(".bottomline,.footer-top").css("display", "");
        $(".more").css("display", "none").siblings('span').css("display", "");
    });

    //test function
    function test() {
        $(".content-nav table tbody").children(".tr3,.tr4,.tr5").css("display", "none");
        $(".bottomline,.footer-top").css("display", "none");
        $(".more").css("display", "").siblings('span').css("display", "none");
    }
    test();

    //动态控制轮播图片大小 与 图片outer 大小
    function gallerySize() {
        var width = $(".index-page-gallery-outer").width();
        var height = parseInt(width * 0.6);
        $(".index-page-gallery-container").height(height); //轮播框 高
        return width;
    }
    var length = gallerySize();


    //轮播
    var scroll1 = {
            tabl: "", //左键
            tabr: "", //右键
            ftabspan: "#gallery-tag", //小滑块父元素
            tabspan: "#gallery-tag li", //小滑块 span
            img: ".index-page-gallery a", //滑动元素
            imgouter: ".index-page-gallery", //图片outer
            imgouterid: "index-page-gallery",
            ifmuchimg: false, //是否多图同时显示
            fother: ".index-page-gallery-container", //父元素
            imglength: length, //移动长度
            playatuo: true, //是否自动轮播
            iftabspan: true, //是否有小滑块
            tabspanact: "click", //小滑块触发方式（click...）
            tabspanstyle: 'tag-focus', //小滑块滑过加载样式
            playtelayed: 3000, //轮播动画延时
            acttelayed: 500 //动画用时
        }
        //调用轮播函数
        // banner(scroll1);

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
            $(ban.ftabspan).html(''); //添加之前先清空
            for (var j = 0; j < imgSize - 1; j++) {
                $(ban.ftabspan).append("<li></li>");
            }
            var tabSpan = $(ban.tabspan); //获取tab小条
            tabSpan.first().addClass(ban.tabspanstyle); //给第一个添加样式     
        }
        var imgindex = 0; //正在显示图片的id
        // // 点击事件
        // $(ban.tabl).on("click", function() {
        //     imgindex--;
        //     move();
        // });

        // $(ban.tabr).on("click", function() {
        //     imgindex++;
        //     move();
        // });
        // 
        // 绑定触摸手势事件函数 begin    ////原生js////
        var elementHolder = document.getElementById("index-page-gallery");
        // console.log(elementHolder);
        elementHolder.addEventListener('touchstart', handleTouchEvent, false);
        elementHolder.addEventListener('touchmove', handleTouchEvent, false);
        elementHolder.addEventListener('touchend', handleTouchEvent, false);
        var touchX;
        var ready_moved = true; //判断每次滑动开始的标记变量
        function handleTouchEvent(event) {


            var minRange = 50;
            switch (event.type) {
                case "touchstart":
                    if (ready_moved) {
                        var touch = event.touches[0];
                        touchX = touch.pageX;
                        ready_moved = false;
                    }
                    //依赖外部的timer计时器 
                    clearInterval(timer);
                    console.log('cleaned1');
                    break;
                case "touchmove":
                    // event.preventDefault();//阻止默认事件
                    if (!ready_moved) {

                        var release = event.changedTouches[0];
                        var releasedAt = release.pageX;
                        if (releasedAt + minRange < touchX) {
                            ready_moved = true;
                            imgindex++;
                            move();
                        } else if (releasedAt - minRange > touchX) {
                            ready_moved = true;
                            imgindex--;
                            move();
                        }
                    }
                    break;
                case "touchend":
                    //依赖外部的timer计时器 
                    timer = setInterval(function() {
                        imgindex++;
                        move();
                    }, ban.playtelayed);
                    break;
            }
        }

        // 绑定触摸手势事件函数 ending

        if (ban.iftabspan) {
            $(ban.tabspan).on(ban.tabspanact, function() {
                var index = $(this).index();
                $(ban.imgouter).stop().animate({ left: -index * ban.imglength }, ban.acttelayed);
                $(this).addClass(ban.tabspanstyle).siblings().removeClass(ban.tabspanstyle);
            });
        }
        if (ban.playatuo) {
            if (timer) {
                clearInterval(timer);
            }
            // 自动轮播（计时器） 
            var timer = setInterval(function() {
                imgindex++;
                move();
            }, ban.playtelayed);
            //hover时，关闭自动轮播
            $(ban.fother).hover(function() {
                clearInterval(timer);
            }, function() {
                timer = setInterval(function() {
                    imgindex++;
                    move();
                }, ban.playtelayed);
            });
        }
        // 移动函数
        function move() {
            //判断无缝滑动时的边界位置
            if (ban.ifmuchimg) { //判断是否为多图模式
                if (imgindex == (-1)) {
                    $(ban.imgouter).css({ left: -(imgSize - showImgSun) * ban.imglength });
                    imgindex = imgSize - showImgSun - 1;
                }
                //因为Match.floor会把不是整数的showImgSun舍去小数部分
                //所以多图这里的showImgSun都要加一
                if (imgindex == (imgSize - showImgSun + 1)) {
                    $(ban.imgouter).css({ left: 0 });
                    imgindex = 1;
                }
            } else {
                if (imgindex == (-1)) {
                    $(ban.imgouter).css({ left: -(imgSize - 1) * ban.imglength });
                    imgindex = imgSize - 2;
                }
                if (imgindex == imgSize) {
                    $(ban.imgouter).css({ left: 0 });
                    imgindex = 1;
                }
            }
            //动画移动
            $(ban.imgouter).stop().animate({ left: -imgindex * ban.imglength }, ban.acttelayed);
            //设置当前小滑块的样式并删除其他小滑块的样式
            if (ban.iftabspan) { //判断是否有小滑块
                if (imgindex == (imgSize - 1)) { //判断滑动边界值
                    tabSpan.eq(0).addClass(ban.tabspanstyle).siblings().removeClass(ban.tabspanstyle);
                } else {
                    tabSpan.eq(imgindex).addClass(ban.tabspanstyle).siblings().removeClass(ban.tabspanstyle);
                }
            }
        }

    }
    //数据获得部分

    function getNwes(newstype) {
        $('.nomore').css('display', 'none');
        $('#moreButton').attr({
            value: '点击加载更多...'
        });
        loding('show'); //加载动画

        console.log(newstype);

        $.ajax({
            url: "http://127.0.0.1:18000/getnews",
            dataType: 'jsonp',
            data: {
                newstype: newstype
            },
            jsonp: 'callback',
            success: function(data) {
                if (data != '') {
                    loding('hide'); //移除动画
                    showNews(data); //显示数据
                } else {
                    $('.nomore').css('display', 'block');
                }
            },
            error: function() {
                console.log("错误!");
                loding('hide');
            },
            timeout: 3000
        });
    }

    function loding(t) {
        if (t == 'show') {
            $(".index-page-sections").css('display', 'none');
            $(".loader").css('display', 'block');
        } else if (t == 'hide') {
            $(".index-page-sections").css('display', 'block');
            $(".loader").css('display', 'none');
        }
    }
    //动态构建页面新闻函数
    function showNews(data) {
        var g = $("#index-page-gallery");
        var n = $(".index-page-newscontent");
        g.html("");
        n.html("");
        var i = 0;
        $(data).each(function(key, value) {
            i++;
            if (i <= 4) {
                //构建轮播html
                var a = document.createElement("a");
                var img = document.createElement("img");
                var p = document.createElement("p");

                $(a).attr({
                    href: '#'
                });
                $(img).attr({
                    src: "images/news/" + value.newsimage
                });
                $(p).html(value.newstitle);

                $(g).append($(a).append(img).append(p));
                timeDiff(value.addtime);
            } else {
                //构建新闻列表html
                var div1 = document.createElement("div");
                var div2 = document.createElement("div");
                var div3 = document.createElement("div");
                var div4 = document.createElement("div");
                var div5 = document.createElement("div");
                var div6 = document.createElement("div");
                var img = document.createElement("img");

                //计算时间
                var timed = timeDiff(value.addtime);
                $(div6).attr("class", "item-time").html(timed + "前");

                $(div4).attr("class", "newsbox-right-top").html(value.newstitle).append(div6);

                $(div5).attr("class", "newsbox-right-bottom").append(div6);

                $(div3).attr("class", "newsbox-right").append(div4).append(div5);

                ///////

                $(img).attr("src", "images/news/" + value.newsimage);

                $(div2).attr("class", "newsitem-imgbox").append(img);

                $(div1).attr("class", "index-page-newsitem").append(div2).append(div3);

                $(n).append(div1);
            }
        });

        banner(scroll1); //在页面动态构成后再进行轮播及滑动事件的添加，因为这个函数依赖于已经成型的页面

    }

    //获得时间差函数
    function timeDiff(dataTime) {
        var nowTime = new Date();
        var dataTime = Date.parse(dataTime);
        var date3 = nowTime.getTime() - dataTime;
        //计算出相差天数
        var days = Math.floor(date3 / (24 * 3600 * 1000))

        //计算出小时数

        var leave1 = date3 % (24 * 3600 * 1000) //计算天数后剩余的毫秒数
        var hours = Math.floor(leave1 / (3600 * 1000))
            //计算相差分钟数
        var leave2 = leave1 % (3600 * 1000) //计算小时数后剩余的毫秒数
        var minutes = Math.floor(leave2 / (60 * 1000))


        //计算相差秒数
        var leave3 = leave2 % (60 * 1000) //计算分钟数后剩余的毫秒数
        var seconds = Math.round(leave3 / 1000)


        if (days != 0) {
            return days + "天";
        } else if (hours != 0) {
            return hours + "小时";
        } else {
            return minutes + "分";
        }
        // console.log(" 相差 " + days + "天 " + hours + "小时 " + minutes + " 分钟" + seconds + " 秒");
    }
    $(".firstpage").addClass('nav-focus');
    getNwes('推荐');
    newstype = '推荐';

    // 点击添加更多  begin
    var newscount = 9;
    $('#moreButton').click(function() {
        // loding1('show'); //加载动画
        console.log('新闻类型是' + newstype);
        $.ajax({
            url: "http://127.0.0.1:18000/getmore",
            dataType: 'jsonp',
            data: {
                newstype: newstype,
                newscount: newscount
            },
            jsonp: 'callback',
            success: function(data) {
                if (data != '') {
                    newscount = newscount + 5;
                    // loding1('hide'); //移除动画
                    showMore(data); //显示数据
                    $('#moreButton').attr({
                        value: '点击加载更多...'
                    });
                } else {
                    $('#moreButton').attr({
                        value: '没有更多了...'
                    });
                }
            },
            error: function() {
                console.log("错误!");
                // loding('hide');
            },
            timeout: 3000
        });

    });
    //加载更多
    function showMore(data) {
        var n = $(".index-page-newscontent");
        //构建新闻列表html
        $(data).each(function(key, value) {

            //构建新闻列表html
            var div1 = document.createElement("div");
            var div2 = document.createElement("div");
            var div3 = document.createElement("div");
            var div4 = document.createElement("div");
            var div5 = document.createElement("div");
            var div6 = document.createElement("div");
            var img = document.createElement("img");

            //计算时间
            var timed = timeDiff(value.addtime);
            $(div6).attr("class", "item-time").html(timed + "前");

            $(div4).attr("class", "newsbox-right-top").html(value.newstitle).append(div6);

            $(div5).attr("class", "newsbox-right-bottom").append(div6);

            $(div3).attr("class", "newsbox-right").append(div4).append(div5);

            ///////

            $(img).attr("src", "images/news/" + value.newsimage);

            $(div2).attr("class", "newsitem-imgbox").append(img);

            $(div1).attr("class", "index-page-newsitem").append(div2).append(div3);

            $(n).append(div1);
        });
    }

    // 点击添加更多  ending

});
