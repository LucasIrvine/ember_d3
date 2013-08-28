App.ChartView = Ember.View.extend({
  updateChart: function updateChart() {
        var content = this.get('content');
        
           var interest = svg.selectAll(".interest")
          .data(interests)
          .enter().append("g")
          .attr("class", "interest");

      interest.append("path")
          .attr("class", "line")
          .attr("d", function(d) { return line(d.values); })
          .style("stroke", function(d) { return color(d.name); });


      var legend = svg.selectAll(".legend")
          .data(interests)
          .enter().append("g")
          .attr("class", "legend");

      legend.append("text")
          .datum(function(d) { return {name: d.name, value: d.values[d.values.length - 1]}; })
          .attr("transform", function(d) { return "translate(" + x(d.value.date) + "," + y(d.value.postCount) + ")"; })
          .attr("x", -10)
          .attr("dy", "0.75em")
          .style("fill", function(d) { return color(d.name); })
          .text(function(d) { return d.name; });
    }.observes('content.@each.value'),
  

  didInsertElement: function didInsertElement() {
    var content = this.get('content');
    var elementId = this.get('elementId');
    var margin = {top: 20, right: 50, bottom: 30, left: 50},
    w = 960 - margin.left - margin.right,
    h = 400 - margin.top - margin.bottom;

    var parseDate = d3.time.format("%Y-%m-%d").parse;

    var x = d3.time.scale()
      .range([0, (w - margin.right*3)]);

    var y = d3.scale.linear()
      .range([h, 0]);

    var color = d3.scale.category10();

    var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom");

    var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left");

    var line = d3.svg.line()
      .x(function(d) { return x(d.date); })
      .y(function(d) { return y(d.postCount); });

    var svg = d3.select('#'+elementId).append("svg")
      .attr("viewBox", "0 0 " + w + " " + h )
      .attr("preserveAspectRatio", "xMinYMin")
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      color.domain(d3.keys(content[0]).filter(function(key) { return key !== "date"; }));

      content.forEach(function(d) {
        d.date = parseDate(d.date);
      });
      
      var interests = color.domain().map(function(name) {
        return {
          name: name,
          values: content.map(function(d) {
            return {date: d.date, postCount: +d[name]};
          })
        };
      });

      x.domain(d3.extent(content, function(d) { return d.date; }));
      y.domain([
        d3.min(interests, function(c) { return d3.min(c.values, function(v) { return v.postCount; }); }),
        d3.max(interests, function(c) { return d3.max(c.values, function(v) { return v.postCount; }); })
      ]);

      svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + h + ")")
          .call(xAxis);

      svg.append("g")
          .attr("class", "y axis")
          .call(yAxis)
        .append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("dy", "1em")
          .style("text-anchor", "end")
          .text("Post Count");

      var interest = svg.selectAll(".interest")
          .data(interests)
          .enter().append("g")
          .attr("class", "interest");

      interest.append("path")
          .attr("class", "line")
          .attr("d", function(d) { return line(d.values); })
          .style("stroke", function(d) { return color(d.name); });


      var legend = svg.selectAll(".legend")
          .data(interests)
          .enter().append("g")
          .attr("class", "legend");

      legend.append("text")
          .datum(function(d) { return {name: d.name, value: d.values[d.values.length - 1]}; })
          .attr("transform", function(d) { return "translate(" + x(d.value.date) + "," + y(d.value.postCount) + ")"; })
          .attr("x", -10)
          .attr("dy", "0.75em")
          .style("fill", function(d) { return color(d.name); })
          .text(function(d) { return d.name; });

    
  }
});