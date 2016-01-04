/* == jquery mousewheel plugin == Version: 3.1.11, License: MIT License (MIT) */
!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):"object"==typeof exports?module.exports=a:a(jQuery)}(function(a){function b(b){var g=b||window.event,h=i.call(arguments,1),j=0,l=0,m=0,n=0,o=0,p=0;if(b=a.event.fix(g),b.type="mousewheel","detail"in g&&(m=-1*g.detail),"wheelDelta"in g&&(m=g.wheelDelta),"wheelDeltaY"in g&&(m=g.wheelDeltaY),"wheelDeltaX"in g&&(l=-1*g.wheelDeltaX),"axis"in g&&g.axis===g.HORIZONTAL_AXIS&&(l=-1*m,m=0),j=0===m?l:m,"deltaY"in g&&(m=-1*g.deltaY,j=m),"deltaX"in g&&(l=g.deltaX,0===m&&(j=-1*l)),0!==m||0!==l){if(1===g.deltaMode){var q=a.data(this,"mousewheel-line-height");j*=q,m*=q,l*=q}else if(2===g.deltaMode){var r=a.data(this,"mousewheel-page-height");j*=r,m*=r,l*=r}if(n=Math.max(Math.abs(m),Math.abs(l)),(!f||f>n)&&(f=n,d(g,n)&&(f/=40)),d(g,n)&&(j/=40,l/=40,m/=40),j=Math[j>=1?"floor":"ceil"](j/f),l=Math[l>=1?"floor":"ceil"](l/f),m=Math[m>=1?"floor":"ceil"](m/f),k.settings.normalizeOffset&&this.getBoundingClientRect){var s=this.getBoundingClientRect();o=b.clientX-s.left,p=b.clientY-s.top}return b.deltaX=l,b.deltaY=m,b.deltaFactor=f,b.offsetX=o,b.offsetY=p,b.deltaMode=0,h.unshift(b,j,l,m),e&&clearTimeout(e),e=setTimeout(c,200),(a.event.dispatch||a.event.handle).apply(this,h)}}function c(){f=null}function d(a,b){return k.settings.adjustOldDeltas&&"mousewheel"===a.type&&b%120===0}var e,f,g=["wheel","mousewheel","DOMMouseScroll","MozMousePixelScroll"],h="onwheel"in document||document.documentMode>=9?["wheel"]:["mousewheel","DomMouseScroll","MozMousePixelScroll"],i=Array.prototype.slice;if(a.event.fixHooks)for(var j=g.length;j;)a.event.fixHooks[g[--j]]=a.event.mouseHooks;var k=a.event.special.mousewheel={version:"3.1.11",setup:function(){if(this.addEventListener)for(var c=h.length;c;)this.addEventListener(h[--c],b,!1);else this.onmousewheel=b;a.data(this,"mousewheel-line-height",k.getLineHeight(this)),a.data(this,"mousewheel-page-height",k.getPageHeight(this))},teardown:function(){if(this.removeEventListener)for(var c=h.length;c;)this.removeEventListener(h[--c],b,!1);else this.onmousewheel=null;a.removeData(this,"mousewheel-line-height"),a.removeData(this,"mousewheel-page-height")},getLineHeight:function(b){var c=a(b)["offsetParent"in a.fn?"offsetParent":"parent"]();return c.length||(c=a("body")),parseInt(c.css("fontSize"),10)},getPageHeight:function(b){return a(b).height()},settings:{adjustOldDeltas:!0,normalizeOffset:!0}};a.fn.extend({mousewheel:function(a){return a?this.bind("mousewheel",a):this.trigger("mousewheel")},unmousewheel:function(a){return this.unbind("mousewheel",a)}})});
/* == malihu jquery custom scrollbar plugin == Version: 3.0.5, License: MIT License (MIT) */
!function(e,t,o){!function(t){var a="function"==typeof define&&define.amd,n="https:"==o.location.protocol?"https:":"http:",r="cdnjs.cloudflare.com/ajax/libs/jquery-mousewheel/3.1.11/jquery.mousewheel.min.js";a||e.event.special.mousewheel||e("head").append(decodeURI("%3Cscript src="+n+"//"+r+"%3E%3C/script%3E")),t()}(function(){var a="mCustomScrollbar",n="mCS",r=".mCustomScrollbar",i={setWidth:!1,setHeight:!1,setTop:0,setLeft:0,axis:"y",scrollbarPosition:"inside",scrollInertia:950,autoDraggerLength:!0,autoHideScrollbar:!1,autoExpandScrollbar:!1,alwaysShowScrollbar:0,snapAmount:null,snapOffset:0,mouseWheel:{enable:!0,scrollAmount:"auto",axis:"y",preventDefault:!1,deltaFactor:"auto",normalizeDelta:!1,invert:!1,disableOver:["select","option","keygen","datalist","textarea"]},scrollButtons:{enable:!1,scrollType:"stepless",scrollAmount:"auto"},keyboard:{enable:!0,scrollType:"stepless",scrollAmount:"auto"},contentTouchScroll:25,advanced:{autoExpandHorizontalScroll:!1,autoScrollOnFocus:"input,textarea,select,button,datalist,keygen,a[tabindex],area,object,[contenteditable='true']",updateOnContentResize:!0,updateOnImageLoad:!0,updateOnSelectorChange:!1,releaseDraggableSelectors:!1},theme:"light",callbacks:{onInit:!1,onScrollStart:!1,onScroll:!1,onTotalScroll:!1,onTotalScrollBack:!1,whileScrolling:!1,onTotalScrollOffset:0,onTotalScrollBackOffset:0,alwaysTriggerOffsets:!0,onOverflowY:!1,onOverflowX:!1,onOverflowYNone:!1,onOverflowXNone:!1},live:!1,liveSelector:null},l=0,s={},c=function(e){s[e]&&(clearTimeout(s[e]),h._delete.call(null,s[e]))},d=t.attachEvent&&!t.addEventListener?1:0,u=!1,f={init:function(t){var t=e.extend(!0,{},i,t),o=h._selector.call(this);if(t.live){var a=t.liveSelector||this.selector||r,d=e(a);if("off"===t.live)return void c(a);s[a]=setTimeout(function(){d.mCustomScrollbar(t),"once"===t.live&&d.length&&c(a)},500)}else c(a);return t.setWidth=t.set_width?t.set_width:t.setWidth,t.setHeight=t.set_height?t.set_height:t.setHeight,t.axis=t.horizontalScroll?"x":h._findAxis.call(null,t.axis),t.scrollInertia=t.scrollInertia>0&&t.scrollInertia<17?17:t.scrollInertia,"object"!=typeof t.mouseWheel&&1==t.mouseWheel&&(t.mouseWheel={enable:!0,scrollAmount:"auto",axis:"y",preventDefault:!1,deltaFactor:"auto",normalizeDelta:!1,invert:!1}),t.mouseWheel.scrollAmount=t.mouseWheelPixels?t.mouseWheelPixels:t.mouseWheel.scrollAmount,t.mouseWheel.normalizeDelta=t.advanced.normalizeMouseWheelDelta?t.advanced.normalizeMouseWheelDelta:t.mouseWheel.normalizeDelta,t.scrollButtons.scrollType=h._findScrollButtonsType.call(null,t.scrollButtons.scrollType),h._theme.call(null,t),e(o).each(function(){var o=e(this);if(!o.data(n)){o.data(n,{idx:++l,opt:t,scrollRatio:{y:null,x:null},overflowed:null,contentReset:{y:null,x:null},bindEvents:!1,tweenRunning:!1,sequential:{},langDir:o.css("direction"),cbOffsets:null,trigger:null});var a=o.data(n).opt,r=o.data("mcs-axis"),i=o.data("mcs-scrollbar-position"),s=o.data("mcs-theme");r&&(a.axis=r),i&&(a.scrollbarPosition=i),s&&(a.theme=s,h._theme.call(null,a)),h._pluginMarkup.call(this),f.update.call(null,o)}})},update:function(t){var o=t||h._selector.call(this);return e(o).each(function(){var t=e(this);if(t.data(n)){var o=t.data(n),a=o.opt,r=e("#mCSB_"+o.idx+"_container"),i=[e("#mCSB_"+o.idx+"_dragger_vertical"),e("#mCSB_"+o.idx+"_dragger_horizontal")];if(!r.length)return;o.tweenRunning&&h._stop.call(null,t),t.hasClass("mCS_disabled")&&t.removeClass("mCS_disabled"),t.hasClass("mCS_destroyed")&&t.removeClass("mCS_destroyed"),h._maxHeight.call(this),h._expandContentHorizontally.call(this),"y"===a.axis||a.advanced.autoExpandHorizontalScroll||r.css("width",h._contentWidth(r.children())),o.overflowed=h._overflowed.call(this),h._scrollbarVisibility.call(this),a.autoDraggerLength&&h._setDraggerLength.call(this),h._scrollRatio.call(this),h._bindEvents.call(this);var l=[Math.abs(r[0].offsetTop),Math.abs(r[0].offsetLeft)];"x"!==a.axis&&(o.overflowed[0]?i[0].height()>i[0].parent().height()?h._resetContentPosition.call(this):(h._scrollTo.call(this,t,l[0].toString(),{dir:"y",dur:0,overwrite:"none"}),o.contentReset.y=null):(h._resetContentPosition.call(this),"y"===a.axis?h._unbindEvents.call(this):"yx"===a.axis&&o.overflowed[1]&&h._scrollTo.call(this,t,l[1].toString(),{dir:"x",dur:0,overwrite:"none"}))),"y"!==a.axis&&(o.overflowed[1]?i[1].width()>i[1].parent().width()?h._resetContentPosition.call(this):(h._scrollTo.call(this,t,l[1].toString(),{dir:"x",dur:0,overwrite:"none"}),o.contentReset.x=null):(h._resetContentPosition.call(this),"x"===a.axis?h._unbindEvents.call(this):"yx"===a.axis&&o.overflowed[0]&&h._scrollTo.call(this,t,l[0].toString(),{dir:"y",dur:0,overwrite:"none"}))),h._autoUpdate.call(this)}})},scrollTo:function(t,o){if("undefined"!=typeof t&&null!=t){var a=h._selector.call(this);return e(a).each(function(){var a=e(this);if(a.data(n)){var r=a.data(n),i=r.opt,l={trigger:"external",scrollInertia:i.scrollInertia,scrollEasing:"mcsEaseInOut",moveDragger:!1,timeout:60,callbacks:!0,onStart:!0,onUpdate:!0,onComplete:!0},s=e.extend(!0,{},l,o),c=h._arr.call(this,t),d=s.scrollInertia>0&&s.scrollInertia<17?17:s.scrollInertia;c[0]=h._to.call(this,c[0],"y"),c[1]=h._to.call(this,c[1],"x"),s.moveDragger&&(c[0]*=r.scrollRatio.y,c[1]*=r.scrollRatio.x),s.dur=d,setTimeout(function(){null!==c[0]&&"undefined"!=typeof c[0]&&"x"!==i.axis&&r.overflowed[0]&&(s.dir="y",s.overwrite="all",h._scrollTo.call(this,a,c[0].toString(),s)),null!==c[1]&&"undefined"!=typeof c[1]&&"y"!==i.axis&&r.overflowed[1]&&(s.dir="x",s.overwrite="none",h._scrollTo.call(this,a,c[1].toString(),s))},s.timeout)}})}},stop:function(){var t=h._selector.call(this);return e(t).each(function(){var t=e(this);t.data(n)&&h._stop.call(null,t)})},disable:function(t){var o=h._selector.call(this);return e(o).each(function(){var o=e(this);if(o.data(n)){{var a=o.data(n);a.opt}h._autoUpdate.call(this,"remove"),h._unbindEvents.call(this),t&&h._resetContentPosition.call(this),h._scrollbarVisibility.call(this,!0),o.addClass("mCS_disabled")}})},destroy:function(){var t=h._selector.call(this);return e(t).each(function(){var o=e(this);if(o.data(n)){var r=o.data(n),i=r.opt,l=e("#mCSB_"+r.idx),s=e("#mCSB_"+r.idx+"_container"),d=e(".mCSB_"+r.idx+"_scrollbar");i.live&&c(t),h._autoUpdate.call(this,"remove"),h._unbindEvents.call(this),h._resetContentPosition.call(this),o.removeData(n),h._delete.call(null,this.mcs),d.remove(),l.replaceWith(s.contents()),o.removeClass(a+" _"+n+"_"+r.idx+" mCS-autoHide mCS-dir-rtl mCS_no_scrollbar mCS_disabled").addClass("mCS_destroyed")}})}},h={_selector:function(){return"object"!=typeof e(this)||e(this).length<1?r:this},_theme:function(t){var o=["rounded","rounded-dark","rounded-dots","rounded-dots-dark"],a=["rounded-dots","rounded-dots-dark","3d","3d-dark","3d-thick","3d-thick-dark","inset","inset-dark","inset-2","inset-2-dark","inset-3","inset-3-dark"],n=["minimal","minimal-dark"],r=["minimal","minimal-dark"],i=["minimal","minimal-dark"];t.autoDraggerLength=e.inArray(t.theme,o)>-1?!1:t.autoDraggerLength,t.autoExpandScrollbar=e.inArray(t.theme,a)>-1?!1:t.autoExpandScrollbar,t.scrollButtons.enable=e.inArray(t.theme,n)>-1?!1:t.scrollButtons.enable,t.autoHideScrollbar=e.inArray(t.theme,r)>-1?!0:t.autoHideScrollbar,t.scrollbarPosition=e.inArray(t.theme,i)>-1?"outside":t.scrollbarPosition},_findAxis:function(e){return"yx"===e||"xy"===e||"auto"===e?"yx":"x"===e||"horizontal"===e?"x":"y"},_findScrollButtonsType:function(e){return"stepped"===e||"pixels"===e||"step"===e||"click"===e?"stepped":"stepless"},_pluginMarkup:function(){var t=e(this),o=t.data(n),r=o.opt,i=r.autoExpandScrollbar?" mCSB_scrollTools_onDrag_expand":"",l=["<div id='mCSB_"+o.idx+"_scrollbar_vertical' class='mCSB_scrollTools mCSB_"+o.idx+"_scrollbar mCS-"+r.theme+" mCSB_scrollTools_vertical"+i+"'><div class='mCSB_draggerContainer'><div id='mCSB_"+o.idx+"_dragger_vertical' class='mCSB_dragger' style='position:absolute;' oncontextmenu='return false;'><div class='mCSB_dragger_bar' /></div><div class='mCSB_draggerRail' /></div></div>","<div id='mCSB_"+o.idx+"_scrollbar_horizontal' class='mCSB_scrollTools mCSB_"+o.idx+"_scrollbar mCS-"+r.theme+" mCSB_scrollTools_horizontal"+i+"'><div class='mCSB_draggerContainer'><div id='mCSB_"+o.idx+"_dragger_horizontal' class='mCSB_dragger' style='position:absolute;' oncontextmenu='return false;'><div class='mCSB_dragger_bar' /></div><div class='mCSB_draggerRail' /></div></div>"],s="yx"===r.axis?"mCSB_vertical_horizontal":"x"===r.axis?"mCSB_horizontal":"mCSB_vertical",c="yx"===r.axis?l[0]+l[1]:"x"===r.axis?l[1]:l[0],d="yx"===r.axis?"<div id='mCSB_"+o.idx+"_container_wrapper' class='mCSB_container_wrapper' />":"",u=r.autoHideScrollbar?" mCS-autoHide":"",f="x"!==r.axis&&"rtl"===o.langDir?" mCS-dir-rtl":"";r.setWidth&&t.css("width",r.setWidth),r.setHeight&&t.css("height",r.setHeight),r.setLeft="y"!==r.axis&&"rtl"===o.langDir?"989999px":r.setLeft,t.addClass(a+" _"+n+"_"+o.idx+u+f).wrapInner("<div id='mCSB_"+o.idx+"' class='mCustomScrollBox mCS-"+r.theme+" "+s+"'><div id='mCSB_"+o.idx+"_container' class='mCSB_container' style='position:relative; top:"+r.setTop+"; left:"+r.setLeft+";' dir="+o.langDir+" /></div>");var _=e("#mCSB_"+o.idx),m=e("#mCSB_"+o.idx+"_container");"y"===r.axis||r.advanced.autoExpandHorizontalScroll||m.css("width",h._contentWidth(m.children())),"outside"===r.scrollbarPosition?("static"===t.css("position")&&t.css("position","relative"),t.css("overflow","visible"),_.addClass("mCSB_outside").after(c)):(_.addClass("mCSB_inside").append(c),m.wrap(d)),h._scrollButtons.call(this);var p=[e("#mCSB_"+o.idx+"_dragger_vertical"),e("#mCSB_"+o.idx+"_dragger_horizontal")];p[0].css("min-height",p[0].height()),p[1].css("min-width",p[1].width())},_contentWidth:function(t){return Math.max.apply(Math,t.map(function(){return e(this).outerWidth(!0)}).get())},_expandContentHorizontally:function(){var t=e(this),o=t.data(n),a=o.opt,r=e("#mCSB_"+o.idx+"_container");a.advanced.autoExpandHorizontalScroll&&"y"!==a.axis&&r.css({position:"absolute",width:"auto"}).wrap("<div class='mCSB_h_wrapper' style='position:relative; left:0; width:999999px;' />").css({width:Math.ceil(r[0].getBoundingClientRect().right+.4)-Math.floor(r[0].getBoundingClientRect().left),position:"relative"}).unwrap()},_scrollButtons:function(){var t=e(this),o=t.data(n),a=o.opt,r=e(".mCSB_"+o.idx+"_scrollbar:first"),i=["<a href='#' class='mCSB_buttonUp' oncontextmenu='return false;' />","<a href='#' class='mCSB_buttonDown' oncontextmenu='return false;' />","<a href='#' class='mCSB_buttonLeft' oncontextmenu='return false;' />","<a href='#' class='mCSB_buttonRight' oncontextmenu='return false;' />"],l=["x"===a.axis?i[2]:i[0],"x"===a.axis?i[3]:i[1],i[2],i[3]];a.scrollButtons.enable&&r.prepend(l[0]).append(l[1]).next(".mCSB_scrollTools").prepend(l[2]).append(l[3])},_maxHeight:function(){var t=e(this),o=t.data(n),a=(o.opt,e("#mCSB_"+o.idx)),r=t.css("max-height"),i=-1!==r.indexOf("%"),l=t.css("box-sizing");if("none"!==r){var s=i?t.parent().height()*parseInt(r)/100:parseInt(r);"border-box"===l&&(s-=t.innerHeight()-t.height()+(t.outerHeight()-t.innerHeight())),a.css("max-height",Math.round(s))}},_setDraggerLength:function(){var t=e(this),o=t.data(n),a=e("#mCSB_"+o.idx),r=e("#mCSB_"+o.idx+"_container"),i=[e("#mCSB_"+o.idx+"_dragger_vertical"),e("#mCSB_"+o.idx+"_dragger_horizontal")],l=[a.height()/r.outerHeight(!1),a.width()/r.outerWidth(!1)],s=[parseInt(i[0].css("min-height")),Math.round(l[0]*i[0].parent().height()),parseInt(i[1].css("min-width")),Math.round(l[1]*i[1].parent().width())],c=d&&s[1]<s[0]?s[0]:s[1],u=d&&s[3]<s[2]?s[2]:s[3];i[0].css({height:c,"max-height":i[0].parent().height()-10}).find(".mCSB_dragger_bar").css({"line-height":s[0]+"px"}),i[1].css({width:u,"max-width":i[1].parent().width()-10})},_scrollRatio:function(){var t=e(this),o=t.data(n),a=e("#mCSB_"+o.idx),r=e("#mCSB_"+o.idx+"_container"),i=[e("#mCSB_"+o.idx+"_dragger_vertical"),e("#mCSB_"+o.idx+"_dragger_horizontal")],l=[r.outerHeight(!1)-a.height(),r.outerWidth(!1)-a.width()],s=[l[0]/(i[0].parent().height()-i[0].height()),l[1]/(i[1].parent().width()-i[1].width())];o.scrollRatio={y:s[0],x:s[1]}},_onDragClasses:function(e,t,o){var a=o?"mCSB_dragger_onDrag_expanded":"",n=["mCSB_dragger_onDrag","mCSB_scrollTools_onDrag"],r=e.closest(".mCSB_scrollTools");"active"===t?(e.toggleClass(n[0]+" "+a),r.toggleClass(n[1]),e[0]._draggable=e[0]._draggable?0:1):e[0]._draggable||("hide"===t?(e.removeClass(n[0]),r.removeClass(n[1])):(e.addClass(n[0]),r.addClass(n[1])))},_overflowed:function(){var t=e(this),o=t.data(n),a=e("#mCSB_"+o.idx),r=e("#mCSB_"+o.idx+"_container"),i=null==o.overflowed?r.height():r.outerHeight(!1),l=null==o.overflowed?r.width():r.outerWidth(!1);return[i>a.height(),l>a.width()]},_resetContentPosition:function(){var t=e(this),o=t.data(n),a=o.opt,r=e("#mCSB_"+o.idx),i=e("#mCSB_"+o.idx+"_container"),l=[e("#mCSB_"+o.idx+"_dragger_vertical"),e("#mCSB_"+o.idx+"_dragger_horizontal")];if(h._stop(t),("x"!==a.axis&&!o.overflowed[0]||"y"===a.axis&&o.overflowed[0])&&(l[0].add(i).css("top",0),h._scrollTo(t,"_resetY")),"y"!==a.axis&&!o.overflowed[1]||"x"===a.axis&&o.overflowed[1]){var s=dx=0;"rtl"===o.langDir&&(s=r.width()-i.outerWidth(!1),dx=Math.abs(s/o.scrollRatio.x)),i.css("left",s),l[1].css("left",dx),h._scrollTo(t,"_resetX")}},_bindEvents:function(){function t(){i=setTimeout(function(){e.event.special.mousewheel?(clearTimeout(i),h._mousewheel.call(o[0])):t()},1e3)}var o=e(this),a=o.data(n),r=a.opt;if(!a.bindEvents){if(h._draggable.call(this),r.contentTouchScroll&&h._contentDraggable.call(this),r.mouseWheel.enable){var i;t()}h._draggerRail.call(this),h._wrapperScroll.call(this),r.advanced.autoScrollOnFocus&&h._focus.call(this),r.scrollButtons.enable&&h._buttons.call(this),r.keyboard.enable&&h._keyboard.call(this),a.bindEvents=!0}},_unbindEvents:function(){var t=e(this),a=t.data(n),r=a.opt,i=n+"_"+a.idx,l=".mCSB_"+a.idx+"_scrollbar",s=e("#mCSB_"+a.idx+",#mCSB_"+a.idx+"_container,#mCSB_"+a.idx+"_container_wrapper,"+l+" .mCSB_draggerContainer,#mCSB_"+a.idx+"_dragger_vertical,#mCSB_"+a.idx+"_dragger_horizontal,"+l+">a"),c=e("#mCSB_"+a.idx+"_container");r.advanced.releaseDraggableSelectors&&s.add(e(r.advanced.releaseDraggableSelectors)),a.bindEvents&&(e(o).unbind("."+i),s.each(function(){e(this).unbind("."+i)}),clearTimeout(t[0]._focusTimeout),h._delete.call(null,t[0]._focusTimeout),clearTimeout(a.sequential.step),h._delete.call(null,a.sequential.step),clearTimeout(c[0].onCompleteTimeout),h._delete.call(null,c[0].onCompleteTimeout),a.bindEvents=!1)},_scrollbarVisibility:function(t){var o=e(this),a=o.data(n),r=a.opt,i=e("#mCSB_"+a.idx+"_container_wrapper"),l=i.length?i:e("#mCSB_"+a.idx+"_container"),s=[e("#mCSB_"+a.idx+"_scrollbar_vertical"),e("#mCSB_"+a.idx+"_scrollbar_horizontal")],c=[s[0].find(".mCSB_dragger"),s[1].find(".mCSB_dragger")];"x"!==r.axis&&(a.overflowed[0]&&!t?(s[0].add(c[0]).add(s[0].children("a")).css("display","block"),l.removeClass("mCS_no_scrollbar_y mCS_y_hidden")):(r.alwaysShowScrollbar?(2!==r.alwaysShowScrollbar&&c[0].add(s[0].children("a")).css("display","none"),l.removeClass("mCS_y_hidden")):(s[0].css("display","none"),l.addClass("mCS_y_hidden")),l.addClass("mCS_no_scrollbar_y"))),"y"!==r.axis&&(a.overflowed[1]&&!t?(s[1].add(c[1]).add(s[1].children("a")).css("display","block"),l.removeClass("mCS_no_scrollbar_x mCS_x_hidden")):(r.alwaysShowScrollbar?(2!==r.alwaysShowScrollbar&&c[1].add(s[1].children("a")).css("display","none"),l.removeClass("mCS_x_hidden")):(s[1].css("display","none"),l.addClass("mCS_x_hidden")),l.addClass("mCS_no_scrollbar_x"))),a.overflowed[0]||a.overflowed[1]?o.removeClass("mCS_no_scrollbar"):o.addClass("mCS_no_scrollbar")},_coordinates:function(e){var t=e.type;switch(t){case"pointerdown":case"MSPointerDown":case"pointermove":case"MSPointerMove":case"pointerup":case"MSPointerUp":return[e.originalEvent.pageY,e.originalEvent.pageX,!1];case"touchstart":case"touchmove":case"touchend":var o=e.originalEvent.touches[0]||e.originalEvent.changedTouches[0],a=e.originalEvent.touches.length||e.originalEvent.changedTouches.length;return[o.pageY,o.pageX,a>1];default:return[e.pageY,e.pageX,!1]}},_draggable:function(){function t(e){var t=p.find("iframe");if(t.length){var o=e?"auto":"none";t.css("pointer-events",o)}}function a(e,t,o,a){if(p[0].idleTimer=f.scrollInertia<233?250:0,r.attr("id")===m[1])var n="x",i=(r[0].offsetLeft-t+a)*c.scrollRatio.x;else var n="y",i=(r[0].offsetTop-e+o)*c.scrollRatio.y;h._scrollTo(s,i.toString(),{dir:n,drag:!0})}var r,i,l,s=e(this),c=s.data(n),f=c.opt,_=n+"_"+c.idx,m=["mCSB_"+c.idx+"_dragger_vertical","mCSB_"+c.idx+"_dragger_horizontal"],p=e("#mCSB_"+c.idx+"_container"),g=e("#"+m[0]+",#"+m[1]),v=f.advanced.releaseDraggableSelectors?g.add(e(f.advanced.releaseDraggableSelectors)):g;g.bind("mousedown."+_+" touchstart."+_+" pointerdown."+_+" MSPointerDown."+_,function(a){if(a.stopImmediatePropagation(),a.preventDefault(),h._mouseBtnLeft(a)){u=!0,d&&(o.onselectstart=function(){return!1}),t(!1),h._stop(s),r=e(this);var n=r.offset(),c=h._coordinates(a)[0]-n.top,_=h._coordinates(a)[1]-n.left,m=r.height()+n.top,p=r.width()+n.left;m>c&&c>0&&p>_&&_>0&&(i=c,l=_),h._onDragClasses(r,"active",f.autoExpandScrollbar)}}).bind("touchmove."+_,function(e){e.stopImmediatePropagation(),e.preventDefault();var t=r.offset(),o=h._coordinates(e)[0]-t.top,n=h._coordinates(e)[1]-t.left;a(i,l,o,n)}),e(o).bind("mousemove."+_+" pointermove."+_+" MSPointerMove."+_,function(e){if(r){var t=r.offset(),o=h._coordinates(e)[0]-t.top,n=h._coordinates(e)[1]-t.left;if(i===o)return;a(i,l,o,n)}}).add(v).bind("mouseup."+_+" touchend."+_+" pointerup."+_+" MSPointerUp."+_,function(){r&&(h._onDragClasses(r,"active",f.autoExpandScrollbar),r=null),u=!1,d&&(o.onselectstart=null),t(!0)})},_contentDraggable:function(){function t(e,t){var o=[1.5*t,2*t,t/1.5,t/2];return e>90?t>4?o[0]:o[3]:e>60?t>3?o[3]:o[2]:e>30?t>8?o[1]:t>6?o[0]:t>4?t:o[2]:t>8?t:o[3]}function o(e,t,o,a,n,r){e&&h._scrollTo(g,e.toString(),{dur:t,scrollEasing:o,dir:a,overwrite:n,drag:r})}var a,r,i,l,s,c,d,f,_,m,p,g=e(this),v=g.data(n),x=v.opt,S=n+"_"+v.idx,C=e("#mCSB_"+v.idx),b=e("#mCSB_"+v.idx+"_container"),w=[e("#mCSB_"+v.idx+"_dragger_vertical"),e("#mCSB_"+v.idx+"_dragger_horizontal")],y=[],B=[],T=0,M="yx"===x.axis?"none":"all",k=[];b.bind("touchstart."+S+" pointerdown."+S+" MSPointerDown."+S,function(e){if(h._pointerTouch(e)&&!u&&!h._coordinates(e)[2]){var t=b.offset();a=h._coordinates(e)[0]-t.top,r=h._coordinates(e)[1]-t.left,k=[h._coordinates(e)[0],h._coordinates(e)[1]]}}).bind("touchmove."+S+" pointermove."+S+" MSPointerMove."+S,function(e){if(h._pointerTouch(e)&&!u&&!h._coordinates(e)[2]){e.stopImmediatePropagation(),c=h._getTime();var t=C.offset(),n=h._coordinates(e)[0]-t.top,i=h._coordinates(e)[1]-t.left,l="mcsLinearOut";if(y.push(n),B.push(i),k[2]=Math.abs(h._coordinates(e)[0]-k[0]),k[3]=Math.abs(h._coordinates(e)[1]-k[1]),v.overflowed[0])var s=w[0].parent().height()-w[0].height(),d=a-n>0&&n-a>-(s*v.scrollRatio.y)&&(2*k[3]<k[2]||"yx"===x.axis);if(v.overflowed[1])var f=w[1].parent().width()-w[1].width(),_=r-i>0&&i-r>-(f*v.scrollRatio.x)&&(2*k[2]<k[3]||"yx"===x.axis);(d||_)&&e.preventDefault(),m="yx"===x.axis?[a-n,r-i]:"x"===x.axis?[null,r-i]:[a-n,null],b[0].idleTimer=250,v.overflowed[0]&&o(m[0],T,l,"y","all",!0),v.overflowed[1]&&o(m[1],T,l,"x",M,!0)}}),C.bind("touchstart."+S+" pointerdown."+S+" MSPointerDown."+S,function(e){if(h._pointerTouch(e)&&!u&&!h._coordinates(e)[2]){e.stopImmediatePropagation(),h._stop(g),s=h._getTime();var t=C.offset();i=h._coordinates(e)[0]-t.top,l=h._coordinates(e)[1]-t.left,y=[],B=[]}}).bind("touchend."+S+" pointerup."+S+" MSPointerUp."+S,function(e){if(h._pointerTouch(e)&&!u&&!h._coordinates(e)[2]){e.stopImmediatePropagation(),d=h._getTime();var a=C.offset(),n=h._coordinates(e)[0]-a.top,r=h._coordinates(e)[1]-a.left;if(!(d-c>30)){_=1e3/(d-s);var g="mcsEaseOut",S=2.5>_,w=S?[y[y.length-2],B[B.length-2]]:[0,0];f=S?[n-w[0],r-w[1]]:[n-i,r-l];var T=[Math.abs(f[0]),Math.abs(f[1])];_=S?[Math.abs(f[0]/4),Math.abs(f[1]/4)]:[_,_];var k=[Math.abs(b[0].offsetTop)-f[0]*t(T[0]/_[0],_[0]),Math.abs(b[0].offsetLeft)-f[1]*t(T[1]/_[1],_[1])];m="yx"===x.axis?[k[0],k[1]]:"x"===x.axis?[null,k[1]]:[k[0],null],p=[4*T[0]+x.scrollInertia,4*T[1]+x.scrollInertia];var O=parseInt(x.contentTouchScroll)||0;m[0]=T[0]>O?m[0]:0,m[1]=T[1]>O?m[1]:0,v.overflowed[0]&&o(m[0],p[0],g,"y",M,!1),v.overflowed[1]&&o(m[1],p[1],g,"x",M,!1)}}})},_mousewheel:function(){function t(e){var t=null;try{var o=e.contentDocument||e.contentWindow.document;t=o.body.innerHTML}catch(a){}return null!==t}var o=e(this),a=o.data(n);if(a){var r=a.opt,i=n+"_"+a.idx,l=e("#mCSB_"+a.idx),s=[e("#mCSB_"+a.idx+"_dragger_vertical"),e("#mCSB_"+a.idx+"_dragger_horizontal")],c=e("#mCSB_"+a.idx+"_container").find("iframe"),u=l;c.length&&c.each(function(){var o=this;t(o)&&(u=u.add(e(o).contents().find("body")))}),u.bind("mousewheel."+i,function(t,n){if(h._stop(o),!h._disableMousewheel(o,t.target)){var i="auto"!==r.mouseWheel.deltaFactor?parseInt(r.mouseWheel.deltaFactor):d&&t.deltaFactor<100?100:t.deltaFactor||100;if("x"===r.axis||"x"===r.mouseWheel.axis)var c="x",u=[Math.round(i*a.scrollRatio.x),parseInt(r.mouseWheel.scrollAmount)],f="auto"!==r.mouseWheel.scrollAmount?u[1]:u[0]>=l.width()?.9*l.width():u[0],_=Math.abs(e("#mCSB_"+a.idx+"_container")[0].offsetLeft),m=s[1][0].offsetLeft,p=s[1].parent().width()-s[1].width(),g=t.deltaX||t.deltaY||n;else var c="y",u=[Math.round(i*a.scrollRatio.y),parseInt(r.mouseWheel.scrollAmount)],f="auto"!==r.mouseWheel.scrollAmount?u[1]:u[0]>=l.height()?.9*l.height():u[0],_=Math.abs(e("#mCSB_"+a.idx+"_container")[0].offsetTop),m=s[0][0].offsetTop,p=s[0].parent().height()-s[0].height(),g=t.deltaY||n;"y"===c&&!a.overflowed[0]||"x"===c&&!a.overflowed[1]||(r.mouseWheel.invert&&(g=-g),r.mouseWheel.normalizeDelta&&(g=0>g?-1:1),(g>0&&0!==m||0>g&&m!==p||r.mouseWheel.preventDefault)&&(t.stopImmediatePropagation(),t.preventDefault()),h._scrollTo(o,(_-g*f).toString(),{dir:c}))}})}},_disableMousewheel:function(t,o){var a=o.nodeName.toLowerCase(),r=t.data(n).opt.mouseWheel.disableOver,i=["select","textarea"];return e.inArray(a,r)>-1&&!(e.inArray(a,i)>-1&&!e(o).is(":focus"))},_draggerRail:function(){var t=e(this),o=t.data(n),a=n+"_"+o.idx,r=e("#mCSB_"+o.idx+"_container"),i=r.parent(),l=e(".mCSB_"+o.idx+"_scrollbar .mCSB_draggerContainer");l.bind("touchstart."+a+" pointerdown."+a+" MSPointerDown."+a,function(){u=!0}).bind("touchend."+a+" pointerup."+a+" MSPointerUp."+a,function(){u=!1}).bind("click."+a,function(a){if(e(a.target).hasClass("mCSB_draggerContainer")||e(a.target).hasClass("mCSB_draggerRail")){h._stop(t);var n=e(this),l=n.find(".mCSB_dragger");if(n.parent(".mCSB_scrollTools_horizontal").length>0){if(!o.overflowed[1])return;var s="x",c=a.pageX>l.offset().left?-1:1,d=Math.abs(r[0].offsetLeft)-.9*c*i.width()}else{if(!o.overflowed[0])return;var s="y",c=a.pageY>l.offset().top?-1:1,d=Math.abs(r[0].offsetTop)-.9*c*i.height()}h._scrollTo(t,d.toString(),{dir:s,scrollEasing:"mcsEaseInOut"})}})},_focus:function(){var t=e(this),a=t.data(n),r=a.opt,i=n+"_"+a.idx,l=e("#mCSB_"+a.idx+"_container"),s=l.parent();l.bind("focusin."+i,function(){var a=e(o.activeElement),n=l.find(".mCustomScrollBox").length,i=0;a.is(r.advanced.autoScrollOnFocus)&&(h._stop(t),clearTimeout(t[0]._focusTimeout),t[0]._focusTimer=n?(i+17)*n:0,t[0]._focusTimeout=setTimeout(function(){var e=[a.offset().top-l.offset().top,a.offset().left-l.offset().left],o=[l[0].offsetTop,l[0].offsetLeft],n=[o[0]+e[0]>=0&&o[0]+e[0]<s.height()-a.outerHeight(!1),o[1]+e[1]>=0&&o[0]+e[1]<s.width()-a.outerWidth(!1)],c="yx"!==r.axis||n[0]||n[1]?"all":"none";"x"===r.axis||n[0]||h._scrollTo(t,e[0].toString(),{dir:"y",scrollEasing:"mcsEaseInOut",overwrite:c,dur:i}),"y"===r.axis||n[1]||h._scrollTo(t,e[1].toString(),{dir:"x",scrollEasing:"mcsEaseInOut",overwrite:c,dur:i})},t[0]._focusTimer))})},_wrapperScroll:function(){var t=e(this),o=t.data(n),a=n+"_"+o.idx,r=e("#mCSB_"+o.idx+"_container").parent();r.bind("scroll."+a,function(){(0!==r.scrollTop()||0!==r.scrollLeft())&&e(".mCSB_"+o.idx+"_scrollbar").css("visibility","hidden")})},_buttons:function(){var t=e(this),o=t.data(n),a=o.opt,r=o.sequential,i=n+"_"+o.idx,l=(e("#mCSB_"+o.idx+"_container"),".mCSB_"+o.idx+"_scrollbar"),s=e(l+">a");s.bind("mousedown."+i+" touchstart."+i+" pointerdown."+i+" MSPointerDown."+i+" mouseup."+i+" touchend."+i+" pointerup."+i+" MSPointerUp."+i+" mouseout."+i+" pointerout."+i+" MSPointerOut."+i+" click."+i,function(n){function i(e,o){r.scrollAmount=a.snapAmount||a.scrollButtons.scrollAmount,h._sequentialScroll.call(this,t,e,o)}if(n.preventDefault(),h._mouseBtnLeft(n)){var l=e(this).attr("class");switch(r.type=a.scrollButtons.scrollType,n.type){case"mousedown":case"touchstart":case"pointerdown":case"MSPointerDown":if("stepped"===r.type)return;u=!0,o.tweenRunning=!1,i("on",l);break;case"mouseup":case"touchend":case"pointerup":case"MSPointerUp":case"mouseout":case"pointerout":case"MSPointerOut":if("stepped"===r.type)return;u=!1,r.dir&&i("off",l);break;case"click":if("stepped"!==r.type||o.tweenRunning)return;i("on",l)}}})},_keyboard:function(){var t=e(this),a=t.data(n),r=a.opt,i=a.sequential,l=n+"_"+a.idx,s=e("#mCSB_"+a.idx),c=e("#mCSB_"+a.idx+"_container"),d=c.parent(),u="input,textarea,select,datalist,keygen,[contenteditable='true']";s.attr("tabindex","0").bind("blur."+l+" keydown."+l+" keyup."+l,function(n){function l(e,o){i.type=r.keyboard.scrollType,i.scrollAmount=r.snapAmount||r.keyboard.scrollAmount,"stepped"===i.type&&a.tweenRunning||h._sequentialScroll.call(this,t,e,o)}switch(n.type){case"blur":a.tweenRunning&&i.dir&&l("off",null);break;case"keydown":case"keyup":var s=n.keyCode?n.keyCode:n.which,f="on";if("x"!==r.axis&&(38===s||40===s)||"y"!==r.axis&&(37===s||39===s)){if((38===s||40===s)&&!a.overflowed[0]||(37===s||39===s)&&!a.overflowed[1])return;"keyup"===n.type&&(f="off"),e(o.activeElement).is(u)||(n.preventDefault(),n.stopImmediatePropagation(),l(f,s))}else if(33===s||34===s){if((a.overflowed[0]||a.overflowed[1])&&(n.preventDefault(),n.stopImmediatePropagation()),"keyup"===n.type){h._stop(t);var _=34===s?-1:1;if("x"===r.axis||"yx"===r.axis&&a.overflowed[1]&&!a.overflowed[0])var m="x",p=Math.abs(c[0].offsetLeft)-.9*_*d.width();else var m="y",p=Math.abs(c[0].offsetTop)-.9*_*d.height();h._scrollTo(t,p.toString(),{dir:m,scrollEasing:"mcsEaseInOut"})}}else if((35===s||36===s)&&!e(o.activeElement).is(u)&&((a.overflowed[0]||a.overflowed[1])&&(n.preventDefault(),n.stopImmediatePropagation()),"keyup"===n.type)){if("x"===r.axis||"yx"===r.axis&&a.overflowed[1]&&!a.overflowed[0])var m="x",p=35===s?Math.abs(d.width()-c.outerWidth(!1)):0;else var m="y",p=35===s?Math.abs(d.height()-c.outerHeight(!1)):0;h._scrollTo(t,p.toString(),{dir:m,scrollEasing:"mcsEaseInOut"})}}})},_sequentialScroll:function(t,o,a){function r(e){var o="stepped"!==c.type,a=e?o?s.scrollInertia/1.5:s.scrollInertia:1e3/60,n=e?o?7.5:40:2.5,i=[Math.abs(d[0].offsetTop),Math.abs(d[0].offsetLeft)],u=[l.scrollRatio.y>10?10:l.scrollRatio.y,l.scrollRatio.x>10?10:l.scrollRatio.x],f="x"===c.dir[0]?i[1]+c.dir[1]*u[1]*n:i[0]+c.dir[1]*u[0]*n,_="x"===c.dir[0]?i[1]+c.dir[1]*parseInt(c.scrollAmount):i[0]+c.dir[1]*parseInt(c.scrollAmount),m="auto"!==c.scrollAmount?_:f,p=e?o?"mcsLinearOut":"mcsEaseInOut":"mcsLinear",g=e?!0:!1;return e&&17>a&&(m="x"===c.dir[0]?i[1]:i[0]),h._scrollTo(t,m.toString(),{dir:c.dir[0],scrollEasing:p,dur:a,onComplete:g}),e?void(c.dir=!1):(clearTimeout(c.step),void(c.step=setTimeout(function(){r()},a)))}function i(){clearTimeout(c.step),h._stop(t)}var l=t.data(n),s=l.opt,c=l.sequential,d=e("#mCSB_"+l.idx+"_container"),u="stepped"===c.type?!0:!1;switch(o){case"on":if(c.dir=["mCSB_buttonRight"===a||"mCSB_buttonLeft"===a||39===a||37===a?"x":"y","mCSB_buttonUp"===a||"mCSB_buttonLeft"===a||38===a||37===a?-1:1],h._stop(t),h._isNumeric(a)&&"stepped"===c.type)return;r(u);break;case"off":i(),(u||l.tweenRunning&&c.dir)&&r(!0)}},_arr:function(t){var o=e(this).data(n).opt,a=[];return"function"==typeof t&&(t=t()),t instanceof Array?a=t.length>1?[t[0],t[1]]:"x"===o.axis?[null,t[0]]:[t[0],null]:(a[0]=t.y?t.y:t.x||"x"===o.axis?null:t,a[1]=t.x?t.x:t.y||"y"===o.axis?null:t),"function"==typeof a[0]&&(a[0]=a[0]()),"function"==typeof a[1]&&(a[1]=a[1]()),a},_to:function(t,o){if(null!=t&&"undefined"!=typeof t){var a=e(this),r=a.data(n),i=r.opt,l=e("#mCSB_"+r.idx+"_container"),s=l.parent(),c=typeof t;o||(o="x"===i.axis?"x":"y");var d="x"===o?l.outerWidth(!1):l.outerHeight(!1),u="x"===o?l.offset().left:l.offset().top,_="x"===o?l[0].offsetLeft:l[0].offsetTop,m="x"===o?"left":"top";switch(c){case"function":return t();case"object":if(t.nodeType)var p="x"===o?e(t).offset().left:e(t).offset().top;else if(t.jquery){if(!t.length)return;var p="x"===o?t.offset().left:t.offset().top}return p-u;case"string":case"number":if(h._isNumeric.call(null,t))return Math.abs(t);if(-1!==t.indexOf("%"))return Math.abs(d*parseInt(t)/100);if(-1!==t.indexOf("-="))return Math.abs(_-parseInt(t.split("-=")[1]));if(-1!==t.indexOf("+=")){var g=_+parseInt(t.split("+=")[1]);return g>=0?0:Math.abs(g)}if(-1!==t.indexOf("px")&&h._isNumeric.call(null,t.split("px")[0]))return Math.abs(t.split("px")[0]);if("top"===t||"left"===t)return 0;if("bottom"===t)return Math.abs(s.height()-l.outerHeight(!1));if("right"===t)return Math.abs(s.width()-l.outerWidth(!1));if("first"===t||"last"===t){var v=l.find(":"+t),p="x"===o?e(v).offset().left:e(v).offset().top;return p-u}if(e(t).length){var p="x"===o?e(t).offset().left:e(t).offset().top;return p-u}return l.css(m,t),void f.update.call(null,a[0])}}},_autoUpdate:function(t){function o(){clearTimeout(u[0].autoUpdate),u[0].autoUpdate=setTimeout(function(){return d.advanced.updateOnSelectorChange&&(_=i(),_!==S)?(l(),void(S=_)):(d.advanced.updateOnContentResize&&(m=[u.outerHeight(!1),u.outerWidth(!1),g.height(),g.width(),x()[0],x()[1]],(m[0]!==C[0]||m[1]!==C[1]||m[2]!==C[2]||m[3]!==C[3]||m[4]!==C[4]||m[5]!==C[5])&&(l(),C=m)),d.advanced.updateOnImageLoad&&(p=a(),p!==b&&(u.find("img").each(function(){r(this.src)}),b=p)),void((d.advanced.updateOnSelectorChange||d.advanced.updateOnContentResize||d.advanced.updateOnImageLoad)&&o()))},60)}function a(){var e=0;return d.advanced.updateOnImageLoad&&(e=u.find("img").length),e}function r(e){function t(e,t){return function(){return t.apply(e,arguments)}}function o(){this.onload=null,l()}var a=new Image;a.onload=t(a,o),a.src=e}function i(){d.advanced.updateOnSelectorChange===!0&&(d.advanced.updateOnSelectorChange="*");var t=0,o=u.find(d.advanced.updateOnSelectorChange);return d.advanced.updateOnSelectorChange&&o.length>0&&o.each(function(){t+=e(this).height()+e(this).width()}),t}function l(){clearTimeout(u[0].autoUpdate),f.update.call(null,s[0])}var s=e(this),c=s.data(n),d=c.opt,u=e("#mCSB_"+c.idx+"_container");if(t)return clearTimeout(u[0].autoUpdate),void h._delete.call(null,u[0].autoUpdate);var _,m,p,g=u.parent(),v=[e("#mCSB_"+c.idx+"_scrollbar_vertical"),e("#mCSB_"+c.idx+"_scrollbar_horizontal")],x=function(){return[v[0].is(":visible")?v[0].outerHeight(!0):0,v[1].is(":visible")?v[1].outerWidth(!0):0]},S=i(),C=[u.outerHeight(!1),u.outerWidth(!1),g.height(),g.width(),x()[0],x()[1]],b=a();o()},_snapAmount:function(e,t,o){return Math.round(e/t)*t-o},_stop:function(t){var o=t.data(n),a=e("#mCSB_"+o.idx+"_container,#mCSB_"+o.idx+"_container_wrapper,#mCSB_"+o.idx+"_dragger_vertical,#mCSB_"+o.idx+"_dragger_horizontal");a.each(function(){h._stopTween.call(this)})},_scrollTo:function(t,o,a){function r(e){return s&&c.callbacks[e]&&"function"==typeof c.callbacks[e]}function i(){return[c.callbacks.alwaysTriggerOffsets||S>=C[0]+w,c.callbacks.alwaysTriggerOffsets||-y>=S]}function l(){var e=[_[0].offsetTop,_[0].offsetLeft],o=[v[0].offsetTop,v[0].offsetLeft],n=[_.outerHeight(!1),_.outerWidth(!1)],r=[f.height(),f.width()];t[0].mcs={content:_,top:e[0],left:e[1],draggerTop:o[0],draggerLeft:o[1],topPct:Math.round(100*Math.abs(e[0])/(Math.abs(n[0])-r[0])),leftPct:Math.round(100*Math.abs(e[1])/(Math.abs(n[1])-r[1])),direction:a.dir}}var s=t.data(n),c=s.opt,d={trigger:"internal",dir:"y",scrollEasing:"mcsEaseOut",drag:!1,dur:c.scrollInertia,overwrite:"all",callbacks:!0,onStart:!0,onUpdate:!0,onComplete:!0},a=e.extend(d,a),u=[a.dur,a.drag?0:a.dur],f=e("#mCSB_"+s.idx),_=e("#mCSB_"+s.idx+"_container"),m=_.parent(),p=c.callbacks.onTotalScrollOffset?h._arr.call(t,c.callbacks.onTotalScrollOffset):[0,0],g=c.callbacks.onTotalScrollBackOffset?h._arr.call(t,c.callbacks.onTotalScrollBackOffset):[0,0];
if(s.trigger=a.trigger,(0!==m.scrollTop()||0!==m.scrollLeft())&&(e(".mCSB_"+s.idx+"_scrollbar").css("visibility","visible"),m.scrollTop(0).scrollLeft(0)),"_resetY"!==o||s.contentReset.y||(r("onOverflowYNone")&&c.callbacks.onOverflowYNone.call(t[0]),s.contentReset.y=1),"_resetX"!==o||s.contentReset.x||(r("onOverflowXNone")&&c.callbacks.onOverflowXNone.call(t[0]),s.contentReset.x=1),"_resetY"!==o&&"_resetX"!==o){switch(!s.contentReset.y&&t[0].mcs||!s.overflowed[0]||(r("onOverflowY")&&c.callbacks.onOverflowY.call(t[0]),s.contentReset.x=null),!s.contentReset.x&&t[0].mcs||!s.overflowed[1]||(r("onOverflowX")&&c.callbacks.onOverflowX.call(t[0]),s.contentReset.x=null),c.snapAmount&&(o=h._snapAmount(o,c.snapAmount,c.snapOffset)),a.dir){case"x":var v=e("#mCSB_"+s.idx+"_dragger_horizontal"),x="left",S=_[0].offsetLeft,C=[f.width()-_.outerWidth(!1),v.parent().width()-v.width()],b=[o,0===o?0:o/s.scrollRatio.x],w=p[1],y=g[1],B=w>0?w/s.scrollRatio.x:0,T=y>0?y/s.scrollRatio.x:0;break;case"y":var v=e("#mCSB_"+s.idx+"_dragger_vertical"),x="top",S=_[0].offsetTop,C=[f.height()-_.outerHeight(!1),v.parent().height()-v.height()],b=[o,0===o?0:o/s.scrollRatio.y],w=p[0],y=g[0],B=w>0?w/s.scrollRatio.y:0,T=y>0?y/s.scrollRatio.y:0}b[1]<0||0===b[0]&&0===b[1]?b=[0,0]:b[1]>=C[1]?b=[C[0],C[1]]:b[0]=-b[0],t[0].mcs||(l(),r("onInit")&&c.callbacks.onInit.call(t[0])),clearTimeout(_[0].onCompleteTimeout),(s.tweenRunning||!(0===S&&b[0]>=0||S===C[0]&&b[0]<=C[0]))&&(h._tweenTo.call(null,v[0],x,Math.round(b[1]),u[1],a.scrollEasing),h._tweenTo.call(null,_[0],x,Math.round(b[0]),u[0],a.scrollEasing,a.overwrite,{onStart:function(){a.callbacks&&a.onStart&&!s.tweenRunning&&(r("onScrollStart")&&(l(),c.callbacks.onScrollStart.call(t[0])),s.tweenRunning=!0,h._onDragClasses(v),s.cbOffsets=i())},onUpdate:function(){a.callbacks&&a.onUpdate&&r("whileScrolling")&&(l(),c.callbacks.whileScrolling.call(t[0]))},onComplete:function(){if(a.callbacks&&a.onComplete){"yx"===c.axis&&clearTimeout(_[0].onCompleteTimeout);var e=_[0].idleTimer||0;_[0].onCompleteTimeout=setTimeout(function(){r("onScroll")&&(l(),c.callbacks.onScroll.call(t[0])),r("onTotalScroll")&&b[1]>=C[1]-B&&s.cbOffsets[0]&&(l(),c.callbacks.onTotalScroll.call(t[0])),r("onTotalScrollBack")&&b[1]<=T&&s.cbOffsets[1]&&(l(),c.callbacks.onTotalScrollBack.call(t[0])),s.tweenRunning=!1,_[0].idleTimer=0,h._onDragClasses(v,"hide")},e)}}}))}},_tweenTo:function(e,o,a,n,r,i,l){function s(){w.stop||(S||p.call(),S=h._getTime()-x,c(),S>=w.time&&(w.time=S>w.time?S+_-(S-w.time):S+_-1,w.time<S+1&&(w.time=S+1)),w.time<n?w.id=m(s):v.call())}function c(){n>0?(w.currVal=f(w.time,C,y,n,r),b[o]=Math.round(w.currVal)+"px"):b[o]=a+"px",g.call()}function d(){_=1e3/60,w.time=S+_,m=t.requestAnimationFrame?t.requestAnimationFrame:function(e){return c(),setTimeout(e,.01)},w.id=m(s)}function u(){null!=w.id&&(t.requestAnimationFrame?t.cancelAnimationFrame(w.id):clearTimeout(w.id),w.id=null)}function f(e,t,o,a,n){switch(n){case"linear":case"mcsLinear":return o*e/a+t;case"mcsLinearOut":return e/=a,e--,o*Math.sqrt(1-e*e)+t;case"easeInOutSmooth":return e/=a/2,1>e?o/2*e*e+t:(e--,-o/2*(e*(e-2)-1)+t);case"easeInOutStrong":return e/=a/2,1>e?o/2*Math.pow(2,10*(e-1))+t:(e--,o/2*(-Math.pow(2,-10*e)+2)+t);case"easeInOut":case"mcsEaseInOut":return e/=a/2,1>e?o/2*e*e*e+t:(e-=2,o/2*(e*e*e+2)+t);case"easeOutSmooth":return e/=a,e--,-o*(e*e*e*e-1)+t;case"easeOutStrong":return o*(-Math.pow(2,-10*e/a)+1)+t;case"easeOut":case"mcsEaseOut":default:var r=(e/=a)*e,i=r*e;return t+o*(.499999999999997*i*r+-2.5*r*r+5.5*i+-6.5*r+4*e)}}e._malihuTween||(e._malihuTween={top:{},left:{}});var _,m,l=l||{},p=l.onStart||function(){},g=l.onUpdate||function(){},v=l.onComplete||function(){},x=h._getTime(),S=0,C=e.offsetTop,b=e.style,w=e._malihuTween[o];"left"===o&&(C=e.offsetLeft);var y=a-C;w.stop=0,"none"!==i&&u(),d()},_getTime:function(){return t.performance&&t.performance.now?t.performance.now():t.performance&&t.performance.webkitNow?t.performance.webkitNow():Date.now?Date.now():(new Date).getTime()},_stopTween:function(){var e=this;e._malihuTween||(e._malihuTween={top:{},left:{}}),e._malihuTween.top.id&&(t.requestAnimationFrame?t.cancelAnimationFrame(e._malihuTween.top.id):clearTimeout(e._malihuTween.top.id),e._malihuTween.top.id=null,e._malihuTween.top.stop=1),e._malihuTween.left.id&&(t.requestAnimationFrame?t.cancelAnimationFrame(e._malihuTween.left.id):clearTimeout(e._malihuTween.left.id),e._malihuTween.left.id=null,e._malihuTween.left.stop=1)},_delete:function(e){try{delete e}catch(t){e=null}},_mouseBtnLeft:function(e){return!(e.which&&1!==e.which)},_pointerTouch:function(e){var t=e.originalEvent.pointerType;return!(t&&"touch"!==t&&2!==t)},_isNumeric:function(e){return!isNaN(parseFloat(e))&&isFinite(e)}};e.fn[a]=function(t){return f[t]?f[t].apply(this,Array.prototype.slice.call(arguments,1)):"object"!=typeof t&&t?void e.error("Method "+t+" does not exist"):f.init.apply(this,arguments)},e[a]=function(t){return f[t]?f[t].apply(this,Array.prototype.slice.call(arguments,1)):"object"!=typeof t&&t?void e.error("Method "+t+" does not exist"):f.init.apply(this,arguments)},e[a].defaults=i,t[a]=!0,e(t).load(function(){e(r)[a]()})})}(jQuery,window,document);
// Generated by CoffeeScript 1.6.2
/*!
jQuery Waypoints - v2.0.5
Copyright (c) 2011-2014 Caleb Troughton
Licensed under the MIT license.
https://github.com/imakewebthings/jquery-waypoints/blob/master/licenses.txt
*/
(function(){var t=[].indexOf||function(t){for(var e=0,n=this.length;e<n;e++){if(e in this&&this[e]===t)return e}return-1},e=[].slice;(function(t,e){if(typeof define==="function"&&define.amd){return define("waypoints",["jquery"],function(n){return e(n,t)})}else{return e(t.jQuery,t)}})(window,function(n,r){var i,o,l,s,f,u,c,a,h,d,p,y,v,w,g,m;i=n(r);a=t.call(r,"ontouchstart")>=0;s={horizontal:{},vertical:{}};f=1;c={};u="waypoints-context-id";p="resize.waypoints";y="scroll.waypoints";v=1;w="waypoints-waypoint-ids";g="waypoint";m="waypoints";o=function(){function t(t){var e=this;this.$element=t;this.element=t[0];this.didResize=false;this.didScroll=false;this.id="context"+f++;this.oldScroll={x:t.scrollLeft(),y:t.scrollTop()};this.waypoints={horizontal:{},vertical:{}};this.element[u]=this.id;c[this.id]=this;t.bind(y,function(){var t;if(!(e.didScroll||a)){e.didScroll=true;t=function(){e.doScroll();return e.didScroll=false};return r.setTimeout(t,n[m].settings.scrollThrottle)}});t.bind(p,function(){var t;if(!e.didResize){e.didResize=true;t=function(){n[m]("refresh");return e.didResize=false};return r.setTimeout(t,n[m].settings.resizeThrottle)}})}t.prototype.doScroll=function(){var t,e=this;t={horizontal:{newScroll:this.$element.scrollLeft(),oldScroll:this.oldScroll.x,forward:"right",backward:"left"},vertical:{newScroll:this.$element.scrollTop(),oldScroll:this.oldScroll.y,forward:"down",backward:"up"}};if(a&&(!t.vertical.oldScroll||!t.vertical.newScroll)){n[m]("refresh")}n.each(t,function(t,r){var i,o,l;l=[];o=r.newScroll>r.oldScroll;i=o?r.forward:r.backward;n.each(e.waypoints[t],function(t,e){var n,i;if(r.oldScroll<(n=e.offset)&&n<=r.newScroll){return l.push(e)}else if(r.newScroll<(i=e.offset)&&i<=r.oldScroll){return l.push(e)}});l.sort(function(t,e){return t.offset-e.offset});if(!o){l.reverse()}return n.each(l,function(t,e){if(e.options.continuous||t===l.length-1){return e.trigger([i])}})});return this.oldScroll={x:t.horizontal.newScroll,y:t.vertical.newScroll}};t.prototype.refresh=function(){var t,e,r,i=this;r=n.isWindow(this.element);e=this.$element.offset();this.doScroll();t={horizontal:{contextOffset:r?0:e.left,contextScroll:r?0:this.oldScroll.x,contextDimension:this.$element.width(),oldScroll:this.oldScroll.x,forward:"right",backward:"left",offsetProp:"left"},vertical:{contextOffset:r?0:e.top,contextScroll:r?0:this.oldScroll.y,contextDimension:r?n[m]("viewportHeight"):this.$element.height(),oldScroll:this.oldScroll.y,forward:"down",backward:"up",offsetProp:"top"}};return n.each(t,function(t,e){return n.each(i.waypoints[t],function(t,r){var i,o,l,s,f;i=r.options.offset;l=r.offset;o=n.isWindow(r.element)?0:r.$element.offset()[e.offsetProp];if(n.isFunction(i)){i=i.apply(r.element)}else if(typeof i==="string"){i=parseFloat(i);if(r.options.offset.indexOf("%")>-1){i=Math.ceil(e.contextDimension*i/100)}}r.offset=o-e.contextOffset+e.contextScroll-i;if(r.options.onlyOnScroll&&l!=null||!r.enabled){return}if(l!==null&&l<(s=e.oldScroll)&&s<=r.offset){return r.trigger([e.backward])}else if(l!==null&&l>(f=e.oldScroll)&&f>=r.offset){return r.trigger([e.forward])}else if(l===null&&e.oldScroll>=r.offset){return r.trigger([e.forward])}})})};t.prototype.checkEmpty=function(){if(n.isEmptyObject(this.waypoints.horizontal)&&n.isEmptyObject(this.waypoints.vertical)){this.$element.unbind([p,y].join(" "));return delete c[this.id]}};return t}();l=function(){function t(t,e,r){var i,o;if(r.offset==="bottom-in-view"){r.offset=function(){var t;t=n[m]("viewportHeight");if(!n.isWindow(e.element)){t=e.$element.height()}return t-n(this).outerHeight()}}this.$element=t;this.element=t[0];this.axis=r.horizontal?"horizontal":"vertical";this.callback=r.handler;this.context=e;this.enabled=r.enabled;this.id="waypoints"+v++;this.offset=null;this.options=r;e.waypoints[this.axis][this.id]=this;s[this.axis][this.id]=this;i=(o=this.element[w])!=null?o:[];i.push(this.id);this.element[w]=i}t.prototype.trigger=function(t){if(!this.enabled){return}if(this.callback!=null){this.callback.apply(this.element,t)}if(this.options.triggerOnce){return this.destroy()}};t.prototype.disable=function(){return this.enabled=false};t.prototype.enable=function(){this.context.refresh();return this.enabled=true};t.prototype.destroy=function(){delete s[this.axis][this.id];delete this.context.waypoints[this.axis][this.id];return this.context.checkEmpty()};t.getWaypointsByElement=function(t){var e,r;r=t[w];if(!r){return[]}e=n.extend({},s.horizontal,s.vertical);return n.map(r,function(t){return e[t]})};return t}();d={init:function(t,e){var r;e=n.extend({},n.fn[g].defaults,e);if((r=e.handler)==null){e.handler=t}this.each(function(){var t,r,i,s;t=n(this);i=(s=e.context)!=null?s:n.fn[g].defaults.context;if(!n.isWindow(i)){i=t.closest(i)}i=n(i);r=c[i[0][u]];if(!r){r=new o(i)}return new l(t,r,e)});n[m]("refresh");return this},disable:function(){return d._invoke.call(this,"disable")},enable:function(){return d._invoke.call(this,"enable")},destroy:function(){return d._invoke.call(this,"destroy")},prev:function(t,e){return d._traverse.call(this,t,e,function(t,e,n){if(e>0){return t.push(n[e-1])}})},next:function(t,e){return d._traverse.call(this,t,e,function(t,e,n){if(e<n.length-1){return t.push(n[e+1])}})},_traverse:function(t,e,i){var o,l;if(t==null){t="vertical"}if(e==null){e=r}l=h.aggregate(e);o=[];this.each(function(){var e;e=n.inArray(this,l[t]);return i(o,e,l[t])});return this.pushStack(o)},_invoke:function(t){this.each(function(){var e;e=l.getWaypointsByElement(this);return n.each(e,function(e,n){n[t]();return true})});return this}};n.fn[g]=function(){var t,r;r=arguments[0],t=2<=arguments.length?e.call(arguments,1):[];if(d[r]){return d[r].apply(this,t)}else if(n.isFunction(r)){return d.init.apply(this,arguments)}else if(n.isPlainObject(r)){return d.init.apply(this,[null,r])}else if(!r){return n.error("jQuery Waypoints needs a callback function or handler option.")}else{return n.error("The "+r+" method does not exist in jQuery Waypoints.")}};n.fn[g].defaults={context:r,continuous:true,enabled:true,horizontal:false,offset:0,triggerOnce:false};h={refresh:function(){return n.each(c,function(t,e){return e.refresh()})},viewportHeight:function(){var t;return(t=r.innerHeight)!=null?t:i.height()},aggregate:function(t){var e,r,i;e=s;if(t){e=(i=c[n(t)[0][u]])!=null?i.waypoints:void 0}if(!e){return[]}r={horizontal:[],vertical:[]};n.each(r,function(t,i){n.each(e[t],function(t,e){return i.push(e)});i.sort(function(t,e){return t.offset-e.offset});r[t]=n.map(i,function(t){return t.element});return r[t]=n.unique(r[t])});return r},above:function(t){if(t==null){t=r}return h._filter(t,"vertical",function(t,e){return e.offset<=t.oldScroll.y})},below:function(t){if(t==null){t=r}return h._filter(t,"vertical",function(t,e){return e.offset>t.oldScroll.y})},left:function(t){if(t==null){t=r}return h._filter(t,"horizontal",function(t,e){return e.offset<=t.oldScroll.x})},right:function(t){if(t==null){t=r}return h._filter(t,"horizontal",function(t,e){return e.offset>t.oldScroll.x})},enable:function(){return h._invoke("enable")},disable:function(){return h._invoke("disable")},destroy:function(){return h._invoke("destroy")},extendFn:function(t,e){return d[t]=e},_invoke:function(t){var e;e=n.extend({},s.vertical,s.horizontal);return n.each(e,function(e,n){n[t]();return true})},_filter:function(t,e,r){var i,o;i=c[n(t)[0][u]];if(!i){return[]}o=[];n.each(i.waypoints[e],function(t,e){if(r(i,e)){return o.push(e)}});o.sort(function(t,e){return t.offset-e.offset});return n.map(o,function(t){return t.element})}};n[m]=function(){var t,n;n=arguments[0],t=2<=arguments.length?e.call(arguments,1):[];if(h[n]){return h[n].apply(null,t)}else{return h.aggregate.call(null,n)}};n[m].settings={resizeThrottle:100,scrollThrottle:30};return i.on("load.waypoints",function(){return n[m]("refresh")})})}).call(this);
/* Modernizr 2.8.3 (Custom Build) | MIT & BSD
 * Build: http://modernizr.com/download/#-applicationcache-canvas-canvastext-draganddrop-hashchange-history-audio-video-indexeddb-input-inputtypes-localstorage-postmessage-sessionstorage-websockets-websqldatabase-webworkers-geolocation-inlinesvg-smil-svg-svgclippaths-touch-webgl-shiv-cssclasses-teststyles-testprop-testallprops-hasevent-prefixes-domprefixes-load
 */
