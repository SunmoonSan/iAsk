jQuery(document).ready(function($) {
	/* box icon */
	jQuery(".box_icon").each(function () {
		var box_icon = jQuery(this);
		var icon_align = box_icon.find(".icon_i > span").attr("icon_align");
		var icon_size = box_icon.find(".icon_i > span").attr("icon_size");
		
		if (icon_align == "left") {
			box_icon.find(".icon_i").css({"display":"inherit"});
			if (box_icon.find(".icon_i > span").hasClass("icon_soft_r") || box_icon.find(".icon_i > span").hasClass("icon_square") || box_icon.find(".icon_i > span").hasClass("icon_circle")) {
				box_icon.find(".box_text").css({"padding-right":parseFloat(icon_size)+25+"px","padding-left":"0"});
			}else if (box_icon.find(".icon_i span[class^='icons']").length == 1) {
				box_icon.find(".box_text").css({"padding-right":41+"px","padding-left":"0"});
			}else {
				box_icon.find(".box_text").css({"padding-right":parseFloat(icon_size/2)+15+"px","padding-left":"0"});
			}
			
			box_icon.find(".icon_i > span").addClass("f_left");
		}else if (icon_align == "right") {
			box_icon.find(".icon_i").css({"display":"inherit"});
			
			if (box_icon.find(".icon_i > span").hasClass("icon_soft_r") || box_icon.find(".icon_i > span").hasClass("icon_square") || box_icon.find(".icon_i > span").hasClass("icon_circle")) {
				box_icon.find(".box_text").css({"padding-left":parseFloat(icon_size)+25+"px","padding-right":"0"});
			}else if (box_icon.find(".icon_i span[class^='icons']").length == 1) {
				box_icon.find(".box_text").css({"padding-left":41+"px","padding-right":"0"});
			}else {
				box_icon.find(".box_text").css({"padding-left":parseFloat(icon_size/2)+15+"px","padding-right":"0"});
			}
			
			box_icon.find(".icon_i > span").addClass("f_right");
		}else if (icon_align == "center") {
			box_icon.find(".icon_i").addClass("t_center");
		}
	});
});