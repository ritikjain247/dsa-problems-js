import { DisjointSet } from '../DisjointSet.mjs';
import { MinHeap } from '../Heap.mjs'


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


// bfs of undirected graph from given number of vertices and edges array. Nodes may be disconnected 
function breadthFirstSearch(vertices, edges) {
  const adjList = new Map();
  const data = [];
  const visited = new Map();

  prepareAdjList(adjList, edges);

  for (let i = 0; i < vertices; i++) {
    if (!visited.get(i)) {
      bfs(adjList, visited, data, i);
    }
  }

  return data;
}

// bfs using adj map
function bfs(adjList, visited, data, node) {
  const queue = [node];
  visited.set(node, true);

  while (queue.length > 0) {
    const frontNode = queue.shift();
    data.push(frontNode);

    adjList.get(frontNode).forEach(neighbor => {
      if (!visited.get(neighbor)) {
        queue.push(neighbor);
        visited.set(neighbor, true);
      }
    });
  }
}


function prepareAdjList(adjList, edges) {
  edges.forEach(edge => {
    const [u, v] = edge;
    if (!adjList.has(u)) adjList.set(u, []);
    if (!adjList.has(v)) adjList.set(v, []);
    adjList.get(u).push(v);
    adjList.get(v).push(u);
  });
}



// DFS of undirected disconnected graph with given edges and number of vertices
function depthFirstSearch(V, E, edges) {
  const adj = new Map();

  prepareAdjList(adj, edges);

  const ans = [];
  const visited = new Map();
  for (let i = 0; i < V; i++) {
    if (!visited.get(i)) {
      const component = [];
      dfsUndirected(i, visited, adj, component);
      ans.push(component);
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
      dfsUndirected(i, visited, adj, component);
      ans.push(...component);
    }
  }
  return ans;
}

function dfsUndirected(node, visited, adj, component) {
  component.push(node);
  visited[node] = true;
  for (const neighbor of adj[node]) {
    if (!visited[neighbor]) {
      dfsUndirected(neighbor, visited, adj, component);
    }
  }
}



// Undirected Graph Cycle Detection using BFS
function isCycleBFS(V, adj) {
  const visited = Array(V).fill(false); // Track visited nodes

  function bfs(adj, i) {
    const parent = new Map();
    parent.set(i, -1);
    const queue = [i]; // Start BFS from node 0
    visited[i] = true; // Mark the starting node as visited
    while (queue.length) {
      const node = queue.shift(); // Dequeue the front node
      // Traverse all the adjacent nodes of the dequeued node
      for (const neighbor of adj[node]) {
        if (visited[neighbor] && neighbor != parent.get(node)) return true;
        else if (!visited[neighbor]) {
          queue.push(neighbor); // Enqueue the neighbor
          visited[neighbor] = true; // Mark as visited
          parent.set(neighbor, node);
        }
      }
    }
    return false;
  }

  for (let i = 0; i < V; i++) {
    if (!visited[i]) {
      let res = bfs(adj, i);
      if (res) return true;
    }
  }

  return false;
}

function isCycleBFS2(V, adj) {
  const visited = Array(V).fill(false);
  function bfs(i) {
    let queue = [{ val: i, prev: -1 }];
    while (queue.length) {
      let node = queue.shift();
      if (visited[node.val]) {
        return true;
      }
      visited[node.val] = true;
      for (let next of adj[node.val]) {
        if (next != node.prev) {
          queue.push({ val: next, prev: node.val });
        }
      }
    }
  }

  for (let i = 0; i < adj.length; i++) {
    if (!visited[i]) {
      if (bfs(i)) {
        return true;
      }
    }
  }

  return false;
}



