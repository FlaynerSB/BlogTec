$(document).ready(function() {

    let loginHTML;

    const prepareLogin = function() {

        $("#loginnow").click(sendlogin);
        $("#login input").keypress(function(e) {
            if (e.which == 13) {
                sendlogin();
            }
        });

    };

    const loginComplete = function() {

        $("body").removeClass("modal-open");
        $("#login, .modal-backdrop").fadeOut(400, function() {
            $(this).remove();
        });
        $("#loginclick").replaceWith(
            $("<span>").text(localStorage.getItem("user")),
            $("<a>", { href: "#" }).text("Logout").click(function() {
                localStorage.removeItem("logged");
                localStorage.removeItem("user");
                localStorage.removeItem("password");
                localStorage.removeItem("remember");
                $(".fixed-top .form-inline").empty().append(loginHTML.button);
                $("body").prepend(loginHTML.modal);
                prepareLogin();
            })
        );

    };

    const sendlogin = function() {
        const email = $("#login #email").val();
        const password = $("#login #pwd").val();
        if ((email) && (password)) {

            localStorage.setItem("logged", true);
            localStorage.setItem("user", email);
            localStorage.setItem("password", password);
            localStorage.setItem("remember", $("#login #remember").is(":checked"));
            loginComplete();

        }
    };

    var startTinypage = {
        count: 0,
        start: function() {
            if (startTinypage.count < 1) {
                startTinypage.count++;
            } else {

                $("body").addClass("pageLoaded");

                if (localStorage.logged == "true") {
                    loginComplete();
                } else {
                    prepareLogin();
                }

            }
        }
    };

    $.ajax({
        url: "./template/navbar.html"
    }).done(function(data) {

        data = jQuery.parseHTML(data);

        loginHTML = {
            modal: $("<div>", { id: "login", class: "modal" }).append(
                $(data).clone().find(".modal-dialog")
            ),
            button: $(data).clone().find("#loginclick")
        };

        $("body").prepend(data);

        startTinypage.start();

    }).fail(function() {
        startTinypage.start();
    });

    $.ajax({
        url: "./template/footer.html"
    }).done(function(data) {
        $("body").append(data);
        startTinypage.start();
    }).fail(function() {
        startTinypage.start();
    });

});