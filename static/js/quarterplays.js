postData = {
    "quarterValue": quarter,
}
$.ajax({
    url: url + "/prediction",
    type: "POST",
    data : JSON.stringify(postData),
    contentType: "application/json",
    dataType: 'json',
    success: function(result){
        if (result["Status"] == "Ok") {
                 // Here is where you are getting the api result
        }
    },
    complete: function(){
    },
    error: function (xhr, status, error) {
        console.log("Result main: " + status + " " + error + " " + xhr.status + " " + xhr.statusText);
    }
})





d3.json("/api/v1.0/plays").then(function(playData) {
    console.log(playData);
    // Grab values from the data json object to build the plots
    var team = playData.data.OffenseTeam;
    var rushing = playData.data.IsRush;
    var passing = playData.data.IsPass;
    var quarter = playData.data.Quarter;


    if (quarter == 4) {

        var trace1 = {
            x: team,
            y: rushing,
            name: "Rushing",
            type: 'bar'
            };

        var trace2 = {
            x: team, 
            y: passing,
            name: "Passing",
            type: "bar"
        };

        var data = [trace1, trace2];

        var layout = {barmode: 'group'};

        Plotly.newPlot('chart1', data, layout);
    }

    else if(quarter == 3) {
        var trace1 = {
            x: team,
            y: rushing,
            name: "Rushing",
            type: 'bar'
        };

        var trace2 = {
            x: team, 
            y: passing,
            name: "Passing",
            type: "bar"
        };

        var data = [trace1, trace2];

        var layout = {barmode: 'group'};

        Plotly.newPlot('chart2', data, layout);
    }

    else if(quarter == 2){
        var trace1 = {
            x: team,
            y: rushing,
            name: "Rushing",
            type: 'bar'
        };

        var trace2 = {
            x: team, 
            y: passing,
            name: "Passing",
            type: "bar"
        };

        var data = [trace1, trace2];

        var layout = {barmode: 'group'};

        Plotly.newPlot('chart3', data, layout);
    }
        
    else {
        var trace1 = {
            x: team,
            y: rushing,
            name: "Rushing",
            type: 'bar'
        };

        var trace2 = {
            x: team, 
            y: passing,
            name: "Passing",
            type: "bar"
        };

        var data = [trace1, trace2];

        var layout = {barmode: 'group'};

            Plotly.newPlot('chart4', data, layout);
        };  
}); 