// Undirected Graph Cycle Detection using DFS
function isCycleDFS(V, adj) {
  const visited = Array(V).fill(false);

  function dfsIterative(start) {
    const stack = [[start, -1]];
    while (stack.length) {
      const [node, parent] = stack.pop();
      if (!visited[node]) {
        visited[node] = true;
      }
      for (const neighbor of adj[node]) {
        if (!visited[neighbor]) {
          stack.push([neighbor, node]);
        } else if (neighbor !== parent) {
          return true;
        }
      }
    }
    return false;
  }

  for (let i = 0; i < V; i++) {
    if (!visited[i]) {
      if (dfsIterative(i)) return true;
    }
  }

  return false;
}


// Undirected Graph Cycle Detection using Recursive DFS
function isCycleDFSRecursive(V, adj) {
  const visited = Array(V).fill(false);

  function dfs(node, parent, visited, adj) {
    visited[node] = true;
    for (const neighbor of adj[node]) {
      if (!visited[neighbor]) {
        if (dfs(neighbor, node, visited, adj)) return true;
      }
      else if (neighbor !== parent) return true;
    }
  }

  for (let i = 0; i < V; i++) {
    if (!visited[i]) {
      if (dfs(i, -1, visited, adj)) return true;
    }
  }

  return false;
}



// Directed Graph Cycle Detection using dfs
function isCyclic(V, adj) {
  const visited = Array(V).fill(false); // Track visited nodes
  const dfsCalled = Array(V).fill(false);

  function dfs(node) {
    visited[node] = true;
    dfsCalled[node] = true;
    for (const neighbor of adj[node]) {
      if (!visited[neighbor]) {
        if (dfs(neighbor)) return true;
      }
      else if (dfsCalled[neighbor]) return true;
    }
    dfsCalled[node] = false;
  }

  for (let i = 0; i < V; i++) {
    if (!visited[i]) {
      if (dfs(i)) return true;
    }
  }

  return false;
}

// Optimized 
function isCyclicIerative(V, adj) {
  const visited = Array(V).fill(false); // Track visited nodes
  const inStack = Array(V).fill(false);

  function dfs(start) {
    const stack = [start];

    while (stack.length) {
      const node = stack[stack.length - 1];
      if (!visited[node]) {
        visited[node] = true;
        inStack[node] = true;
      }
      let allNeighborsVisited = true;

      for (const neighbor of adj[node]) {
        if (!visited[neighbor]) {
          stack.push(neighbor);
          allNeighborsVisited = false;
        } else if (inStack[neighbor]) {
          return true;
        }
      }
      if (allNeighborsVisited) {
        inStack[node] = false;
        stack.pop();
      }
    }
    return false;
  }

  for (let i = 0; i < V; i++) {
    if (!visited[i]) {
      if (dfs(i)) return true;
    }
  }

  return false;
}


// Topological Sort in DAG using DFS
function topoSortDFS(V, adj) {
  const visited = Array(V).fill(false); // Track visited nodes
  const stack = [];

  function topological(node) {
    visited[node] = true;
    for (const neighbor of adj[node]) {
      if (!visited[neighbor]) {
        topological(neighbor);
      }
    }
    stack.push(node);
  }

  for (let i = 0; i < V; i++) {
    if (!visited[i]) {
      if (topological(i)) return true;
    }
  }

  return stack.reverse();
}


// Topological Sort in DAG using Kahn's Algo
function topologicalSortBFS(V, adj) {
  let indegree = Array(V).fill(0);
  for (let node of adj) {
    for (let neighbor of node) {
      indegree[neighbor]++;
    }
  }

  let queue = [];
  for (let i = 0; i < V; i++) {
    if (indegree[i] === 0) queue.push(i);
  }

  let res = [];
  while (queue.length) {
    let node = queue.shift();
    res.push(node);
    for (let neighbor of adj[node]) {
      indegree[neighbor]--;
      if (indegree[neighbor] === 0) queue.push(neighbor);
    }
  }

  if (res.length !== V) {
    console.log("Graph contains cycle!");  // Cycle detection using BFS in Directed Graph
    return [];
  }
  return res;
}


