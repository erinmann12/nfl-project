// Select the button with reference to HTML button id
var button = d3.select("#filter-btn");

// Create event handlers 
button.on("click", filterQuarter);

// Complete the event handler function for the form
// $("#down").val().trim()
function filterQuarter() {
    
    togo = $("#inputYards").val().trim();
    
    if (togo == "") {
        togo = 1
    };

    position = $("#Position").val().trim();
    var positionText = ""
    if (position == 1) {
        fieldposition = 1
        fieldposition2 = 0
        fieldposition3 = 0
        fieldposition4 = 0
        positionText = "Green Zone"
    }
    else if (position==2){
        fieldposition = 0
        fieldposition2 = 1
        fieldposition3 = 0
        fieldposition4 = 0
        positionText = "Mid-Field Own Side"
    }
    else if (position ==3 ){
        fieldposition = 0
        fieldposition2 = 0
        fieldposition3 = 1
        fieldposition4 = 0
        positionText = "Mid-Field Opposition Side"
    }
    else {
        fieldposition = 0
        fieldposition2 = 0
        fieldposition3 = 0
        fieldposition4 = 1
        positionText = "Red Zone"
    };

    var down = $("#down").val().trim()
    var downText = ""

    if (down == 1){
        downText = "first down"
    }
    else if (down == 2){
        downText = "second down"
    }
    else if (down == 3){
        downText = "third down"
    }
    else {
        downText = "fourth down"
    }

    var quarter = $("#quarter").val().trim()
    var quarterText = ""

    if (quarter == 1){
        quarterText = "first quarter"
    }
    else if (quarter == 2){
        quarterText = "second quarter"
    }
    else if (quarter== 3){
        quarterText = "third quarter"
    }
    else {
        quarterText = "fourth quarter"
    }

    var postData = {
        quarter: $("#quarter").val().trim(),
        down: $("#down").val().trim(),
        points: $("#inputPoints").val().trim(),
        togo: togo,
        fieldposition: fieldposition,
        fieldposition2: fieldposition2,
        fieldposition3: fieldposition3,
        fieldposition4: fieldposition4
    };
    console.log(postData)
    $.ajax({
        url: "http://127.0.0.1:5000/" +"predict",
        type: "POST",
        data : JSON.stringify(postData),
        contentType: "application/json",
        dataType: 'json',
        success: function(result){
            if (result["Status"] == "Ok") {
                document.getElementById("form").style.display="none"
                document.getElementById("results").style.display="block"
                predictions = result["predictions"]
                console.log(predictions)
                $("#enteredQuarter").text(quarterText)
                $("#enteredDown").text(downText)
                $("#enteredpoints").text($("#inputPoints").val().trim())
                $("#enteredposition").text(positionText.toLowerCase())
                $("#prediction").text(predictions.toLowerCase())
                
                d3.json("/api/v1.0/plays").then(function(playData) {
                    // Grab values from the data json object to build the plots
                    quarter4 = playData.data.filter(d=>d["Quarter"]==4);
                    quarter3 = playData.data.filter(d=>d["Quarter"]==3);
                    quarter2 = playData.data.filter(d=>d["Quarter"]==2);
                    quarter1 = playData.data.filter(d=>d["Quarter"]==1);
                
                        if (($("#quarter").val().trim()) == "4"){
                            var team = quarter4.map(d=> d["OffenseTeam"]);
                            var rushing = quarter4.map(d=> d["IsRush"]);
                            var passing = quarter4.map(d=> d["IsPass"]);
                        
                            var trace1 = {
                                x: team,
                                y: rushing,
                                name: "Rushing",
                                type: 'bar',
                                marker: {
                                    color: '255.127.14'
                                }
                            };
                        
                            var trace2 = {
                                x: team, 
                                y: passing,
                                name: "Passing",
                                type: "bar",
                                marker: {
                                    color: '31.119.180'
                                }
                            };
                        
                            var data = [trace1, trace2];
                        
                            var layout = {
                                title: "Fourth Quarter Plays by Team",
                                barmode: 'group'
                            };
                        
                            Plotly.newPlot('chart1', data, layout);
                        }
                        else if (($("#quarter").val().trim()) == "3"){
                            var team = quarter3.map(d=> d["OffenseTeam"]);
                            var rushing = quarter3.map(d=> d["IsRush"]);
                            var passing = quarter3.map(d=> d["IsPass"]);
                        
                            var trace1 = {
                                x: team,
                                y: rushing,
                                name: "Rushing",
                                type: 'bar',
                                marker: {
                                    color: '255.127.14'
                                }
                            };
                        
                            var trace2 = {
                                x: team, 
                                y: passing,
                                name: "Passing",
                                type: "bar",
                                marker: {
                                    color: '31.119.180'
                                }
                            };
                        
                            var data = [trace1, trace2];
                        
                            var layout = {
                                title: "Third Quarter Plays by Team",
                                barmode: 'group'};
                        
                            Plotly.newPlot('chart1', data, layout);
                        }
                        else if (($("#quarter").val().trim()) == "2") {
                            var team = quarter2.map(d=> d["OffenseTeam"]);
                            var rushing = quarter2.map(d=> d["IsRush"]);
                            var passing = quarter2.map(d=> d["IsPass"]);
                        
                            var trace1 = {
                                x: team,
                                y: rushing,
                                name: "Rushing",
                                type: 'bar',
                                marker: {
                                    color: '255.127.14'
                                }
                            };
                        
                            var trace2 = {
                                x: team, 
                                y: passing,
                                name: "Passing",
                                type: "bar",
                                marker: {
                                    color: '31.119.180'
                                }
                            };
                        
                            var data = [trace1, trace2];
                        
                            var layout = {
                                title: "Second Quarter Plays by Team",
                                barmode: 'group'};
                        
                            Plotly.newPlot('chart1', data, layout);
                        }
                        else {
                            var team = quarter1.map(d=> d["OffenseTeam"]);
                            var rushing = quarter1.map(d=> d["IsRush"]);
                            var passing = quarter1.map(d=> d["IsPass"]);
                        
                            var trace1 = {
                                x: team,
                                y: rushing,
                                name: "Rushing",
                                type: 'bar',
                                marker: {
                                    color: '255.127.14'
                                }
                            };
                        
                            var trace2 = {
                                x: team, 
                                y: passing,
                                name: "Passing",
                                type: "bar",
                                marker: {
                                    color: '31.119.180'
                                }
                            };
                        
                            var data = [trace1, trace2];
                        
                            var layout = {
                                title: "First Quarter Plays by Team",
                                barmode: 'group'};
                        
                            Plotly.newPlot('chart1', data, layout); 
                        };
                });
            };
        },
        complete: function(){
        },
        error: function (xhr, status, error) {
            console.log("Result main: " + status + " " + error + " " + xhr.status + " " + xhr.statusText);
        }
    });
}


