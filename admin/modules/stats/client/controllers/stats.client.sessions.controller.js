'use strict';

/**
 * Module: Stats
 * Controller: Sessions
 */
angular.module('stats').controller('StatsSessionsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Stats',
	function($scope, $stateParams, $location, Authentication, Stats ) {
		$scope.authentication = Authentication;

		function barTransition(data){
			var rect = chart.selectAll("rect").data(data);
			var amount = barsContainer.selectAll("text").data(data);

			var delay = function(d, i) { return i * 300; };
			rect.transition().duration(750)
				.delay(delay)
				.attr("width", function(d) { return x(barValue(d)); });

			amount.transition().duration(750)
				.delay(delay)
				.attr("x", function(d) { return x(barValue(d)); })
				.attr("y", yText)
				.text(function(d) { return d3.round(barValue(d), 2) !== 0 ? d3.round(barValue(d), 2) : ''; });

		}

		var valueLabelWidth, 	// space reserved for value labels (right)
			barHeight, 			// height of one bar
			barLabelWidth, 		// space reserved for bar labels
			barLabelPadding, 	// padding between bar and bar labels (left)
			gridLabelHeight, 	// space reserved for gridline labels
			gridChartOffset, 	// space between start of grid and first bar
			maxBarWidth, 		// width of the bar with the max value
			chart,				// svg container
			gridContainer,		// grid
			labelsContainer,	// labels
			data,				// current data in graph
			letterSize,			// letter size for labels
			barsContainer,		// bar container
			tracking = [{label:'Today', value:850},{label:'Yesterday', value:750},{label:'This week', value:1450},{label:'Last week', value:3550}],
			menchit = [{label:'Today', value:500},{label:'Yesterday', value:2000},{label:'This week', value:500},{label:'Last week', value:1000}],
			yScale, x, y, yText,// scales
			barLabel, barValue,	// functions
			currentBarGraph;	// this flag helps to transition

		// Function handler Session View
		$scope.sessions = function() {
			valueLabelWidth = 40;
			barHeight = 100;
			barLabelWidth = (20 *window.innerWidth)/150;
			barLabelPadding = 5;
			gridLabelHeight = 20;
			gridChartOffset = 3;
			maxBarWidth = "65%";
			data = tracking;
			letterSize = window.innerWidth/50;


			// getting max value between tracking and menchit
			var max = max || [], maximum;
			max.push(d3.max(tracking, function(d){return d.value}),d3.max(menchit, function(d){return d.value}));
			maximum = d3.max(max);

			// accessor functions
			barLabel = function(d){return d.label};
			barValue = function(d){return d.value};

			// scales
			// TODO barHeight = (Object.keys(data).length * 200) / 2;
			yScale = d3.scale.ordinal().domain(d3.range(0, data.length)).rangeBands([0, data.length * barHeight]);
			y = function(d, i) { return yScale(i); };
			yText = function(d, i) { return y(d, i) + yScale.rangeBand() / 2.1; };
			x = d3.scale.linear().domain([0, maximum]).range([0, maxBarWidth]);
			maxBarWidth = (parseInt(maxBarWidth)*window.innerWidth)/100;

			// svg container element

			var dd = gridLabelHeight + gridChartOffset + data.length * barHeight + 20;
			console.log(gridLabelHeight +'+'+ gridChartOffset +'+'+ data.length +'*'+ barHeight +'+'+ 20 +'='+dd);
			dd = maxBarWidth + barLabelWidth + valueLabelWidth;
			console.log(maxBarWidth +'+'+ barLabelWidth +'+'+ valueLabelWidth +'='+dd);

			chart = d3.select('#chart').append("svg")
				.attr('width', maxBarWidth + barLabelWidth + valueLabelWidth)
				.attr('height', gridLabelHeight + gridChartOffset + data.length * barHeight + 20);

			// grid line labels
			gridContainer = chart.append('g')
				.attr('transform', 'translate(' + barLabelWidth + ',' + gridLabelHeight + ')');

			gridContainer.selectAll("text").data(x.ticks(10)).enter().append("text")
				.attr("x", x)
				.attr("dy", -3)
				.attr("text-anchor", "middle")
				.text(String);

			// vertical grid lines
			gridContainer.selectAll("line").data(x.ticks(10)).enter().append("line")
				.attr("x1", x)
				.attr("x2", x)
				.attr("y1", 0)
				.attr("y2", yScale.rangeExtent()[1] + gridChartOffset)
				.style("stroke", "#ccc");

			// bar labels
			labelsContainer = chart.append('g')
				.attr('transform', 'translate(' + (barLabelWidth - barLabelPadding) + ',' + (gridLabelHeight + gridChartOffset) + ')');

			labelsContainer.selectAll('text').data(data).enter().append('text')
				.attr('y', yText)
				.attr('stroke', 'none')
				.attr('fill', 'black')
				.attr("dy", ".35em") // .35em
				.attr("dx", "-50px")
				.attr('text-anchor', 'end')
				.style("font-size", letterSize + "px")
				.attr("class","name")
				.text(function(d){
					return d.label;
				});

			// bars
			barsContainer = chart.append('g')
				.attr('transform', 'translate(' + barLabelWidth + ',' + (gridLabelHeight + gridChartOffset) + ')');

			barsContainer.selectAll("rect").data(data).enter().append("rect")
				.attr('y', y)
				.attr('height', yScale.rangeBand())
				.attr('width', function(d) { return x(barValue(d)); })
				.attr('stroke', 'white')
				.attr('class', 'bar')
				.attr('fill', 'steelblue');

			// bar value labels
			$('#title').css('font-size',letterSize+10+"px");
			$('#titleTable').css('font-size',letterSize-10+"px");
			barsContainer.selectAll("text").data(data).enter().append("text")
				.attr("x", function(d) { return x(barValue(d)); })
				.attr("y", yText)
				.attr("dx", 3) // padding-left
				.attr("dy", ".35em") // vertical-align: middle
				.attr("text-anchor", "start") // text-align: right
				.attr("fill", "black")
				.attr("stroke", "none")
				.style("font-size", letterSize + "px")
				.attr("class","amount")
				.text(function(d) { return d3.round(barValue(d), 2) !== 0 ? d3.round(barValue(d), 2) : '' ; });

			// start line
			barsContainer.append("line")
				.attr("y1", -gridChartOffset)
				.attr("y2", yScale.rangeExtent()[1] + gridChartOffset)
				.style("stroke", "#000");

			// bar transition
			$("#title").text("Colombia");
			currentBarGraph = 'tracking';
			var timeLimit = 3500;
			var timeLoop = 4;
			var i = 0;
			for (; i < timeLoop; i++) {
				setTimeout(function(x) {
					return function() {
						switch(currentBarGraph) {
							case 'tracking':
								$("#title").fadeOut(function() {
									$(this).text("Miami").fadeIn('fast');
								});
								barTransition(menchit); // !first time? to update the object
								currentBarGraph = 'miami';
								break;
							case 'miami':
								$("#title").fadeOut(function() {
									$(this).text("Colombia").fadeIn('fast');
								});
								currentBarGraph = 'tracking';
								barTransition(tracking);
								break;
						}
					};
				}(i), parseInt(timeLimit)*i);
			}
		};

	}
]);
