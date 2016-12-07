// cookie在chrome下需要把项目放进服务器

// localStorage.color = "red";
// localStorage.removeItem("color");
// 初始化localStorage。color
var cookies = getcookie();
if (cookies == "notfound") {
	var color = localStorage.color;
}else{
	var color = cookies
}
var cdeflute = "#0aa770";
// 初始化
if (color == undefined) {
    color = cdeflute;
}
// 执行改变颜色的函数
setColor(color);

// 事件监听
var colorset = document.getElementById("colors");
colorset.addEventListener("click", function(e) {
    // console.log(e.target.id);
    var eid = e.target.id;
    if (eid == "sgreen") {
        // 绿色
        color = "#0aa770";

    } else if (eid == "sorange") {
        // 橘黄色
        color = "#fb0";

    } else if (eid == "sred") {
        // 红色
        color = "#f00";

    } else if (eid == "sblue") {
        // 蓝色
        color = "#06f";

    } else if (eid == "black") {
        // 灰色
        color = "#ccc";

    }
    // 执行改变颜色的函数
    setColor(color);
});
// 改变颜色的函数
function setColor(c) {
    // 设置导航栏的背景色
    var topul = document.getElementById("topul");
    topul.style.backgroundColor = c;

    // 设置边框颜色
    var news = document.getElementById("news");
    news.style.border = "1px solid" + c;
    var right = document.getElementById("right");
    right.style.border = "1px solid" + c;
    // 改变关键字的颜色
    var keyword = document.getElementsByName("keyword");
    for (var i = 0; i < keyword.length; i++) {
        keyword[i].style.color = c;
    }
    // keyword.style.color = c;
    // 保存当前颜色
    localStorage.color = c;
    var c = "color=" + c;
    c += "; max-age" + (1*60*60*24);//设置有效时间
    document.cookie = c;

}

function getcookie() {
    // var cookie = {};			//初始化最后要返回的对象
    var all = document.cookie; 	//获取cookie
    if (all === "") { 			//如果为空，直接返回空对象
        return "notfound";
    }
    var list = all.split("; "); 				//用分号和空格分隔字符串
    for (var i = 0; i < list.length; i++) { 	//遍历每个cookie
        var cookie = list[i]; 					//取出一个cookie
        var p = cookie.indexOf("="); 			//找出找出=的
        var name = cookie.substring(0, p); 		//切出name
        var value = cookie.substring(p + 1); 	//切出value
        // cookie[name] = value;				//存入coolie对象
        if (name == "color") {
            return value;
        }
    }
    return "notfound";
}