// d3.json("/api/v1.0/plays").then(function(playData) {
//     // console.log(playData);

//     //fourth quarter
//     // Grab values from the data json object to build the plots
//     quarter4 = playData.data.filter(d=>d["Quarter"]==4);
//     quarter3 = playData.data.filter(d=>d["Quarter"]==3);
//     quarter2 = playData.data.filter(d=>d["Quarter"]==2);
//     quarter1 = playData.data.filter(d=>d["Quarter"]==1);

//     if (quarter == quarter4){
//         var team = quarter4.map(d=> d["OffenseTeam"]);
//         var rushing = quarter4.map(d=> d["IsRush"]);
//         var passing = quarter4.map(d=> d["IsPass"]);
    
//         var trace1 = {
//             x: team,
//             y: rushing,
//             name: "Rushing",
//             type: 'bar'
//         };
    
//         var trace2 = {
//             x: team, 
//             y: passing,
//             name: "Passing",
//             type: "bar"
//         };
    
//         var data = [trace1, trace2];
    
//         var layout = {barmode: 'group'};
    
//         Plotly.newPlot('chart1', data, layout);
//     }
//     else if (quarter == quarter3){
//         var team = quarter3.map(d=> d["OffenseTeam"]);
//         var rushing = quarter3.map(d=> d["IsRush"]);
//         var passing = quarter3.map(d=> d["IsPass"]);
    
//         var trace1 = {
//             x: team,
//             y: rushing,
//             name: "Rushing",
//             type: 'bar'
//         };
    
//         var trace2 = {
//             x: team, 
//             y: passing,
//             name: "Passing",
//             type: "bar"
//         };
    
//         var data = [trace1, trace2];
    
