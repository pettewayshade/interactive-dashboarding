//func to get metadata and populate it
function buildMetadata(sample) {
  Plotly.d3.json(`/metadata/${sample}`, function(error, response) {
    if (error) {alert(error)}
    else {
      var selector = d3.select('#sample-metadata');
      selector.html("")
      var keys = ["ETHNICITY", "GENDER", "AGE", "LOCATION", "BBTYPE", 
                    "WFREQ", "sample"];
      keys.forEach((key) => {
        var ul = selector.append('ul');
        var li = ul.append('li');
        li.text(`${key}: ${response[key]}`)
      })
    }
  })
}

//func to build charts
function buildCharts(sample) {
  Plotly.d3.json(`/samples/${sample}`, function(error, response) { 
    if (error) {alert(error)}
    else {
      var labels = response.otu_ids.slice(0,10);
      var values = response.sample_values.slice(0,10);
      var hovers = response.otu_labels.slice(0,10);

      var data = [{
        values: values,
        labels: labels,
        type: 'pie',
        text: hovers,
        hoverinfo: 'label+text+value+percent',
        textinfo: 'percent'
      }];

      Plotly.newPlot("pie", data)
    }
  }) 
}

//func that is ran when page loads
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

//func used to get generate metadata and charts when selection is changes
function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init()
