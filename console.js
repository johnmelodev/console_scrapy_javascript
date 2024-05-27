var xpath = "(//img[@alt])[position() >= 7]";
var result = [];
var nodesSnapshot = document.evaluate(xpath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
for ( var i=0 ; i < nodesSnapshot.snapshotLength; i++ ){
    result.push(nodesSnapshot.snapshotItem(i).alt);
}
console.log(result);
