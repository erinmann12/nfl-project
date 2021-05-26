d3.json("/api/v1.0/yardsgained").then(function(yarddata) {
    //console.log(yarddata);

     down3 = yarddata.filter(d=>d["Down"]=="3")

     //console.log(quarter3);

     down3sh= down3.filter(d=>d["ToGo"]<4)
     downr3md=down3.filter(d=>d["ToGo"]>=4)
     down3lg=down3.filter(d=>d["ToGo"]>=9)

    //  console.log(quarter3sh)
    //  console.log(quarter3md)
    //  console.log(quarter3lg)

     var yardsgainedsh = down3sh.map(d=> d["Yards"]);
     var yardsgainedmd = downr3md.map(d=> d["Yards"]);
     var yardsgainedlg = down3lg.map(d=> d["Yards"]);


     
    //  var yardstg = quarter3.map(d=> d["ToGo"]);

    //3rd and short box
    var trace1 = {
        y: yardsgainedsh,
        name: "3rd and short",
        type: "box",
        boxpoints: "all"
      };
      


      var data = [trace1];

      var layout = {
        title: "Yards gained on 3rd and short",
        yaxis: { title: "Yards Gained"}
      };
  
      document.getElementById("wait").style.display="none"
      Plotly.newPlot('chart1', data, layout);

    
    //3rd and medium box
    var trace1 = {
        y: yardsgainedmd,
        name: "3rd and medium",
        type: "box",
        boxpoints: "all"
      };
      


      var data = [trace1];

      var layout = {
        title: "Yards gained on 3rd and Medium Distance (4-8 yards)",
        yaxis: { title: "Yards Gained"}
      };
  

      Plotly.newPlot('chart2', data, layout);



        //3rd and Long box
    var trace1 = {
        y: yardsgainedlg,
        name: "3rd and Long",
        type: "box",
        boxpoints: "all"
      };
      


      var data = [trace1];

      var layout = {
        title: "Yards gained on 3rd and Long (>8 yards)",
        yaxis: { title: "Yards Gained"}
      };
  

      Plotly.newPlot('chart3', data, layout);


      ///avg yards on 3rd down


      const arrAvg = arr => arr.reduce((a,b) => a + b, 0) / arr.length

    

      console.log(arrAvg(yardsgainedsh))



      var trace1 = {
        x: ["3rd and Short", "3rd and Med", "3rd and Long"],
        y: [arrAvg(yardsgainedsh), arrAvg(yardsgainedmd), arrAvg(yardsgainedlg)],
        name: "Avg yards gaiined",
        type: "bar"
      };
      
  
      
      // Combining both traces
      var traceData = [trace1];
      
      // Apply the group barmode to the layout
      var layout = {
        title: "Avg Yards gained 3rd Down",
        barmode: "group"
      };
      
      // Render the plot to the div tag with id "plot"
      Plotly.newPlot("chart4", traceData, layout);
      

}); 