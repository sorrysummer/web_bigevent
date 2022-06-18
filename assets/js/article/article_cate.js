

$(function () {
    let layer = layui.layer
    let form = layui.form
    // 获取文章列表
    initArticleList()
    function initArticleList() {
        $.ajax({
            type: 'GET',
            url: 'http://www.liulongbin.top:3007/my/article/cates',
            headers: {
                Authorization: localStorage.getItem('token')
            },
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取失败')
                }
                // 获得模板字符串
                let htmlStr = template('tpl', res)
                $('tbody').html(htmlStr)
            }
        })
    }
    let index = null
    $('#btnAdd').on('click', function () {
        index = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类'
            ,
            // 用模板引擎获取html结构赋值给content
            content: $('#btnAddTpl').html()
        });
    })


    // 通过代理方式为表单添加提交事件
    $('body').on('submit', '#addform', function (e) {
        e.preventDefault()
        $.ajax({
            type: 'POST',
            url: 'http://www.liulongbin.top:3007/my/article/addcates',
            headers: {
                Authorization: localStorage.getItem('token')
            },
            data: $('.layui-form').serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('添加失败')
                }
                layer.msg('添加成功')
                initArticleList()
                layer.close(index)
            }
        })

    })
    let indexedit = null
    $('tbody').on('click', '#edit', function () {
        indexedit = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '修改文章分类'
            ,
            // 用模板引擎获取html结构赋值给content
            content: $('#edittpl').html()
        });
        let id = $(this).attr('data-Id')
        $.ajax({
            type: 'GET',
            url: 'http://www.liulongbin.top:3007/my/article/cates/' + id,
            headers: {
                Authorization: localStorage.getItem('token')
            },
            success: function (res) {
                if (res.status !== 0) {
                    return
                }
                form.val('editform', res.data)
            }
        })
    })
    $('body').on('submit', '#editform', function (e) {
        e.preventDefault()
        $.ajax({
            type: 'POST',
            url: 'http://www.liulongbin.top:3007/my/article/updatecate',
            headers: {
                Authorization: localStorage.getItem('token')
            },
            data: $('#editform').serialize(),
            success: function (res) {
                if (res.status === 0) {
                    layer.msg('更新信息分类成功')
                    initArticleList()
                    layer.close(indexedit)
                }
            }
        })
    })
    $('tbody').on('click', '#delete', function () {
        let id = $(this).attr('data-id')

        layer.confirm('是否删除', { icon: 3, title: '提示' }, function (index) {

            $.ajax({
                type: 'GET',
                url: 'http://www.liulongbin.top:3007/my/article/deletecate/' + id,
                headers: {
                    Authorization: localStorage.getItem('token')
                },
                success: function (res) {

                    if (res.status !== 0) {
                        return layer.msg('删除失败')

                    }
                    layer.msg('删除成功')
                    layer.close(index)
                    initArticleList()
                }
            })

        });
    })
})