
$(function(){
$('.carousel').carousel({
      interval: 4000,
      pause:null
    });
});

(function($){
	$('#thumbcarousel').carousel(0);
	var $thumbItems = $('#thumbcarousel .item');
    $('#carousel').on('slide.bs.carousel', function (event) {
	   var $slide = $(event.relatedTarget);
	   var thumbIndex = $slide.data('thumb');
	   var curThumbIndex = $thumbItems.index($thumbItems.filter('.active').get(0));
		if (curThumbIndex>thumbIndex) {
			$('#thumbcarousel').one('slid.bs.carousel', function (event) {
				$('#thumbcarousel').carousel(thumbIndex);
			});
			if (curThumbIndex === ($thumbItems.length-1)) {
				$('#thumbcarousel').carousel('next');
			} else {
				$('#thumbcarousel').carousel(numThumbItems-1);
			}
		} else {
			$('#thumbcarousel').carousel(thumbIndex);
		}
	});
})(jQuery);


// $(document).ready(function(){
// $('.dropdown-submenu>a').unbind('click').click(function(e){
// $(this).next('ul').toggle();
// e.stopPropagation();
// e.preventDefault();
// });
// });


$(function(options) {
			$(document).on('click', 'li.submenu > a', function(e){
				e.preventDefault();
			});
			$(document).on('click', 'li.submenu', function(e){
				$(this).find("ul").slideToggle();
			});
			$(document).on('click', '#menu-close', function(e){
				e.preventDefault();
				$("body").removeClass('menu-open');
				$(this).removeClass('show').hide();
				$(".main-menu").slideUp(1000, function(){
					$(this).removeAttr("style");
				});
			});
			$(document).on('click', '#menu-open', function(e){
				e.preventDefault();
				$("body").addClass('menu-open');
				$(".main-menu").slideDown();
				$("#menu-close").addClass('show').show();
			});
		});

$('.panel').on('hidden.bs.collapse', function (e) {
    
});










$(function () {
  $('[data-toggle="tooltip"]').tooltip();
});



if ( $(window).width() > 739) {
    $(window).scroll(function() {
        var scrolled = $(window).scrollTop();
        if (scrolled > 50){
            $("header").css({ "-webkit-box-shadow": "0 1px 1px rgba(0, 0, 0, 0.5)",
                "-moz-box-shadow": "0 1px 1px rgba(0, 0, 0, 0.5)",
                "box-shadow": "0 1px 1px rgba(0, 0, 0, 0.5)"});
        }else{
            $("header").css({ "box-shadow":"none"});
        }
    })
}


$('.carousel[data-type="multi"] .item').each(function(){
    var next = $(this).next();
    if (!next.length) {
        next = $(this).siblings(':first');
    }
    next.children(':first-child').clone().appendTo($(this));

    for (var i=0;i<4;i++) {
        next=next.next();
        if (!next.length) {
            next = $(this).siblings(':first');
        }

        next.children(':first-child').clone().appendTo($(this));
    }
});