;window.Modernizr=function(a,b,c){function C(a){j.cssText=a}function D(a,b){return C(n.join(a+";")+(b||""))}function E(a,b){return typeof a===b}function F(a,b){return!!~(""+a).indexOf(b)}function G(a,b){for(var d in a){var e=a[d];if(!F(e,"-")&&j[e]!==c)return b=="pfx"?e:!0}return!1}function H(a,b,d){for(var e in a){var f=b[a[e]];if(f!==c)return d===!1?a[e]:E(f,"function")?f.bind(d||b):f}return!1}function I(a,b,c){var d=a.charAt(0).toUpperCase()+a.slice(1),e=(a+" "+p.join(d+" ")+d).split(" ");return E(b,"string")||E(b,"undefined")?G(e,b):(e=(a+" "+q.join(d+" ")+d).split(" "),H(e,b,c))}function J(){e.input=function(c){for(var d=0,e=c.length;d<e;d++)u[c[d]]=c[d]in k;return u.list&&(u.list=!!b.createElement("datalist")&&!!a.HTMLDataListElement),u}("autocomplete autofocus list placeholder max min multiple pattern required step".split(" ")),e.inputtypes=function(a){for(var d=0,e,f,h,i=a.length;d<i;d++)k.setAttribute("type",f=a[d]),e=k.type!=="text",e&&(k.value=l,k.style.cssText="position:absolute;visibility:hidden;",/^range$/.test(f)&&k.style.WebkitAppearance!==c?(g.appendChild(k),h=b.defaultView,e=h.getComputedStyle&&h.getComputedStyle(k,null).WebkitAppearance!=="textfield"&&k.offsetHeight!==0,g.removeChild(k)):/^(search|tel)$/.test(f)||(/^(url|email)$/.test(f)?e=k.checkValidity&&k.checkValidity()===!1:e=k.value!=l)),t[a[d]]=!!e;return t}("search tel url email datetime date month week time datetime-local number range color".split(" "))}var d="2.8.3",e={},f=!0,g=b.documentElement,h="modernizr",i=b.createElement(h),j=i.style,k=b.createElement("input"),l=":)",m={}.toString,n=" -webkit- -moz- -o- -ms- ".split(" "),o="Webkit Moz O ms",p=o.split(" "),q=o.toLowerCase().split(" "),r={svg:"http://www.w3.org/2000/svg"},s={},t={},u={},v=[],w=v.slice,x,y=function(a,c,d,e){var f,i,j,k,l=b.createElement("div"),m=b.body,n=m||b.createElement("body");if(parseInt(d,10))while(d--)j=b.createElement("div"),j.id=e?e[d]:h+(d+1),l.appendChild(j);return f=["&#173;",'<style id="s',h,'">',a,"</style>"].join(""),l.id=h,(m?l:n).innerHTML+=f,n.appendChild(l),m||(n.style.background="",n.style.overflow="hidden",k=g.style.overflow,g.style.overflow="hidden",g.appendChild(n)),i=c(l,a),m?l.parentNode.removeChild(l):(n.parentNode.removeChild(n),g.style.overflow=k),!!i},z=function(){function d(d,e){e=e||b.createElement(a[d]||"div"),d="on"+d;var f=d in e;return f||(e.setAttribute||(e=b.createElement("div")),e.setAttribute&&e.removeAttribute&&(e.setAttribute(d,""),f=E(e[d],"function"),E(e[d],"undefined")||(e[d]=c),e.removeAttribute(d))),e=null,f}var a={select:"input",change:"input",submit:"form",reset:"form",error:"img",load:"img",abort:"img"};return d}(),A={}.hasOwnProperty,B;!E(A,"undefined")&&!E(A.call,"undefined")?B=function(a,b){return A.call(a,b)}:B=function(a,b){return b in a&&E(a.constructor.prototype[b],"undefined")},Function.prototype.bind||(Function.prototype.bind=function(b){var c=this;if(typeof c!="function")throw new TypeError;var d=w.call(arguments,1),e=function(){if(this instanceof e){var a=function(){};a.prototype=c.prototype;var f=new a,g=c.apply(f,d.concat(w.call(arguments)));return Object(g)===g?g:f}return c.apply(b,d.concat(w.call(arguments)))};return e}),s.canvas=function(){var a=b.createElement("canvas");return!!a.getContext&&!!a.getContext("2d")},s.canvastext=function(){return!!e.canvas&&!!E(b.createElement("canvas").getContext("2d").fillText,"function")},s.webgl=function(){return!!a.WebGLRenderingContext},s.touch=function(){var c;return"ontouchstart"in a||a.DocumentTouch&&b instanceof DocumentTouch?c=!0:y(["@media (",n.join("touch-enabled),("),h,")","{#modernizr{top:9px;position:absolute}}"].join(""),function(a){c=a.offsetTop===9}),c},s.geolocation=function(){return"geolocation"in navigator},s.postmessage=function(){return!!a.postMessage},s.websqldatabase=function(){return!!a.openDatabase},s.indexedDB=function(){return!!I("indexedDB",a)},s.hashchange=function(){return z("hashchange",a)&&(b.documentMode===c||b.documentMode>7)},s.history=function(){return!!a.history&&!!history.pushState},s.draganddrop=function(){var a=b.createElement("div");return"draggable"in a||"ondragstart"in a&&"ondrop"in a},s.websockets=function(){return"WebSocket"in a||"MozWebSocket"in a},s.video=function(){var a=b.createElement("video"),c=!1;try{if(c=!!a.canPlayType)c=new Boolean(c),c.ogg=a.canPlayType('video/ogg; codecs="theora"').replace(/^no$/,""),c.h264=a.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/,""),c.webm=a.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/,"")}catch(d){}return c},s.audio=function(){var a=b.createElement("audio"),c=!1;try{if(c=!!a.canPlayType)c=new Boolean(c),c.ogg=a.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,""),c.mp3=a.canPlayType("audio/mpeg;").replace(/^no$/,""),c.wav=a.canPlayType('audio/wav; codecs="1"').replace(/^no$/,""),c.m4a=(a.canPlayType("audio/x-m4a;")||a.canPlayType("audio/aac;")).replace(/^no$/,"")}catch(d){}return c},s.localstorage=function(){try{return localStorage.setItem(h,h),localStorage.removeItem(h),!0}catch(a){return!1}},s.sessionstorage=function(){try{return sessionStorage.setItem(h,h),sessionStorage.removeItem(h),!0}catch(a){return!1}},s.webworkers=function(){return!!a.Worker},s.applicationcache=function(){return!!a.applicationCache},s.svg=function(){return!!b.createElementNS&&!!b.createElementNS(r.svg,"svg").createSVGRect},s.inlinesvg=function(){var a=b.createElement("div");return a.innerHTML="<svg/>",(a.firstChild&&a.firstChild.namespaceURI)==r.svg},s.smil=function(){return!!b.createElementNS&&/SVGAnimate/.test(m.call(b.createElementNS(r.svg,"animate")))},s.svgclippaths=function(){return!!b.createElementNS&&/SVGClipPath/.test(m.call(b.createElementNS(r.svg,"clipPath")))};for(var K in s)B(s,K)&&(x=K.toLowerCase(),e[x]=s[K](),v.push((e[x]?"":"no-")+x));return e.input||J(),e.addTest=function(a,b){if(typeof a=="object")for(var d in a)B(a,d)&&e.addTest(d,a[d]);else{a=a.toLowerCase();if(e[a]!==c)return e;b=typeof b=="function"?b():b,typeof f!="undefined"&&f&&(g.className+=" "+(b?"":"no-")+a),e[a]=b}return e},C(""),i=k=null,function(a,b){function l(a,b){var c=a.createElement("p"),d=a.getElementsByTagName("head")[0]||a.documentElement;return c.innerHTML="x<style>"+b+"</style>",d.insertBefore(c.lastChild,d.firstChild)}function m(){var a=s.elements;return typeof a=="string"?a.split(" "):a}function n(a){var b=j[a[h]];return b||(b={},i++,a[h]=i,j[i]=b),b}function o(a,c,d){c||(c=b);if(k)return c.createElement(a);d||(d=n(c));var g;return d.cache[a]?g=d.cache[a].cloneNode():f.test(a)?g=(d.cache[a]=d.createElem(a)).cloneNode():g=d.createElem(a),g.canHaveChildren&&!e.test(a)&&!g.tagUrn?d.frag.appendChild(g):g}function p(a,c){a||(a=b);if(k)return a.createDocumentFragment();c=c||n(a);var d=c.frag.cloneNode(),e=0,f=m(),g=f.length;for(;e<g;e++)d.createElement(f[e]);return d}function q(a,b){b.cache||(b.cache={},b.createElem=a.createElement,b.createFrag=a.createDocumentFragment,b.frag=b.createFrag()),a.createElement=function(c){return s.shivMethods?o(c,a,b):b.createElem(c)},a.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+m().join().replace(/[\w\-]+/g,function(a){return b.createElem(a),b.frag.createElement(a),'c("'+a+'")'})+");return n}")(s,b.frag)}function r(a){a||(a=b);var c=n(a);return s.shivCSS&&!g&&!c.hasCSS&&(c.hasCSS=!!l(a,"article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")),k||q(a,c),a}var c="3.7.0",d=a.html5||{},e=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,f=/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,g,h="_html5shiv",i=0,j={},k;(function(){try{var a=b.createElement("a");a.innerHTML="<xyz></xyz>",g="hidden"in a,k=a.childNodes.length==1||function(){b.createElement("a");var a=b.createDocumentFragment();return typeof a.cloneNode=="undefined"||typeof a.createDocumentFragment=="undefined"||typeof a.createElement=="undefined"}()}catch(c){g=!0,k=!0}})();var s={elements:d.elements||"abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video",version:c,shivCSS:d.shivCSS!==!1,supportsUnknownElements:k,shivMethods:d.shivMethods!==!1,type:"default",shivDocument:r,createElement:o,createDocumentFragment:p};a.html5=s,r(b)}(this,b),e._version=d,e._prefixes=n,e._domPrefixes=q,e._cssomPrefixes=p,e.hasEvent=z,e.testProp=function(a){return G([a])},e.testAllProps=I,e.testStyles=y,g.className=g.className.replace(/(^|\s)no-js(\s|$)/,"$1$2")+(f?" js "+v.join(" "):""),e}(this,this.document),function(a,b,c){function d(a){return"[object Function]"==o.call(a)}function e(a){return"string"==typeof a}function f(){}function g(a){return!a||"loaded"==a||"complete"==a||"uninitialized"==a}function h(){var a=p.shift();q=1,a?a.t?m(function(){("c"==a.t?B.injectCss:B.injectJs)(a.s,0,a.a,a.x,a.e,1)},0):(a(),h()):q=0}function i(a,c,d,e,f,i,j){function k(b){if(!o&&g(l.readyState)&&(u.r=o=1,!q&&h(),l.onload=l.onreadystatechange=null,b)){"img"!=a&&m(function(){t.removeChild(l)},50);for(var d in y[c])y[c].hasOwnProperty(d)&&y[c][d].onload()}}var j=j||B.errorTimeout,l=b.createElement(a),o=0,r=0,u={t:d,s:c,e:f,a:i,x:j};1===y[c]&&(r=1,y[c]=[]),"object"==a?l.data=c:(l.src=c,l.type=a),l.width=l.height="0",l.onerror=l.onload=l.onreadystatechange=function(){k.call(this,r)},p.splice(e,0,u),"img"!=a&&(r||2===y[c]?(t.insertBefore(l,s?null:n),m(k,j)):y[c].push(l))}function j(a,b,c,d,f){return q=0,b=b||"j",e(a)?i("c"==b?v:u,a,b,this.i++,c,d,f):(p.splice(this.i++,0,a),1==p.length&&h()),this}function k(){var a=B;return a.loader={load:j,i:0},a}var l=b.documentElement,m=a.setTimeout,n=b.getElementsByTagName("script")[0],o={}.toString,p=[],q=0,r="MozAppearance"in l.style,s=r&&!!b.createRange().compareNode,t=s?l:n.parentNode,l=a.opera&&"[object Opera]"==o.call(a.opera),l=!!b.attachEvent&&!l,u=r?"object":l?"script":"img",v=l?"script":u,w=Array.isArray||function(a){return"[object Array]"==o.call(a)},x=[],y={},z={timeout:function(a,b){return b.length&&(a.timeout=b[0]),a}},A,B;B=function(a){function b(a){var a=a.split("!"),b=x.length,c=a.pop(),d=a.length,c={url:c,origUrl:c,prefixes:a},e,f,g;for(f=0;f<d;f++)g=a[f].split("="),(e=z[g.shift()])&&(c=e(c,g));for(f=0;f<b;f++)c=x[f](c);return c}function g(a,e,f,g,h){var i=b(a),j=i.autoCallback;i.url.split(".").pop().split("?").shift(),i.bypass||(e&&(e=d(e)?e:e[a]||e[g]||e[a.split("/").pop().split("?")[0]]),i.instead?i.instead(a,e,f,g,h):(y[i.url]?i.noexec=!0:y[i.url]=1,f.load(i.url,i.forceCSS||!i.forceJS&&"css"==i.url.split(".").pop().split("?").shift()?"c":c,i.noexec,i.attrs,i.timeout),(d(e)||d(j))&&f.load(function(){k(),e&&e(i.origUrl,h,g),j&&j(i.origUrl,h,g),y[i.url]=2})))}function h(a,b){function c(a,c){if(a){if(e(a))c||(j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}),g(a,j,b,0,h);else if(Object(a)===a)for(n in m=function(){var b=0,c;for(c in a)a.hasOwnProperty(c)&&b++;return b}(),a)a.hasOwnProperty(n)&&(!c&&!--m&&(d(j)?j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}:j[n]=function(a){return function(){var b=[].slice.call(arguments);a&&a.apply(this,b),l()}}(k[n])),g(a[n],j,b,n,h))}else!c&&l()}var h=!!a.test,i=a.load||a.both,j=a.callback||f,k=j,l=a.complete||f,m,n;c(h?a.yep:a.nope,!!i),i&&c(i)}var i,j,l=this.yepnope.loader;if(e(a))g(a,0,l,0);else if(w(a))for(i=0;i<a.length;i++)j=a[i],e(j)?g(j,0,l,0):w(j)?B(j):Object(j)===j&&h(j,l);else Object(a)===a&&h(a,l)},B.addPrefix=function(a,b){z[a]=b},B.addFilter=function(a){x.push(a)},B.errorTimeout=1e4,null==b.readyState&&b.addEventListener&&(b.readyState="loading",b.addEventListener("DOMContentLoaded",A=function(){b.removeEventListener("DOMContentLoaded",A,0),b.readyState="complete"},0)),a.yepnope=k(),a.yepnope.executeStack=h,a.yepnope.injectJs=function(a,c,d,e,i,j){var k=b.createElement("script"),l,o,e=e||B.errorTimeout;k.src=a;for(o in d)k.setAttribute(o,d[o]);c=j?h:c||f,k.onreadystatechange=k.onload=function(){!l&&g(k.readyState)&&(l=1,c(),k.onload=k.onreadystatechange=null)},m(function(){l||(l=1,c(1))},e),i?k.onload():n.parentNode.insertBefore(k,n)},a.yepnope.injectCss=function(a,c,d,e,g,i){var e=b.createElement("link"),j,c=i?h:c||f;e.href=a,e.rel="stylesheet",e.type="text/css";for(j in d)e.setAttribute(j,d[j]);g||(n.parentNode.insertBefore(e,n),m(c,0))}}(this,document),Modernizr.load=function(){yepnope.apply(window,[].slice.call(arguments,0))};


