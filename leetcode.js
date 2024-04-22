class PriorityQueue {
    constructor() {
      this.elements = [];
    }
  
    enqueue(element, priority) {
      this.elements.push({ element, priority });
      this.elements.sort((a, b) => a.priority - b.priority);
    }
  
    dequeue() {
      return this.elements.shift();
    }
  
    isEmpty() {
      return this.elements.length === 0;
    }
  }
  
  function dijkstra(graph, startNode) {
    const distances = {};
    const predecessors = {}; // to keep track of predecessors for shortest path reconstruction
    const visited = {};
    const queue = new PriorityQueue();
  
    // Initialize distances to all nodes as Infinity except the start node
    for (let node in graph) {
      distances[node] = Infinity;
    }
    distances[startNode] = 0;
  
    // Add the start node to the priority queue
    queue.enqueue(startNode, 0);
  
    while (!queue.isEmpty()) {
      const { element: currentNode, priority: currentDistance } = queue.dequeue();
  
      if (!visited[currentNode]) {
        visited[currentNode] = true;
  
        for (let neighbor in graph[currentNode]) {
          const cost = currentDistance + graph[currentNode][neighbor];
          if (cost < distances[neighbor]) {
            distances[neighbor] = cost;
            predecessors[neighbor] = currentNode;
            queue.enqueue(neighbor, cost);
          }
        }
      }
    }
  
    return { distances, predecessors };
  }
  
  // Function to reconstruct the shortest path from startNode to endNode
function reconstructPath(predecessors, endNode) {
    const paths = [];
    let currentNode = endNode;
    while (predecessors[currentNode] !== undefined) {
      const path = [];
      let tempNode = currentNode;
      while (tempNode !== undefined) {
        path.unshift(tempNode);
        tempNode = predecessors[tempNode];
      }
      paths.push(path);
      currentNode = predecessors[currentNode];
    }
    return paths;
  }
  
  
  // Example graph representation using adjacency list
  const graph = {
    0: { 1: 4, 7: 8 },
    1: { 0: 4, 2: 8, 7: 11 },
    2: { 1: 8, 3: 7, 5: 4, 8: 2 },
    3: { 2: 7, 4: 9, 5: 14 },
    4: { 3: 9, 5: 10 },
    5: { 2: 4, 3: 14, 4: 10, 6: 2 },
    6: { 5: 2, 7: 1, 8: 6 },
    7: { 0: 8, 1: 11, 6: 1, 8: 7 },
    8: { 2: 2, 6: 6, 7: 7 },
  };
  
  // Example usage
  const startNode = '0';
  const endNode = '8';
  const { distances, predecessors } = dijkstra(graph, startNode);
  const shortestPath = reconstructPath(predecessors, endNode);
  console.log('Shortest distances:', distances);
  console.log('Shortest path from 0 to 4:');
  for (path of shortestPath) {
    console.log(path);
  }
  