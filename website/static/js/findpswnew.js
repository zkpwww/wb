;
(function () {
    $(function () {
        $("#findPsw-box").addClass("animated zoomIn")

        // btn-next init
        var $next = $('#next')
        $next.click(function () {
            var $this = $(this)
            var currStep = $this.attr('data-step')

            //事件分发
            if (currStep === '1') {
                checkCode($this);
            } else if (currStep === '2') {
                checkPwd($this)
            } else if (currStep === '3') {
                goLogin()
            }
        }) 


        // 错误提示 init
        var $error = $('#error')
        var $warning = $('#warning')

        $warning.click(function () {
            $(this).removeClass('show')
        })

        function showError(msg) {
            $error.html(msg);
            $warning.addClass('show')
        }

        /**
         * 第一步
         */
        function checkPhone(phone) {
            if (phone == '') {
                showError('手机号不能为空')
                return false;
            }

            if (!(/^1[34578]\d{9}$/.test(phone))) {
                showError('请输入正确的手机号')
                return false;
            }

            return true
        }

        // 低级趣味
        var timer = null;

        function setTimer($el, second, initcount, fn) {
            var initcount$ = initcount
            var $processElm = $el
            $processElm.html(initcount + "秒");
            timer = setInterval(function () {
                initcount -= second;
                $processElm.html(initcount + "秒");
                if (initcount <= 0) {
                    clearInterval(timer)
                    fn.call(null, $processElm)
                    initcount = initcount$;
                    timer = null;
                }
            }, second * 1000)
        }


        //发送验证码 core
        function sendValidCode(id) {
            if (timer !== null) {
                return;
            }

            var phone = $("#phone").val().trim();
            if (!checkPhone(phone)) return;

            $.post("/dzhome/GetVaildCode", {
                phonenum: phone,
                type: 0
            }, function (data) {
                if (data.isok) {
                    layer.msg("发送成功");

                    var $sendCode = $("#" + id)
                    $sendCode.css("color", "#DCDCDC")
                    //启动计时器
                    setTimer($sendCode, 1, 60, function ($el) {
                        $el.html("重新获取");
                        $el.css("color", "#3296FA")
                    });
                } else {
                    showError(data.Msg)
                }
            })
        }


        // 发送验证码 listener
        $("#btn-send").bind("click", function () {
            var id = this.id;
            sendValidCode(id);
        })

        // 提交验证码
        function checkCode($el) {
            var phone = $("#phone").val().trim();
            if (!checkPhone(phone)) return;

            var code = $("#code").val().trim();
            if (code == "") {
                showError('请输入验证码')
                return;
            }

            $.post("/dzhome/CheckVaildCode", {
                phonenum: phone,
                code: code
            }, function (data) {
                if (data.code == 1) {
                    $el.attr('data-step', 2)
                    $('.findPswBox-stepTitle-step')[1].className += ' active';
                    $('.first').hide()
                    $('.second').show()
                } else {
                    showError(data.Msg)
                }
            })
        }


        /**
         * 第二步
         */
        function checkPwd($el) {
            var pwdValue = $('#pwd').val().trim()
            var pwdValue$ = $('#pwdRepeat').val().trim()

            if (pwdValue == '') {
                showError('密码不能为空')
                return;
            }

            if (pwdValue !== pwdValue$) {
                showError('两次密码输入不一致')
                return;
            }


            var code = $("#code").val().trim();
            var phone = $("#phone").val().trim();

            $.post("/dzhome/SaveUserInfo", {
                phone: phone,
                password: pwdValue,
                code: code,
                type: 0
            }, function (data) {
                if (data.isok) {
                    $el.attr('data-step', 3)
                    $el.text('立刻登录')

                    $('.findPswBox-stepTitle-step')[2].className += ' active';
                    $('.second').hide()
                    $('.third').show()

                    setTimer($("#cutTime"), 1, 5, goLogin);
                } else {
                    showError(data.Msg)
                }
            })
        }


        /**
         * 第三步
         */
        function goLogin() {
            window.location.href = "/dzhome/login";
        }
























































        // //第一步
        // $("#phonenext").bind("click", function () {
        //     checknext();
        // })

        // function checknext() {
        //     $("#warning").css("display", "none");
        //     var phone = $("#phone").val();
        //     if (phone == '') {
        //         $("#warning").html("手机号不能为空");
        //         $("#warning").css("display", "block");
        //         return;
        //     }
        //     if (!(/^1[34578]\d{9}$/.test(phone))) {
        //         $("#warning").html("请输入正确的手机号");
        //         $("#warning").css("display", "block");
        //         return;
        //     }

        //     var code = $("#code").val().trim();
        //     if (code == "") {
        //         $("#warning").html("请输入验证码");
        //         $("#warning").css("display", "block");
        //         return;
        //     }

        //     $.post("/dzhome/CheckVaildCode", {
        //         phonenum: phone,
        //         code: code
        //     }, function (data) {
        //         if (data.code == 1) {
        //             $("#sline").removeClass("line-color01");
        //             $("#sline").addClass("line-color02");

        //             $("#sbkimg").removeClass("fpsw-step01");
        //             $("#sbkimg").addClass("fpsw-step02");

        //             $("#sfontcolor").addClass("fp-font-blue");

        //             $("#fli").css("display", "none");
        //             $("#sli").css("display", "");
        //         } else {
        //             $("#warning").html(data.Msg);
        //             $("#warning").css("display", "block");
        //         }
        //     })
        // }

        // //发送验证码
        // $("#btnMsg").bind("click", function () {
        //     var id = this.id;
        //     sendValidCode(id);
        // })



        // //第二步
        // $("#resetpwdnext").bind("click", function () {
        //     resetpwdnext();
        // })

        // function resetpwdnext() {
        //     $("#swarning").css("display", "none");
        //     var password = $("#password").val();
        //     if (password == '') {
        //         $("#swarning").html("请输入密码");
        //         $("#swarning").css("display", "block");
        //         return;
        //     }

        //     var password2 = $("#password2").val().trim();
        //     if (password2 == "") {
        //         $("#swarning").html("重复密码不能为空");
        //         $("#swarning").css("display", "block");
        //         return;
        //     }
        //     if (password != password2) {
        //         $("#swarning").html("两次密码不一致，请重新输入");
        //         $("#swarning").css("display", "block");
        //         //alertmsg("两次密码不一致，请重新输入");
        //         return;
        //     }
        //     var code = $("#code").val().trim();
        //     var phone = $("#phone").val().trim();

        //     $.post("/dzhome/SaveUserInfo", {
        //         phone: phone,
        //         password: password,
        //         code: code,
        //         type: 0
        //     }, function (data) {
        //         if (data.isok) {
        //             $("#tbkimg").removeClass("fpsw-step01");
        //             $("#tbkimg").addClass("fpsw-step02");

        //             $("#tfontcolor").addClass("fp-font-blue");

        //             $("#sli").css("display", "none");
        //             $("#tli").css("display", "");

        //             timerseconds = 5;
        //             var id = "miao";
        //             timer = setInterval(function () {
        //                 timerseconds -= 1;
        //                 $("#" + id)[0].innerHTML = timerseconds;
        //                 if (timerseconds <= 0) {
        //                     clearInterval(timer)
        //                     timer = 0;
        //                     window.location.href = "/dzhome/login";
        //                 }
        //             }, 1000)
        //         } else {
        //             $("#swarning").html(data.Msg);
        //             $("#swarning").css("display", "block");
        //         }
        //     })
        // }
    })

})()