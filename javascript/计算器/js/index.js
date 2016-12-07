//结果
var result = 0;
// 暂存变量
var temp = 0;
// 标记是否为第一次运算
var tagfirst = 0;
//标记上一次按的什么类型的键（数字、运算符、函数运算）
// 1：运算符 2：数字键 3：函数运算
var tag = 0;
//保存inputline上次的状态和上上次的状态
var tagline = "";
var passtagline = "";
// 函数区的事件监听（代理）
var funcin = document.getElementById("functionarea");
funcin.addEventListener("click", function(e) {
    // console.log(e.target.innerHTML);
    var eInnerHTML = e.target.innerHTML;
    // 获取对象
    var inputtext = document.getElementById("inputtext");
    // 获取对象中的innerHTML
    var textInnerHTML = inputtext.innerHTML;
    var inputline = document.getElementById("inputline");
    var lineInnerHTML = inputline.innerHTML;
    // 因为是代理，所以排除点击其父元素传进来的乱码
    if (eInnerHTML.length > 4) {
        return;
    }
    if (tag == 0) {
        // 如果上一次点击的是数字的话（tag=0时），循环保存上次和上上次的记录行的状态，用于运算符的切换
        passtagline = tagline;
        tagline = inputline.innerHTML;
    }
    if (tag == 3) {
        lineInnerHTML = passtagline;
    }
    // 编辑输入记录行
    inputline.innerHTML = lineInnerHTML + eInnerHTML + " " + "(" + textInnerHTML + ")" + " ";
    if (eInnerHTML == "sin") {
        // 计算结果，变为弧度，保留8位小数并去掉尾部的0(下同)
        result = parseFloat(Math.sin(Number(textInnerHTML) * Math.PI / 180).toFixed(8));
    } else if (eInnerHTML == "cos") {
        result = parseFloat(Math.cos(Number(textInnerHTML) * Math.PI / 180).toFixed(8));
    }

    // 标记出点击了函数事件，下面判断要用到（下同）
    tag = 3;
    tagfirst++;
    // 结果输出到输出框
    inputtext.innerHTML = result;
});

