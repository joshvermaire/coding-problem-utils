// Function to return list containing vertices in Topological order.
function topologicalSort(adj, V) {
	// Vector to store indegree of each vertex
	const indegree = new Array(V).fill(0);
	for (let i = 0; i < V; i++) {
		for (const vertex of adj[i]) {
			indegree[vertex]++;
		}
	}

  console.log(indegree);

	// Queue to store vertices with indegree 0
	const q = [];
	for (let i = 0; i < V; i++) {
		if (indegree[i] === 0) {
			q.push(i);
		}
	}

  console.log('q', q);

	const result = [];
	while (q.length > 0) {
		const node = q.shift();
		result.push(node);
		// Decrease indegree of adjacent vertices as the current node is in topological order
		for (const adjacent of adj[node]) {
			indegree[adjacent]--;
			// If indegree becomes 0, push it to the queue
			if (indegree[adjacent] === 0) q.push(adjacent);
		}
	}

  console.log(result);
	
	// Check for cycle
	if (result.length !== V) {
		console.log("Graph contains cycle!");
		return [];
	}
	return result;
}

const n = 4; // Number of nodes

// Edges
const edges = [[0, 1], [1, 2], [3, 1], [3, 2]];

// Graph represented as an adjacency list
const adj = Array.from({ length: n }, () => []);

// Constructing adjacency list
for (const edge of edges) {
	adj[edge[0]].push(edge[1]);
}

// Performing topological sort
console.log("Topological sorting of the graph: ");
const result = topologicalSort(adj, n);

// Displaying result
for (const vertex of result) {
	console.log(vertex + " ");
}
