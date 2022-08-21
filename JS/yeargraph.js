var dataset = [{x:'2020', y:85 }, {x:'2021', y:89}, {x:'2022', y:95.9}];
var svg = d3.select("#myGraph");
var width  = parseInt(svg.style("width"), 10) -30;
var height = parseInt(svg.style("height"), 10) -20;
var svgG = svg.append("g")
    .attr("transform", "translate(30, 0)");
        
var xScale = d3.scaleBand()
    .domain(dataset.map(function(d) { return d.x;} ))
    .range([0, width]).padding(0.4);
var yScale = d3.scaleLinear()
    .domain([60, 100])
    .range([height, 10]);

var scale = d3.scaleOrdinal()
    .range(["#FFAA17"]);
    
svgG.append("g")            
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(xScale));
/* y축 표시 */    
svgG.append("g")
    .attr("class", "grid")
    .call(d3.axisLeft(yScale)
        .ticks(10)
    );
    
var barG = svgG.append("g");
/* 막대 표시 */    
barG.selectAll("rect")
    .data(dataset)
    .enter().append("rect")
        .attr("class", "bar")
        .attr("height", function(d, i) {return height-yScale(d.y)})
        .attr("width", xScale.bandwidth())
        .attr("x", function(d, i) {return xScale(d.x)})
        .attr("y", function(d, i) {return yScale(d.y)})
        .attr("fill", function(d) { return scale(d.x); })     
/* score 표시 */    
barG.selectAll("text")
    .data(dataset)
    .enter().append("text")
    .text(function(d) {return d.y})
        .attr("class", "text")
        .attr("x", function(d, i) {return xScale(d.x)+xScale.bandwidth()/2})
        .style("text-anchor", "middle")
        .attr("y", function(d, i) {return yScale(d.y) + 28});