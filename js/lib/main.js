//配置模块
//第三方文件

require.config({
    paths: {
        'jquery': 'https://cdn.bootcdn.net/ajax/libs/jquery/1.12.4/jquery.min',
        'cookie': './cookie',
        'lazy': './jquery.lazyload',
        'pagination': '../lib/jquery.pagination'
    },
    shim: {
        'lazy': ['jquery']
    }
});
//加载模块
require(['jquery', 'cookie'], function($, cookie) {
    let mod = $('#currentpage').attr('currentmod'); //获取script标签下面的属性值
    // console.log(mod)
    if (mod) {
        //如果mod存在，加载对应的模块
        require([mod], function(modlist) {
            modlist.init();
        });
    }
});