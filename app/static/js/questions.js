$(document).ready(function() {
    $("#nav-question").addClass("current_page_item");
    $("#submit").click(function(){
        var content = $("#comment").val();
        $.post(
            $("#reply-info").attr("qs-url"),
            {
                "rid": $("#reply-info").attr("rid"),
                "rtype": $("#reply-info").attr("rtype"),
                "content": content
            },
            function(data) {
                $("#reply-info").attr("rtype", "1");
                if(data.status == "success") {
                    window.location.reload();
                } else {
                                                                                                                alert(data.info);
                                                                                                                            }
                }
            );
                                    });

    $("[id=reply-answer]").click(function(){
                $("#reply-info").attr("rtype", "2");
                $("#reply-info").attr("rid", $(this).attr("ans-id"));
                console.log($("#reply-info").attr("rid"));
            });
});
