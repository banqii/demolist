$(document).ready(function() {
    select();
    $("#insertbtn").click(function() {

        insert();
    });
    $("#insertboxbtn").click(function() {
        showBox('.insertbox', 'show');
    });

    $("#updatebtn").click(function() {
        update();
    });

    $("#selectbtn").click(function() {
        select();
    });
    // 过滤一些敏感字符函数  
    function filterSqlStr(value) {

        var sqlStr = sql_str().split(',');
        var flag = false;

        for (var i = 0; i < sqlStr.length; i++) {

            if (value.toLowerCase().indexOf(sqlStr[i]) != -1) {
                console.log(sqlStr[i]);
                flag = true;
                break;

            }
        }
        return flag;
    }


    function sql_str() {
        // var str = "and,delete,or,exec,insert,select,union,update,count,join,*,',>,<,$";
        var str = ">,<,$";
        return str;
    }





    function showNotes(who) {
        $(who).animate({ //提示动画   下同
            opacity: '1'
        }, 500).animate({
            opacity: '0'
        }, 1500);
    }
    // 新增函数
    function insert() {
        var str = $("#insert").serialize();
        if (!filterSqlStr(str)) {
            $.ajax({
                url: "http://127.0.0.1:18000/insert",
                dataType: 'jsonp',
                data: str,
                jsonp: 'callback',
                success: function(data) {
                    showNotes('.notes');
                    showData(data);
                    showBox();
                    $('#insert')[0].reset();
                },
                error: function() {
                    showNotes('.notef');
                },
                timeout: 3000
            });
        } else {
            alert('存在非法字符！');
            console.log(str);
            console.log(str.toLowerCase());
        }


    }
    //更新函数
    function update() {


        $.ajax({
            url: "http://127.0.0.1:18000/update",
            dataType: 'jsonp',
            data: $("#update").serialize(),
            jsonp: 'callback',
            success: function(data) {
                showNotes('.notes');
                showData(data);
                showBox();
            },
            error: function() {
                showNotes('.notef');
            },
            timeout: 3000
        });
    }
    //单独查询函数
    function selectOne(newsid) {
        $.ajax({
            url: "http://127.0.0.1:18000/selectone",
            dataType: 'jsonp',
            data: {
                newsid: newsid
            },
            jsonp: 'callback',
            success: function(data) {
                showNotes('.notes');
                showDataDetail(data);

                showBox('.updatebox', 'show');
            },
            error: function() {
                showNotes('.notef');
            },
            timeout: 3000
        });
    }
    //查询
    function select() {

        $.ajax({
            url: "http://127.0.0.1:18000/selectall",
            dataType: 'jsonp',
            data: '',
            jsonp: 'callback',
            success: function(data) {
                console.log(data);
                showNotes('.notes');
                showData(data);
            },
            error: function() {
                showNotes('.notef');
            },
            timeout: 3000
        });
    }
    //删除
    function delete1(n) {

        if (confirm("确认删除？")) {
            $.ajax({
                url: "http://127.0.0.1:18000/delete",
                dataType: 'jsonp',
                data: {
                    'newsid': n
                },
                jsonp: 'callback',
                success: function(data) {
                    showNotes('.notes');
                    showData(data);
                },
                error: function() {
                    showNotes('.notef');
                },
                timeout: 3000
            });

        }
    }
    //动态新增表格
    function showData(data) {
        var datatable = $("#datatable");
        datatable.html("");
        $.each(data, function(key, value) {
            var tr = document.createElement("tr");
            for (var i = 0; i < 4; i++) {
                if (i == 0) {
                    var td = document.createElement("td");
                    $(td).html(value.newsid);
                    $(tr).append(td);
                } else if (i == 1) {
                    var td = document.createElement("td");
                    $(td).html(value.newstype);
                    $(tr).append(td);
                } else if (i == 2) {
                    var td = document.createElement("td");
                    $(td).html(value.newstitle);
                    $(tr).append(td);
                } else if (i == 3) {
                    var td = document.createElement("td");
                    var del = document.createElement("input"); //删除按钮
                    var det = document.createElement("input"); //编辑按钮
                    $(del).attr({
                        type: "button",
                        class: "btn btn-danger",
                        value: "删除"
                    });
                    $(det).attr({
                        type: "button",
                        class: "btn btn-warning",
                        value: "编辑"
                    });
                    $(td).append(det);
                    $(td).append(del);
                    $(tr).append(td);
                }
                datatable.append(tr);
            }

            //删除按钮绑定事件
            $(del).click(function(event) {
                event.stopPropagation();
                var ev = $(this).parent().siblings();
                var n = $(ev[0]).html();
                // console.log(n);
                delete1(n);
            });

            //单个查询按钮
            $(det).click(function() {
                $('.showbox').css({
                    display: 'block'
                });
                var ev = $(this).parent().siblings();
                var n = $(ev[0]).html();
                selectOne(n);
            });
        });
    }
    //显示详细函数
    function showDataDetail(data) {
        $.each(data, function(key, value) {
            $("#newsid_d").val(value.newsid);
            $("#newstype_d").val(value.newstype);

            $("#newstitle_d").html(value.newstitle);
            $("#newscontent_d").html(value.newscontent);
            $("#newsimage_d").val(value.newsimage);
        });
    }
    $('.minpage').click(function() {
        showBox();
    });

    function showBox(e, t) {
        if (t == 'show') {
            $('.showbox').css({
                display: 'block'
            });
            $(e).css({
                display: 'block'
            });
        } else {
            $('.showbox').css({
                display: 'none'
            });
            $('.updatebox').css({
                display: 'none'
            });
            $('.insertbox').css({
                display: 'none'
            });
        }
    }

});