// Shortest path in Undirected Graph - find the shortest path from src to all the vertex
function shortestPath(edges, n, src) {
  // Prepare adjacency list 
  const adj = new Map();
  prepareAdjList(adj, edges);
  // Ensure all nodes are in the adjacency list
  for (let i = 0; i < n; i++) {
    if (!adj.has(i)) {
      adj.set(i, []);
    }
  }

  // Traverse using BFS and find parents for each node
  const visited = Array(n).fill(false);
  const distance = Array(n).fill(Infinity);

  let queue = [src];
  visited[src] = true;
  distance[src] = 0;

  while (queue.length) {
    let node = queue.shift();
    for (let neighbor of adj.get(node)) {
      if (!visited[neighbor]) {
        visited[neighbor] = true;
        distance[neighbor] = distance[node] + 1;
        queue.push(neighbor);
      }
    }
  }
  // Prepare shortest path result
  let res = [];
  for (let i = 0; i < n; i++) {
    if (distance[i] === Infinity) {
      res.push(-1);
    } else {
      res.push(distance[i]);
    }
  }
  return res;
}

// Shortest path in Undirected Graph - Approach 2 (Cleaner)
class Pair {
  constructor(ind, sortPath) {
    this.ind = ind;
    this.sortPath = sortPath;
  }
}
function shortestPath2(edges, n, m, src) {
  const queue = [];
  const adj = Array.from({ length: n }, () => []);
  for (let i = 0; i < m; i++) {
    adj[edges[i][0]].push(edges[i][1]);
    adj[edges[i][1]].push(edges[i][0]);
  }
  const pathSum = Array(n).fill(Infinity);
  bsfHelper(adj, queue, pathSum, n, m, src);
  for (let i = 0; i < n; i++) {
    if (pathSum[i] === Infinity) {
      pathSum[i] = -1;
    }
  }
  return pathSum;
}
function bsfHelper(adj, queue, pathSum, n, m, src) {
  queue.push(new Pair(src, 0));
  pathSum[src] = 0;
  while (queue.length > 0) {
    const p = queue.shift();
    for (const v of adj[p.ind]) {
      const ps = p.sortPath + 1;
      if (pathSum[v] >= ps) {
        queue.push(new Pair(v, ps));
        pathSum[v] = ps;
      }
    }
  }
}


// Rat in a maze Shortest Path from (0,0) to (X, Y).
function shortestDistance(N, M, A, X, Y) {
  if (A[0][0] === 0 || A[X][Y] === 0) return -1;

  const directions = [
    [0, 1],   // right
    [0, -1],  // left
    [1, 0],   // down
    [-1, 0]   // up
  ];

  const queue = [[0, 0, 0]]; // [row, col, distance]
  const visited = Array.from({ length: N }, () => Array(M).fill(false));
  visited[0][0] = true;

  while (queue.length) {
    const [currRow, currCol, currDist] = queue.shift();

    if (currRow === X && currCol === Y) return currDist;

    for (const [dr, dc] of directions) {
      const newRow = currRow + dr;
      const newCol = currCol + dc;

      if (
        newRow >= 0 && newRow < N &&
        newCol >= 0 && newCol < M &&
        A[newRow][newCol] === 1 &&
        !visited[newRow][newCol]
      ) {
        visited[newRow][newCol] = true;
        queue.push([newRow, newCol, currDist + 1]);
      }
    }
  }

  return -1;
}




// Finding shortest distances in DAG. 

// 1. Initialize dist[] = {INF, INF, ….} and dist[s] = 0 where s is the source vertex. 
// 2. Create a topological order of all vertices. 
// 3. Do following for every vertex u in topological order. 
// ………..Do following for every adjacent vertex v of u 
// ………………if (dist[v] > dist[u] + weight(u, v)) 
// ………………………dist[v] = dist[u] + weight(u, v) 

class AdjListNode {
  constructor(_v, _w) {
    this.v = _v;
    this.weight = _w;
  }
  getVertex() {
    return this.v;
  }
  getWeight() {
    return this.weight;
  }
}

class Graph {
  constructor(vertices) {
    this.vertices = vertices;
    this.adj = Array.from(Array(vertices), () => []);
  }
  // function to add an edge to graph
  addEdge(source, destination, weight) {
    let node = new AdjListNode(destination, weight);
    this.adj[source].push(node); // Add destination to source's list
  }

