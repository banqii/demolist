/************************************
 *									*
 *   在浏览器控制台中查看答案...    *
 *									*
 ************************************/



// 接收字符串
var str = prompt("请输入字符串：");
// 找到出现的字母及出现的次数
function find(str) {
    // 保存找到的元素们
    var a = new Array();
    // 控制a数组长度
    var k = 0;
    //标记在a数组中是否已有该元素
    var q = 0;
    // 外层遍历输入的str字符串
    for (var i = 0; i < str.length; i++) {
        // 内层在a数组中查找是否已存在该元素
        for (var j = 0; j < a.length; j++) {
            if (a[j][0] == str[i]) {
                a[j][1]++;
                q = 1;
                break;
            }
        }
        // 如果没找到则在a中加上一位去保存新元素
        if (q != 1) {
            a[k] = new Array();
            a[k][0] = str[i];
            a[k][1] = 1;
            k++;
        }
        // 标记变量置零
        if (q == 1) {
            q = 0;
        }

    }
    return a;
}

// 找到出现次数最多的
function findTheMax(a) {
    var result = a[0];
    for (var i = 1; i < a.length; i++) {
        if (a[i][1] > result[1]) {
            result = a[i];
        }
    }
    return result;
}

//打印找到字符的位置和个数
function printLoction(f, str) {
    console.log("出现最多的字母是：" + f[0]);
    console.log("分别出现在位置：");
    var result = new Array();
    for (var i = 0; i < str.length; i++) {
        if (str[i] == f[0]) {
            result.push(i + 1);
        }
    }
    console.log(result.toString());
    console.log("出现" + result.length + "次");
    console.log("----------------------");
}

//到原字符串中去找位置并打印，调用前三个函数（printLoction、find和findTheMax）
function findLoction(str) {
    // 调用find函数，找到出现的元素
    var a = find(str);
    // 调用findTheMax函数，找出最多的次数
    var f = findTheMax(a);
    // 遍历a数组，打印所有出现次数最多且相同的元素
    for (var i = 0; i < a.length; i++) {
        if (a[i][1] == f[1]) {
            printLoction(a[i][0], str);
        }
    }
}
findLoction(str);


var arr = ["a","s","d","f","g","d","a","d","a"];

	//计数的新对象
	var count = {};
	//索引的新对象
	var pos = {};
	//遍历原数组，构造新数组
	for (var i = 0; i < arr.length; i++) {
		var char = arr[i];
		if(count[char]){
			count[char] += 1;
			pos[char] += "," + 1;
		}else{
			count[char] = 1;
			pos[char] = 1;
		}
	}
	var max = Object.keys(count).sort(function(a,b){
		return count[a] < count[b];
	})[0];
	console.log(max);
	console.log(count[max]);
	console.log(pos[max]);