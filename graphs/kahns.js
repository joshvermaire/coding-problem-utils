function topologicalSort(graph) {
    // Count the incoming edges for each vertex
    const inDegree = new Map();
    for (const vertex in graph) {
      inDegree.set(vertex, 0);
    }
    for (const vertices of Object.values(graph)) {
      for (const vertex of vertices) {
        inDegree.set(vertex, inDegree.get(vertex) + 1);
      }
    }
  
    // Initialize a queue with vertices having no incoming edges
    const queue = [];
    for (const [vertex, degree] of inDegree.entries()) {
      if (degree === 0) {
        queue.push(vertex);
      }
    }
  
    // Perform topological sorting
    const result = [];
    while (queue.length > 0) {
      const current = queue.shift();
      result.push(current);
      for (const neighbor of graph[current]) {
        inDegree.set(neighbor, inDegree.get(neighbor) - 1);
        if (inDegree.get(neighbor) === 0) {
          queue.push(neighbor);
        }
      }
    }
  
    // Check for cycles
    if (result.length !== Object.keys(graph).length) {
      throw new Error("The graph contains a cycle!");
    }
  
    return result;
  }
  
  // Example usage:
  const graph = {
    "A": ["B", "C"],
    "B": ["D"],
    "C": ["D"],
    "D": []
  };
  
  console.log(topologicalSort(graph)); // Output: [ 'A', 'C', 'B', 'D' ]
  