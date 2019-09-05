var jsonDoc = new XMLHttpRequest();
var canvas;
var context;
var pointSize = 3;

window.onload = function() {
    canvas = document.getElementById("MyCanvas");
    context = canvas.getContext("2d");

    jsonDoc.open("GET",  "http://sspcodingexercise.s3-website-us-west-2.amazonaws.com/Sample.json" );
    jsonDoc.send();

}

// wait for the jsonDoc request to complete
jsonDoc.onreadystatechange = function() {
    // check if it completed properly
    if (jsonDoc.readyState !== 4)
        return;
    
    if (jsonDoc.status >=200 && jsonDoc.status < 300) {
        // handle the successfull request
        
        var description = document.getElementById("description");
        var featureData = document.getElementById("featureData");

        var myObject = JSON.parse(jsonDoc.responseText);
        // Print the required data to the webpage
        description.innerHTML = "Description: " + myObject.Description;
        featureData.innerHTML = "Feature Data: " + JSON.stringify(myObject.FeatureData, null, 4);
        // Also send them to the console for easier viewing  
        console.log(myObject.Description);
        console.log(myObject.FeatureData);

        // Add dots for city locations to canvas. Include city names.
        for (item in myObject.FeatureData){
            if(myObject.FeatureData[item].geometry.type == "Point") {
                context.fillStyle = 'green';
                context.beginPath();
                context.arc(myObject.FeatureData[item].geometry.coordinates[0]+300, 300 - myObject.FeatureData[item].geometry.coordinates[1], pointSize, 0, Math.PI *2, true);
                context.fill(); 
                context.fillStyle = 'blue';
                context.font = "bold 12px Arial";
                context.fillText(myObject.FeatureData[item].properties.city, myObject.FeatureData[item].geometry.coordinates[0]+310, 300 - myObject.FeatureData[item].geometry.coordinates[1], 36);            
                   
            }
        }
    }


}

