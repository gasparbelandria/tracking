'use strict';

/**
 * Module: Stats
 * Controller: Dashboard
 */
angular.module('stats').controller('StatsDashboardController', ['$scope', '$stateParams', '$location', 'Authentication', 'Stats',
	function($scope, $stateParams, $location, Authentication, Stats ) {
		$scope.authentication = Authentication;

		// Function handler Dashboard View
		$scope.dashboard = function() {

			var padding = 10,
				width = "100%", //window.innerWidth/3,
				height = window.innerWidth/3,
				radius = (height/2) - padding,
				innerRadius = height/4,
				color = d3.scale.category20c();

			function tweenPie(b) {
				var i = d3.interpolate({startAngle: 1.1*Math.PI, endAngle: 1.1*Math.PI}, b);
				return function(t) { return arc(i(t)); };
			}

			function arcTween(a) {
				var i = d3.interpolate(this._current, a);
				this._current = i(0);
				return function (t) {
					return arc(i(t));
				};
			}

			var data = [{
					id: "1",
					label: "Number of Sessions",
					value: 34
				},{
					id: "2",
					label: "Comments",
					value: 20
				},{
					id: "3",
					label: "Shares",
					value: 10
				},{
					id: "4",
					label: "Commands",
					value: 35
				},{
					id: "5",
					label: "Time of sessions",
					value: 53
				}]

			console.table(data);

			var pie = d3.layout.pie()
				.value(function(d){return d.value;});

			// declare an arc
			var arc = d3.svg.arc()
				.outerRadius(radius)
				.innerRadius(innerRadius);

			// declare an inner arc, that do the Donut effect
			var arcOver = d3.svg.arc()
				.outerRadius(radius + 3)
				.innerRadius(innerRadius + 3);

			var roll = d3.svg.transform()
				.translate(function(d) { return [ 1+radius, radius ] }) // function(d) { return [ radius, radius ] }
				.rotate(-90)
				.scale(function(d) { return 1 }); // //return d.value + 2

			var tooltip = d3.select("body").append("div")
				.attr("class", "tooltip")
				.style("opacity", 0);

			var vis = d3.select('#chart')
				.append("svg:svg")
				.data([data])
				.attr("width", width)
				.attr("height", height)
				.style("padding", padding)
				.style("border", "0px solid red")
				.append("svg:g")
				.attr("transform", "translate(" + height + "," + radius + ")")
				.on("click", function(d) {
					d3.select("g")
						.transition("transition_2")
						.delay(0)
						.duration(50)
						.ease("elastic")
						.duration(3000)
						.attr('transform', roll);
				})

			// select paths, use arc generator to draw
			var arcs = vis.selectAll("g.slice")
				.data(pie).enter()
				.append("svg:g")
				.attr("class", "slice")
				.attr("data-id", function(d){
					return d.data["id"];
				})
				.append("svg:path")
				.attr("fill", function(d, i){
					return color(i);
				})
				.attr("d", function (d) {
					return arc(d);
				})
				.each(function (d) {
					this._current = d;
				})
				.on("mouseenter", function(d) {
					// label
					tooltip.transition()
						.duration(200)
						.style("opacity", .9);
					tooltip.html(d.data.label + "<br/> (" + d.value +  ")")
						.style("left", (d3.event.pageX) + "px")
						.style("top", (d3.event.pageY) + "px");
					// arc
					d3.select(this)
						.transition()
						.duration(100)
						.attr("d", arcOver);

				})
				.on("mouseleave", function(d) {
					d3.select(this).transition()
						.attr("d", arc)
						.attr("stroke","none");
				})
				.transition("transition_1")     // transition with name "trans_1"
				.delay(0)                       // transition starting 0ms after trigger
				.duration(50)                   // transitioning during 500ms
				.ease("elastic")
				.duration(2000)
				.attrTween("d", arcTween); //tweenPie

			d3.select("#nMonth").on("input", function() {
				updateData(+this.value);
			});

			d3.select("#nAngle").on("input", function() {
				rotate(+this.value);
			});

			function rotate(nAngle) {
				d3.select("g")
					.attr("transform", "translate(" + radius + "," + radius + ") rotate("+nAngle+")");
			}

			function updateData(nMonth) {
				var month;
				data.forEach(function(item){
					var optionRandom = Math.floor(Math.random() * (1 - 0 + 1)) + 0;
					var valuesRandom = Math.floor(Math.random() * (1 - 0 + 50)) + 0;
					if (optionRandom===1){
						item.value = Math.abs(item.value + valuesRandom);
					}else{
						item.value = Math.abs(item.value - valuesRandom);
					}
					return item;
				});

				switch(nMonth) {
					case 1:
						month = "January";
						break;
					case 2:
						month = "February";
						break;
					case 3:
						month = "March";
						break;
					case 4:
						month = "April";
						break;
					case 5:
						month = "May";
						break;
					case 6:
						month = "June";
						break;
					case 7:
						month = "July";
						break;
					case 8:
						month = "August";
						break;
					case 9:
						month = "September";
						break;
					case 10:
						month = "October";
						break;
					case 11:
						month = "November";
						break;
					case 12:
						month = "December";
						break;
				}

				d3.select('#month').text(month);

				d3.select('.svg svg')
					.data([data]);

				d3.select('.svg svg').selectAll('g path')
					.data(pie)
					.transition()
					.duration(750)
					.attrTween('d', arcTween);
			}

			var margin = {top: 20, right: 20, bottom: 30, left: 40},
				widthLegend = 960 - margin.left - margin.right,
				heightLegend = 500 - margin.top - margin.bottom;

			var svgLegend = d3.select("body").append("svg")
				.attr("width", widthLegend + margin.left + margin.right)
				.attr("height", heightLegend + margin.top + margin.bottom)
				.append("g")
				.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

			// draw legend
			var legend = svgLegend.selectAll(".legend")
				.data(color.domain())
				.enter().append("g")
				.attr("class", "legend")
				.attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

			// draw legend colored rectangles
			legend.append("rect")
				.attr("x", widthLegend - 18)
				.attr("width", 18)
				.attr("height", 18)
				.style("fill", color);

			// draw legend text
			legend.append("text")
				.attr("x", widthLegend - 24)
				.attr("y", 9)
				.attr("dy", ".35em")
				.style("text-anchor", "end")
				.text(function(d) { return d;})



		};
	}
]);
