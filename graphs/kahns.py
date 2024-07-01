from collections import deque


def topological_sort(vertices, edges):
    """
    Perform topological sorting on a directed acyclic graph (DAG).

    Args:
        vertices (list): A list of vertices in the graph.
        edges (list): A list of edges in the graph represented as tuples (u, v),
                      where u and v are vertices and u points to v.

    Returns:
        list: A list representing the topological order of the vertices.
              If the graph has a cycle, an empty list is returned.
    """
    in_degree = {v: 0 for v in vertices}
    adjacency_list = {v: [] for v in vertices}

    for u, v in edges:
        adjacency_list[u].append(v)
        in_degree[v] += 1

    queue = deque([v for v in vertices if in_degree[v] == 0])
    topological_order = []

    while queue:
        node = queue.popleft()
        topological_order.append(node)

        for neighbor in adjacency_list[node]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)

    if len(topological_order) == len(vertices):
        return topological_order
    else:
        return []  # Graph has a cycle

# Example usage:
vertices = [0, 1, 2, 3, 4, 5]
edges = [(5, 2), (5, 0), (4, 0), (4, 1), (2, 3), (3, 1)]
print(topological_sort(vertices, edges))  # Output: [4, 5, 2, 0, 3, 1]
