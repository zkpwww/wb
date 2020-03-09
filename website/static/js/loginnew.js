;
(function () {
    $(function () {
        $("#login-box").addClass("animated zoomIn")

        var method = $("#method").val();
        var $num = $("#num")
        var $qrcode = $("#qrcode")

        var $btn = $('#btnToggle')
        var btnBgUrl = $btn.css('background-image')
        var btnBgUrlWxcode = btnBgUrl.replace(/phone/g, 'wxcode')
        var btnBgUrlPhone = btnBgUrl.replace(/wxcode/g, 'phone')

        if (method == 1) {
            $num.hide();
            $qrcode.show();
            $btn.css('background-image', btnBgUrlPhone)
        }

        // 切换账号/微信登录
        $btn.click(function () {
            var currTarget = $(this)
            if (currTarget.css('background-image').indexOf('wxcode') > -1) {
                currTarget.css('background-image', btnBgUrlPhone)
                $num.hide();
                $qrcode.show();
            } else {
                currTarget.css('background-image', btnBgUrlWxcode)
                $num.show();
                $qrcode.hide();
            }
        })

        //登陆
        $("#login").on("click", function () {
            ValidateLogins()
        })
        //enter键登陆
        $("#bodykey").on("keyup", function () {
            keyLogin()
        })

        function keyLogin() {
            if (event.keyCode == 13) //回车键的键值为13
                ValidateLogins(); //调用登录按钮的登录事件
        }

        //扫描登录
        function wxLogin() {
            var key = $('#sessid').val();
            $.ajax({
                type: "POST",
                url: "/dzhome/wxlogin",
                xhrFields: {
                    withCredentials: true
                },
                data: {
                    wxkey: key
                },
                success: function (data) {
                    if (data.success) {
                        var gourl = "";
                        var cookiekey = "";
                        if (data.code == "-2") {
                            gourl = "/dzhome/wxreg";
                            cookiekey = "regphoneuserid";
                        } else {
                            gourl = "/admin/casetemplate";
                            cookiekey = "dz_UserCookieNew";
                        }

                        var domain = window.location.host;
                        if (domain.indexOf("www.") != -1) {
                            domain = domain.replace("www.", ".");
                        }

                        $.cookie(cookiekey, data.msg, {
                            expires: 7,
                            path: '/',
                            domain: domain
                        });

                        $.cookie("masterAuth", data.authToken, {
                            expires: 7,
                            path: '/',
                            domain: domain
                        });

                        window.location.href = gourl;
                    }
                }
            });
        }
        setInterval(wxLogin, 1000);


        //登录验证
        function ValidateLogins() {
            var userName = $("#user_name").val();
            var passWord = $("#user_pwd").val();
            var $error = $("#error")
            var $warning = $("#warning")

            $warning.click(function () {
                $(this).removeClass('show')
            })

            if (userName == "") {
                $error.html("账号不能为空");
                $warning.addClass('show')
                return;
            }

            if (passWord == "") {
                $error.html("密码不能为空");
                $warning.addClass('show')
                return;
            }

            $.ajax({
                url: "/dzhome/DZLoginAjax",
                type: "post",
                data: {
                    userName: userName,
                    passWord: passWord,
                    isKeep: true,
                    backurl: ""
                },
                dataType: "json",
                success: function (data) {
                    if (data.success) {

                        var url = window.location.host;
                        var domain = "";
                        if (url.indexOf("www.") != -1) {
                            domain = url.replace("www.", ".");
                        } else {
                            domain = "." + url;
                        }


                        $.cookie("dz_UserCookieNew", data.msg, {
                            expires: 7,
                            path: '/',
                            domain: domain
                        });

                        $.cookie("masterAuth", data.authToken, {
                            expires: 7,
                            path: '/',
                            domain: domain
                        });

                        window.location.href = "/admin/casetemplate";
                    } else {
                        if (data.code == 1) {
                            $error.html("您输入的账号不存在");
                            $warning.addClass('show')
                        } else if (data.code == 2) {
                            $error.html("您输入的密码与账号不匹配");
                            $warning.addClass('show')
                        }
                    }
                }
            });
        }
    })
})()