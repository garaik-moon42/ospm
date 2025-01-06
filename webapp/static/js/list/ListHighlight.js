var useHighlighting = true;

function trOnMouseOver() {
    this.className = "selected";
}

function trOnMouseOut() {
    this.className = "";
}

function activateHighlight() {
    var root = document.documentElement;
    checkTable(root);
}

function checkTable(node) {
    if (node.tagName   == "TABLE" && node.className == "list") {
        checkTR(node);
    } else if (node.hasChildNodes()) {
        for (var i=0; i < node.childNodes.length; i++) {
            checkTable(node.childNodes[i]);
        }
    }
}

function checkTR(node) {
    if (node.hasChildNodes()) {
        for (var i=0; i < node.childNodes.length; i++) {
            var n = node.childNodes[i];
            if (n.tagName == "THEAD" || n.tagName == "TFOOT" ) {
                useHighlighting = false;
            } else if (n.tagName == "TBODY") {
                useHighlighting = true;
            }

            if (n.tagName == "TR") {
                setHighlight(n);
            } else {
                checkTR(n);
            }
        }
    }
}

function setHighlight(node) {
    if (useHighlighting) {
        node.onmouseover = trOnMouseOver;
        node.onmouseout  = trOnMouseOut;
    }
}