;(function () {
	'use strict';

	/**
	 * @preserve FastClick: polyfill to remove click delays on browsers with touch UIs.
	 *
	 * @codingstandard ftlabs-jsv2
	 * @copyright The Financial Times Limited [All Rights Reserved]
	 * @license MIT License (see LICENSE.txt)
	 */

	/*jslint browser:true, node:true*/
	/*global define, Event, Node*/


	/**
	 * Instantiate fast-clicking listeners on the specified layer.
	 *
	 * @constructor
	 * @param {Element} layer The layer to listen on
	 * @param {Object} [options={}] The options to override the defaults
	 */
	function FastClick(layer, options) {
		var oldOnClick;

		options = options || {};

		/**
		 * Whether a click is currently being tracked.
		 *
		 * @type boolean
		 */
		this.trackingClick = false;


		/**
		 * Timestamp for when click tracking started.
		 *
		 * @type number
		 */
		this.trackingClickStart = 0;


		/**
		 * The element being tracked for a click.
		 *
		 * @type EventTarget
		 */
		this.targetElement = null;


		/**
		 * X-coordinate of touch start event.
		 *
		 * @type number
		 */
		this.touchStartX = 0;


		/**
		 * Y-coordinate of touch start event.
		 *
		 * @type number
		 */
		this.touchStartY = 0;


		/**
		 * ID of the last touch, retrieved from Touch.identifier.
		 *
		 * @type number
		 */
		this.lastTouchIdentifier = 0;


		/**
		 * Touchmove boundary, beyond which a click will be cancelled.
		 *
		 * @type number
		 */
		this.touchBoundary = options.touchBoundary || 10;


		/**
		 * The FastClick layer.
		 *
		 * @type Element
		 */
		this.layer = layer;

		/**
		 * The minimum time between tap(touchstart and touchend) events
		 *
		 * @type number
		 */
		this.tapDelay = options.tapDelay || 200;

		/**
		 * The maximum time for a tap
		 *
		 * @type number
		 */
		this.tapTimeout = options.tapTimeout || 700;

		if (FastClick.notNeeded(layer)) {
			return;
		}

		// Some old versions of Android don't have Function.prototype.bind
		function bind(method, context) {
			return function() { return method.apply(context, arguments); };
		}


		var methods = ['onMouse', 'onClick', 'onTouchStart', 'onTouchMove', 'onTouchEnd', 'onTouchCancel'];
		var context = this;
		for (var i = 0, l = methods.length; i < l; i++) {
			context[methods[i]] = bind(context[methods[i]], context);
		}

		// Set up event handlers as required
		if (deviceIsAndroid) {
			layer.addEventListener('mouseover', this.onMouse, true);
			layer.addEventListener('mousedown', this.onMouse, true);
			layer.addEventListener('mouseup', this.onMouse, true);
		}

		layer.addEventListener('click', this.onClick, true);
		layer.addEventListener('touchstart', this.onTouchStart, false);
		layer.addEventListener('touchmove', this.onTouchMove, false);
		layer.addEventListener('touchend', this.onTouchEnd, false);
		layer.addEventListener('touchcancel', this.onTouchCancel, false);

		// Hack is required for browsers that don't support Event#stopImmediatePropagation (e.g. Android 2)
		// which is how FastClick normally stops click events bubbling to callbacks registered on the FastClick
		// layer when they are cancelled.
		if (!Event.prototype.stopImmediatePropagation) {
			layer.removeEventListener = function(type, callback, capture) {
				var rmv = Node.prototype.removeEventListener;
				if (type === 'click') {
					rmv.call(layer, type, callback.hijacked || callback, capture);
				} else {
					rmv.call(layer, type, callback, capture);
				}
			};

			layer.addEventListener = function(type, callback, capture) {
				var adv = Node.prototype.addEventListener;
				if (type === 'click') {
					adv.call(layer, type, callback.hijacked || (callback.hijacked = function(event) {
						if (!event.propagationStopped) {
							callback(event);
						}
					}), capture);
				} else {
					adv.call(layer, type, callback, capture);
				}
			};
		}

		// If a handler is already declared in the element's onclick attribute, it will be fired before
		// FastClick's onClick handler. Fix this by pulling out the user-defined handler function and
		// adding it as listener.
		if (typeof layer.onclick === 'function') {

			// Android browser on at least 3.2 requires a new reference to the function in layer.onclick
			// - the old one won't work if passed to addEventListener directly.
			oldOnClick = layer.onclick;
			layer.addEventListener('click', function(event) {
				oldOnClick(event);
			}, false);
			layer.onclick = null;
		}
	}

	/**
	* Windows Phone 8.1 fakes user agent string to look like Android and iPhone.
	*
	* @type boolean
	*/
	var deviceIsWindowsPhone = navigator.userAgent.indexOf("Windows Phone") >= 0;

	/**
	 * Android requires exceptions.
	 *
	 * @type boolean
	 */
	var deviceIsAndroid = navigator.userAgent.indexOf('Android') > 0 && !deviceIsWindowsPhone;


	/**
	 * iOS requires exceptions.
	 *
	 * @type boolean
	 */
	var deviceIsIOS = /iP(ad|hone|od)/.test(navigator.userAgent) && !deviceIsWindowsPhone;


	/**
	 * iOS 4 requires an exception for select elements.
	 *
	 * @type boolean
	 */
	var deviceIsIOS4 = deviceIsIOS && (/OS 4_\d(_\d)?/).test(navigator.userAgent);


	/**
	 * iOS 6.0-7.* requires the target element to be manually derived
	 *
	 * @type boolean
	 */
	var deviceIsIOSWithBadTarget = deviceIsIOS && (/OS [6-7]_\d/).test(navigator.userAgent);

	/**
	 * BlackBerry requires exceptions.
	 *
	 * @type boolean
	 */
	var deviceIsBlackBerry10 = navigator.userAgent.indexOf('BB10') > 0;

	/**
	 * Determine whether a given element requires a native click.
	 *
	 * @param {EventTarget|Element} target Target DOM element
	 * @returns {boolean} Returns true if the element needs a native click
	 */
	FastClick.prototype.needsClick = function(target) {
		switch (target.nodeName.toLowerCase()) {

		// Don't send a synthetic click to disabled inputs (issue #62)
		case 'button':
		case 'select':
		case 'textarea':
			if (target.disabled) {
				return true;
			}

			break;
		case 'input':

			// File inputs need real clicks on iOS 6 due to a browser bug (issue #68)
			if ((deviceIsIOS && target.type === 'file') || target.disabled) {
				return true;
			}

			break;
		case 'label':
		case 'iframe': // iOS8 homescreen apps can prevent events bubbling into frames
		case 'video':
			return true;
		}

		return (/\bneedsclick\b/).test(target.className);
	};


	/**
	 * Determine whether a given element requires a call to focus to simulate click into element.
	 *
	 * @param {EventTarget|Element} target Target DOM element
	 * @returns {boolean} Returns true if the element requires a call to focus to simulate native click.
	 */
	FastClick.prototype.needsFocus = function(target) {
		switch (target.nodeName.toLowerCase()) {
		case 'textarea':
			return true;
		case 'select':
			return !deviceIsAndroid;
		case 'input':
			switch (target.type) {
			case 'button':
			case 'checkbox':
			case 'file':
			case 'image':
			case 'radio':
			case 'submit':
				return false;
			}

			// No point in attempting to focus disabled inputs
			return !target.disabled && !target.readOnly;
		default:
			return (/\bneedsfocus\b/).test(target.className);
		}
	};


	/**
	 * Send a click event to the specified element.
	 *
	 * @param {EventTarget|Element} targetElement
	 * @param {Event} event
	 */
	FastClick.prototype.sendClick = function(targetElement, event) {
		var clickEvent, touch;

		// On some Android devices activeElement needs to be blurred otherwise the synthetic click will have no effect (#24)
		if (document.activeElement && document.activeElement !== targetElement) {
			document.activeElement.blur();
		}

		touch = event.changedTouches[0];

		// Synthesise a click event, with an extra attribute so it can be tracked
		clickEvent = document.createEvent('MouseEvents');
		clickEvent.initMouseEvent(this.determineEventType(targetElement), true, true, window, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY, false, false, false, false, 0, null);
		clickEvent.forwardedTouchEvent = true;
		targetElement.dispatchEvent(clickEvent);
	};

	FastClick.prototype.determineEventType = function(targetElement) {

		//Issue #159: Android Chrome Select Box does not open with a synthetic click event
		if (deviceIsAndroid && targetElement.tagName.toLowerCase() === 'select') {
			return 'mousedown';
		}

		return 'click';
	};


	/**
	 * @param {EventTarget|Element} targetElement
	 */
	FastClick.prototype.focus = function(targetElement) {
		var length;

		// Issue #160: on iOS 7, some input elements (e.g. date datetime month) throw a vague TypeError on setSelectionRange. These elements don't have an integer value for the selectionStart and selectionEnd properties, but unfortunately that can't be used for detection because accessing the properties also throws a TypeError. Just check the type instead. Filed as Apple bug #15122724.
		if (deviceIsIOS && targetElement.setSelectionRange && targetElement.type.indexOf('date') !== 0 && targetElement.type !== 'time' && targetElement.type !== 'month') {
			length = targetElement.value.length;
			targetElement.setSelectionRange(length, length);
		} else {
			targetElement.focus();
		}
	};


	/**
	 * Check whether the given target element is a child of a scrollable layer and if so, set a flag on it.
	 *
	 * @param {EventTarget|Element} targetElement
	 */
	FastClick.prototype.updateScrollParent = function(targetElement) {
		var scrollParent, parentElement;

		scrollParent = targetElement.fastClickScrollParent;

		// Attempt to discover whether the target element is contained within a scrollable layer. Re-check if the
		// target element was moved to another parent.
		if (!scrollParent || !scrollParent.contains(targetElement)) {
			parentElement = targetElement;
			do {
				if (parentElement.scrollHeight > parentElement.offsetHeight) {
					scrollParent = parentElement;
					targetElement.fastClickScrollParent = parentElement;
					break;
				}

				parentElement = parentElement.parentElement;
			} while (parentElement);
		}

		// Always update the scroll top tracker if possible.
		if (scrollParent) {
			scrollParent.fastClickLastScrollTop = scrollParent.scrollTop;
		}
	};


	/**
	 * @param {EventTarget} targetElement
	 * @returns {Element|EventTarget}
	 */
	FastClick.prototype.getTargetElementFromEventTarget = function(eventTarget) {

		// On some older browsers (notably Safari on iOS 4.1 - see issue #56) the event target may be a text node.
		if (eventTarget.nodeType === Node.TEXT_NODE) {
			return eventTarget.parentNode;
		}

		return eventTarget;
	};


	/**
	 * On touch start, record the position and scroll offset.
	 *
	 * @param {Event} event
	 * @returns {boolean}
	 */
	FastClick.prototype.onTouchStart = function(event) {
		var targetElement, touch, selection;

		// Ignore multiple touches, otherwise pinch-to-zoom is prevented if both fingers are on the FastClick element (issue #111).
		if (event.targetTouches.length > 1) {
			return true;
		}

		targetElement = this.getTargetElementFromEventTarget(event.target);
		touch = event.targetTouches[0];

		if (deviceIsIOS) {

			// Only trusted events will deselect text on iOS (issue #49)
			selection = window.getSelection();
			if (selection.rangeCount && !selection.isCollapsed) {
				return true;
			}

			if (!deviceIsIOS4) {

				// Weird things happen on iOS when an alert or confirm dialog is opened from a click event callback (issue #23):
				// when the user next taps anywhere else on the page, new touchstart and touchend events are dispatched
				// with the same identifier as the touch event that previously triggered the click that triggered the alert.
				// Sadly, there is an issue on iOS 4 that causes some normal touch events to have the same identifier as an
				// immediately preceeding touch event (issue #52), so this fix is unavailable on that platform.
				// Issue 120: touch.identifier is 0 when Chrome dev tools 'Emulate touch events' is set with an iOS device UA string,
				// which causes all touch events to be ignored. As this block only applies to iOS, and iOS identifiers are always long,
				// random integers, it's safe to to continue if the identifier is 0 here.
				if (touch.identifier && touch.identifier === this.lastTouchIdentifier) {
					event.preventDefault();
					return false;
				}

				this.lastTouchIdentifier = touch.identifier;

				// If the target element is a child of a scrollable layer (using -webkit-overflow-scrolling: touch) and:
				// 1) the user does a fling scroll on the scrollable layer
				// 2) the user stops the fling scroll with another tap
				// then the event.target of the last 'touchend' event will be the element that was under the user's finger
				// when the fling scroll was started, causing FastClick to send a click event to that layer - unless a check
				// is made to ensure that a parent layer was not scrolled before sending a synthetic click (issue #42).
				this.updateScrollParent(targetElement);
			}
		}

		this.trackingClick = true;
		this.trackingClickStart = event.timeStamp;
		this.targetElement = targetElement;

		this.touchStartX = touch.pageX;
		this.touchStartY = touch.pageY;

		// Prevent phantom clicks on fast double-tap (issue #36)
		if ((event.timeStamp - this.lastClickTime) < this.tapDelay) {
			event.preventDefault();
		}

		return true;
	};


	/**
	 * Based on a touchmove event object, check whether the touch has moved past a boundary since it started.
	 *
	 * @param {Event} event
	 * @returns {boolean}
	 */
	FastClick.prototype.touchHasMoved = function(event) {
		var touch = event.changedTouches[0], boundary = this.touchBoundary;

		if (Math.abs(touch.pageX - this.touchStartX) > boundary || Math.abs(touch.pageY - this.touchStartY) > boundary) {
			return true;
		}

		return false;
	};


	/**
	 * Update the last position.
	 *
	 * @param {Event} event
	 * @returns {boolean}
	 */
	FastClick.prototype.onTouchMove = function(event) {
		if (!this.trackingClick) {
			return true;
		}

		// If the touch has moved, cancel the click tracking
		if (this.targetElement !== this.getTargetElementFromEventTarget(event.target) || this.touchHasMoved(event)) {
			this.trackingClick = false;
			this.targetElement = null;
		}

		return true;
	};


	/**
	 * Attempt to find the labelled control for the given label element.
	 *
	 * @param {EventTarget|HTMLLabelElement} labelElement
	 * @returns {Element|null}
	 */
	FastClick.prototype.findControl = function(labelElement) {

		// Fast path for newer browsers supporting the HTML5 control attribute
		if (labelElement.control !== undefined) {
			return labelElement.control;
		}

		// All browsers under test that support touch events also support the HTML5 htmlFor attribute
		if (labelElement.htmlFor) {
			return document.getElementById(labelElement.htmlFor);
		}

		// If no for attribute exists, attempt to retrieve the first labellable descendant element
		// the list of which is defined here: http://www.w3.org/TR/html5/forms.html#category-label
		return labelElement.querySelector('button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea');
	};


	/**
	 * On touch end, determine whether to send a click event at once.
	 *
	 * @param {Event} event
	 * @returns {boolean}
	 */
	FastClick.prototype.onTouchEnd = function(event) {
		var forElement, trackingClickStart, targetTagName, scrollParent, touch, targetElement = this.targetElement;

		if (!this.trackingClick) {
			return true;
		}

		// Prevent phantom clicks on fast double-tap (issue #36)
		if ((event.timeStamp - this.lastClickTime) < this.tapDelay) {
			this.cancelNextClick = true;
			return true;
		}

		if ((event.timeStamp - this.trackingClickStart) > this.tapTimeout) {
			return true;
		}

		// Reset to prevent wrong click cancel on input (issue #156).
		this.cancelNextClick = false;

		this.lastClickTime = event.timeStamp;

		trackingClickStart = this.trackingClickStart;
		this.trackingClick = false;
		this.trackingClickStart = 0;

		// On some iOS devices, the targetElement supplied with the event is invalid if the layer
		// is performing a transition or scroll, and has to be re-detected manually. Note that
		// for this to function correctly, it must be called *after* the event target is checked!
		// See issue #57; also filed as rdar://13048589 .
		if (deviceIsIOSWithBadTarget) {
			touch = event.changedTouches[0];

			// In certain cases arguments of elementFromPoint can be negative, so prevent setting targetElement to null
			targetElement = document.elementFromPoint(touch.pageX - window.pageXOffset, touch.pageY - window.pageYOffset) || targetElement;
			targetElement.fastClickScrollParent = this.targetElement.fastClickScrollParent;
		}

		targetTagName = targetElement.tagName.toLowerCase();
		if (targetTagName === 'label') {
			forElement = this.findControl(targetElement);
			if (forElement) {
				this.focus(targetElement);
				if (deviceIsAndroid) {
					return false;
				}

				targetElement = forElement;
			}
		} else if (this.needsFocus(targetElement)) {

			// Case 1: If the touch started a while ago (best guess is 100ms based on tests for issue #36) then focus will be triggered anyway. Return early and unset the target element reference so that the subsequent click will be allowed through.
			// Case 2: Without this exception for input elements tapped when the document is contained in an iframe, then any inputted text won't be visible even though the value attribute is updated as the user types (issue #37).
			if ((event.timeStamp - trackingClickStart) > 100 || (deviceIsIOS && window.top !== window && targetTagName === 'input')) {
				this.targetElement = null;
				return false;
			}

			this.focus(targetElement);
			this.sendClick(targetElement, event);

			// Select elements need the event to go through on iOS 4, otherwise the selector menu won't open.
			// Also this breaks opening selects when VoiceOver is active on iOS6, iOS7 (and possibly others)
			if (!deviceIsIOS || targetTagName !== 'select') {
				this.targetElement = null;
				event.preventDefault();
			}

			return false;
		}

		if (deviceIsIOS && !deviceIsIOS4) {

			// Don't send a synthetic click event if the target element is contained within a parent layer that was scrolled
			// and this tap is being used to stop the scrolling (usually initiated by a fling - issue #42).
			scrollParent = targetElement.fastClickScrollParent;
			if (scrollParent && scrollParent.fastClickLastScrollTop !== scrollParent.scrollTop) {
				return true;
			}
		}

		// Prevent the actual click from going though - unless the target node is marked as requiring
		// real clicks or if it is in the whitelist in which case only non-programmatic clicks are permitted.
		if (!this.needsClick(targetElement)) {
			event.preventDefault();
			this.sendClick(targetElement, event);
		}

		return false;
	};


	/**
	 * On touch cancel, stop tracking the click.
	 *
	 * @returns {void}
	 */
	FastClick.prototype.onTouchCancel = function() {
		this.trackingClick = false;
		this.targetElement = null;
	};


	/**
	 * Determine mouse events which should be permitted.
	 *
	 * @param {Event} event
	 * @returns {boolean}
	 */
	FastClick.prototype.onMouse = function(event) {

		// If a target element was never set (because a touch event was never fired) allow the event
		if (!this.targetElement) {
			return true;
		}

		if (event.forwardedTouchEvent) {
			return true;
		}

		// Programmatically generated events targeting a specific element should be permitted
		if (!event.cancelable) {
			return true;
		}

		// Derive and check the target element to see whether the mouse event needs to be permitted;
		// unless explicitly enabled, prevent non-touch click events from triggering actions,
		// to prevent ghost/doubleclicks.
		if (!this.needsClick(this.targetElement) || this.cancelNextClick) {

			// Prevent any user-added listeners declared on FastClick element from being fired.
			if (event.stopImmediatePropagation) {
				event.stopImmediatePropagation();
			} else {

				// Part of the hack for browsers that don't support Event#stopImmediatePropagation (e.g. Android 2)
				event.propagationStopped = true;
			}

			// Cancel the event
			event.stopPropagation();
			event.preventDefault();

			return false;
		}

		// If the mouse event is permitted, return true for the action to go through.
		return true;
	};


	/**
	 * On actual clicks, determine whether this is a touch-generated click, a click action occurring
	 * naturally after a delay after a touch (which needs to be cancelled to avoid duplication), or
	 * an actual click which should be permitted.
	 *
	 * @param {Event} event
	 * @returns {boolean}
	 */
	FastClick.prototype.onClick = function(event) {
		var permitted;

		// It's possible for another FastClick-like library delivered with third-party code to fire a click event before FastClick does (issue #44). In that case, set the click-tracking flag back to false and return early. This will cause onTouchEnd to return early.
		if (this.trackingClick) {
			this.targetElement = null;
			this.trackingClick = false;
			return true;
		}

		// Very odd behaviour on iOS (issue #18): if a submit element is present inside a form and the user hits enter in the iOS simulator or clicks the Go button on the pop-up OS keyboard the a kind of 'fake' click event will be triggered with the submit-type input element as the target.
		if (event.target.type === 'submit' && event.detail === 0) {
			return true;
		}

		permitted = this.onMouse(event);

		// Only unset targetElement if the click is not permitted. This will ensure that the check for !targetElement in onMouse fails and the browser's click doesn't go through.
		if (!permitted) {
			this.targetElement = null;
		}

		// If clicks are permitted, return true for the action to go through.
		return permitted;
	};


	/**
	 * Remove all FastClick's event listeners.
	 *
	 * @returns {void}
	 */
	FastClick.prototype.destroy = function() {
		var layer = this.layer;

		if (deviceIsAndroid) {
			layer.removeEventListener('mouseover', this.onMouse, true);
			layer.removeEventListener('mousedown', this.onMouse, true);
			layer.removeEventListener('mouseup', this.onMouse, true);
		}

		layer.removeEventListener('click', this.onClick, true);
		layer.removeEventListener('touchstart', this.onTouchStart, false);
		layer.removeEventListener('touchmove', this.onTouchMove, false);
		layer.removeEventListener('touchend', this.onTouchEnd, false);
		layer.removeEventListener('touchcancel', this.onTouchCancel, false);
	};


	/**
	 * Check whether FastClick is needed.
	 *
	 * @param {Element} layer The layer to listen on
	 */
	FastClick.notNeeded = function(layer) {
		var metaViewport;
		var chromeVersion;
		var blackberryVersion;
		var firefoxVersion;

		// Devices that don't support touch don't need FastClick
		if (typeof window.ontouchstart === 'undefined') {
			return true;
		}

		// Chrome version - zero for other browsers
		chromeVersion = +(/Chrome\/([0-9]+)/.exec(navigator.userAgent) || [,0])[1];

		if (chromeVersion) {

			if (deviceIsAndroid) {
				metaViewport = document.querySelector('meta[name=viewport]');

				if (metaViewport) {
					// Chrome on Android with user-scalable="no" doesn't need FastClick (issue #89)
					if (metaViewport.content.indexOf('user-scalable=no') !== -1) {
						return true;
					}
					// Chrome 32 and above with width=device-width or less don't need FastClick
					if (chromeVersion > 31 && document.documentElement.scrollWidth <= window.outerWidth) {
						return true;
					}
				}

			// Chrome desktop doesn't need FastClick (issue #15)
			} else {
				return true;
			}
		}

		if (deviceIsBlackBerry10) {
			blackberryVersion = navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/);

			// BlackBerry 10.3+ does not require Fastclick library.
			// https://github.com/ftlabs/fastclick/issues/251
			if (blackberryVersion[1] >= 10 && blackberryVersion[2] >= 3) {
				metaViewport = document.querySelector('meta[name=viewport]');

				if (metaViewport) {
					// user-scalable=no eliminates click delay.
					if (metaViewport.content.indexOf('user-scalable=no') !== -1) {
						return true;
					}
					// width=device-width (or less than device-width) eliminates click delay.
					if (document.documentElement.scrollWidth <= window.outerWidth) {
						return true;
					}
				}
			}
		}

		// IE10 with -ms-touch-action: none or manipulation, which disables double-tap-to-zoom (issue #97)
		if (layer.style.msTouchAction === 'none' || layer.style.touchAction === 'manipulation') {
			return true;
		}

		// Firefox version - zero for other browsers
		firefoxVersion = +(/Firefox\/([0-9]+)/.exec(navigator.userAgent) || [,0])[1];

		if (firefoxVersion >= 27) {
			// Firefox 27+ does not have tap delay if the content is not zoomable - https://bugzilla.mozilla.org/show_bug.cgi?id=922896

			metaViewport = document.querySelector('meta[name=viewport]');
			if (metaViewport && (metaViewport.content.indexOf('user-scalable=no') !== -1 || document.documentElement.scrollWidth <= window.outerWidth)) {
				return true;
			}
		}

		// IE11: prefixed -ms-touch-action is no longer supported and it's recomended to use non-prefixed version
		// http://msdn.microsoft.com/en-us/library/windows/apps/Hh767313.aspx
		if (layer.style.touchAction === 'none' || layer.style.touchAction === 'manipulation') {
			return true;
		}

		return false;
	};


	/**
	 * Factory method for creating a FastClick object
	 *
	 * @param {Element} layer The layer to listen on
	 * @param {Object} [options={}] The options to override the defaults
	 */
	FastClick.attach = function(layer, options) {
		return new FastClick(layer, options);
	};


	if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {

		// AMD. Register as an anonymous module.
		define(function() {
			return FastClick;
		});
	} else if (typeof module !== 'undefined' && module.exports) {
		module.exports = FastClick.attach;
		module.exports.FastClick = FastClick;
	} else {
		window.FastClick = FastClick;
	}
}());



