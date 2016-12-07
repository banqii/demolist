// 加 md5
fis.match('*.{js,css,png,ico}', {
  useHash: true
});

// 启用 fis-spriter-csssprites 插件
fis.match('::package', {
  spriter: fis.plugin('csssprites')
});

// 对 CSS 进行图片合并
fis.match('*.css', {
  // 给匹配到的文件分配属性 `useSprite`
  useSprite: true
});

fis.match('*.js', {
  // fis-optimizer-uglify-js 插件进行压缩，已内置
  optimizer: fis.plugin('uglify-js')
});

fis.match('*.css', {
  // fis-optimizer-clean-css 插件进行压缩，已内置
  optimizer: fis.plugin('clean-css')
});

fis.match('*.png', {
  // fis-optimizer-png-compressor 插件进行压缩，已内置
  optimizer: fis.plugin('png-compressor')
});






// fis.config.merge({
//     roadmap : {
//         domain : {
//             //所有css文件添加http://localhost:8080作为域名
//             '**.css' : 'http://localhost:8080'
//         },
//         path : [
//             {
//                 //所有的js文件
//                 reg : '**.js',
//                 //发布到/static/js/xxx目录下
//                 release : '/static/js$&'
//             },
//             {
//                 //所有的css文件
//                 reg : '**.css',
//                 //发布到/static/css/xxx目录下
//                 release : '/static/css$&'
//             },
//             {
//                 //所有image目录下的.png，.gif文件
//                 reg : /^\/images\/(.*\.(?:png|gif))/i,
//                 //发布到/static/pic/xxx目录下
//                 release : '/static/pic/$1'
//             }
//         ]
//     }
// });