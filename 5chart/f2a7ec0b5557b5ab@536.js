function _1(md){return(md`result`)}

function _chart(pie,data,d3,width,height,color,arc,arc2,arcLabel)
{
  const arcs = pie(data);

  const svg = d3.create("svg")
      .attr("viewBox", [-width / 2, -height / 2, width, height]);

  svg.append("g")
      .attr("stroke", "white")
    .selectAll("path")
    .data(arcs)
    .join("path")
      .attr("fill", d => color(d.data.name))
      .attr("opacity", 0.6)
      .attr("d", arc)
    .append("title")
      .text(d => `${d.data.name}: ${d.data.value.toLocaleString()}`);

  svg.append("g")
      .attr("stroke", "white")
    .selectAll("path")
    .data(arcs)
    .join("path")
      .attr("fill", d => color(d.data.name))
      .attr("d", arc2)

  svg.append("g")
      .attr("font-family", "sans-serif")
      .attr("font-size", 12)
      .attr("text-anchor", "middle")
    .selectAll("text")
    .data(arcs)
    .join("text")
      .attr("transform", d => `translate(${arcLabel.centroid(d)})`)
      .call(text => text.append("tspan")
          .attr("y", "-0.4em")
          .attr("font-weight", "bold")
          .text(d => d.data.name))
      .call(text => text.filter(d => (d.endAngle - d.startAngle) > 0.25).append("tspan")
          .attr("x", 0)
          .attr("y", "0.7em")
          .attr("fill-opacity", 0.7)
          .text(d => d.data.value.toLocaleString() + " · " + d.data.value3.toLocaleString() + "/" + d.data.value2.toLocaleString()));

  return svg.node();
}


function _data(){return(
[
  {name: "apples", value: 10, value2: 20, value3: 18},
  {name: "bananas", value: 14, value2: 23, value3: 13},
  {name: "cashews", value: 43, value2: 21, value3: 14},
  {name: "raisins", value: 31, value2: 19, value3: 15},
  {name: "almonds", value: 18, value2: 13, value3: 9},
  {name: "mangos", value: 14, value2: 14, value3: 12},
  {name: "figs", value: 5, value2: 15, value3: 11},
  {name: "peanuts", value: 7, value2: 20, value3: 18},
  {name: "dates", value: 10, value2: 22, value3: 16},
]
)}

function _color(d3,data){return(
d3.scaleOrdinal()
    .domain(data.map(d => d.name))
    .range(d3.quantize(t => d3.interpolateSpectral(t * 0.8 + 0.1), data.length).reverse())
)}

function _color2(d3,data){return(
d3.scaleOrdinal()
    .domain(data.map(d => d.name))
    .range(d3.quantize(t => d3.interpolateSpectral(t * 0.8 + 0.1), data.length).reverse())
)}

function _height(width){return(
Math.min(width, 600)
)}

function _arc(d3,data){return(
d3.arc()
    .innerRadius(0)
    .outerRadius((d, i) => data[i].value2 * 10)
)}

function _arc2(d3,data){return(
d3.arc()
    .innerRadius(0)
    .outerRadius((d, i) => data[i].value3 * 10)
)}

function _arcLabel(width,height,d3)
{
  const radius = Math.min(width, height) / 2 * 0.9;
  return d3.arc().innerRadius(radius).outerRadius(radius);
}


function _pie(d3){return(
d3.pie()
    .sort(null)
    .value(d => d.value)
)}

function _d3(require){return(
require("d3@6")
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("chart")).define("chart", ["pie","data","d3","width","height","color","arc","arc2","arcLabel"], _chart);
  main.variable(observer("data")).define("data", _data);
  main.variable(observer("color")).define("color", ["d3","data"], _color);
  main.variable(observer("color2")).define("color2", ["d3","data"], _color2);
  main.variable(observer("height")).define("height", ["width"], _height);
  main.variable(observer("arc")).define("arc", ["d3","data"], _arc);
  main.variable(observer("arc2")).define("arc2", ["d3","data"], _arc2);
  main.variable(observer("arcLabel")).define("arcLabel", ["width","height","d3"], _arcLabel);
  main.variable(observer("pie")).define("pie", ["d3"], _pie);
  main.variable(observer("d3")).define("d3", ["require"], _d3);
  return main;
}
