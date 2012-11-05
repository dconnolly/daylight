(function() {
  var data, monthNames;

  monthNames = ["Jan", "Feb", "Mar", "April", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  data = [
    {
      date: new Date(2011, 0, 1),
      sunrise: [7, 13],
      sunset: [16, 22]
    }, {
      date: new Date(2011, 0, 15),
      sunrise: [7, 48],
      sunset: [16, 58]
    }, {
      date: new Date(2011, 1, 1),
      sunrise: [7, 33],
      sunset: [17, 21]
    }, {
      date: new Date(2011, 1, 15),
      sunrise: [7, 14],
      sunset: [17, 41]
    }, {
      date: new Date(2011, 2, 1),
      sunrise: [6, 51],
      sunset: [18, 0]
    }, {
      date: new Date(2011, 2, 12),
      sunrise: [6, 32],
      sunset: [18, 15]
    }, {
      date: new Date(2011, 2, 13),
      sunrise: [7, 30],
      sunset: [19, 16]
    }, {
      date: new Date(2011, 2, 14),
      sunrise: [7, 28],
      sunset: [19, 18]
    }, {
      date: new Date(2011, 2, 14),
      sunrise: [7, 26],
      sunset: [19, 19]
    }, {
      date: new Date(2011, 2, 20),
      sunrise: [7, 17],
      sunset: [19, 25]
    }, {
      date: new Date(2011, 3, 1),
      sunrise: [6, 54],
      sunset: [19, 41]
    }, {
      date: new Date(2011, 3, 15),
      sunrise: [6, 29],
      sunset: [19, 58]
    }, {
      date: new Date(2011, 4, 1),
      sunrise: [6, 3],
      sunset: [20, 18]
    }, {
      date: new Date(2011, 4, 15),
      sunrise: [5, 44],
      sunset: [20, 35]
    }, {
      date: new Date(2011, 5, 1),
      sunrise: [5, 30],
      sunset: [20, 52]
    }, {
      date: new Date(2011, 5, 15),
      sunrise: [5, 26],
      sunset: [21, 1]
    }, {
      date: new Date(2011, 5, 21),
      sunrise: [5, 26],
      sunset: [21, 3]
    }, {
      date: new Date(2011, 6, 1),
      sunrise: [5, 30],
      sunset: [21, 3]
    }, {
      date: new Date(2011, 6, 15),
      sunrise: [5, 41],
      sunset: [20, 57]
    }, {
      date: new Date(2011, 7, 1),
      sunrise: [5, 58],
      sunset: [20, 40]
    }, {
      date: new Date(2011, 7, 15),
      sunrise: [6, 15],
      sunset: [20, 20]
    }, {
      date: new Date(2011, 8, 1),
      sunrise: [6, 35],
      sunset: [19, 51]
    }, {
      date: new Date(2011, 8, 15),
      sunrise: [6, 51],
      sunset: [19, 24]
    }, {
      date: new Date(2011, 8, 23),
      sunrise: [7, 1],
      sunset: [19, 9]
    }, {
      date: new Date(2011, 9, 1),
      sunrise: [7, 11],
      sunset: [18, 54]
    }, {
      date: new Date(2011, 9, 15),
      sunrise: [7, 28],
      sunset: [18, 29]
    }, {
      date: new Date(2011, 10, 1),
      sunrise: [7, 51],
      sunset: [18, 2]
    }, {
      date: new Date(2011, 10, 5),
      sunrise: [7, 57],
      sunset: [17, 56]
    }, {
      date: new Date(2011, 10, 6),
      sunrise: [6, 58],
      sunset: [16, 55]
    }, {
      date: new Date(2011, 10, 7),
      sunrise: [6, 59],
      sunset: [16, 54]
    }, {
      date: new Date(2011, 10, 15),
      sunrise: [7, 10],
      sunset: [16, 44]
    }, {
      date: new Date(2011, 11, 1),
      sunrise: [7, 31],
      sunset: [16, 33]
    }, {
      date: new Date(2011, 11, 15),
      sunrise: [7, 44],
      sunset: [16, 32]
    }, {
      date: new Date(2011, 11, 22),
      sunrise: [7, 49],
      sunset: [16, 35]
    }, {
      date: new Date(2011, 11, 31),
      sunrise: [7, 51],
      sunset: [16, 41]
    }
  ];

  define(['../../components/d3/d3.v2.min'], function() {
    var daylight, daylightGraph, focusDetails, focusSunrise, focusSunset, height, midMonthDates, padding, width, x, y, yAxis, yAxisLabel, yScale;
    yAxisLabel = function(d) {
      if (d === 12) {
        return "noon";
      }
      if (d < 12) {
        return d;
      }
      return d - 12;
    };
    midMonthDates = function() {
      return d3.range(0, 12).map(function(i) {
        return new Date(2011, i, 15);
      });
    };
    padding = 20;
    width = 900;
    height = 525;
    x = d3.time.scale().domain([new Date(2011, 0, 1), new Date(2011, 11, 31)]).range([0, width]);
    yScale = d3.time.scale().domain([new Date(2011, 0, 1), new Date(2011, 0, 1, 23, 59)]).range([0, height]);
    y = function(time) {
      var d;
      d = new Date(2011, 0, 1, time[0], time[1]);
      return yScale(d);
    };
    daylight = d3.select(".container").append("svg:svg").attr("width", width + padding * 2).attr("height", height + padding * 2);
    daylight.selectAll("text.xAxisTop").data(midMonthDates).enter().append("svg:text").text(function(d, i) {
      return monthNames[i];
    }).attr("x", x).attr("y", height / 2).attr("text-anchor", "middle").attr("class", "axis x").style('color', 'black');
    yAxis = d3.svg.axis().scale(yScale).orient("left");
    daylight.append("g").call(yAxis).attr('class', 'y axis').attr('transform', 'translate(' + width + ", " + height + ")");
    daylightGraph = d3.svg.area().x(function(d) {
      return x(d.date);
    }).y0(function(d) {
      return y(d.sunrise);
    }).y1(function(d) {
      return y(d.sunset);
    }).interpolate("linear");
    daylight.append("svg:path").attr("d", daylightGraph(data)).attr('class', 'daylight-graph').attr("width", width).attr("height", height);
    focusSunrise = daylight.append("g").attr("class", "focus sunrise");
    focusSunrise.append("circle").attr("r", 4.5);
    focusSunrise.append("text").attr("x", 9).attr("dy", ".35em");
    focusSunset = daylight.append("g").attr("class", "focus sunset");
    focusSunset.append("circle").attr("r", 4.5);
    focusSunset.append("text").attr("x", 9).attr("dy", ".35em");
    focusDetails = daylight.append('g').attr("class", "focus details").append('text').attr("x", 9).attr("dy", ".35em");
    daylight.append("rect").attr("class", "overlay").attr("width", width).attr("height", height);
    daylight.on("mouseover", function() {
      focusSunrise.style("display", null);
      focusSunset.style("display", null);
      return focusDetails.style('display', null);
    });
    daylight.on("mouseout", function() {
      focusSunrise.style("display", "none");
      return focusSunset.style("display", "none");
    });
    return daylight.on("mousemove", function() {
      var bisectDate, d, d0, d1, dayString, i, x0;
      bisectDate = d3.bisector(function(d) {
        return d.date;
      }).left;
      x0 = x.invert(d3.mouse(this)[0]);
      i = bisectDate(data, x0, 1);
      d0 = data[i - 1];
      d1 = data[i];
      d = x0 - d0.date > d1.date - x0 ? d1 : d0;
      dayString = monthNames[d.date.getMonth().toString()] + " " + d.date.getDay().toString();
      focusSunrise.attr("transform", "translate(" + x(d.date) + ", " + y(d.sunrise) + ")").select('text').text(dayString + " - " + d.sunrise[0] + ":" + d.sunrise[1]);
      focusSunset.attr("transform", "translate(" + x(d.date) + ", " + y(d.sunset) + ")").select('text').text(dayString + " - " + d.sunset[0] + ":" + d.sunset[1]);
      return focusDetails.attr('transform', "translate(" + x(d.date) + ", " + height / 2 + ")").select('text').text(dayString);
    });
  });

}).call(this);