//         var layout = {barmode: 'group'};
    
//         Plotly.newPlot('chart1', data, layout);
//     }
//     else if (quarter == quarter2) {
//         var team = quarter2.map(d=> d["OffenseTeam"]);
//         var rushing = quarter2.map(d=> d["IsRush"]);
//         var passing = quarter2.map(d=> d["IsPass"]);
    
//         var trace1 = {
//             x: team,
//             y: rushing,
//             name: "Rushing",
//             type: 'bar'
//         };
    
//         var trace2 = {
//             x: team, 
//             y: passing,
//             name: "Passing",
//             type: "bar"
//         };
    
//         var data = [trace1, trace2];
    
//         var layout = {barmode: 'group'};
    
//         Plotly.newPlot('chart1', data, layout);
//     }
//     else {
//         var team = quarter2.map(d=> d["OffenseTeam"]);
//         var rushing = quarter2.map(d=> d["IsRush"]);
//         var passing = quarter2.map(d=> d["IsPass"]);
    
//         var trace1 = {
//             x: team,
//             y: rushing,
//             name: "Rushing",
//             type: 'bar'
//         };
    
//         var trace2 = {
//             x: team, 
//             y: passing,
//             name: "Passing",
//             type: "bar"
//         };
    
//         var data = [trace1, trace2];
    
//         var layout = {barmode: 'group'};
    
//         Plotly.newPlot('chart4', data, layout); 
//     }
// });
    // var team = quarter4.map(d=> d["OffenseTeam"]);
    // var rushing = quarter4.map(d=> d["IsRush"]);
    // var passing = quarter4.map(d=> d["IsPass"]);

    // var trace1 = {
    //     x: team,
    //     y: rushing,
    //     name: "Rushing",
    //     type: 'bar'
    // };

    // var trace2 = {
    //     x: team, 
    //     y: passing,
    //     name: "Passing",
    //     type: "bar"
    // };

    // var data = [trace1, trace2];

    // var layout = {barmode: 'group'};

    // Plotly.newPlot('chart1', data, layout);
    
    
    //third quarter
    // Grab values from the data json object to build the plots
    // quarter3 = playData.data.filter(d=>d["Quarter"]==3)

    // var team = quarter3.map(d=> d["OffenseTeam"]);
    // var rushing = quarter3.map(d=> d["IsRush"]);
    // var passing = quarter3.map(d=> d["IsPass"]);

    // var trace1 = {
    //     x: team,
    //     y: rushing,
    //     name: "Rushing",
    //     type: 'bar'
    // };

    // var trace2 = {
    //     x: team, 
    //     y: passing,
    //     name: "Passing",
    //     type: "bar"
    // };

    // var data = [trace1, trace2];

    // var layout = {barmode: 'group'};

    // Plotly.newPlot('chart2', data, layout);

    //second quarter
    // Grab values from the data json object to build the plots
    // quarter2 = playData.data.filter(d=>d["Quarter"]==2)

    // var team = quarter2.map(d=> d["OffenseTeam"]);
    // var rushing = quarter2.map(d=> d["IsRush"]);
    // var passing = quarter2.map(d=> d["IsPass"]);

    // var trace1 = {
    //     x: team,
    //     y: rushing,
    //     name: "Rushing",
    //     type: 'bar'
    // };

    // var trace2 = {
    //     x: team, 
    //     y: passing,
    //     name: "Passing",
    //     type: "bar"
    // };

    // var data = [trace1, trace2];

    // var layout = {barmode: 'group'};

    // Plotly.newPlot('chart3', data, layout);

    //first quarter
    // Grab values from the data json object to build the plots
    // quarter1 = playData.data.filter(d=>d["Quarter"]==1)

//     var team = quarter2.map(d=> d["OffenseTeam"]);
//     var rushing = quarter2.map(d=> d["IsRush"]);
//     var passing = quarter2.map(d=> d["IsPass"]);

//     var trace1 = {
//         x: team,
//         y: rushing,
//         name: "Rushing",
//         type: 'bar'
//     };

//     var trace2 = {
//         x: team, 
//         y: passing,
//         name: "Passing",
//         type: "bar"
//     };

//     var data = [trace1, trace2];

//     var layout = {barmode: 'group'};

//     Plotly.newPlot('chart4', data, layout);


// }); 