/*! Copyright (c) 2011 Piotr Rochala (http://rocha.la)
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *
 * Version: 1.3.0
 *
 */
(function(f){jQuery.fn.extend({slimScroll:function(h){var a=f.extend({width:"auto",height:"250px",size:"7px",color:"#000",position:"right",distance:"1px",start:"top",opacity:0.4,alwaysVisible:!1,disableFadeOut:!1,railVisible:!1,railColor:"#333",railOpacity:0.2,railDraggable:!0,railClass:"slimScrollRail",barClass:"slimScrollBar",wrapperClass:"slimScrollDiv",allowPageScroll:!1,wheelStep:20,touchScrollStep:200,borderRadius:"7px",railBorderRadius:"7px"},h);this.each(function(){function r(d){if(s){d=d||
window.event;var c=0;d.wheelDelta&&(c=-d.wheelDelta/120);d.detail&&(c=d.detail/3);f(d.target||d.srcTarget||d.srcElement).closest("."+a.wrapperClass).is(b.parent())&&m(c,!0);d.preventDefault&&!k&&d.preventDefault();k||(d.returnValue=!1)}}function m(d,f,h){k=!1;var e=d,g=b.outerHeight()-c.outerHeight();f&&(e=parseInt(c.css("top"))+d*parseInt(a.wheelStep)/100*c.outerHeight(),e=Math.min(Math.max(e,0),g),e=0<d?Math.ceil(e):Math.floor(e),c.css({top:e+"px"}));l=parseInt(c.css("top"))/(b.outerHeight()-c.outerHeight());
e=l*(b[0].scrollHeight-b.outerHeight());h&&(e=d,d=e/b[0].scrollHeight*b.outerHeight(),d=Math.min(Math.max(d,0),g),c.css({top:d+"px"}));b.scrollTop(e);b.trigger("slimscrolling",~~e);v();p()}function C(){window.addEventListener?(this.addEventListener("DOMMouseScroll",r,!1),this.addEventListener("mousewheel",r,!1),this.addEventListener("MozMousePixelScroll",r,!1)):document.attachEvent("onmousewheel",r)}function w(){u=Math.max(b.outerHeight()/b[0].scrollHeight*b.outerHeight(),D);c.css({height:u+"px"});
var a=u==b.outerHeight()?"none":"block";c.css({display:a})}function v(){w();clearTimeout(A);l==~~l?(k=a.allowPageScroll,B!=l&&b.trigger("slimscroll",0==~~l?"top":"bottom")):k=!1;B=l;u>=b.outerHeight()?k=!0:(c.stop(!0,!0).fadeIn("fast"),a.railVisible&&g.stop(!0,!0).fadeIn("fast"))}function p(){a.alwaysVisible||(A=setTimeout(function(){a.disableFadeOut&&s||(x||y)||(c.fadeOut("slow"),g.fadeOut("slow"))},1E3))}var s,x,y,A,z,u,l,B,D=30,k=!1,b=f(this);if(b.parent().hasClass(a.wrapperClass)){var n=b.scrollTop(),
c=b.parent().find("."+a.barClass),g=b.parent().find("."+a.railClass);w();if(f.isPlainObject(h)){if("height"in h&&"auto"==h.height){b.parent().css("height","auto");b.css("height","auto");var q=b.parent().parent().height();b.parent().css("height",q);b.css("height",q)}if("scrollTo"in h)n=parseInt(a.scrollTo);else if("scrollBy"in h)n+=parseInt(a.scrollBy);else if("destroy"in h){c.remove();g.remove();b.unwrap();return}m(n,!1,!0)}}else{a.height="auto"==a.height?b.parent().height():a.height;n=f("<div></div>").addClass(a.wrapperClass).css({position:"relative",
overflow:"hidden",width:a.width,height:a.height});b.css({overflow:"hidden",width:a.width,height:a.height});var g=f("<div></div>").addClass(a.railClass).css({width:a.size,height:"100%",position:"absolute",top:0,display:a.alwaysVisible&&a.railVisible?"block":"none","border-radius":a.railBorderRadius,background:a.railColor,opacity:a.railOpacity,zIndex:90}),c=f("<div></div>").addClass(a.barClass).css({background:a.color,width:a.size,position:"absolute",top:0,opacity:a.opacity,display:a.alwaysVisible?
"block":"none","border-radius":a.borderRadius,BorderRadius:a.borderRadius,MozBorderRadius:a.borderRadius,WebkitBorderRadius:a.borderRadius,zIndex:99}),q="right"==a.position?{right:a.distance}:{left:a.distance};g.css(q);c.css(q);b.wrap(n);b.parent().append(c);b.parent().append(g);a.railDraggable&&c.bind("mousedown",function(a){var b=f(document);y=!0;t=parseFloat(c.css("top"));pageY=a.pageY;b.bind("mousemove.slimscroll",function(a){currTop=t+a.pageY-pageY;c.css("top",currTop);m(0,c.position().top,!1)});
b.bind("mouseup.slimscroll",function(a){y=!1;p();b.unbind(".slimscroll")});return!1}).bind("selectstart.slimscroll",function(a){a.stopPropagation();a.preventDefault();return!1});g.hover(function(){v()},function(){p()});c.hover(function(){x=!0},function(){x=!1});b.hover(function(){s=!0;v();p()},function(){s=!1;p()});b.bind("touchstart",function(a,b){a.originalEvent.touches.length&&(z=a.originalEvent.touches[0].pageY)});b.bind("touchmove",function(b){k||b.originalEvent.preventDefault();b.originalEvent.touches.length&&
(m((z-b.originalEvent.touches[0].pageY)/a.touchScrollStep,!0),z=b.originalEvent.touches[0].pageY)});w();"bottom"===a.start?(c.css({top:b.outerHeight()-c.outerHeight()}),m(0,!0)):"top"!==a.start&&(m(f(a.start).position().top,null,!0),a.alwaysVisible||c.hide());C()}});return this}});jQuery.fn.extend({slimscroll:jQuery.fn.slimScroll})})(jQuery);