// 按键区的事件监听（代理）
var putin = document.getElementById("putin");
putin.addEventListener("click", function(e) {
    var eInnerHTML = e.target.innerHTML;
    // 获取对象
    var inputtext = document.getElementById("inputtext");
    var inputline = document.getElementById("inputline");
    // 获取对象中的innerHTML
    var textInnerHTML = inputtext.innerHTML;
    var lineInnerHTML = inputline.innerHTML;
    // console.log(e.target.innerHTML);
    // 判断事件
    if (eInnerHTML.length > 3) {
        return;
    }

    if (tag == 3) {
        // 如果上次是函数运算的，现在清空记录行和输入行并重置tag
        // inputline.innerHTML = "";
        inputtext.innerHTML = "";
        tag = 0;
    }

    if (tag == 1) {
        //如果是多次按符号键的话就吧上上次的状态赋给inputline
        lineInnerHTML = passtagline;
    }
    // console.log("p:" + passtagline);
    // console.log("t:" + tagline);
    if (eInnerHTML == "CE") {
        // 清楚输入框
        inputtext.innerHTML = "0";
    } else if (eInnerHTML == "C") {
        // 清除所有（所有值变回初始状态）
        inputtext.innerHTML = "0";
        inputline.innerHTML = "";
        tagline = "";
        passtagline = "";
        //结果
        result = 0;
        // 第一个数
        first = 0;
        // 第二个数
        second = 0;
        tagfirst = 0;
    } else if (eInnerHTML == "←") {
        // 退格键
        if (textInnerHTML.length == 1) {
            // 推到只有一位的时候变为0
            inputtext.innerHTML = "0";
        } else {
            // 利用取字符串指定位置的函数吧最后一位切割掉
            inputtext.innerHTML = textInnerHTML.substring(0, textInnerHTML.length - 1);
        }
    } else if (eInnerHTML == "÷" || eInnerHTML == "×" || eInnerHTML == "-" || eInnerHTML == "+") {
        // 判断用户点击了什么事件，并把它打印到记录行中
        inputline.innerHTML = lineInnerHTML + textInnerHTML + " " + eInnerHTML + " ";
        // 用what来存，从上一次点击的记录行中取出的运算符号，用于连续运算
        var what = lineInnerHTML.charAt(lineInnerHTML.length - 2);
        console.log("what:" + what);
        if (tag == 0) {
            // 如果上一次点击的是数字的话（tag=0时），循环保存上次和上上次的记录行的状态，用于运算符的切换
            passtagline = tagline;
            tagline = inputline.innerHTML;
        }
        // 标记点击了运算符，点击数字键的话下面在数字键处理部分会重现标记
        tag = 1;
        // 为是否为第一次点击运算符做标记，应为第一次所有变量都为初始状态（为0），乘除的时候会有问题
        tagfirst++;
        // 第一次的时候what从记录行里取不到上一次的运算符，所以统一赋值为当前点击的运算符
        if (tagfirst == 1) { what = eInnerHTML; }
        if (eInnerHTML == "÷" && tagfirst == 1) {
            // 正像上面所说的，第一次运算时乘除利用初始的result=0会出问题，所以赋值为1（下同）
            result = 1;
        }
        if (eInnerHTML == "×" && tagfirst == 1) {
            result = 1;
        }

        // 连续运算
        // 连续运算时，第二次点击运算符要把第一次的计算结果计算出来，所以执行一遍类似点击=号的代码
        if (what == "+") {
            result = (result * 10 + Number(textInnerHTML) * 10) / 10;
        } else if (what == "-" && tagfirst != 1) {
            // 1减法和除法会遇到第一次四则运算时result为零的情况，所以第一次时会执行下面2处的，直接显示已输入的数为结果
            // 之后恢复正常，判断1和2的顺序不能互换，否则会永远进2（除法与之相同）
            result -= Number(textInnerHTML);
        } else if (what == "-") {
            // 2
            result = Number(textInnerHTML);
        } else if (what == "×") {
            result = parseFloat((result * Number(textInnerHTML)).toFixed(8));
        } else if (what == "÷" && tagfirst != 1) {
            result = parseFloat((result / Number(textInnerHTML)).toFixed(8));
            // 除数为零的时候提示
            if (result == Infinity || result == -Infinity) { result = "除数为零!" }
        } else if (what == "÷") {
            result = Number(textInnerHTML);
        } else {
            // 这里处理函数运算和四则运算混合使用的情况，与第一次使用四则运算是一样的处理
            result = Number(textInnerHTML);
        }
        // 所有的都处理完成后输出结果
        inputtext.innerHTML = result;
    } else if (eInnerHTML == "±") {
        // 正负号变换
        inputtext.innerHTML = -Number(textInnerHTML);
    } else if (eInnerHTML == ".") {
        // 键入小数点
        // 处理连续输入小数点

        if ((textInnerHTML.split(".")).length > 1) {
            // console.log(textInnerHTML.split("."));
            // console.log((textInnerHTML.split(".")).length);
            return;
        }
        // 处理直接输入小数点
        if (textInnerHTML != "0" && tag == 1) {
            textInnerHTML = 0;
            tag = 0;
        }
        inputtext.innerHTML = textInnerHTML + eInnerHTML;
    } else if (eInnerHTML == "=") {
        // 等号处理，与上面的连续运算相似
        var what = lineInnerHTML.charAt(lineInnerHTML.length - 2);
        console.log("what:" + what);
        if (what == "+") {
            // 处理0.1+0.2的坑(本质为浮点存储问题，其他语言处理浮点类型时
            // 都已在语言层面进行处理，js为弱类型语言，没处理)
            result = (result * 10 + Number(textInnerHTML) * 10) / 10;
        } else if (what == "-") {
            result -= Number(textInnerHTML);
        } else if (what == "×") {
            result = parseFloat((result * Number(textInnerHTML)).toFixed(8));
        } else if (what == "÷") {
            result = parseFloat((result / Number(textInnerHTML)).toFixed(8));
            if (result == Infinity || result == -Infinity) { result = "除数为零!" }
        } else {
            result = Number(textInnerHTML);
        }
        tag = 1;
        inputtext.innerHTML = result;

        // 清除所有（所有值变回初始状态）
        // inputtext.innerHTML = "0";
        inputline.innerHTML = "";
        tagline = "";
        passtagline = "";
        //结果
        result = 0;
        tagfirst = 0;
    } else {
        // 点击数字键
        // 对点击数字键做统一处理
        if (textInnerHTML == "0" || tag == 1 || tag == 3) {
            // 1判断输入框中是否为零（视为第一次输入数字），杜绝出现数字前面有零的情况，
            // 2如果上次是点击的运算符，再次点击数字的时候要清空上次的
            // 3tag=3时是上次点击了函数运算，而且结果已经显示在输入框，需要清空
            inputtext.innerHTML = "";
        }
        // 标记点击了数字键
        tag = 0;
        // 把新点击的数字插入到旧数字的后面形成新的数字，输入的是字符串，计算的时候会用Number()函数进行转换
        inputtext.innerHTML = inputtext.innerHTML + eInnerHTML;
    }
});
