# Emergency Route Validation

A web-based DSA project that uses **Graph, BFS, and Shortest Path** to determine efficiently reachable cities.

## Problem

The highway system is represented as an undirected graph.

Starting from **City 1**, a city is efficiently reachable if its shortest-path distance is less than or equal to `D`.

## Algorithm

1. Build the graph using an adjacency list.
2. Start BFS from City 1.
3. Calculate the shortest distance to every city.
4. Check whether `distance <= D`.
5. Count the efficiently reachable cities.
6. Display the result and graph visualization.

## Technologies

- HTML
- CSS
- JavaScript
- Vis Network

## Features

- Custom input
- Sample input
- BFS shortest-path calculation
- Reachable city count
- Distance table
- Interactive graph visualization
- Responsive design

## Complexity

- **Time:** O(N + M)
- **Space:** O(N + M)

## Project Structure

```text
Problem-2-Emergency-Route-Validation/
├── index.html
├── style.css
├── script.js
└── README.md