/*
 * DHTML node iterator helper class.
 * Created by: Krisztian Garai (garaik@arvato-systems.hu)
 *
 * It can iterate over a DHTML node and all of its descendants with first-in-deep traverse.
 */
function NodeIterator(rootNode) {
    // attributes
    this.rootNode = rootNode;
    this.currentNode = null;
    this.nextNode = rootNode;

    /* Returns true if the iterator has more node, false otherwise. */
    function hasNext() {
        return this.nextNode != this.currentNode;
    }

    /*
     * Gives back the next node. If there is no more node then returns the current node.
     * rootNode - Root not of traversation.
     * currentNode - Current node of the traversation.
     */
    function nextNode(rootNode, currentNode) {
        if (currentNode.childNodes.length > 0) {
            return currentNode.childNodes[0];
        }
        var next  = currentNode;
        while (next.nextSibling == null &&
               next != rootNode) {
            next = next.parentNode;
        }
        if (next == rootNode) {
            return currentNode;
        }
        return next.nextSibling;
    }

    /* Gives back the next node. */
    function next() {
        this.currentNode = this.nextNode;
        this.nextNode = nextNode(this.rootNode, this.currentNode);
        return this.currentNode;
    }

    // method mapping
    this.hasNext = hasNext;
    this.next = next;
}