  topologicalSortUtil(vertex, visited, stack) {
    visited[vertex] = true;
    for (let neighborIndex in this.adj[vertex]) {
      let node = this.adj[vertex][neighborIndex];
      if (!visited[node.getVertex()]) {
        this.topologicalSortUtil(node.getVertex(), visited, stack);
      }
    }
    stack.push(vertex);
  }

  shortestPath(src) {
    let stack = [];
    let distances = new Array(this.vertices).fill(Infinity);
    let visited = new Array(this.vertices).fill(false);

    // Call the recursive helper function to store Topological Sort starting from all vertices one by one
    for (let i = 0; i < this.vertices; i++) {
      if (!visited[i]) {
        this.topologicalSortUtil(i, visited, stack);
      }
    }

    distances[src] = 0;

    // Process vertices in topological order
    while (stack.length) {
      let node = stack.pop();
      // Update distances of all adjacent vertices
      if (distances[node] !== Infinity) {
        for (let neighborIndex in this.adj[node]) {
          let neighborNode = this.adj[node][neighborIndex];
          if (distances[neighborNode.getVertex()] > distances[node] + neighborNode.getWeight()) {
            distances[neighborNode.getVertex()] = distances[node] + neighborNode.getWeight();
          }
        }
      }
    }

    // Print the calculated shortest distances
    for (let i = 0; i < this.vertices; i++) {
      distances[i] === Infinity ? console.log("Infinity ") : console.log(distances[i] + " ");
    }
  }
}
// let g = new Graph(6);
// g.addEdge(0, 1, 5);
// g.addEdge(0, 2, 3);
// g.addEdge(1, 3, 6);
// g.addEdge(1, 2, 2);
// g.addEdge(2, 4, 4);
// g.addEdge(2, 5, 2);
// g.addEdge(2, 3, 7);
// g.addEdge(3, 4, -1);
// g.addEdge(4, 5, -2);

// let s = 1;
// console.log("Following are shortest distances from source " + s);
// g.shortestPath(s);



class CustomMinHeap extends MinHeap {
  leftChild = (index) => this.getHeap()[this.getLeftChildIndex(index)][0];
  rightChild = (index) => this.getHeap()[this.getRightChildIndex(index)][0];
  parent = (index) => this.getHeap()[this.getParentIndex(index)][0];

  // Override the heapifyUp method
  heapifyUp() {
    let index = this.getHeap().length - 1;
    while (this.hasParent(index) && this.parent(index) > this.getHeap()[index][0]) {
      this.swap(this.getParentIndex(index), index);
      index = this.getParentIndex(index);
    }
  }

  // Override the heapifyDown method
  heapifyDown() {
    let index = 0;
    while (this.hasLeftChild(index)) {
      let smallerChildIndex = this.getLeftChildIndex(index);
      if (this.hasRightChild(index) && this.rightChild(index) <= this.leftChild(index)) {
        smallerChildIndex = this.getRightChildIndex(index);
      }
      if (this.getHeap()[index][0] < this.getHeap()[smallerChildIndex][0]) {
        break;
      } else {
        this.swap(index, smallerChildIndex);
      }
      index = smallerChildIndex;
    }
  }

  delete(node) {
    if (this.empty()) return null;
    let idx = this.find(node);
    if (!idx || idx < 0) return null;
    const item = this.getHeap()[idx];
    this.getHeap()[idx] = this.getHeap()[this.getHeap().length - 1];
    this.getHeap().pop();
    this.heapifyDown();
    return item;
  }

  find(node) {
    return this.getHeap().findIndex(([_dist, vertex]) => node === vertex);
  }
}


