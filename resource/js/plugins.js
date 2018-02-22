// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

// Place any jQuery/helper plugins in here.





/*
*   MultiSlider | MIT License
*
*   Copyright (c) 2017 Trevor Blackman
*   http://www.multislider.info
*
*   Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions: The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software. THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
!function(a){a.fn.multislider=function(b,c){function v(){B(),C(),z(),D()}function w(){window.innerWidth>s.pauseAbove&&d.addClass("ms-PAUSE"),a(window).on("resize",function(){window.innerWidth>s.pauseAbove?d.addClass("ms-PAUSE"):d.removeClass("ms-PAUSE")})}function x(){window.innerWidth<s.pauseBelow&&d.addClass("ms-PAUSE"),a(window).on("resize",function(){window.innerWidth<s.pauseBelow?d.addClass("ms-PAUSE"):d.removeClass("ms-PAUSE")})}function y(a){"undefined"!=typeof d.data(a)?d.data(a)():console.error("Multislider currently only accepts the following methods: next, prev, pause, play")}function z(){d.data({pause:function(){d.addClass("ms-PAUSE")},unPause:function(){d.removeClass("ms-PAUSE")},continuous:function(){d.removeClass("ms-PAUSE"),N()},next:function(){A(Q)},nextAll:function(){A(O)},prev:function(){A(R)},prevAll:function(){A(P)},settings:s})}function A(a){d.hasClass("ms-PAUSE")?(d.removeClass("ms-PAUSE"),a(),d.addClass("ms-PAUSE")):a(),G()}function B(){e.contents().filter(function(){return 3==this.nodeType&&!/\S/.test(this.nodeValue)}).remove()}function C(){r=s||{continuous:!1,slideAll:!1,interval:2e3,duration:500,hoverPause:!0,pauseAbove:null,pauseBelow:null},s=a.extend({},r,b),E(),t=s.duration,s.hoverPause&&K(),s.continuous!==!0&&0!==s.interval&&s.interval!==!1&&s.autoSlide!==!1&&F(),null!==s.pauseAbove&&"number"==typeof s.pauseAbove&&w(),null!==s.pauseBelow&&"number"==typeof s.pauseBelow&&x()}function D(){s.continuous?(s.autoSlide=!1,N()):s.slideAll?(p=d.data("prevAll"),q=d.data("nextAll")):(p=d.data("prev"),q=d.data("next"))}function E(){H(),o=h.width();var a=parseInt(e.find(".item:first").css("padding-left")),b=parseInt(e.find(".item:first").css("padding-right"));0!==a&&(o+=a),0!==b&&(o+=b)}function F(){u=setInterval(function(){d.hasClass("ms-PAUSE")||q()},s.interval)}function G(){0!==s.interval&&s.interval!==!1&&s.continuous!==!0&&(clearInterval(u),F())}function H(){h=e.find(".item:first"),i=e.find(".item:last")}function I(a){d.hasClass("ms-animating")||d.hasClass("ms-HOVER")||d.hasClass("ms-PAUSE")||(d.trigger("ms.before.animate"),d.addClass("ms-animating"),a())}function J(){d.hasClass("ms-animating")&&(d.removeClass("ms-animating"),d.trigger("ms.after.animate"))}function K(){s.continuous?(e.on("mouseover",function(){J(),e.children(".item:first").stop()}),e.on("mouseout",function(){N()})):(e.on("mouseover",function(){d.addClass("ms-HOVER")}),e.on("mouseout",function(){d.removeClass("ms-HOVER")}))}function L(){t=s.duration;var a=parseFloat(e.find(".item:first").css("margin-left")),b=1-a/-(o-1);t*=b}function M(){l=e.width(),m=Math.round(l/o)}function N(){I(function(){H(),L(),h.animate({marginLeft:-(o+1)},{duration:t,easing:"linear",complete:function(){h.insertAfter(i).removeAttr("style"),J(),N()}})})}function O(){I(function(){H(),M();var b=e.children(".item").clone(),c=b.splice(0,m);e.append(c),h.animate({marginLeft:-l},{duration:t,easing:"swing",complete:function(){a(e.children(".item").splice(0,m)).remove(),J()}})})}function P(){I(function(){H(),M();var b=e.children(".item").length,c=e.children(".item").clone(),d=c.splice(b-m,b);a(a(d)[0]).css("margin-left",-l),e.prepend(d),H(),h.animate({marginLeft:0},{duration:t,easing:"swing",complete:function(){b=e.find(".item").length,a(e.find(".item").splice(b-m,b)).remove(),h.removeAttr("style"),J()}})})}function Q(){I(function(){H(),h.animate({marginLeft:-o},{duration:t,easing:"swing",complete:function(){h.detach().removeAttr("style").appendTo(e),J()}})})}function R(){I(function(){H(),i.css("margin-left",-o).prependTo(e),i.animate({marginLeft:0},{duration:t,easing:"swing",complete:function(){i.removeAttr("style"),J()}})})}var d=a(this),e=d.find(".MS-content"),f=d.find("button.MS-right"),g=d.find("button.MS-left"),h=e.find(".item:first");if("string"==typeof b)return y(b),d;"object"!=typeof b&&"undefined"!=typeof b||v();var i,l,m,o,p,q,r,s,t,u;return f.on("click",q),g.on("click",p),d.on("click",".MS-right, .MS-left",G),a(window).on("resize",E),d}}(jQuery);




















