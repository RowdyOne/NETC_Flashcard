$.fn.onTap=function(e){var t,s;return this.bind("touchstart",function(){t=setTimeout(function(){s=!0},130)}).bind("touchend",function(){s||e(),s=!1,clearTimeout(t)}),this},$(document).ready(function(){function e(e){e.requestFullscreen?e.requestFullscreen():e.mozRequestFullScreen?e.mozRequestFullScreen():e.webkitRequestFullscreen?e.webkitRequestFullscreen():e.msRequestFullscreen&&e.msRequestFullscreen()}function t(){document.exitFullscreen?document.exitFullscreen():document.mozCancelFullScreen?document.mozCancelFullScreen():document.webkitExitFullscreen&&document.webkitExitFullscreen()}function s(e,t){return Math.floor(Math.random()*(t-e))+e}function r(){var e;if(console.log(h),"all"==h)return sortedCards.easy.length&&sortedCards.hard.length?Math.random()<=.2?(c="easy",l=s(0,sortedCards.easy.length-1),e=sortedCards.easy[l]):(c="hard",l=s(0,sortedCards.hard.length-1),e=sortedCards.hard[l]):sortedCards.easy.length?(c="easy",l=s(0,sortedCards.easy.length-1),e=sortedCards.easy[l]):(c="hard",l=s(0,sortedCards.hard.length-1),e=sortedCards.hard[l]),u.push({deck:c,currentCard:l}),e;do sortedCards.easy.length&&sortedCards.hard.length?Math.random()<=.2?(c="easy",l=s(0,sortedCards.easy.length-1),e=sortedCards.easy[l]):(c="hard",l=s(0,sortedCards.hard.length-1),e=sortedCards.hard[l]):sortedCards.easy.length?(c="easy",l=s(0,sortedCards.easy.length-1),e=sortedCards.easy[l]):(c="hard",l=s(0,sortedCards.hard.length-1),e=sortedCards.hard[l]);while(e.type!=h);return u.push({deck:c,currentCard:l}),e}function a(e,t){var s='<div class="flipper animated cardIn'+e+' fullscreen-img" style="display:none"><div class="front"><div class="front-clip">	<img src="card-images/'+escape(t.image)+'"><div class="question-box">'+t.question+'</div></div></div><div class="back" style="background-image:url(\'card-images/'+escape(t.image)+'\');"><p class="back-question">'+t.question+"</p><p>"+t.answer+"</p><p>"+t.fun+"</p></div></div>";$(".flip-container").removeClass("hover"),$(s).appendTo(".flip-container").show().one("animationend webkitAnimationEnd",function(){$(this).removeClass("animated cardIn"+e)})}function n(){sortedCards[c][l].difficulty?$("#btn-"+sortedCards[c][l].difficulty).addClass("difficulty-marked").siblings().removeClass("difficulty-marked"):$("#btn-hard,#btn-easy").removeClass("difficulty-marked"),u.length>1?$("#prev-btn").fadeIn():$("#prev-btn").fadeOut()}function d(){$(".flipper").addClass("animated cardOutRight").one("animationend webkitAnimationEnd",function(){$(this).remove()});var e=u.length-2,t=u[e];a("Right",sortedCards[t.deck][t.currentCard]),l=t.currentCard,c=t.deck,u.splice(u.length-1,1),n()}function i(){$(".flipper").addClass("animated cardOutLeft").one("animationend webkitAnimationEnd",function(){$(this).remove()}),a("Left",r()),n()}function o(){$.merge(sortedCards.hard,sortedCards.easy),sortedCards.easy.splice(0,sortedCards.easy.length),$.each(sortedCards.hard,function(){this.difficulty=""}),localStorage.setItem("navyCards",JSON.stringify(sortedCards)),i()}zE(function(){zE.hide(),$(".version").append($('<a href="#" onclick="zE.activate({hideOnClose: true});" style="color:white;text-decoration:underline;margin-left:10px;">Feedback</a>'))}),localStorage.newFlashcardUser||($("#disclaimer").modal(),localStorage.setItem("newFlashcardUser","true")),$("body").on("click","#fullscreen:not(.isFullScreen)",function(){e(document.documentElement),$(this).addClass("isFullScreen")}),$("body").on("click","#fullscreen.isFullScreen",function(){t(),$(this).removeClass("isFullScreen")});var l,c,u=[],h="all";localStorage.navyCards&&(sortedCards=$.parseJSON(localStorage.navyCards));var f=[];$.each(sortedCards.hard,function(){-1==f.indexOf(this.type)&&f.push(this.type)}),f.sort(),$.each(f,function(){var e=$('<option value="'+this+'">'+this+"</option>");$("#typeSelect").append(e)}),$("#typeSelect").change(function(){h=$(this).val(),console.log(h,$(this).val()),i()}),$("#next-btn").click(function(){return i(),!1}),$("#prev-btn").click(function(){return d(),!1}),$("#flip-container").swipe({swipeLeft:function(){i()},swipeRight:function(){u.length>1&&d()}}),$("#flip-container").click(function(){$("#flip-container").toggleClass("hover")}),$("#btn-hard:not(.difficulty-marked)").click(function(){return sortedCards[c][l].difficulty="hard",sortedCards.hard.push(sortedCards[c][l]),sortedCards[c].splice(l,1),c="hard",l=sortedCards[c].length-1,u[u.length-1].deck=c,u[u.length-1].currentCard=l,localStorage.setItem("navyCards",JSON.stringify(sortedCards)),$(this).addClass("difficulty-marked").siblings().removeClass("difficulty-marked"),!1}),$("#btn-easy:not(.difficulty-marked)").click(function(){return sortedCards[c][l].difficulty="easy",sortedCards.easy.push(sortedCards[c][l]),sortedCards[c].splice(l,1),c="easy",l=sortedCards[c].length-1,u[u.length-1].deck=c,u[u.length-1].currentCard=l,localStorage.setItem("navyCards",JSON.stringify(sortedCards)),$(this).addClass("difficulty-marked").siblings().removeClass("difficulty-marked"),!1}),a("Left",r()),n(),$("#statBtn").click(function(){var e=0,t=0,s=0,r=[];r=sortedCards.hard.concat(sortedCards.easy),$.each(r,function(){this.difficulty&&("hard"==this.difficulty?s++:t++)}),e=r.length-(t+s),$("#stat-new").text(e),$("#stat-easy").text(t),$("#stat-hard").text(s)}),$("#btnReset").click(function(){o()})});