/**
 * jquery.mask.js
 * @version: v1.11.4
 * @author: Igor Escobar
 *
 * Created by Igor Escobar on 2012-03-10. Please report any bug at http://blog.igorescobar.com
 *
 * Copyright (c) 2012 Igor Escobar http://blog.igorescobar.com
 *
 * The MIT License (http://www.opensource.org/licenses/mit-license.php)
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */

/* jshint laxbreak: true */
/* global define, jQuery, Zepto */

'use strict';

// UMD (Universal Module Definition) patterns for JavaScript modules that work everywhere.
// https://github.com/umdjs/umd/blob/master/jqueryPluginCommonjs.js
(function (factory) {

    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory(require('jquery'));
    } else {
        factory(jQuery || Zepto);
    }

}(function ($) {

    var Mask = function (el, mask, options) {
        el = $(el);

        var jMask = this, oldValue = el.val(), regexMask;

        mask = typeof mask === 'function' ? mask(el.val(), undefined, el,  options) : mask;

        var p = {
            invalid: [],
            getCaret: function () {
                try {
                    var sel,
                        pos = 0,
                        ctrl = el.get(0),
                        dSel = document.selection,
                        cSelStart = ctrl.selectionStart;

                    // IE Support
                    if (dSel && navigator.appVersion.indexOf('MSIE 10') === -1) {
                        sel = dSel.createRange();
                        sel.moveStart('character', el.is('input') ? -el.val().length : -el.text().length);
                        pos = sel.text.length;
                    }
                    // Firefox support
                    else if (cSelStart || cSelStart === '0') {
                        pos = cSelStart;
                    }

                    return pos;
                } catch (e) {}
            },
            setCaret: function(pos) {
                try {
                    if (el.is(':focus')) {
                        var range, ctrl = el.get(0);

                        if (ctrl.setSelectionRange) {
                            ctrl.setSelectionRange(pos,pos);
                        } else if (ctrl.createTextRange) {
                            range = ctrl.createTextRange();
                            range.collapse(true);
                            range.moveEnd('character', pos);
                            range.moveStart('character', pos);
                            range.select();
                        }
                    }
                } catch (e) {}
            },
            events: function() {
                el
                .on('keyup.mask', p.behaviour)
                .on('paste.mask drop.mask', function() {
                    setTimeout(function() {
                        el.keydown().keyup();
                    }, 100);
                })
                .on('change.mask', function(){
                    el.data('changed', true);
                })
                .on('blur.mask', function(){
                    if (oldValue !== el.val() && !el.data('changed')) {
                        el.triggerHandler('change');
                    }
                    el.data('changed', false);
                })
                // it's very important that this callback remains in this position
                // otherwhise oldValue it's going to work buggy
                .on('keydown.mask, blur.mask', function() {
                    oldValue = el.val();
                })
                // select all text on focus
                .on('focus.mask', function (e) {
                    if (options.selectOnFocus === true) {
                        $(e.target).select();
                    }
                })
                // clear the value if it not complete the mask
                .on('focusout.mask', function() {
                    if (options.clearIfNotMatch && !regexMask.test(p.val())) {
                       p.val('');
                   }
                });
            },
            getRegexMask: function() {
                var maskChunks = [], translation, pattern, optional, recursive, oRecursive, r;

                for (var i = 0; i < mask.length; i++) {
                    translation = jMask.translation[mask.charAt(i)];

                    if (translation) {

                        pattern = translation.pattern.toString().replace(/.{1}$|^.{1}/g, '');
                        optional = translation.optional;
                        recursive = translation.recursive;

                        if (recursive) {
                            maskChunks.push(mask.charAt(i));
                            oRecursive = {digit: mask.charAt(i), pattern: pattern};
                        } else {
                            maskChunks.push(!optional && !recursive ? pattern : (pattern + '?'));
                        }

                    } else {
                        maskChunks.push(mask.charAt(i).replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'));
                    }
                }

                r = maskChunks.join('');

                if (oRecursive) {
                    r = r.replace(new RegExp('(' + oRecursive.digit + '(.*' + oRecursive.digit + ')?)'), '($1)?')
                         .replace(new RegExp(oRecursive.digit, 'g'), oRecursive.pattern);
                }

                return new RegExp(r);
            },
            destroyEvents: function() {
                el.off(['keydown', 'keyup', 'paste', 'drop', 'blur', 'focusout', ''].join('.mask '));
            },
            val: function(v) {
                var isInput = el.is('input'),
                    method = isInput ? 'val' : 'text',
                    r;

                if (arguments.length > 0) {
                    if (el[method]() !== v) {
                        el[method](v);
                    }
                    r = el;
                } else {
                    r = el[method]();
                }

                return r;
            },
            getMCharsBeforeCount: function(index, onCleanVal) {
                for (var count = 0, i = 0, maskL = mask.length; i < maskL && i < index; i++) {
                    if (!jMask.translation[mask.charAt(i)]) {
                        index = onCleanVal ? index + 1 : index;
                        count++;
                    }
                }
                return count;
            },
            caretPos: function (originalCaretPos, oldLength, newLength, maskDif) {
                var translation = jMask.translation[mask.charAt(Math.min(originalCaretPos - 1, mask.length - 1))];

                return !translation ? p.caretPos(originalCaretPos + 1, oldLength, newLength, maskDif)
                                    : Math.min(originalCaretPos + newLength - oldLength - maskDif, newLength);
            },
            behaviour: function(e) {
                e = e || window.event;
                p.invalid = [];
                var keyCode = e.keyCode || e.which;
                if ($.inArray(keyCode, jMask.byPassKeys) === -1) {

                    var caretPos = p.getCaret(),
                        currVal = p.val(),
                        currValL = currVal.length,
                        changeCaret = caretPos < currValL,
                        newVal = p.getMasked(),
                        newValL = newVal.length,
                        maskDif = p.getMCharsBeforeCount(newValL - 1) - p.getMCharsBeforeCount(currValL - 1);

                    p.val(newVal);

                    // change caret but avoid CTRL+A
                    if (changeCaret && !(keyCode === 65 && e.ctrlKey)) {
                        // Avoid adjusting caret on backspace or delete
                        if (!(keyCode === 8 || keyCode === 46)) {
                            caretPos = p.caretPos(caretPos, currValL, newValL, maskDif);
                        }
                        p.setCaret(caretPos);
                    }

                    return p.callbacks(e);
                }
            },
            getMasked: function(skipMaskChars) {
                var buf = [],
                    value = p.val(),
                    m = 0, maskLen = mask.length,
                    v = 0, valLen = value.length,
                    offset = 1, addMethod = 'push',
                    resetPos = -1,
                    lastMaskChar,
                    check;

                if (options.reverse) {
                    addMethod = 'unshift';
                    offset = -1;
                    lastMaskChar = 0;
                    m = maskLen - 1;
                    v = valLen - 1;
                    check = function () {
                        return m > -1 && v > -1;
                    };
                } else {
                    lastMaskChar = maskLen - 1;
                    check = function () {
                        return m < maskLen && v < valLen;
                    };
                }

                while (check()) {
                    var maskDigit = mask.charAt(m),
                        valDigit = value.charAt(v),
                        translation = jMask.translation[maskDigit];

                    if (translation) {
                        if (valDigit.match(translation.pattern)) {
                            buf[addMethod](valDigit);
                             if (translation.recursive) {
                                if (resetPos === -1) {
                                    resetPos = m;
                                } else if (m === lastMaskChar) {
                                    m = resetPos - offset;
                                }

                                if (lastMaskChar === resetPos) {
                                    m -= offset;
                                }
                            }
                            m += offset;
                        } else if (translation.optional) {
                            m += offset;
                            v -= offset;
                        } else if (translation.fallback) {
                            buf[addMethod](translation.fallback);
                            m += offset;
                            v -= offset;
                        } else {
                          p.invalid.push({p: v, v: valDigit, e: translation.pattern});
                        }
                        v += offset;
                    } else {
                        if (!skipMaskChars) {
                            buf[addMethod](maskDigit);
                        }

                        if (valDigit === maskDigit) {
                            v += offset;
                        }

                        m += offset;
                    }
                }

                var lastMaskCharDigit = mask.charAt(lastMaskChar);
                if (maskLen === valLen + 1 && !jMask.translation[lastMaskCharDigit]) {
                    buf.push(lastMaskCharDigit);
                }

                return buf.join('');
            },
            callbacks: function (e) {
                var val = p.val(),
                    changed = val !== oldValue,
                    defaultArgs = [val, e, el, options],
                    callback = function(name, criteria, args) {
                        if (typeof options[name] === 'function' && criteria) {
                            options[name].apply(this, args);
                        }
                    };

                callback('onChange', changed === true, defaultArgs);
                callback('onKeyPress', changed === true, defaultArgs);
                callback('onComplete', val.length === mask.length, defaultArgs);
                callback('onInvalid', p.invalid.length > 0, [val, e, el, p.invalid, options]);
            }
        };


        // public methods
        jMask.mask = mask;
        jMask.options = options;
        jMask.remove = function() {
            var caret = p.getCaret();
            p.destroyEvents();
            p.val(jMask.getCleanVal());
            p.setCaret(caret - p.getMCharsBeforeCount(caret));
            return el;
        };

        // get value without mask
        jMask.getCleanVal = function() {
           return p.getMasked(true);
        };

       jMask.init = function(onlyMask) {
            onlyMask = onlyMask || false;
            options = options || {};

            jMask.byPassKeys = $.jMaskGlobals.byPassKeys;
            jMask.translation = $.jMaskGlobals.translation;

            jMask.translation = $.extend({}, jMask.translation, options.translation);
            jMask = $.extend(true, {}, jMask, options);

            regexMask = p.getRegexMask();

            if (onlyMask === false) {

                if (options.placeholder) {
                    el.attr('placeholder' , options.placeholder);
                }

                // autocomplete needs to be off. we can't intercept events
                // the browser doesn't  fire any kind of event when something is
                // selected in a autocomplete list so we can't sanitize it.
                el.attr('autocomplete', 'off');
                p.destroyEvents();
                p.events();

                var caret = p.getCaret();
                p.val(p.getMasked());
                p.setCaret(caret + p.getMCharsBeforeCount(caret, true));

            } else {
                p.events();
                p.val(p.getMasked());
            }
        };

        jMask.init(!el.is('input'));
    };

    $.maskWatchers = {};
    var HTMLAttributes = function () {
            var input = $(this),
                options = {},
                prefix = 'data-mask-',
                mask = input.attr('data-mask');

            if (input.attr(prefix + 'reverse')) {
                options.reverse = true;
            }

            if (input.attr(prefix + 'clearifnotmatch')) {
                options.clearIfNotMatch = true;
            }

            if (input.attr(prefix + 'selectonfocus') === 'true') {
               options.selectOnFocus = true;
            }

            if (notSameMaskObject(input, mask, options)) {
                return input.data('mask', new Mask(this, mask, options));
            }
        },
        notSameMaskObject = function(field, mask, options) {
            options = options || {};
            var maskObject = $(field).data('mask'),
                stringify = JSON.stringify,
                value = $(field).val() || $(field).text();
            try {
                if (typeof mask === 'function') {
                    mask = mask(value);
                }
                return typeof maskObject !== 'object' || stringify(maskObject.options) !== stringify(options) || maskObject.mask !== mask;
            } catch (e) {}
        };


    $.fn.mask = function(mask, options) {
        options = options || {};
        var selector = this.selector,
            globals = $.jMaskGlobals,
            interval = $.jMaskGlobals.watchInterval,
            maskFunction = function() {
                if (notSameMaskObject(this, mask, options)) {
                    return $(this).data('mask', new Mask(this, mask, options));
                }
            };

        $(this).each(maskFunction);

        if (selector && selector !== '' && globals.watchInputs) {
            clearInterval($.maskWatchers[selector]);
            $.maskWatchers[selector] = setInterval(function(){
                $(document).find(selector).each(maskFunction);
            }, interval);
        }
        return this;
    };

    $.fn.unmask = function() {
        clearInterval($.maskWatchers[this.selector]);
        delete $.maskWatchers[this.selector];
        return this.each(function() {
            var dataMask = $(this).data('mask');
            if (dataMask) {
                dataMask.remove().removeData('mask');
            }
        });
    };

    $.fn.cleanVal = function() {
        return this.data('mask').getCleanVal();
    };

    $.applyDataMask = function(selector) {
        selector = selector || $.jMaskGlobals.maskElements;
        var $selector = (selector instanceof $) ? selector : $(selector);
        $selector.filter($.jMaskGlobals.dataMaskAttr).each(HTMLAttributes);
    };

    var globals = {
        maskElements: 'input,td,span,div',
        dataMaskAttr: '*[data-mask]',
        dataMask: true,
        watchInterval: 300,
        watchInputs: true,
        watchDataMask: false,
        byPassKeys: [9, 16, 17, 18, 36, 37, 38, 39, 40, 91],
        translation: {
            '0': {pattern: /\d/},
            '9': {pattern: /\d/, optional: true},
            '#': {pattern: /\d/, recursive: true},
            'A': {pattern: /[a-zA-Z0-9]/},
            'S': {pattern: /[a-zA-Z]/}
        }
    };

    $.jMaskGlobals = $.jMaskGlobals || {};
    globals = $.jMaskGlobals = $.extend(true, {}, globals, $.jMaskGlobals);

    // looking for inputs with data-mask attribute
    if (globals.dataMask) { $.applyDataMask(); }

    setInterval(function(){
        if ($.jMaskGlobals.watchDataMask) { $.applyDataMask(); }
    }, globals.watchInterval);
}));








