function scrollToEnd() {
    return new Promise((resolve, reject) => {
        var totalHeight = 0;
        var distance = 100;
        var timer = setInterval(() => {
            var scrollHeight = document.body.scrollHeight;
            window.scrollBy(0, distance);
            totalHeight += distance;

            if(totalHeight >= scrollHeight){
                clearInterval(timer);
                resolve();
            }
        }, 100);
    });
}

scrollToEnd().then(() => {
    var xpath = "(//img[@alt])[position() >= 7]";
var result = [];
var nodesSnapshot = document.evaluate(xpath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
for ( var i=0 ; i < nodesSnapshot.snapshotLength; i++ ){
    var altText = nodesSnapshot.snapshotItem(i).alt;
    // Remove hashtags
    altText = altText.replace(/#\S+/g, '');
    // Split the text into lines
    var lines = altText.split('\n');
    // Create an object to hold the parameters
    var parameters = {
        'Size': lines[0], // Primary information
        'Price': lines[2], // Secondary information
        'Location': lines[4]  // Tertiary information
    };
    result.push(parameters);
}

// Function to convert an array of objects to CSV
function arrayToCSV(objArray) {
    const array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
    let str = `${Object.keys(array[0]).map(value => `"${value}"`).join(",")}` + '\r\n';

    return array.reduce((str, next) => {
        str += `${Object.values(next).map(value => `"${value}"`).join(",")}` + '\r\n';
        return str;
    }, str);
}

// Convert the result to CSV
var csv = arrayToCSV(result);

// Create a downloadable link
var downloadLink = document.createElement("a");
var blob = new Blob(["\ufeff", csv]);
var url = URL.createObjectURL(blob);
downloadLink.href = url;
downloadLink.download = "data.csv";  // Name the file here

document.body.appendChild(downloadLink);
downloadLink.click();
document.body.removeChild(downloadLink);
});
