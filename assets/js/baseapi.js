// 在发起get post ajax请求之前会进行拼接

$.ajaxPrefilter(function (options) {

    // 请求头
    // if (options.url.indexof('/my/') !== -1) {
    //     options.headers = {
    //         Authorization: localStorage.getItem('token') || ''
    //     }

    // }

})