//func to get metadata and populate it
function buildMetadata(sample) {
  Plotly.d3.json(`/metadata/${sample}`, function(error, response){
    if (error) {alert(error)}
    else {
      var data = response;
      var selector = d3.select('#sample-metadata');
      selector.html("")
      var keys = ["ETHNICITY", "GENDER", "AGE", "LOCATION", "BBTYPE", 
                    "WFREQ", "sample"];
      keys.forEach((key) => {
        var ul = selector.append('ul')
        var li = ul.append('li')
        li.text(`${key}: ${data[key]}`)
      })
    }
  })
}

function buildCharts(sample) {

  // @TODO: Use `d3.json` to fetch the sample data for the plots

    // @TODO: Build a Bubble Chart using the sample data

    // @TODO: Build a Pie Chart
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).
}

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
