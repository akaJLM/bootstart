jQuery(document).ready(function ($) {

/* 
	Necessary for all tooltip theme 
*/
    $("[rel='tooltip']").tooltip({
        delay: {
            show: 100,
            hide: 100
        }
    });


/* 
	Necessary for Sidebar
*/
    $('.more-link').click(function (e) {

        e.preventDefault();

        $(this).parent().find('ul').slideToggle();

    });


/*
	Dashboard index.html - Widget company perf - init Tabs
*/
    $('#myTab a').click(function (e) {
        e.preventDefault();
        $(this).tab('show');
    });


/* 
	Any file - Theme responsive
*/
	$(window).on('load resize', function () {
		themeResponsive();
    });
	
	function themeResponsive() {
		
		var width = $(window).width();
		
		if (width < 980)
		{
			/* Buttons responsive */
			$(".btn-responsive").each(function () {
			
				if ($(this).hasClass('btn-large'))
				{
					$(this).removeClass('btn-large');
					$(this).addClass('id-btn-large');
				} 
				else
				{
					if (!$(this).hasClass('id-btn-large'))
					{
						$(this).addClass('btn-mini');
					}
				}
			});
		
			/* Sidebar */
			$(".sidebar-mini > .nav-tabs.nav-stacked > li > a").each(function () {
				
				$(this).removeAttr('data-placement data-toggle rel data-original-title');
				
			});
		} 
		else
		{
			/* Buttons responsive */
			$(".btn-responsive").each(function () {
				
				$(this).removeClass('btn-mini');
	
				if ($(this).hasClass('id-btn-large'))
				{
					$(this).addClass('btn-large');
					$(this).removeClass('id-btn-large');
				}
			});
		}
		
		if (width < 768)
		{
			/* Widgets easyPieChart */
			$("div.chart").parent().parent().addClass('text-center');
	
			$("div.chart").parent().each(function () {
				$(this).css({
					'display': 'inline-block',
					'width': '107px'
				});
			});
			
		} 
		else
		{
			/* Widgets easyPieChart */
			$("div.chart").parent().each(function () {
				$(this).css({
					'display': 'inline-block',
					'width': ''
				});
			});
		}
		
		if (width < 600)
		{
			/* Calendar h2 */
			$(".fc-header-title > h2").css('display', 'none');
		} 
		else 
		{
			/* Calendar h2 */
			$(".fc-header-title > h2").css('display', 'block');
		}
	}


/* 
	FAQ faq.html - search Highlight
*/

    if ($("div.accordion-faq")) {
        
		var queriedTexts = new Array();
        var questions = new Array();

        /* Farming all questions automatically */
        $("div.accordion-faq > div.accordion-heading > a.accordion-toggle").each(function () {
            queriedTexts.push($(this).text());
            questions.push($(this).attr("href"));
        });

        /* Fire input "data-source" http://twitter.github.com/bootstrap/javascript.html#typeahead */
        $('#faq').typeahead({
            source: queriedTexts
        });

        /* Fire checkbox for multiple colors if you need - you may also comment this part to stop multiple color */
        $('input#highlight').change(function () {

            if ($(this).is(':checked')) {
                $(this).popover({
                    title: "Keep highlight",
                    html: true,
                    container: 'div#pop',
                    content: '<label class="radio"><input type="radio" name="optionsRadios" id="blue" value="blue" checked>blue</label><label class="radio"><input type="radio" name="optionsRadios" id="green" value="green">green</label><label class="radio"><input type="radio" name="optionsRadios" id="orange" value="orange">orange</label><label class="radio"><input type="radio" name="optionsRadios" id="red" value="red">red</label>'
                });
            }
        });

        /* Fire Query Text */
        $('input#faq').change(function () {

            /* Compare Queried Text with the recolted Questions */
            for (i in queriedTexts) {
                toMatch = queriedTexts[i];
                matched = $(this).val();

                if (matched === toMatch)
				{
                    $("div.accordion-body").each(function ()
					{
						 /* reset some elements */
                        $(this).removeClass("in");
                        $(".scroll").remove();

                        /* on checkbox statement */
                        if (!$('input#highlight').is(':checked')) {
                            /* reset Highlight */
                            $(this).prev().removeClass("alert alert-info alert-error alert-warning alert-success");
                        }
                    });

                    /* css result */

                    /* Callapse in */
                    reference = $("div.accordion-faq > div" + questions[i] + "").addClass("in");

                    offset = reference.parent().offset();

                    /* Update browser link */
                    location = questions[i];

                    /* Animate scrollTo */
                    $("body").animate({
                        scrollTop: "" + (offset.top - 100) + "px"
                    }, 800);

                    /* Highlight */
                    var color = "";

                    if ($('#blue').is(':checked')) {
                        color = 'alert-info';
                    } else if ($('#green').is(':checked')) {
                        color = 'alert-success';
                    } else if ($('#orange').is(':checked')) {
                        color = 'alert-warning';
                    } else if ($('#red').is(':checked')) {
                        color = 'alert-error';
                    } else {
                        color = 'alert-info';
                    }
                    reference.prev().addClass("alert " + color + "").css({
                        'padding': '0',
                        'margin': '0'
                    });

                    /* Add icon "scroll to top" */
                    reference.prev().prepend('<a href="#" class="pull-left scroll"><span class="icon"><i class="icon-circle-arrow-up icon-white"></i></span></a>');
                }
            }
        });
    }
});