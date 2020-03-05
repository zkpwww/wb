jQuery(function(){
	/*网站二级菜单栏的显示隐藏*/
	var header_timer=0;
	jQuery('#header_nav .nav li').hover(
		function(){
			clearTimeout(header_timer);
			jQuery('#header_nav').fadeIn();
			jQuery(this).find('dl').stop().slideDown('fast');	
		},
		function(){
			header_timer=setTimeout(function(){jQuery('#header_mask').fadeOut();},500);
			jQuery(this).find('dl').stop().slideUp('fast');
		}
	);
	//回到顶部
	(function () {
		var top=$(".gotop");
		top.click(function(){
			$("html,body").animate({scrollTop:0},500);
		});
		var totop = $(".floatrg");
		$(window).scroll(function(){
			if($(window).scrollTop() > 600){
				totop.show()
			}else {
				totop.hide()
			}
		});
	})();
	//回到顶部
	(function () {
		var wrap = $(".fixed-service");
		var item = wrap.find(".service-item");
		var totop = item.filter(".service-top");
		totop.hide();
		totop.click(function(){
			$("html,body").animate({scrollTop:0},500);
		});
		$(window).scroll(function(){
			if($(window).scrollTop() > 600){
				totop.show()
			}else {
				totop.hide()
			}
		});
	})();
	//显示隐藏右侧菜单
	$(".floatrg ul li").hover(function () {
		$(this).find("div").show();
	},function () {
		$(this).find("div").hide();
	});
	$('#flclose').click(function () {
		$(this).parents(".msgbox").hide();
	})

});
//顶部菜单栏变化
jQuery(window).scroll(function(){
	if(jQuery(window).scrollTop()>300){
		jQuery('#header_nav .wrap').addClass('header_abs');
	}else{
		jQuery('#header_nav .wrap').removeClass('header_abs');
	}
});


