$(document).ready(function(){
    // 初始化正文位置
    window.onload = function() {
            document.getElementById("purchase").className = "purchasehide purchase pos";
            document.getElementById("warehouse").className = "warehouse pos";
            document.getElementById("sale").className = "salehide sale pos";
        }
        // 正文切换

    $("#ptransform").on("click", function() {
        document.getElementById("purchase").className = "purchase pos";
        document.getElementById("warehouse").className = "warehousehide warehouse pos";
        document.getElementById("sale").className = "salehide sale pos";
        //clearfunction();
    });
    $("#wtransform").on("click", function() {
        document.getElementById("purchase").className = "purchasehide purchase pos";
        document.getElementById("warehouse").className = "warehouse pos";
        document.getElementById("sale").className = "salehide sale pos";
        $("#loader").load("views/htm/warehouseindex.htm");
    });
    $("#stransform").on("click", function() {
        document.getElementById("purchase").className = "purchasehide purchase pos";
        document.getElementById("warehouse").className = "warehousehide warehouse pos";
        document.getElementById("sale").className = "sale pos";
        //clearfunction();
    });
    // 仓库管理的入`出`盘切换
    // 初始化新建单据按钮
    function clearfunction(){
        var a = document.getElementById("inwarehouse");
        var b = document.getElementById("outwarehouse");
        var c = document.getElementById("chackwarehouse");
        a.style.display = "none";
        b.style.display = "none";
        c.style.display = "none";
    }
    $("#inwarehouseb").on("click", function(){
        $("#loader").load("views/htm/inwarehouse.htm");
    });
    $("#outwarehouseb").on("click", function(){
        $("#loader").load("views/htm/outwarehouse.htm");
    });
    $("#chackwarehouseb").on("click", function(){
        $("#loader").load("views/htm/chackwarehouse.htm");
    });
    
    //详情
//  function det(inwareid){
//      $.post("server.java", {inware_id:inwareid}, function(){
//          $(".delileload").;
//      });
//  }
    
});

