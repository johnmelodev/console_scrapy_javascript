crie um output csv para o meu codigo javascript. com os seguintes parametros size price e location

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
console.log(result);