// Dijkstra's Algorithm
function dijkstra(n, adj, src) {
  const distance = Array(n).fill(Infinity);
  distance[src] = 0;

  let minheap = new CustomMinHeap();
  minheap.add([distance[src], src])

  while (!minheap.empty()) {
    let [dist, node] = minheap.remove();
    for (let [neighbor, weight] of adj[node]) {
      if (distance[neighbor] > dist + weight) {
        if (minheap.find(neighbor)) minheap.delete(neighbor);

        distance[neighbor] = dist + weight;
        minheap.add([distance[neighbor], neighbor]);
      }
    }
  }

  return distance;
}


// Prim's Algorithm - Minimum Spanning Tree
// O(V^2+E), O(V+E)
function spanningTreePrims(v, adj) {
  let mst = Array(v).fill(false);
  let parent = Array(v).fill(-1);
  let key = Array(v).fill(Infinity);

  key[0] = 0;

  for (let i of adj) {
    let min = Infinity;
    let node;

    for (let j = 0; j < v; j++) {
      if (!mst[j] && key[j] < min) {
        node = j;
        min = key[j];
      }
    }

    mst[node] = true;

    for (let [neighbor, weight] of adj[node]) {
      if (!mst[neighbor] && weight < key[neighbor]) {
        parent[neighbor] = node;
        key[neighbor] = weight;
      }
    }
  }
  return key.reduce((sum, curr) => curr + sum, 0);
}


// O((V+E)logV), O(V+E)
function spanningTreePrimsHeap(v, adj) {
  let mst = Array(v).fill(false);
  let parent = Array(v).fill(-1);
  let key = Array(v).fill(Infinity);

  key[0] = 0;

  // Priority queue to store vertices with minimum key values
  const minHeap = new MinPriorityQueue();
  minHeap.push([0, 0]); // [key value, vertex]

  while (!minHeap.isEmpty()) {
    const [minKey, u] = minHeap.pop();
    mst[u] = true;

    for (const [neighbor, weight] of adj[u]) {
      if (!mst[neighbor] && weight < key[neighbor]) {
        key[neighbor] = weight;
        parent[neighbor] = u;
        minHeap.push([weight, neighbor]);
      }
    }
  }

  return key.reduce((sum, curr) => curr + sum, 0);
}

class MinPriorityQueue {
  constructor() {
    this.heap = [];
  }

  isEmpty() {
    return this.heap.length === 0;
  }

  push(element) {
    this.heap.push(element);
    this._heapifyUp();
  }

  pop() {
    if (this.isEmpty()) {
      return null;
    }
    const min = this.heap[0];
    const end = this.heap.pop();
    if (!this.isEmpty()) {
      this.heap[0] = end;
      this._heapifyDown();
    }
    return min;
  }

  _heapifyUp() {
    let index = this.heap.length - 1;
    const element = this.heap[index];
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      const parent = this.heap[parentIndex];
      if (element[0] >= parent[0]) break;
      this.heap[index] = parent;
      index = parentIndex;
    }
    this.heap[index] = element;
  }

  _heapifyDown() {
    let index = 0;
    const length = this.heap.length;
    const element = this.heap[0];
    while (true) {
      let leftChildIndex = 2 * index + 1;
      let rightChildIndex = 2 * index + 2;
      let leftChild, rightChild;
      let swap = null;

      if (leftChildIndex < length) {
        leftChild = this.heap[leftChildIndex];
        if (leftChild[0] < element[0]) {
          swap = leftChildIndex;
        }
      }
      if (rightChildIndex < length) {
        rightChild = this.heap[rightChildIndex];
        if ((swap === null && rightChild[0] < element[0]) || (swap !== null && rightChild[0] < leftChild[0])) {
          swap = rightChildIndex;
        }
      }
      if (swap === null) break;
      this.heap[index] = this.heap[swap];
      index = swap;
    }
    this.heap[index] = element;
  }
}



// Find MST using Kruskal's algorithm
function spanningTreeKruskal(v, edges) {
  // Sort edges by weight
  edges.sort((a, b) => a[2] - b[2]);

  // Initialize Disjoint Set
  const ds = new DisjointSet(v);

  let mstWeight = 0;
  const mstEdges = [];

  for (const [u, v, weight] of edges) {
    if (ds.findParent(u) !== ds.findParent(v)) {
      ds.union(u, v);
      mstWeight += weight;
      mstEdges.push([u, v, weight]);
    }
  }

  return mstWeight;
}


