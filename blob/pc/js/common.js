/*
* 社区主入口
* */
layui.define(['layer', 'laytpl', 'element', 'carousel'], function (exports) {

  var $ = layui.jquery,
    layer = layui.layer,
    carousel = layui.carousel,
    device = layui.device();

  //阻止IE7以下访问
  if (device.ie && device.ie < 8) {
    layer.alert('如果您非得使用 IE 浏览器访问Fly社区，那么请使用 IE8+');
  }


  //request底层公共方法封装
  var request = function (type, url, data, success) {
    return $.ajax({
      type: type || 'post',
      dataType: 'json',
      data: data,
      url: url,
      success: function (res) {
        if (res.status === 0) {
          success && success(res);
        } else {
          layer.msg(res.msg || res.code);
        }
      }, error: function (e) {
        layer.msg('请求异常，请重试');
      }
    })
  };


  //首页轮播图
  var ins = carousel.render({
    elem: '#topBanner',
    height: '172px',
    width: '100%',
    arrow: 'hover',
    anim: 'fade'
  });
  var resizeTopline = function () {
    var width = $(this).prop('innerWidth');
    if (width >= 1200) {
      ins.reload({
        height: '172px'
      });
    } else if (width >= 992) {
      ins.reload({
        height: '141px'
      });
    } else if (width >= 768) {
      ins.reload({
        height: '166px'
      });
    }
  };
  resizeTopline();
  $(window).on('resize', resizeTopline);


  //弹出搜索框
  $('.fly-search').on('click', function () {
    layer.open({
      type: 1,
      title: false,
      closeBtn: false,
      shadeClose: true,
      maxWidth: 10000,
      skin: 'fly-layer-search',
      content: ['<form action="http://cn.bing.com/search">', '<input autocomplete="off" placeholder="搜索内容，回车跳转" type="text" name="q">', '</form>'].join(''),
      success: function (layero) {
        var input = layero.find('input');
        input.focus();
        layero.find('form').submit(function () {
          var val = input.val();//input的值
          if (val.replace(/\s/g, '') === '') {
            return false;//为空则返回
          }
          input.val('site:layui.com ' + input.val());
        });
      }
    })
  });


  //回到顶部
  $('.fly-go-top').on('click', function () {
    $('html , body').animate({scrollTop: 0}, 'fast');
  });


  //返回上一页
  $('.fly-go-back').on('click', function () {
    window.history.go(-1);
  });


  //移动端点击弹出侧边栏
  var treeMobile = $('.site-tree-mobile'), shadeMobile = $('.site-mobile-shade');
  treeMobile.on('click', function () {
    $('body').addClass('site-mobile');
  });
  shadeMobile.on('click', function () {
    $('body').removeClass('site-mobile');
  });


  //个人中心 - 取消收藏
  $('.fly-collect-box .layui-icon').on('click', function () {
    $(this).parent().remove();
    // 发送指令、取消收藏
    request('post','url',{id:'1'},function (res) {
      console.log('删除啦');
    })
  });

  //文章页面
  //收藏和取消收藏
  $('.fly-news-collect-icon').on('click',function () {
    if($(this).is('.layui-icon-rate')){
      // 收藏
      $(this).removeClass('layui-icon-rate').addClass('layui-icon-rate-solid');
      // 发送指令
    }else {
      //取消收藏
      $(this).removeClass('layui-icon-rate-solid').addClass('layui-icon-rate');
      // 发送指令
    }

  });

  exports('fly');

});