/*!
 * Glide.js
 * Version: 2.0.2
 * Simple, lightweight and fast jQuery slider
 * Author: @jedrzejchalubek
 * Site: http://http://glide.jedrzejchalubek.com/
 * Licensed under the MIT license
 */

!function(a,b,c,d){var e=function(a,b){function c(){}return c.prototype.make=function(b){return this.offset="undefined"!=typeof b?b:0,this[a.options.type](),this},c.prototype.after=function(b){return setTimeout(function(){b()},a.options.animationDuration+20)},c.prototype.slider=function(){var c,d=a.current*a.width-(a.width+this.offset);b.Run.isStart()?(c=d,b.Arrows.disable("prev")):b.Run.isEnd()?(c=d-2*a.options.paddings,b.Arrows.disable("next")):(c=d-a.options.paddings,b.Arrows.enable()),a.track.css({transition:b.Transition.get("all"),transform:b.Translate.set("x",c)})},c.prototype.carousel=function(){var c=0,d=0,e=b.Build.shift-a.options.paddings;b.Run.isOffset("<")?(c=0,d=e-this.offset,b.Run.flag=!1,this.after(function(){a.track.css({transition:b.Transition.clear("all"),transform:b.Translate.set("x",a.width*a.length+e)})})):b.Run.isOffset(">")?(c=a.width*a.length,d=e+a.width-this.offset,b.Run.flag=!1,this.after(function(){a.track.css({transition:b.Transition.clear("all"),transform:b.Translate.set("x",a.width+e)})})):(c=a.width*a.current,d=e-this.offset),a.track.css({transition:b.Transition.get("all"),transform:b.Translate.set("x",c+d)})},c.prototype.slideshow=function(c){a.slides.css("transition",b.Transition.get("opacity")).eq(a.current-1).css("opacity","1").siblings().css("opacity",0)},new c},f=function(a,b){function c(){}return c.prototype.instance=function(){return{current:function(){return a.current},go:function(a,c){return b.Run.make(a,c)},jump:function(a,c){return b.Transition.jumping=!0,b.Animation.after(function(){b.Transition.jumping=!1}),b.Run.make(a,c)},start:function(c){return b.Run.running=!0,a.options.autoplay=parseInt(c),b.Run.play()},play:function(){return b.Run.play()},pause:function(){return b.Run.pause()},destroy:function(){b.Run.pause(),b.Events.unbind(),b.Touch.unbind(),b.Arrows.unbind(),b.Bullets.unbind(),a.slider.removeData("glide_api"),delete a.slider,delete a.track,delete a.slides,delete a.width,delete a.length},refresh:function(){b.Build.removeClones(),a.collect(),a.setup(),b.Build.init()}}},new c},g=function(b,c){function d(){this.build(),this.bind()}return d.prototype.build=function(){this.wrapper=b.slider.find("."+b.options.classes.arrows),this.items=this.wrapper.children()},d.prototype.disable=function(a){return this.items.filter("."+b.options.classes["arrow"+c.Helper.capitalise(a)]).unbind("click.glide touchstart.glide").addClass(b.options.classes.disabled).siblings().removeClass(b.options.classes.disabled).end()},d.prototype.enable=function(){return this.bind(),this.items.removeClass(b.options.classes.disabled)},d.prototype.bind=function(){return this.items.on("click.glide touchstart.glide",function(b){b.preventDefault(),c.Events.disabled||(c.Run.pause(),c.Run.make(a(this).data("glide-dir")),c.Animation.after(function(){c.Run.play()}))})},d.prototype.unbind=function(){return this.items.off("click.glide touchstart.glide")},new d},h=function(a,b){function c(){this.growth=0,this.shift=0,this.init()}return c.prototype.init=function(){this.growth=a.width*a.clones.length,this[a.options.type](),this.active(),b.Height.set(),b.Bullets.active()},c.prototype.removeClones=function(){return a.track.find(".clone").remove()},c.prototype.isType=function(b){return a.options.type===b},c.prototype.slider=function(){b.Run.isStart()&&b.Arrows.disable("prev"),b.Run.isEnd()&&b.Arrows.disable("next"),a.slides.width(a.width),a.track.css({width:a.width*a.length,transform:b.Translate.set("x",a.width*(a.current-1))})},c.prototype.carousel=function(){this.shift=a.width*a.clones.length/2-a.width,this.appendClones(),a.slides.width(a.width),a.track.css({width:a.width*a.length+this.growth,transform:b.Translate.set("x",a.width*a.current-(a.options.paddings-this.shift))})},c.prototype.slideshow=function(){a.slides.eq(a.current-1).css("opacity",1).siblings().css("opacity",0)},c.prototype.active=function(){a.slides.eq(a.current-1).addClass(a.options.classes.active).siblings().removeClass(a.options.classes.active)},c.prototype.appendClones=function(){var b,c=a.clones.length/2,d=a.clones.slice(0,c),e=a.clones.slice(c);for(b in d)d[b].width(a.width).appendTo(a.track);for(b in e)e[b].width(a.width).prependTo(a.track)},new c},i=function(b,c){function d(){this.build(),this.bind()}return d.prototype.build=function(){this.wrapper=b.slider.children("."+b.options.classes.bullets);for(var c=1;c<=b.length;c++)a("<li>",{"class":b.options.classes.bullet,"data-glide-dir":"="+c}).appendTo(this.wrapper);this.items=this.wrapper.children()},d.prototype.active=function(){c.Bullets.items.eq(b.current-1).addClass("active").siblings().removeClass("active")},d.prototype.bind=function(){this.items.on("click.glide touchstart.glide",function(b){b.preventDefault(),c.Events.disabled||(c.Run.pause(),c.Run.make(a(this).data("glide-dir")),c.Animation.after(function(){c.Run.play()}))})},d.prototype.unbind=function(){this.items.off("click.glide touchstart.glide")},new d},j=function(a,b){function c(){for(var c in b)this[c]=new b[c](a,this)}return new c},k=function(c,d){function e(){this.disabled=!1,this.anchors=c.track.find("a"),this.keyboard(),this.hoverpause(),this.resize(),this.triggers()}return e.prototype.keyboard=function(){c.options.keyboard&&a(b).on("keyup.glide",function(a){39===a.keyCode&&d.Run.make(">"),37===a.keyCode&&d.Run.make("<")})},e.prototype.hoverpause=function(){c.options.hoverpause&&c.track.on("mouseover.glide",function(){d.Run.pause()}).on("mouseout.glide",function(){d.Run.play()})},e.prototype.resize=function(){a(b).on("resize",this.throttle(function(){d.Transition.jumping=!0,d.Run.pause(),c.setup(),d.Build.init(),d.Run.make("="+c.current,!1),d.Run.play(),d.Transition.jumping=!1},c.options.throttle))},e.prototype.triggers=function(){this.triggers=a("[data-glide-trigger]"),this.triggers.length&&this.triggers.off("click.glide touchstart.glide").on("click.glide touchstart.glide",function(b){b.preventDefault();var c=a(this).data("glide-trigger").split(" ");if(!d.Events.disabled)for(var e in c){var f=a(c[e]).data("glide_api");f.pause(),f.go(a(this).data("glide-dir")),f.play()}})},e.prototype.disable=function(){return this.disabled=!0,this},e.prototype.enable=function(){return this.disabled=!1,this},e.prototype.detachClicks=function(){return this.anchors.off("click"),this},e.prototype.preventClicks=function(a){return this.anchors.one("click",function(a){a.preventDefault()}),this},e.prototype.call=function(a){return"undefined"!==a&&"function"==typeof a&&a(c.current,c.slides.eq(c.current-1)),this},e.prototype.unbind=function(){c.track.off("keyup.glide").off("mouseover.glide").off("mouseout.glide"),this.triggers.off("click.glide touchstart.glide"),a(b).off("keyup.glide").off("resize.glide")},e.prototype.throttle=function(a,b,c){var e,f,g,h=null,i=0;c||(c={});var j=function(){i=c.leading===!1?0:d.Helper.now(),h=null,g=a.apply(e,f),h||(e=f=null)};return function(){var k=d.Helper.now();i||c.leading!==!1||(i=k);var l=b-(k-i);return e=this,f=arguments,0>=l||l>b?(h&&(clearTimeout(h),h=null),i=k,g=a.apply(e,f),h||(e=f=null)):h||c.trailing===!1||(h=setTimeout(j,l)),g}},new e},l=function(a,b){function c(){a.options.autoheight&&a.wrapper.css({transition:b.Transition.get("height")})}return c.prototype.get=function(){return a.slides.eq(a.current-1).height()},c.prototype.set=function(b){return a.options.autoheight||b?a.wrapper.height(this.get()):!1},new c},m=function(a,b){function c(){}return c.prototype.capitalise=function(a){return a.charAt(0).toUpperCase()+a.slice(1)},c.prototype.now=Date.now||function(){return(new Date).getTime()},new c},n=function(a,b){function c(){this.running=!1,this.flag=!1,this.play()}return c.prototype.play=function(){var b=this;return(a.options.autoplay||this.running)&&"undefined"==typeof this.interval&&(this.interval=setInterval(function(){b.make(">")},a.options.autoplay)),this.interval},c.prototype.pause=function(){return(a.options.autoplay||this.running)&&this.interval>=0&&(this.interval=clearInterval(this.interval)),this.interval},c.prototype.isStart=function(){return 1===a.current},c.prototype.isEnd=function(){return a.current===a.length},c.prototype.isOffset=function(a){return this.flag&&this.direction===a},c.prototype.make=function(c,d){var e=this;switch(this.direction=c.substr(0,1),this.steps=c.substr(1)?c.substr(1):0,a.options.hoverpause||this.pause(),d!==!1&&b.Events.disable().call(a.options.beforeTransition),this.direction){case">":this.isEnd()?(a.current=1,this.flag=!0):">"===this.steps?a.current=a.length:a.current=a.current+1;break;case"<":this.isStart()?(a.current=a.length,this.flag=!0):"<"===this.steps?a.current=1:a.current=a.current-1;break;case"=":a.current=parseInt(this.steps)}b.Height.set(),b.Bullets.active(),b.Animation.make().after(function(){b.Build.active(),d!==!1&&b.Events.enable().call(d).call(a.options.afterTransition),a.options.hoverpause||e.play()})},new c},o=function(b,c){function d(){this.dragging=!1,b.options.touchDistance&&b.track.on({"touchstart.glide":a.proxy(this.start,this)}),b.options.dragDistance&&b.track.on({"mousedown.glide":a.proxy(this.start,this)})}return d.prototype.unbind=function(){b.track.off("touchstart.glide mousedown.glide").off("touchmove.glide mousemove.glide").off("touchend.glide touchcancel.glide mouseup.glide mouseleave.glide")},d.prototype.start=function(d){if(d.preventDefault(),d.stopPropagation(),!c.Events.disabled&&!this.dragging){c.Transition.jumping=!0,c.Events.detachClicks().call(b.options.swipeStart),c.Run.pause();var e;e="mousedown"===d.type?d.originalEvent:d.originalEvent.touches[0]||d.originalEvent.changedTouches[0],this.touchStartX=parseInt(e.pageX),this.touchStartY=parseInt(e.pageY),this.touchSin=null,this.dragging=!0,b.track.on({"touchmove.glide mousemove.glide":c.Events.throttle(a.proxy(this.move,this),b.options.throttle),"touchend.glide touchcancel.glide mouseup.glide mouseleave.glide":a.proxy(this.end,this)})}},d.prototype.move=function(a){if(!c.Events.disabled&&this.dragging){c.Events.preventClicks();var d;d="mousemove"===a.type?a.originalEvent:a.originalEvent.touches[0]||a.originalEvent.changedTouches[0];var e=parseInt(d.pageX)-this.touchStartX,f=parseInt(d.pageY)-this.touchStartY,g=Math.abs(e<<2),h=Math.abs(f<<2),i=Math.sqrt(g+h),j=Math.sqrt(h);if(this.touchSin=Math.asin(j/i),!(180*this.touchSin/Math.PI<45))return void(this.dragging=!1);a.stopPropagation(),a.preventDefault(),b.track.addClass(b.options.classes.dragging),c.Animation.make(e)}},d.prototype.end=function(a){if(!c.Events.disabled&&this.dragging){c.Transition.jumping=!1,this.dragging=!1,c.Events.disable().call(b.options.swipeEnd),b.track.removeClass(b.options.classes.dragging);var d;d="mouseup"===a.type||"mouseleave"===a.type?a.originalEvent:a.originalEvent.touches[0]||a.originalEvent.changedTouches[0];var e=d.pageX-this.touchStartX,f=180*this.touchSin/Math.PI;c.Build.isType("slider")&&(c.Run.isStart()&&e>0&&(e=0),c.Run.isEnd()&&0>e&&(e=0)),e>b.options.touchDistance&&45>f?c.Run.make("<"):e<-b.options.touchDistance&&45>f?c.Run.make(">"):c.Animation.make(),c.Animation.after(function(){c.Events.enable(),c.Run.play()}),b.track.off("touchmove.glide mousemove.glide").off("touchend.glide touchcancel.glide mouseup.glide mouseleave.glide")}},new d},p=function(a,b){function c(){this.jumping=!1}return c.prototype.get=function(b){return this.jumping?this.clear("all"):b+" "+a.options.animationDuration+"ms "+a.options.animationTimingFunc},c.prototype.clear=function(b){return b+" 0ms "+a.options.animationTimingFunc},new c},q=function(a,b){function c(){this.axes={x:0,y:0,z:0}}return c.prototype.get=function(){var b=a.track[0].styles.transform.replace(/[^0-9\-.,]/g,"").split(",");return parseInt(b[12]||b[4])},c.prototype.set=function(a,b){return this.axes[a]=parseInt(b),"translate3d("+-1*this.axes.x+"px, "+this.axes.y+"px, "+this.axes.z+"px)"},new c},r=function(b,c){var d={autoplay:4e3,type:"carousel",startAt:1,hoverpause:!0,keyboard:!0,touchDistance:80,dragDistance:120,animationDuration:400,animationTimingFunc:"cubic-bezier(0.165, 0.840, 0.440, 1.000)",throttle:16,autoheight:!1,paddings:0,classes:{base:"glide",wrapper:"glide__wrapper",track:"glide__track",slide:"glide__slide",arrows:"glide__arrows",arrow:"glide__arrow",arrowNext:"next",arrowPrev:"prev",bullets:"glide__bullets",bullet:"glide__bullet",active:"active",dragging:"dragging",disabled:"disabled"},beforeInit:function(a){},afterInit:function(a){},beforeTransition:function(a,b){},afterTransition:function(a,b){},swipeStart:function(a,b){},swipeEnd:function(a,b){}};this.options=a.extend({},d,c),this.current=parseInt(this.options.startAt),this.element=b,this.collect(),this.setup(),this.options.beforeInit(this.slider);var r=new j(this,{Helper:m,Translate:q,Transition:p,Events:k,Arrows:g,Bullets:i,Height:l,Run:n,Build:h,Animation:e,Touch:o,Api:f});return this.options.afterInit(this.slider),r.Api.instance()};r.prototype.collect=function(){this.slider=this.element.addClass(this.options.classes.base+"--"+this.options.type),this.track=this.slider.find("."+this.options.classes.track),this.wrapper=this.slider.find("."+this.options.classes.wrapper),this.slides=this.track.find("."+this.options.classes.slide),this.clones=[this.slides.eq(0).clone().addClass("clone"),this.slides.eq(1).clone().addClass("clone"),this.slides.eq(-1).clone().addClass("clone"),this.slides.eq(-2).clone().addClass("clone")]},r.prototype.setup=function(){this.width=this.slider.width()-2*this.options.paddings,this.length=this.slides.length},a.fn.glide=function(b){return this.each(function(){a.data(this,"glide_api")||a.data(this,"glide_api",new r(a(this),b))})}}(jQuery,window,document);
//# sourceMappingURL=glide.min.js.map





