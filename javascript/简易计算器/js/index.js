function cont(str, s) {
        //分别用 + - * / 分割字符串分割成功，则进入运算
        if (s.split("+").length > 1) {

            //转换类型 并运算
            var a = Number(s.split("+")[0]) + Number(s.split("+")[1]);


        } else if (s.split("-").length > 1) {

            //转换类型 并运算
            var a = Number(s.split("-")[0]) - Number(s.split("-")[1]);


        } else if (s.split("*").length > 1) {

            //转换类型 并运算
            var a = Number(s.split("*")[0]) * Number(s.split("*")[1]);


        } else if (s.split("/").length > 1) {
            // 如果分母为零退出
            if (Number(s.split("/")[1] == 0)) {
                alert("分母为零！");
                // 防止输出错误的结果
                return;
            }

            //转换类型 并运算
            var a = Number(s.split("/")[0]) / Number(s.split("/")[1]);
            a = a.toFixed(2);

        } else {
            alert("输入错误，请重试！");
            return;
        }
        if (isNaN(a)) {
            alert("输入错误，请重试！");
            return;
        }
        //打印输出
        alert(str + "=" + a );
    }
    while (1) {
        // 去除空格
        var str1 = prompt("请输入双目运算：（例：1 + 2）");
        var s1 = str1.replace(/\s/g, "");
        cont(str1, s1);
    }