$(document).ready(function() {
    $("#nav-index").addClass("current_page_item");

    $("#submit-button").click(function(){
        var username = $("#username").val();
        var email = $("#email").val();
        var password = $("#password").val();
        var post_url = $("#signup-data").attr("url");
        $.ajax({
            url: post_url,
            type: 'POST',
            data: {
                'username': username,
                'email': email,
                'password': password
            },
            success: function (e) {
                if (e.status === 'success') {
                    $(".panel-pop h2 i").trigger("click");
                }
            }
        });
        // $.post(post_url, {"username": username, "email": email, "password": password}, function(data){
        //     if(data.status=="success"){
        //         $(".panel-pop h2 i").trigger("click");
        //     }
        //     alert(data.info);
        // });
    });
});