! function(name, definition) {
    if (typeof module != 'undefined' && module.exports) module.exports = definition()
    else if (typeof define == 'function' && define.amd) define(definition)
    else this[name] = definition()
}('bowser', function() {
    /**
     * See useragents.js for examples of navigator.userAgent
     */

    var t = true

        function detect(ua) {

            function getFirstMatch(regex) {
                var match = ua.match(regex);
                return (match && match.length > 1 && match[1]) || '';
            }

            function getSecondMatch(regex) {
                var match = ua.match(regex);
                return (match && match.length > 1 && match[2]) || '';
            }

            var iosdevice = getFirstMatch(/(ipod|iphone|ipad)/i).toLowerCase(),
                likeAndroid = /like android/i.test(ua),
                android = !likeAndroid && /android/i.test(ua),
                chromeBook = /CrOS/.test(ua),
                edgeVersion = getFirstMatch(/edge\/(\d+(\.\d+)?)/i),
                versionIdentifier = getFirstMatch(/version\/(\d+(\.\d+)?)/i),
                tablet = /tablet/i.test(ua),
                mobile = !tablet && /[^-]mobi/i.test(ua),
                result

            if (/opera|opr/i.test(ua)) {
                result = {
                    name: 'Opera',
                    opera: t,
                    version: versionIdentifier || getFirstMatch(/(?:opera|opr)[\s\/](\d+(\.\d+)?)/i)
                }
            } else if (/yabrowser/i.test(ua)) {
                result = {
                    name: 'Yandex Browser',
                    yandexbrowser: t,
                    version: versionIdentifier || getFirstMatch(/(?:yabrowser)[\s\/](\d+(\.\d+)?)/i)
                }
            } else if (/windows phone/i.test(ua)) {
                result = {
                    name: 'Windows Phone',
                    windowsphone: t
                }
                if (edgeVersion) {
                    result.msedge = t
                    result.version = edgeVersion
                } else {
                    result.msie = t
                    result.version = getFirstMatch(/iemobile\/(\d+(\.\d+)?)/i)
                }
            } else if (/msie|trident/i.test(ua)) {
                result = {
                    name: 'Internet Explorer',
                    msie: t,
                    version: getFirstMatch(/(?:msie |rv:)(\d+(\.\d+)?)/i)
                }
            } else if (chromeBook) {
                result = {
                    name: 'Chrome',
                    chromeBook: t,
                    chrome: t,
                    version: getFirstMatch(/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i)
                }
            } else if (/chrome.+? edge/i.test(ua)) {
                result = {
                    name: 'Microsoft Edge',
                    msedge: t,
                    version: edgeVersion
                }
            } else if (/chrome|crios|crmo/i.test(ua)) {
                result = {
                    name: 'Chrome',
                    chrome: t,
                    version: getFirstMatch(/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i)
                }
            } else if (iosdevice) {
                result = {
                    name: iosdevice == 'iphone' ? 'iPhone' : iosdevice == 'ipad' ? 'iPad' : 'iPod'
                }
                // WTF: version is not part of user agent in web apps
                if (versionIdentifier) {
                    result.version = versionIdentifier
                }
            } else if (/sailfish/i.test(ua)) {
                result = {
                    name: 'Sailfish',
                    sailfish: t,
                    version: getFirstMatch(/sailfish\s?browser\/(\d+(\.\d+)?)/i)
                }
            } else if (/seamonkey\//i.test(ua)) {
                result = {
                    name: 'SeaMonkey',
                    seamonkey: t,
                    version: getFirstMatch(/seamonkey\/(\d+(\.\d+)?)/i)
                }
            } else if (/firefox|iceweasel/i.test(ua)) {
                result = {
                    name: 'Firefox',
                    firefox: t,
                    version: getFirstMatch(/(?:firefox|iceweasel)[ \/](\d+(\.\d+)?)/i)
                }
                if (/\((mobile|tablet);[^\)]*rv:[\d\.]+\)/i.test(ua)) {
                    result.firefoxos = t
                }
            } else if (/silk/i.test(ua)) {
                result = {
                    name: 'Amazon Silk',
                    silk: t,
                    version: getFirstMatch(/silk\/(\d+(\.\d+)?)/i)
                }
            } else if (android) {
                result = {
                    name: 'Android',
                    version: versionIdentifier
                }
            } else if (/phantom/i.test(ua)) {
                result = {
                    name: 'PhantomJS',
                    phantom: t,
                    version: getFirstMatch(/phantomjs\/(\d+(\.\d+)?)/i)
                }
            } else if (/blackberry|\bbb\d+/i.test(ua) || /rim\stablet/i.test(ua)) {
                result = {
                    name: 'BlackBerry',
                    blackberry: t,
                    version: versionIdentifier || getFirstMatch(/blackberry[\d]+\/(\d+(\.\d+)?)/i)
                }
            } else if (/(web|hpw)os/i.test(ua)) {
                result = {
                    name: 'WebOS',
                    webos: t,
                    version: versionIdentifier || getFirstMatch(/w(?:eb)?osbrowser\/(\d+(\.\d+)?)/i)
                };
                /touchpad\//i.test(ua) && (result.touchpad = t)
            } else if (/bada/i.test(ua)) {
                result = {
                    name: 'Bada',
                    bada: t,
                    version: getFirstMatch(/dolfin\/(\d+(\.\d+)?)/i)
                };
            } else if (/tizen/i.test(ua)) {
                result = {
                    name: 'Tizen',
                    tizen: t,
                    version: getFirstMatch(/(?:tizen\s?)?browser\/(\d+(\.\d+)?)/i) || versionIdentifier
                };
            } else if (/safari/i.test(ua)) {
                result = {
                    name: 'Safari',
                    safari: t,
                    version: versionIdentifier
                }
            } else {
                result = {
                    name: getFirstMatch(/^(.*)\/(.*) /),
                    version: getSecondMatch(/^(.*)\/(.*) /)
                };
            }

            // set webkit or gecko flag for browsers based on these engines
            if (!result.msedge && /(apple)?webkit/i.test(ua)) {
                result.name = result.name || "Webkit"
                result.webkit = t
                if (!result.version && versionIdentifier) {
                    result.version = versionIdentifier
                }
            } else if (!result.opera && /gecko\//i.test(ua)) {
                result.name = result.name || "Gecko"
                result.gecko = t
                result.version = result.version || getFirstMatch(/gecko\/(\d+(\.\d+)?)/i)
            }

            // set OS flags for platforms that have multiple browsers
            if (!result.msedge && (android || result.silk)) {
                result.android = t
            } else if (iosdevice) {
                result[iosdevice] = t
                result.ios = t
            }

            // OS version extraction
            var osVersion = '';
            if (result.windowsphone) {
                osVersion = getFirstMatch(/windows phone (?:os)?\s?(\d+(\.\d+)*)/i);
            } else if (iosdevice) {
                osVersion = getFirstMatch(/os (\d+([_\s]\d+)*) like mac os x/i);
                osVersion = osVersion.replace(/[_\s]/g, '.');
            } else if (android) {
                osVersion = getFirstMatch(/android[ \/-](\d+(\.\d+)*)/i);
            } else if (result.webos) {
                osVersion = getFirstMatch(/(?:web|hpw)os\/(\d+(\.\d+)*)/i);
            } else if (result.blackberry) {
                osVersion = getFirstMatch(/rim\stablet\sos\s(\d+(\.\d+)*)/i);
            } else if (result.bada) {
                osVersion = getFirstMatch(/bada\/(\d+(\.\d+)*)/i);
            } else if (result.tizen) {
                osVersion = getFirstMatch(/tizen[\/\s](\d+(\.\d+)*)/i);
            }
            if (osVersion) {
                result.osversion = osVersion;
            }

            // device type extraction
            var osMajorVersion = osVersion.split('.')[0];
            if (tablet || iosdevice == 'ipad' || (android && (osMajorVersion == 3 || (osMajorVersion == 4 && !mobile))) || result.silk) {
                result.tablet = t
            } else if (mobile || iosdevice == 'iphone' || iosdevice == 'ipod' || android || result.blackberry || result.webos || result.bada) {
                result.mobile = t
            }

            // Graded Browser Support
            // http://developer.yahoo.com/yui/articles/gbs
            if (result.msedge ||
                (result.msie && result.version >= 10) ||
                (result.yandexbrowser && result.version >= 15) ||
                (result.chrome && result.version >= 20) ||
                (result.firefox && result.version >= 20.0) ||
                (result.safari && result.version >= 6) ||
                (result.opera && result.version >= 10.0) ||
                (result.ios && result.osversion && result.osversion.split(".")[0] >= 6) ||
                (result.blackberry && result.version >= 10.1)
            ) {
                result.a = t;
            } else if ((result.msie && result.version < 10) ||
                (result.chrome && result.version < 20) ||
                (result.firefox && result.version < 20.0) ||
                (result.safari && result.version < 6) ||
                (result.opera && result.version < 10.0) ||
                (result.ios && result.osversion && result.osversion.split(".")[0] < 6)
            ) {
                result.c = t
            } else result.x = t

                return result
        }

    var bowser = detect(typeof navigator !== 'undefined' ? navigator.userAgent : '')

    bowser.test = function(browserList) {
        for (var i = 0; i < browserList.length; ++i) {
            var browserItem = browserList[i];
            if (typeof browserItem === 'string') {
                if (browserItem in bowser) {
                    return true;
                }
            }
        }
        return false;
    }

    /*
     * Set our detect method to the main bowser object so we can
     * reuse it to test other user agents.
     * This is needed to implement future tests.
     */
    bowser._detect = detect;

    return bowser
});