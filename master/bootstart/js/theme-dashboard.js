jQuery(document).ready(function ($) {

/*
	Dashboard index.html - comments/posts -  next/prev Bot
*/
	$.fn.randomize = function(childElem) {
		
		return this.each(function() {
			
			var $this = $(this);
			var elems = $this.children(childElem);
			
			elems.sort(function() { return (Math.round(Math.random())-0.5); });  
			
			$this.remove(childElem);  
			
			for(var i=0; i < elems.length; i++)
				$this.append(elems[i]);      
		
		});    
	};
	
	$('button#negative1').click(function(){
		
		var newNumber = parseInt($("span#label1").text());
		
		if(newNumber > 3)
		{
			$('button#positive1').removeClass('disabled');
			$("ul#items1").randomize("li");
			$("ul#items1").hide().fadeIn(800);
			$("span#label1").html(newNumber - 3);
			
			return;
		}
		
		$(this).addClass('disabled');		
	});
	
	$('button#positive1').click(function(){
		
		var newNumber = parseInt($("span#label1").text());
		
		if(newNumber < 54)
		{
			$('button#negative1').removeClass('disabled');
			$("ul#items1").randomize("li");
			$("ul#items1").hide().fadeIn(800);
			$("span#label1").html(newNumber + 3);
			
			return;
		}
			
		$(this).addClass('disabled');			
	});
	
	$('button#negative2').click(function(){
		
		var newNumber = parseInt($("span#label2").text());
		
		if(newNumber > 3)
		{
			$('button#positive2').removeClass('disabled');
			$("ul#items2").randomize("li");
			$("ul#items2").hide().fadeIn(800);
			$("span#label2").html(newNumber - 3);
			
			return;
		}
		
		$(this).addClass('disabled');			
	});
	
	$('button#positive2').click(function(){
		
		var newNumber = parseInt($("span#label2").text());
		
		if(newNumber < 6)
		{
			$('button#negative2').removeClass('disabled');
			$("ul#items2").randomize("li");
			$("ul#items2").hide().fadeIn(800);
			$("span#label2").html(newNumber + 3);
			
			return;
		}
		
		$(this).addClass('disabled');
	});
	
		
/* 
	Animated pie-chart - resize if Tablet / Phone
*/
	$(window).on('resize', function(e) {
		
		e.preventDefault();
		console.log('resize called');
		
		var width = $(window).width();
		
		if (width < 980) 
		{
			/* Dashboard index.html - Widget Statistics today - resize */
			$('.percentage').easyPieChart({
						barColor: '#00a6d6',
						lineWidth: 3,
						size: 75,
						animate: 1000
			});
			
			return;
		}
		 
		/* Dashboard index.html - Widget Statistics today - resize */
		$('.percentage').easyPieChart({
					barColor: '#00a6d6',
					lineWidth: 4,
					size: 100,
					animate: 1000
		});
		
	}).resize();
	
    
/* 
	Dashboard index.html - Widget Company performance example
*/
	var incomes = [];
	var incomeNames = [];
	var incomeTypes = [];
	
	incomes[0] = [
        [0, 3650.38],
        [2, 4140.25],
        [4, 4254.80],
        [6, 4380.23],
        [8, 4450.12],
        [10, 4640.48],
        [12, 5923.06]
    ];
    incomeNames[0] = [
        [0, "-6 day"],
        [2, "-5 day"],
        [4, "-4 day"],
        [6, "-3 day"],
        [8, "-2 day"],
        [10, "-1 day"],
        [12, "Today"]
    ];
    incomeTypes[0] = "day";
	
    incomes[1] = [
        [0, 14540.38],
        [2, 13400.25],
        [4, 14410.80],
        [6, 18380.23]
    ];
    incomeNames[1] = [
        [0, "-3 week"],
        [2, "-2 week"],
        [4, "-1 week"],
        [6, "This week"]
    ];
    incomeTypes[1] = "week";

    incomes[2] = [
        [0, 48504.38],
        [2, 49400.25],
        [4, 50410.80],
        [6, 51380.23],
        [8, 52504.38],
        [10, 53400.25],
        [12, 54410.80],
        [14, 55380.23],
        [16, 56504.38],
        [18, 64400.25],
        [20, 65410.80],
        [22, 73380.23]
    ];
    incomeNames[2] = [
        [0, "-11M"],
        [2, "-10M"],
        [4, "-9M"],
        [6, "-8M"],
        [8, "-7M"],
        [10, "-6M"],
        [12, "-5M"],
        [14, "-4M"],
        [16, "-3M"],
        [18, "-2M"],
        [20, "-1M"],
        [22, "This"]
    ];
	incomeTypes[2] = "month";

	for(i in incomeTypes)
	{
		$.plot("#" + incomeTypes[i] + " > div.performance", [{
			data: incomes[i],
			bars: {
				show: true
			}
		}], {
			grid: {
				borderMargin: 0,
				labelMargin: 0,
				backgroundColor: {
					colors: ["#f9f9f9", "#f9f9f9"]
				},
				tickColor: "#f9f9f9",
				borderWidth: 0,
				mouseActiveRadius: 50,
				hoverable: true
			},
			colors: ["#00a6d6"],
			yaxis: {
				show: false
			},
			xaxis: {
				show: true,
				ticks: incomeNames[i]
			},
			legend: {
				show: false
			}
		});
		
		var previousPoint = null;
		$("#" + incomeTypes[i] + " > div.performance").bind("plothover", function (event, pos, item) {
	
			if (item) {
				if (previousPoint != item.dataIndex) {
	
					previousPoint = item.dataIndex;
	
					$("#tooltip").remove();
					myValue = item.datapoint[1].toFixed(2);
	
					showTooltip(item.pageX, item.pageY, "Sales: " + myValue + " $");
				}
			} else {
				$("#tooltip").remove();
				previousPoint = null;
			}
		});
	}
	
	function showTooltip(x, y, contents) {
        $("<div id='tooltip'>" + contents + "</div>").css({
            position: "absolute",
            display: "none",
            top: y + 5,
            left: x + 5,
            border: "1px solid #fff",
            borderRadius: "5px",
            boxShadow: "1px 1px 5px #999",
            padding: "2px",
            "background-color": "#00a6d6",
            opacity: 0.70,
            color: '#fff',
        }).appendTo("body").fadeIn(200);
    }
	

/* 
	Dashboard index.html - Widget Server Load example 
*/
	var container = $(".server");
    var maximum = container.outerWidth() / 2 || 300;
    var realTimeDatas = [];

    function getRandomData() {
        if (realTimeDatas.length) {
            realTimeDatas = realTimeDatas.slice(1)
        }
        while (realTimeDatas.length < maximum) {
            var previous = realTimeDatas.length ? realTimeDatas[realTimeDatas.length - 1] : 50;
            var y = previous + Math.random() * 10 - 5;
            realTimeDatas.push(y < 0 ? 0 : y > 100 ? 100 : y)
        }
        var res = [];
        for (var i = 0; i < realTimeDatas.length; ++i) {
            res.push([i, realTimeDatas[i]])
        }
        return res
    }
    series = [{
        data: getRandomData(),
        lines: {
            fill: true
        }
    }];
    
	var plot = $.plot(container, series, {
        grid: {
            borderMargin: 0,
            labelMargin: 0,
            backgroundColor: {
                colors: ["#f9f9f9", "#f9f9f9"]
            },
            tickColor: "#f9f9f9",
            borderWidth: 0,
            hoverable: true,
            mouseActiveRadius: 50,
        },
        lines: {
            fillColor: '#00a6d6'
        },
        colors: ["#ffffff"],
        yaxis: {
            min: 0,
            max: 100,
            show: false
        },
        xaxis: {
            show: false
        },
        legend: {
            show: false
        }
    });
    var yaxisLabel = $("<div class='axisLabel yaxisLabel'></div>").text("Response Time (ms)").appendTo(container);
    yaxisLabel.css("margin-top", yaxisLabel.width() / 2 - 20);
    setInterval(function updateRandom() {
        series[0].data = getRandomData();
        plot.setData(series);
        plot.draw()
    }, 40);


/* 
	Dashboard index.html - Widget Calendar example
*/
	var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();

    $('#calendar').fullCalendar({
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
        },
        editable: true,
        events: [{
            title: 'All Day Event',
            start: new Date(y, m, 1)
        }, {
            title: 'Long Event',
            start: new Date(y, m, d - 5),
            end: new Date(y, m, d - 2)
        }, {
            id: 999,
            title: 'Repeating Event',
            start: new Date(y, m, d - 3, 16, 0),
            allDay: false
        }, {
            id: 999,
            title: 'Repeating Event',
            start: new Date(y, m, d + 4, 16, 0),
            allDay: false
        }, {
            title: 'Meeting',
            start: new Date(y, m, d, 10, 30),
            allDay: false
        }, {
            title: 'Lunch',
            start: new Date(y, m, d, 12, 0),
            end: new Date(y, m, d, 14, 0),
            allDay: false
        }, {
            title: 'Birthday Party',
            start: new Date(y, m, d + 1, 19, 0),
            end: new Date(y, m, d + 1, 22, 30),
            allDay: false
        }, {
            title: 'Click for Google',
            start: new Date(y, m, 28),
            end: new Date(y, m, 29),
            url: 'http://google.com/'
        }]
    });
});