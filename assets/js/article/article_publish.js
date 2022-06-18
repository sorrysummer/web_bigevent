$(function () {
    let layer = layui.layer
    let form = layui.form
    //  获取列表
    initcase()
    initEditor()
    function initcase() {
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

                let htmlStr = template('publishtpl', res)
                $('[name=cate_id]').html(htmlStr)

                // 调用render重新渲染
                form.render()
            }
        })
    }

    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)

    $('#btn-file').on('click', function () {
        $('#file').click()
    })

    // 监听选择文件夹的change事件
    $('#file').on('change', function (e) {

        let file = e.target.files[0]
        if (file.length === 0) {
            return
        }
        let newImgURL = URL.createObjectURL(file)
        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', newImgURL)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域

    })

    let art_state = '已发布'
    $('#draft').on('click', function () {
        art_state = '草稿'
    })
    $('#publish').on('submit', function (e) {
        e.preventDefault()
        // 快速创建formdata对象
        let fd = new FormData($(this)[0])
        fd.append('state', art_state)
        $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function (blob) {
                fd.append('cover_img', blob)
                publish(fd)
            })
        // fd.forEach(function (value, key) {
        //     console.log(key, value);
        // })

    })
    function publish(fd) {
        $.ajax({
            type: 'POST',
            url: 'http://www.liulongbin.top:3007/my/article/add',
            // 添加formdata格式数据，必须添加两个必要属性
            headers: {
                Authorization: localStorage.getItem('token')
            },
            data: fd,
            contentType: false,
            processData: false,
            success: function (res) {

                if (res.status !== 0) {
                    return layer.msg('发布失败')
                }


            }
        })
    }
})