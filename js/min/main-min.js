$.fn.onTap=function(e){var t,a;return this.bind("touchstart",function(){t=setTimeout(function(){a=!0},130)}).bind("touchend",function(){a||e(),a=!1,clearTimeout(t)}),this},$(document).ready(function(){function e(e,t){return Math.floor(Math.random()*(t-e))+e}function t(){var t;if(console.log(c),"all"==c)return sortedCards.easy.length&&sortedCards.hard.length?Math.random()<=.2?(o="easy",i=e(0,sortedCards.easy.length-1),t=sortedCards.easy[i]):(o="hard",i=e(0,sortedCards.hard.length-1),t=sortedCards.hard[i]):sortedCards.easy.length?(o="easy",i=e(0,sortedCards.easy.length-1),t=sortedCards.easy[i]):(o="hard",i=e(0,sortedCards.hard.length-1),t=sortedCards.hard[i]),l.push({deck:o,currentCard:i}),t;do sortedCards.easy.length&&sortedCards.hard.length?Math.random()<=.2?(o="easy",i=e(0,sortedCards.easy.length-1),t=sortedCards.easy[i]):(o="hard",i=e(0,sortedCards.hard.length-1),t=sortedCards.hard[i]):sortedCards.easy.length?(o="easy",i=e(0,sortedCards.easy.length-1),t=sortedCards.easy[i]):(o="hard",i=e(0,sortedCards.hard.length-1),t=sortedCards.hard[i]);while(t.type!=c);return l.push({deck:o,currentCard:i}),t}function a(e,t){var a='<div class="flipper animated cardIn'+e+'" style="display:none"><div class="front" style="background-image:url(\'card-images/'+escape(t.image)+'\');"><div class="question-box">'+t.question+'</div></div><div class="back" style="background-image:url(\'card-images/'+escape(t.image)+'\');"><p class="back-question">'+t.question+"</p><p>"+t.answer+"</p><p>"+t.fun+"</p></div></div>";$(".flip-container").removeClass("hover"),$(a).appendTo(".flip-container").show().one("animationend webkitAnimationEnd",function(){$(this).removeClass("animated cardIn"+e)})}function r(){sortedCards[o][i].difficulty?$("#btn-"+sortedCards[o][i].difficulty).addClass("difficulty-marked").siblings().removeClass("difficulty-marked"):$("#btn-hard,#btn-easy").removeClass("difficulty-marked"),l.length>1?$("#prev-btn").fadeIn():$("#prev-btn").fadeOut()}function s(){$(".flipper").addClass("animated cardOutRight").one("animationend webkitAnimationEnd",function(){$(this).remove()});var e=l.length-2,t=l[e];a("Right",sortedCards[t.deck][t.currentCard]),i=t.currentCard,o=t.deck,l.splice(l.length-1,1),r()}function d(){$(".flipper").addClass("animated cardOutLeft").one("animationend webkitAnimationEnd",function(){$(this).remove()}),a("Left",t()),r()}function n(){$.merge(sortedCards.hard,sortedCards.easy),sortedCards.easy.splice(0,sortedCards.easy.length),$.each(sortedCards.hard,function(){this.difficulty=""}),localStorage.setItem("navyCards",JSON.stringify(sortedCards)),d()}$("#infoModal").modal("show");var i,o,l=[],c="all";localStorage.navyCards&&(sortedCards=$.parseJSON(localStorage.navyCards));var h=[];$.each(sortedCards.hard,function(){-1==h.indexOf(this.type)&&h.push(this.type)}),h.sort(),$.each(h,function(){var e=$('<option value="'+this+'">'+this+"</option>");$("#typeSelect").append(e)}),$("#typeSelect").change(function(){c=$(this).val(),console.log(c,$(this).val()),d()}),$("#next-btn").onTap(function(){return d(),!1}),$("#prev-btn").onTap(function(){return s(),!1}),$("#flip-container").swipe({swipeLeft:function(){d()},swipeRight:function(){l.length>1&&s()}}),$("#flip-container").onTap(function(){$("#flip-container").toggleClass("hover")}),$("#btn-hard:not(.difficulty-marked)").click(function(){return sortedCards[o][i].difficulty="hard",sortedCards.hard.push(sortedCards[o][i]),sortedCards[o].splice(i,1),o="hard",i=sortedCards[o].length-1,l[l.length-1].deck=o,l[l.length-1].currentCard=i,localStorage.setItem("navyCards",JSON.stringify(sortedCards)),$(this).addClass("difficulty-marked").siblings().removeClass("difficulty-marked"),!1}),$("#btn-easy:not(.difficulty-marked)").click(function(){return sortedCards[o][i].difficulty="easy",sortedCards.easy.push(sortedCards[o][i]),sortedCards[o].splice(i,1),o="easy",i=sortedCards[o].length-1,l[l.length-1].deck=o,l[l.length-1].currentCard=i,localStorage.setItem("navyCards",JSON.stringify(sortedCards)),$(this).addClass("difficulty-marked").siblings().removeClass("difficulty-marked"),!1}),a("Left",t()),r(),$("#statBtn").click(function(){var e=0,t=0,a=0,r=[];r=sortedCards.hard.concat(sortedCards.easy),$.each(r,function(){this.difficulty&&("hard"==this.difficulty?a++:t++)}),e=r.length-(t+a),$("#stat-new").text(e),$("#stat-easy").text(t),$("#stat-hard").text(a)}),$("#btnReset").click(function(){n()})});