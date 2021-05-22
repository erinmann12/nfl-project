// Inside button click (ufo homework)
//postData = {
//     "quarterValue": quarter,
// }
// $.ajax({
//     url: url + "/prediction",
//     type: "POST",
//     data : JSON.stringify(postData),
//     contentType: "application/json",
//     dataType: 'json',
//     success: function(result){
//         if (result["Status"] == "Ok") {
//                  // Here is where you are getting the api result
//         }
//     },
//     complete: function(){
//     },
//     error: function (xhr, status, error) {
//         console.log("Result main: " + status + " " + error + " " + xhr.status + " " + xhr.statusText);
//     }
// })


d3.json("/api/v1.0/plays").then(function(playData) {
    console.log(playData);

    //fourth quarter
    // Grab values from the data json object to build the plots
    quarter4 = playData.data.filter(d=>d["Quarter"]==4)

    var team = quarter4.map(d=> d["OffenseTeam"]);
    var rushing = quarter4.map(d=> d["IsRush"]);
    var passing = quarter4.map(d=> d["IsPass"]);

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
    
    
    //third quarter
    // Grab values from the data json object to build the plots
    quarter3 = playData.data.filter(d=>d["Quarter"]==3)

    var team = quarter3.map(d=> d["OffenseTeam"]);
    var rushing = quarter3.map(d=> d["IsRush"]);
    var passing = quarter3.map(d=> d["IsPass"]);

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

    //second quarter
    // Grab values from the data json object to build the plots
    quarter2 = playData.data.filter(d=>d["Quarter"]==2)

    var team = quarter2.map(d=> d["OffenseTeam"]);
    var rushing = quarter2.map(d=> d["IsRush"]);
    var passing = quarter2.map(d=> d["IsPass"]);

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

    //first quarter
    // Grab values from the data json object to build the plots
    quarter1 = playData.data.filter(d=>d["Quarter"]==1)

    var team = quarter2.map(d=> d["OffenseTeam"]);
    var rushing = quarter2.map(d=> d["IsRush"]);
    var passing = quarter2.map(d=> d["IsPass"]);

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


}); 

