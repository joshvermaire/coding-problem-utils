import { PriorityQueue } from "../datastructures/PriorityQueue.js";

function dijkstra(graph, startNode) {
    const distances = {};
    const visited = {};
    const queue = new PriorityQueue((a, b) => a[1] - b[1]);

    // Initialize distances to all nodes as Infinity except the start node
    for (let node in graph) {
        distances[node] = Infinity;
    }
    distances[startNode] = 0;

    // Add the start node to the priority queue
    queue.enqueue([startNode, 0]);

    while (!queue.isEmpty()) {
        const currentNode = queue.dequeue()[0];
        if (!visited[currentNode]) {
            visited[currentNode] = true;

            for (let neighbor in graph[currentNode]) {
                const cost = distances[currentNode] + graph[currentNode][neighbor];
                if (cost < distances[neighbor]) {
                    distances[neighbor] = cost;
                    queue.enqueue([neighbor, cost]);
                }
            }
        }
    }

    return distances;
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

  const startNode = '0';
  const distances = dijkstra(graph, startNode);
  console.log(distances)