// Check if an edge is a bridge
function isBridge(V, adj, c, d) {
  const dfs = (node, visited) => {
    visited[node] = true;
    for (let neighbor of adj[node]) {
      if ((node === c && neighbor === d) || (node === d && neighbor === c)) {
        // Skip the edge c-d
        continue;
      }
      if (!visited[neighbor]) {
        dfs(neighbor, visited);
      }
    }
  };
  let visited = Array(V).fill(false);
  // Perform DFS starting from node c
  dfs(c, visited);
  // If node d is not visited, then the edge c-d is a bridge
  return visited[d] ? 0 : 1;
}



// Find all bridges in the graph

function bridgeUtil(node, visited, disc, low, parent, adj, time, bridges) {
  visited[node] = true;
  disc[node] = low[node] = ++time;

  // Iterate through all adjacent vertices
  for (let neighbor of adj[node]) {
    if (!visited[neighbor]) {
      parent[neighbor] = node;
      bridgeUtil(neighbor, visited, disc, low, parent, adj, time, bridges);

      // Update the low value of node based on the low value of neighbor
      low[node] = Math.min(low[node], low[neighbor]);

      // Check if the edge (node, neighbor) is a bridge
      if (low[neighbor] > disc[node]) {
        bridges.push([node, neighbor]);
      }
    }
    // Update low value of node for back edges
    else if (neighbor !== parent[node]) {
      low[node] = Math.min(low[node], disc[neighbor]);
    }
  }
}
// Function to find all bridges in the graph
function bridges(V, adj) {
  // Initialize arrays for tracking visited nodes, discovery times, low values, and parents
  const visited = Array(V).fill(false);
  const disc = Array(V).fill(-1);
  const low = Array(V).fill(-1);
  const parent = Array(V).fill(-1);
  let time = 0; // Timer for discovery times
  const bridges = [];

  // Perform DFS for each vertex
  for (let i = 0; i < V; i++) {
    if (!visited[i]) {
      bridgeUtil(i, visited, disc, low, parent, adj, time, bridges);
    }
  }

  // Return the list of bridges
  return bridges;
}



// Find Articulation points in a graph
function articulationPointUtil(node, visited, disc, low, parent, ap, adj, time) {
  let children = 0; // Count of children for the current node
  visited[node] = true; // Mark the current node as visited
  disc[node] = low[node] = ++time; // Initialize discovery time and low value

  // Explore all adjacent vertices of the current node
  for (let neighbor of adj[node]) {
    if (!visited[neighbor]) {
      children++;
      parent[neighbor] = node;
      articulationPointUtil(neighbor, visited, disc, low, parent, ap, adj, time);

      // Check if the subtree rooted with 'neighbor' has a connection back to 'node' or its ancestors
      low[node] = Math.min(low[node], low[neighbor]);

      // Articulation point condition for the root node
      if (parent[node] === -1 && children > 1) {
        ap[node] = true;
      }

      // Articulation point condition for non-root nodes
      if (parent[node] !== -1 && low[neighbor] >= disc[node]) {
        ap[node] = true;
      }
    } else if (neighbor !== parent[node]) {
      // Update low value for 'node' if 'neighbor' is not the parent
      low[node] = Math.min(low[node], disc[neighbor]);
    }
  }
}

// Function to find and return articulation points in the graph
function findArticulationPoints(V, adj) {
  const visited = Array(V).fill(false); // Track visited vertices
  const disc = Array(V).fill(-1); // Discovery times of visited vertices
  const low = Array(V).fill(-1); // Lowest points reachable
  const parent = Array(V).fill(-1); // Parent vertices in DFS tree
  const ap = Array(V).fill(false); // To mark articulation points
  let time = 0; // Initialize time for discovery

  // Call the utility function for each unvisited vertex
  for (let i = 0; i < V; i++) {
    if (!visited[i]) {
      articulationPointUtil(i, visited, disc, low, parent, ap, adj, time);
    }
  }

  // Collect all articulation points found
  const result = [];
  for (let i = 0; i < V; i++) {
    if (ap[i]) {
      result.push(i); // Add the articulation point to the result
    }
  }

  return result; // Return the list of articulation points
}

