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

    function showNotes(who) {
        $(who).animate({ //提示动画   下同
            opacity: '1'
        }, 500).animate({
            opacity: '0'
        }, 1500);
    }
    // 新增函数
    function insert() {
        $.post(
                'server/insert.php',
                $("#insert").serialize(),
                function(data, textStatus, xhr) {
                    // $(".notes").animate({ //提示动画   下同
                    //     opacity: '1'
                    // }, 500).animate({
                    //     opacity: '0'
                    // }, 500);
                    showNotes('.notes');
                    showData(data);
                    showBox();
                    $('#insert')[0].reset();
                })
            .fail(function() {
                showNotes('.notef');
            });
    }
    //更新函数
    function update() {
        $.post(
                'server/update.php',
                $("#update").serialize(),
                function(data, textStatus, xhr) {
                    showNotes('.notes');
                    showData(data);
                    showBox();
                })
            .fail(function() {
                showNotes('.notef');
            });
    }
    //单独查询函数
    function selectOne(n) {
        $.post(
                'server/selectone.php', {
                    'newsid': n
                },
                function(data, textStatus, xhr) {

                    showNotes('.notes');
                    showDataDetail(data);

                    showBox('.updatebox', 'show');
                })
            .fail(function() {
                showNotes('.notef');
            });
    }
    //查询
    function select() {
        $.post(
                'server/selectall.php', {},
                function(data, textStatus, xhr) {
                    showNotes('.notes');
                    showData(data);
                })
            .fail(function() {
                showNotes('.notef');
            });
    }
    //删除
    function delete1(n) {
        if (confirm("确认删除？")) {
            $.post(
                    'server/delete.php', {
                        'newsid': n
                    },
                    function(data, textStatus, xhr) {
                        showNotes('.notes');
                        showData(data);
                    })
                .fail(function() {
                    showNotes('.notef');
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
