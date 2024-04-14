/**
 * @description Determines whether or not a directed graph has a cycle given a list of edges.
 * 
 * @param {number[][]} edges - List of directed edges represented as arrays of two elements [source, destination].
 * @returns boolean - Returns true if the directed graph contains a cycle, otherwise returns false.
 */
function hasCycle(edges) {
    const graph = buildGraph(edges);
    const visited = new Set();
    const stack = new Set();

    for (let node of graph.keys()) {
        let cycle = detectCycle(node, visited, stack, graph);
        if (cycle) return true;
    }

    return false;
}

function detectCycle(node, visited, stack, graph) {
    if (stack.has(node)) return true;
    if (visited.has(node)) return false;
    visited.add(node);
    stack.add(node);

    const neighbors = graph.get(node) || [];
    for (let neighbor of neighbors) {
        let cycle = detectCycle(neighbor, visited, stack, graph);
        if (cycle) return true;
    }

    stack.delete(node);
    return false;
}

function buildGraph(edges) {
    const graph = new Map();

    for (let [src, dest] of edges) {
        if (!graph.has(src)) graph.set(src, []);
        graph.get(src).push(dest);
    }

    return graph;
}

// Example usage:
const edges = [[0, 1], [1, 2], [2, 0]];
console.log(hasCycle(edges)); // Output: true
