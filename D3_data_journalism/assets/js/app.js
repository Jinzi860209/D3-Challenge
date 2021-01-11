// @TODO: YOUR CODE HERE!
var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 80,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
var svg = d3
  .select(".scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// Append an SVG group
var chartGroup = svg.append("g")
.attr("transform", `translate(${margin.left}, ${margin.top})`);

// Initial Params
var chosenXAxis = "healthycare";
var chosenYAxis = "poverty";


// function used for updating x-scale var upon click on axis label
function xScale(DataCsv, chosenXAxis) {
    // create scales
    var xLinearScale = d3.scaleLinear()
      .domain([d3.min(DataCsv, d => d[chosenXAxis]) * 0.8,
        d3.max(DataCsv, d => d[chosenXAxis]) * 1.2
      ])
      .range([0, width]);
  
    return xLinearScale;
  
  }

 //Function for Updating y-scale Variable
function yScale(DataCsv, chosenYAxis) {
    var yLinearScale = d3.scaleLinear()
    .domain([d3.min(DataCsv, d => d[chosenYAxis] * 0.8),
        d3.max(DataCsv, d=> d[chosenYAxis] * 1.0)
    ])
    .range([width, 0]);

return yLinearScale;
} 

  // function used for updating xAxis var upon click on axis label
function renderAxes(newXScale, xAxis) {
    var bottomAxis = d3.axisBottom(newXScale);
  
    xAxis.transition()
      .duration(1000)
      .call(bottomAxis);
  
    return xAxis;
  }

//Function for Updating yAxis
function renderyAxes(newYScale, yAxis) {
    var leftAxis = d3.axisLeft(newYScale);

    yAxis.transition()
        .duration(1000)
        .call(leftAxis);

    return yAxis
}

// function used for updating circles group with a transition to
// new circles
function renderCircles(circlesGroup, newXScale, chosenXAxis) {

    circlesGroup.transition()
      .duration(1000)
      .attr("cx", d => newXScale(d[chosenXAxis]));
  
    return circlesGroup;
  }

//Function for Updating Circles on yAxis
function renderyCircles(circlesGroup, newYScale, chosenYAxis) {

    circlesGroup.transition()
        .duration(1000)
        .attr("cy", d => newYScale(d[chosenYAxis]));
          
    return circlesGroup;
}

// // Function for Updating Tooltip
 function updateToolTip(chosenXAxis, circlesGroup) {
     if (chosenXAxis === "healthcare") {
         var label = "Healthcare (%)";
     }
    else {
var label = "Obesity (%)";
     }

     var toolTip = d3.tip()
     .attr("class", "d3-tip")
     .offset([80, -60])
     .html(function(d) {
       return (`${d.state}<br>${label} ${d[chosenXAxis]}`);
     });

 circlesGroup.call(toolTip);

   circlesGroup.on("mouseover", function(data) {
     toolTip.show(data);
   })
     // onmouseout event
     .on("mouseout", function(data, index) {  
       toolTip.hide(data);
     });

   return circlesGroup;
 }