//============================Product slider=================================
$(document).ready(function () {
    var itemsMainDiv = ('.MultiCarousel');
    var itemsDiv = ('.MultiCarousel-inner');
    var itemWidth = "";

    $('.leftLst, .rightLst').click(function () {
        var condition = $(this).hasClass("leftLst");
        if (condition)
            click(0, this);
        else
            click(1, this)
    });

    ResCarouselSize();




    $(window).resize(function () {
        ResCarouselSize();
    });

    //this function define the size of the items
    function ResCarouselSize() {
        var incno = 0;
        var dataItems = ("data-items");
        var itemClass = ('.item');
        var id = 0;
        var btnParentSb = '';
        var itemsSplit = '';
        var sampwidth = $(itemsMainDiv).width();
        var bodyWidth = $('body').width();
        $(itemsDiv).each(function () {
            id = id + 1;
            var itemNumbers = $(this).find(itemClass).length;
            btnParentSb = $(this).parent().attr(dataItems);
            itemsSplit = btnParentSb.split(',');
            $(this).parent().attr("id", "MultiCarousel" + id);


            if (bodyWidth >= 1200) {
                incno = itemsSplit[3];
                itemWidth = sampwidth / incno;
            }
            else if (bodyWidth >= 992) {
                incno = itemsSplit[2];
                itemWidth = sampwidth / incno;
            }
            else if (bodyWidth >= 768) {
                incno = itemsSplit[1];
                itemWidth = sampwidth / incno;
            }
            else {
                incno = itemsSplit[0];
                itemWidth = sampwidth / incno;
            }
            $(this).css({ 'transform': 'translateX(0px)', 'width': itemWidth * itemNumbers });
            $(this).find(itemClass).each(function () {
                $(this).outerWidth(itemWidth);
            });

            $(".leftLst").addClass("over");
            $(".rightLst").removeClass("over");

        });
    }


    //this function used to move the items
    function ResCarousel(e, el, s) {
        var leftBtn = ('.leftLst');
        var rightBtn = ('.rightLst');
        var translateXval = '';
        var divStyle = $(el + ' ' + itemsDiv).css('transform');
        var values = divStyle.match(/-?[\d\.]+/g);
        var xds = Math.abs(values[4]);
        if (e == 0) {
            translateXval = parseInt(xds) - parseInt(itemWidth * s);
            $(el + ' ' + rightBtn).removeClass("over");

            if (translateXval <= itemWidth / 2) {
                translateXval = 0;
                $(el + ' ' + leftBtn).addClass("over");
            }
        }
        else if (e == 1) {
            var itemsCondition = $(el).find(itemsDiv).width() - $(el).width();
            translateXval = parseInt(xds) + parseInt(itemWidth * s);
            $(el + ' ' + leftBtn).removeClass("over");

            if (translateXval >= itemsCondition - itemWidth / 2) {
                translateXval = itemsCondition;
                $(el + ' ' + rightBtn).addClass("over");
            }
        }
        $(el + ' ' + itemsDiv).css('transform', 'translateX(' + -translateXval + 'px)');
    }

    //It is used to get some elements from btn
    function click(ell, ee) {
        var Parent = "#" + $(ee).parent().attr("id");
        var slide = $(Parent).attr("data-slide");
        ResCarousel(ell, Parent, slide);
    }

});


$('#mixedSlider').multislider({
    duration: 750,
    hoverPause: true,
    interval: 4000
});

//================Photo Gallery====================

$(function(){
    var $gallery = $('.gallery a').simpleLightbox();

    $gallery.on('show.simplelightbox', function(){
        console.log('Requested for showing');
    })
        .on('shown.simplelightbox', function(){
            console.log('Shown');
        })
        .on('close.simplelightbox', function(){
            console.log('Requested for closing');
        })
        .on('closed.simplelightbox', function(){
            console.log('Closed');
        })
        .on('change.simplelightbox', function(){
            console.log('Requested for change');
        })
        .on('next.simplelightbox', function(){
            console.log('Requested for next');
        })
        .on('prev.simplelightbox', function(){
            console.log('Requested for prev');
        })
        .on('nextImageLoaded.simplelightbox', function(){
            console.log('Next image loaded');
        })
        .on('prevImageLoaded.simplelightbox', function(){
            console.log('Prev image loaded');
        })
        .on('changed.simplelightbox', function(){
            console.log('Image changed');
        })
        .on('nextDone.simplelightbox', function(){
            console.log('Image changed to next');
        })
        .on('prevDone.simplelightbox', function(){
            console.log('Image changed to prev');
        })
        .on('error.simplelightbox', function(e){
            console.log('No image found, go to the next/prev');
            console.log(e);
        });

});






// sidebar menu active class



$(function(){

    var url = window.location.pathname, 
        urlRegExp = new RegExp(url.replace(/\/$/,'') + "$"); // create regexp to match current url pathname and remove trailing slash if present as it could collide with the link in navigation in case trailing slash wasn't present there
        // now grab every link from the navigation
        $('a.list-group-item').each(function(){
            // and test its normalized href against the url pathname regexp
            if(urlRegExp.test(this.href.replace(/\/$/,''))){
                $(this).addClass('menu-active');
            }
        });

});









