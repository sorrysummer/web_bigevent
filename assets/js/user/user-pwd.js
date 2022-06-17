$(function () {
    let form = layui.form
    let layer = layui.layer
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码六到12位不能有空格'],
        // 校验两次密码是否一致
        // value值为你赋予哪个文本框，就获取哪个值
        repwd: function (value) {

            let val = $('.layui-input-block [name=oldPwd]').val()
            if (val == value) {
                return '两次密码不能一致'
            }

        },
        samepwd: function (value) {
            let val = $('.layui-input-block [name=newPwd]').val()
            if (value !== val) {
                return '两次密码不一致'
            }
        }
    })


    $('#reset').on('click', function () {
        // 转换成dom对象然后调用reset方法
        // $('#reset').[0].reset()
        $(this).serialize('')
    })
    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            type: 'POST',
            url: 'http://www.liulongbin.top:3007/my/updatepwd',
            headers: {
                Authorization: localStorage.getItem('token')
            },
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('失败')
                }
                layer.msg('成功')
            }

        })
    })
})
