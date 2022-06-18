$(function () {
    let layer = layui.layer
    let form = layui.form
    let laypage = layui.laypage
    // 定义美化时间的过滤器
    template.defaults.imports.dataFormat = function (date) {
        let dt = new Date(date)
        let y = padzero(dt.getFullYear())
        let m = padzero(dt.getMonth() + 1)
        let d = padzero(dt.getDate())
        let hh = padzero(dt.getHours())
        let mm = padzero(dt.getMinutes())
        let ss = padzero(dt.getSeconds())
    }
    function padzero(n) {
        n > 9 ? n : '0' + n
    }

    // 定义查询参数对象，用于发送请求参数
    let q = {
        pagenum: 2,
        pagesize: 2,
        cate_id: '',
        state: '',
    }
    initArticleData()
    initCate()
    function initArticleData() {
        $.ajax({
            type: 'GET',
            url: 'http://www.liulongbin.top:3007/my/article/list',
            headers: {
                Authorization: localStorage.getItem('token')
            },
            data: q,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取数据失败')
                }
                console.log(res);
                let htmlStr = template('tpl', res)
                $('tbody').html(htmlStr)
                renderPage(res.total)
            }
        })
    }



    // 获取文章分类列表

    function initCate() {
        $.ajax({
            type: 'GET',
            url: "http://www.liulongbin.top:3007/my/article/cates",
            headers: {
                Authorization: localStorage.getItem('token')
            },
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取列表失败')
                }
                console.log(res);
                let htmlStr = template('listtpl', res)
                $('[name=cate_id]').html(htmlStr)
                form.render()
            }
        })
    }
    $('#form-search').on('submit', function (e) {
        e.preventDefault()
        let cate_id = $('[name=cate_id]').val()
        let state = $('[name=state]').val()
        q.cate_id = cate_id
        q.state = state
        initArticleData()

    })



    // 渲染分页
    function renderPage(total) {
        laypage.render({
            elem: 'page',
            count: total,
            limit: q.pagesize,
            curr: q.pagenum,
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            limits: [2, 3, 5, 10],
            // 分页切换触发回调
            jump: function (obj, first) {
                // 如果是render触发，first=true
                // 如果通过点击触发jump，first=undefined
                q.pagenum = obj.curr
                q.pagesize = obj.limit
                console.log(first);
                if (!first) {
                    initArticleData()
                }


            }
        })
    }



    // 编辑删除
    $('tbody').on('click', '#delete', function () {
        console.log(11);
    })
})