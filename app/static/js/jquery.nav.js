/*
 * jQuery One Page Nav Plugin
 * http://github.com/davist11/jQuery-One-Page-Nav
 *
 * Copyright (c) 2010 Trevor Davis (http://trevordavis.net)
 * Dual licensed under the MIT and GPL licenses.
 * Uses the same license as jQuery, see:
 * http://jquery.org/license
 *
 * @version 2.2.0
 *
 * Example usage:
 * $('#nav').onePageNav({
 *   currentClass: 'current',
 *   changeHash: false,
 *   scrollSpeed: 750
 * });
 */

(function(e,t,n,r){var i=function(r,i){this.elem=r;this.$elem=e(r);this.options=i;this.metadata=this.$elem.data("plugin-options");this.$nav=this.$elem.find("a");this.$win=e(t);this.sections={};this.didScroll=false;this.$doc=e(n);this.docHeight=this.$doc.height()};i.prototype={defaults:{currentClass:"active",changeHash:false,easing:"swing",filter:"",scrollSpeed:750,scrollOffset:0,scrollThreshold:.5,begin:false,end:false,scrollChange:false},init:function(){var t=this;t.config=e.extend({},t.defaults,t.options,t.metadata);if(t.config.filter!==""){t.$nav=t.$nav.filter(t.config.filter)}t.$nav.on("click.onePageNav",e.proxy(t.handleClick,t));t.getPositions();t.bindInterval();t.$win.on("resize.onePageNav",e.proxy(t.getPositions,t));return this},adjustNav:function(e,t){e.$elem.find("."+e.config.currentClass).removeClass(e.config.currentClass);t.addClass(e.config.currentClass)},bindInterval:function(){var e=this;var t;e.$win.on("scroll.onePageNav",function(){e.didScroll=true});e.t=setInterval(function(){t=e.$doc.height();if(e.didScroll){e.didScroll=false;e.scrollChange()}if(t!==e.docHeight){e.docHeight=t;e.getPositions()}},250)},getHash:function(e){return e.attr("href").split("#")[1]},getPositions:function(){var t=this;var n;var r;var i;t.$nav.each(function(){n=t.getHash(e(this));i=e("#"+n);if(i.length){r=i.offset().top;t.sections[n]=Math.round(r)-t.config.scrollOffset}})},getSection:function(e){var t=null;var n=Math.round(this.$win.height()*this.config.scrollThreshold);for(var r in this.sections){if(this.sections[r]-n<e){t=r}}return t},handleClick:function(n){var r=this;var i=e(n.currentTarget);var s=i.parent();var o="#"+r.getHash(i);if(!s.hasClass(r.config.currentClass)){if(r.config.begin){r.config.begin()}r.adjustNav(r,s);r.unbindInterval();e.scrollTo(o,r.config.scrollSpeed,{axis:"y",easing:r.config.easing,offset:{top:-r.config.scrollOffset},onAfter:function(){if(r.config.changeHash){t.location.hash=o}r.bindInterval();if(r.config.end){r.config.end()}}})}n.preventDefault()},scrollChange:function(){var e=this.$win.scrollTop();var t=this.getSection(e);var n;if(t!==null){n=this.$elem.find('a[href$="#'+t+'"]').parent();if(!n.hasClass(this.config.currentClass)){this.adjustNav(this,n);if(this.config.scrollChange){this.config.scrollChange(n)}}}},unbindInterval:function(){clearInterval(this.t);this.$win.unbind("scroll.onePageNav")}};i.defaults=i.prototype.defaults;e.fn.onePageNav=function(e){return this.each(function(){(new i(this,e)).init()})}})(jQuery,window,document)