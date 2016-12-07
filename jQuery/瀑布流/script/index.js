$(document).ready(function() { 					//html框架加载完成后
    imgLocation(); 								//调用位置计算函数
    //下翻时备用图片
    var dataImg = { "data": [{ "src": "1.jpg" }, { "src": "2.jpg" }, { "src": "3.jpg" }, { "src": "4.jpg" }, { "src": "5.jpg" }] }
    window.onscroll = function() { 				//下翻监听
        if (scrollside()) { 					//判断最后一张图片是否显示到了一半
            $(dataImg.data).each(function(index, value) {			//遍历图片数组（图片地址）
                var box = $("<div>").addClass("box").appendTo($("#container")); 				//在最外层div中添加一个div，并应用box样式
                var content = $("<div>").addClass("content").appendTo(box); 					//在box中添加一个div，并应用content样式
                // console.log("./image/"+$(value).attr("src"));
                $("<img>").attr("src", "./image/" + $(value).attr("src")).appendTo(content); 	//添加img并设置src属性为图片路径
            });																					//.attr（）既能设置属性也能取出属性
            imgLocation(); 						//调用位置计算函数
        }
    }
});
$(window).on('resize', function() { 			//监听窗口变化
        imgLocation();
    })
    //判断最后一张图片是否显示到了一半函数
function scrollside() {
    var box = $(".box");
    var lastboxHeight = box.last().get(0).offsetTop + Math.floor(box.last().height() / 2);		//判断最后一个box是否显示达到自身一半
    var documentHeight = $(document).width();													//用文档的宽来充当高，要不然增的太快
    var scrollHeight = $(window).scrollTop();													//取滚动条的上边高度
    return (lastboxHeight < scrollHeight + documentHeight) ? true : false;						
}
// 位置计算函数
function imgLocation() {
    var box = $(".box");
    var boxWidth = box.eq(0).width();
    var num = Math.floor($(window).width() / boxWidth);			//判断当前窗体的宽度能容下几张图片
    if (num < 3) {												//设置最少的图片数			
        return; }
    var boxArr = [];											//用来存box的高度
    box.each(function(index, value) {
        // console.log(index+"--"+value);
        var boxHeight = box.eq(index).height();					//取每个box的高度
        if (index < num) {										//放第一行图片
            boxArr[index] = boxHeight;
            // console.log(boxHeight);
            var boxPosition = boxWidth * index;					//算第一行图片的位置
            $(value).css({
                "position": "absolute",
                "top": 0,
                "left": boxPosition
            })
        } else {
            var minboxHeight = Math.min.apply(null, boxArr);	//找出最小box高度
            // console.log(minboxHeight);
            var minboxIndex = $.inArray(minboxHeight, boxArr);	//找出最小高度的位置
            // console.log(minboxIndex);
            // console.log(value);
            $(value).css({
                "position": "absolute",
                "top": minboxHeight,
                "left": box.eq(minboxIndex).position().left		//设置本次插入的图片的位置为上一行高度最小的下方
            });
            boxArr[minboxIndex] += box.eq(index).height();		//设置最小高的地方的高增加
        }
    });
    // console.log("--------------------");
}
