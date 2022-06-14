$(function () {

    $('#link_reg').on('click', () => {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    $('#link_login').on('click', () => {
        $('.login-box').show()
        $('.reg-box').hide()
    })


    // 从layui中获取form
    let form = layui.form
    form.verify({
        // 自定义校验规则
        pwd: [/^[\S]{6,12}$/, '密码六到12位不能有空格'],
        // 校验两次密码是否一致
        repwd: function (value) {
            let val = $('.reg-box [name=repassword]').val()
            if (val !== value) {
                return '两次密码不一致'
            }
        }
    })


    // post注册
    let layer = layui.layer

    $('#reg-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: 'http://www.liulongbin.top:3007/api/reguser',
            data: {
                username: $('#reg-form [name=username]').val(),
                password: $('#reg-form [name=repassword]').val()
            },
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg('注册成功');
                // 模拟点击行为，触发跳转
                $('#link_login').click()
            }
        })

        // $.post('http://api-breakingnews-web.itheima.net/api/reguser', {
        //     username: $('#reg-form [name=username]').val(),
        //     password: $('#reg-form [name=repassword]').val()
        // },
        //     function (res) {
        //         if (res.status !== 0) {
        //             return console.log(res.message);
        //         }
        //         console.log('成功');
        //     })







    })


    // post登陆
    $('#login-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: 'http://www.liulongbin.top:3007/api/login',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg('登陆成功');
                // 把请求头存储在本地   token用于有权限接口的身份认证
                localStorage.setItem('token', res.token)
                console.log(res.token);
                location.href = './index.html'
            }
        })
    })
})
