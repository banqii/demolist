$(document).ready(function() {
    $("#tab li").each(function(index) {
        var liNode = $(this);
        liNode.mouseover(function() {
            timeoutid = setTimeout(function() {
                $("div.content").removeClass("content");
                $("#tab li.tabin").removeClass("tabin");
                $("div").eq(index).addClass("content");
                liNode.addClass("tabin");
            }, 300);
        }).mouseout(function() {
            clearTimeout(timeoutid);
        });
    });
});
