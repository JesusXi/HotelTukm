var pop={isChrome:/chrome/i.test(navigator.userAgent),isFF:/firefox/i.test(navigator.userAgent),preventScroll:function(t){t.preventDefault()},addEvent:function(t,e,n){return null!=t.addEventListener?t.addEventListener(e,n,!1):null!=t.attachEvent?t.attachEvent("on"+e,n):t[e]=n},removeEvent:function(t,e,n){return null!=t.removeEventListener?t.removeEventListener(e,n):null!=t.detachEvent?t.detachEvent("on"+e,n):t[e]=null},addPopupAnimationEndEvent:function(t,e){var n=function(t,e){return function(){e(t)}}(t,e);this.addEvent(t,"animationend",n),this.addEvent(t,"oanimationend",n),this.addEvent(t,"webkitAnimationEnd",n),this.addEvent(t,"MSAnimationEnd",n),t.fn=n},removePopupAnimationEndEvent:function(t){this.removeEvent(t,"animationend",t.fn),this.removeEvent(t,"oanimationend",t.fn),this.removeEvent(t,"webkitAnimationEnd",t.fn),this.removeEvent(t,"MSAnimationEnd",t.fn),t.fn=null},prop:function(t,e,n){var i=void 0;"Transform"===e&&null!=(i=t.getAttribute("data-popup-transform"))&&(n.length&&(n+=" "),n+=i);for(var o="Webkit Moz O ms Khtml".split(" "),s=0;s<o.length;s++)if(void 0!==t.style[o[s]+e])return void(t.style[o[s]+e]=n);void 0===t.style[e.toLowerCase()]||(t.style[e.toLowerCase()]=n)},animationSupport:function(){if(null!=this.animations)return this.animations;var t=document.createElement("div");if(void 0!==t.style.animationName)return this.animations=!0;for(var e="Webkit Moz O ms Khtml".split(" "),n=0;n<e.length;n++)if(void 0!==t.style[e[n]+"AnimationName"])return this.animations=!0;return this.animations=!1},popupFadeIn:function(t){t.style.opacity=1,this.removeClass(t,"fadeIn"),t.offsetWidth,this.removePopupAnimationEndEvent(t)},popupFadeOut:function(t){t.style.visibility="hidden",this.prop(t,"Transform","translate3d(-999999px,0,0)"),t.style.opacity=0,this.removeClass(t,"fadeOut"),t.offsetWidth,this.removePopupAnimationEndEvent(t)},closeGroup:function(t){if(0==t.hasAttribute("data-popup-group"))return!0;for(var e=t.getAttribute("data-popup-group"),n=document.getElementsByClassName("popup"),i=n.length-1;i>=0;i--)for(var o=n[i];o!=t&&o!=document;){if(o.getAttribute("data-popup-group")===e){if(!1!==this.isOpen(o))this.closePopup(o.id);else if(o.hasAttribute("data-popup-open"))return!1;break}o=o.parentNode}return!0},show:function(t){var e=document.getElementById(t);this.prop(e,"Transform","")},openPopup:function(t){var e=document.getElementById(t);if(!this.closeGroup(e))return!1;var n=this.canOpen(e);if(!1===n)return!1;e.setAttribute("data-popup-open",!0);var i=e.getAttribute("data-popup-type");if(i>0){if(null!=n){var o=e.getAttribute("data-anim");null==o?(o=[n.style.animationDuration,n.style.animationDelay],e.setAttribute("data-anim",o.join(";"))):o=o.split(";"),e.style.animationDuration=e.style["-webkit-animation-duration"]=e.style["-moz-animation-duration"]=o[0],e.style.animationDelay=e.style["-webkit-animation-delay"]=e.style["-moz-animation-delay"]=o[1],this.removeClass(e,"fadeOut"),this.addClass(e,"fadeIn"),e.style.visibility="visible",this.addPopupAnimationEndEvent(e,this.popupFadeIn.bind(this))}if(1==i){e.escapePressed=function(t,e){return function(n){var i=e.getAttribute("onclick");i&&i.length>0&&27==n.keyCode&&e.escapePressed&&(t.closePopup(e.id),t.removeEvent(document,"keyup",e.escapePressed),e.escapePressed=void 0)}}(this,e),this.addEvent(document,"keyup",e.escapePressed);window.offsetWidth;document.body.style.marginLeft=parseInt(document.body.clientWidth*this.z()-window.innerWidth)+"px",this.addClass(document.body,"modal"),e.addEventListener&&e.addEventListener("touchstart",function(t,e){return function(n){if(t.isOver(e.firstChild))n.preventDefault();else{var i=e.getAttribute("onclick");i&&i.length>0&&t.closePopup(e.id)}}}(this,e))}}if(this.prop(e,"Transform",""),null!=n)wl.doAnimate(n);else{if(!this.hasClass(e,"animm")){var s=e.querySelector(".animm");null!=s&&(s.style.visibility="visible")}e.style.visibility="visible",e.style.opacity=1}if(null==this.mouseMoveEvent&&(this.mouseMoveEvent=this.addEvent(document,"mousemove",this.mouseMoved.bind(this))),null!=this.hook&&null!=this.hook[t])for(var a=this.hook[t],r=a.length,u=0;u<r;u++)null!=a[u].open&&a[u].open();var l=document.createEvent("Event");return l.initEvent("scroll",!0,!0),window.dispatchEvent(l),window.performance.now&&(e.t=window.performance.now()),!0},isOpen:function(t){var e;return!(null==t.getAttribute("data-popup-open")||null!=t.fn||this.hasClass(t,"animated")||null!=(e=t.querySelector(".animm"))&&this.hasClass(e,"animated"))&&e},canOpen:function(t){var e=void 0;return this.animationSupport()&&(e=this.hasClass(t,"animm")?t:t.querySelector(".animm")),!(null!=t.getAttribute("data-popup-open")||null!=t.fn||this.hasClass(t,"animated")||null!=e&&this.hasClass(e,"animated"))&&e},openClosePopup:function(t){var e=document.getElementById(t);!1===this.isOpen(e)?this.openPopup(t):this.closePopup(t)},closePopup:function(t){var e=document.getElementById(t);if(window.performance.now&&window.performance.now()-e.t<100)return!1;var n=this.isOpen(e);if(!1===n)return!1;var i=e.getAttribute("data-popup-type");if(e.removeAttribute("data-popup-open"),this.animationSupport()&&(n=this.hasClass(e,"animm")?e:e.querySelector(".animm")),null!=n&&wl.doAnimate(n,1),e!=n)if(null!=n&&0!=i){var o=e.getAttribute("data-anim").split(";");e.style.animationDuration=e.style["-webkit-animation-duration"]=e.style["-moz-animation-duration"]=o[0],e.style.animationDelay=e.style["-webkit-animation-delay"]=e.style["-moz-animation-delay"]=o[1],this.removeClass(e,"fadeIn"),this.addClass(e,"fadeOut"),this.addPopupAnimationEndEvent(e,this.popupFadeOut.bind(this))}else e.style.visibility="hidden",this.prop(e,"Transform","translate3d(-999999px,0,0)"),e.style.opacity=0;if(document.body.style.marginLeft="",this.removeClass(document.body,"modal"),e.removeEventListener("touchmove",this.preventScroll),null!=this.hook&&null!=this.hook[t])for(var s=this.hook[t],a=s.length,r=0;r<a;r++)null!=s[r].close&&s[r].close();return!0},overPopup:function(t,e){var n=document.getElementById(e);t.oi||!1!==this.isOpen(n)||this.openPopup(e),t.oi||(t.oi=!0),t.oo&&(clearTimeout(t.oo),t.oo=void 0)},overoutPopup:function(t,e){var n=function(t,e,i){return function(){var o,s=null!=i?document.getElementById(i):void 0;!e.oo||null!=s&&!1!==t.isOpen(s)&&t.isOver(null!=(o=s.querySelector(".popup"))?o:s)?e.oo=setTimeout(n,100):(e.oo=e.oi=void 0,null!=i&&(!1===t.isOpen(s)?e.oo=setTimeout(n,100):t.closePopup(i)))}}(this,t,e);t.oo||n()},mouseMoved:function(t){this.mouseX=t.clientX,this.mouseY=t.clientY},isOver:function(t){var e=t.getBoundingClientRect();if(!this.isFF){var n=this.z();e={left:e.left*n,right:e.right*n,top:e.top*n,bottom:e.bottom*n},this.isChrome||(e.top+=window.pageYOffset*(n-1),e.bottom+=window.pageYOffset*(n-1))}return this.mouseX>=parseInt(e.left)&&this.mouseX<=parseInt(e.right)&&this.mouseY>=parseInt(e.top)&&this.mouseY<=parseInt(e.bottom)},hasClass:function(t,e){var n=t.classList;return null!=n?n.contains(e):(" "+t.className+" ").indexOf(" "+e+" ")>-1},addClass:function(t,e){var n=t.classList;null!=n?n.add(e):t.className+=" "+e},removeClass:function(t,e){if(null!=(n=t.classList))n.remove(e);else{var n,i=(n=t.className.split(" ")).indexOf(e);i>=0&&(n.splice(i,1),t.className=n.join(" "))}},addHook:function(t,e,n){null==this.hook&&(this.hook={}),null==this.hook[t]&&(this.hook[t]=[]),this.hook[t].push({open:e,close:n})},z:function(){var t=parseFloat(window.getComputedStyle(document.body).getPropertyValue("zoom"));return t||1},init:function(){var t=function(){var t=.01*window.innerHeight/pop.z();pop.vh!==t&&(pop.vh=t,document.body.style.setProperty("--vh",t+"px"))};if("requestAnimationFrame"in window){var e=function(){t(),requestAnimationFrame(e)};requestAnimationFrame(e)}else this.addEvent(window,"resize",t),t()}};pop.init();