// const V = 5;
// const adj = [
//   [1, 2],     // Node 0 is connected to nodes 1 and 2
//   [0, 2, 3],  // Node 1 is connected to nodes 0, 2, and 3
//   [0, 1],     // Node 2 is connected to nodes 0 and 1
//   [1, 4],     // Node 3 is connected to nodes 1 and 4
//   [3]         // Node 4 is connected to node 3
// ];

// console.log("Articulation points in the graph:", findArticulationPoints(V, adj));




// Kosaraju's Algorithm to find strongly connected components
function dfsUtil(node, visited, stack, adj) {
  visited[node] = true;
  for (let neighbor of adj[node]) {
    if (!visited[neighbor]) {
      this.dfsUtil(neighbor, visited, stack, adj);
    }
  }
  stack.push(node); // Push node to stack after visiting all its neighbors
}

// Function to perform DFS on the transposed graph
function dfsTranspose(node, visited, adjTranspose) {
  visited[node] = true;
  for (let neighbor of adjTranspose[node]) {
    if (!visited[neighbor]) {
      this.dfsTranspose(neighbor, visited, adjTranspose);
    }
  }
}

// Main function to find the number of strongly connected components
function kosaraju(arr, v, e) {
  const adj = Array.from({ length: v }, () => []);
  const adjTranspose = Array.from({ length: v }, () => []);

  // Build the adjacency list from the input array
  for (let [src, dest] of arr) {
    adj[src].push(dest);
    adjTranspose[dest].push(src); // Build the transpose graph
  }

  const visited = Array(v).fill(false);
  const stack = [];

  // Step 1: Fill vertices in stack according to their finishing times
  for (let i = 0; i < v; i++) {
    if (!visited[i]) {
      this.dfsUtil(i, visited, stack, adj);
    }
  }

  // Step 2: Process all vertices in order defined by the stack
  visited.fill(false); // Reset visited for the second DFS
  let sccCount = 0;

  // Step 3: Pop nodes from stack and perform DFS on the transposed graph
  while (stack.length > 0) {
    const node = stack.pop();
    if (!visited[node]) {
      this.dfsTranspose(node, visited, adjTranspose);
      sccCount++; // Increment the count for each SCC found
    }
  }

  return sccCount; // Return the number of strongly connected components
}



// Bellman Ford algorithm to find shortest path in graphs with negative weights.
function bellmanFord(V, adj, src) {
  // Initialize distances from the source to all vertices as infinite
  const distances = Array(V).fill(Number.MAX_SAFE_INTEGER);
  distances[src] = 0; // Distance from source to itself is 0

  // Relax all edges |V| - 1 times
  for (let i = 1; i <= V - 1; i++) {
    for (let [node, neighbors] of adj.entries()) {
      // Iterate over each neighbor of the current node
      for (let [neighbor, weight] of neighbors) {
        // Check if the current node's distance is not infinite
        // and if the path through the current node is shorter
        if (distances[node] !== Number.MAX_SAFE_INTEGER && distances[node] + weight < distances[neighbor]) {
          distances[neighbor] = distances[node] + weight; // Update the distance
        }
      }
    }
  }

  // Check for negative weight cycles
  for (let [node, neighbors] of adj.entries()) {
    for (let [neighbor, weight] of neighbors) {
      // If a shorter path can still be found, a negative cycle exists
      if (distances[node] !== Number.MAX_SAFE_INTEGER && distances[node] + weight < distances[neighbor]) {
        console.log("Graph contains a negative weight cycle");
        return; // Exit the function if a negative cycle is found
      }
    }
  }

  return distances; // Return the shortest distances from the source
}