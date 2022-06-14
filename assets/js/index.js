$(function () {
    getUseriInfo()
    let layer = layui.layer
    $('#btnLogout').on('click', function () {
        layer.confirm('是否退出', { icon: 3, title: '提示' }, function (index) {

            // 点击确认之后才会执行这个函数

            localStorage.removeItem('token')
            location.href = './login.html'


            // 关闭询问框
            layer.close(index);
        });
    })
})

// 获取用户信息
function getUseriInfo() {
    $.ajax({
        type: 'GET',
        url: 'http://www.liulongbin.top:3007/my/userinfo',
        // 请求头配置对象
        headers: {

            Authorization: localStorage.getItem('token') || ''

        },
        success: function (res) {
            console.log(res);
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败')
            }
            // 调用函数渲染头像
            userlogo(res.data)
        },
        // COMPLETE回调函数，无论失败还是成功，最后一步都是调用这个函数
        complete: function (res) {
            console.log(res);
            if (res.responseJSON.status == 1) {
                localStorage.removeItem('token')
                location.href = './login.html'
            }
        }
    })
}

function userlogo(user) {
    let name = user.nickname || user.username
    $('#welcome').html('欢迎&nbsp;' + name)
    if (user.user_pic == null) {
        $('.layui-nav-img').hide()
        let first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    } else {
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    }
}