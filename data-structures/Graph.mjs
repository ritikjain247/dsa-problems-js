export class Graph {
  #adjList;

  constructor() {
    this.#adjList = new Map();
  }

  addEdge(u, v, direction = false) {
    if (!this.#adjList.has(u)) this.#adjList.set(u, []);
    this.#adjList.get(u).push(v);

    if (!direction) {
      if (!this.#adjList.has(v)) this.#adjList.set(v, []);
      this.#adjList.get(v).push(u);
    }
  }

  printAdjList() {
    console.log(this.#adjList);
  }
}
const graph = new Graph();
graph.addEdge(1, 2);
graph.addEdge(2, 3);
graph.addEdge(3, 1);
graph.printAdjList();



// BFS of directed graph from adj array
function bfsOfGraph(V, adj) {
  const ans = []; // Array to store the BFS traversal
  const visited = Array(V).fill(false); // Track visited nodes
  const queue = [0]; // Start BFS from node 0

  visited[0] = true; // Mark the starting node as visited

  while (queue.length > 0) {
    const node = queue.shift(); // Dequeue the front node
    ans.push(node); // Add it to the result

    // Traverse all the adjacent nodes of the dequeued node
    for (const neighbor of adj[node]) {
      if (!visited[neighbor]) {
        visited[neighbor] = true; // Mark as visited
        queue.push(neighbor); // Enqueue the neighbor
      }
    }
  }

  return ans;
}



// DFS of undirected graph from adj array
function dfsOfGraph(V, adj) {
  const ans = [];
  const visited = Array(V).fill(false);
  for (let i = 0; i < V; i++) {
    if (!visited[i]) {
      const component = [];
      dfs(i, visited, adj, component);
      ans.push(...component);
    }
  }
  return ans;
}

function dfs(node, visited, adj, component) {
  component.push(node);
  visited[node] = true;
  for (const neighbor of adj[node]) {
    if (!visited[neighbor]) {
      dfs(neighbor, visited, adj, component);
    }
  }
}
