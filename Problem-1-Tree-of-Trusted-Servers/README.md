# Tree of Trusted Servers

A web-based DSA project that uses **Tree, DFS, and XOR** to identify trusted servers.

## Problem

A server is trusted if the XOR of all security keys from **Server 1 (root)** to that server is greater than or equal to `K`.

## Algorithm

1. Build the tree using an adjacency list.
2. Perform DFS from Server 1.
3. Calculate the path XOR for each server.
4. If `XOR >= K`, count the server as trusted.
5. Display the result and tree visualization.

## Technologies

- HTML
- CSS
- JavaScript
- Vis Network

## Features

- Custom input
- Sample input
- Trusted server count
- XOR calculation
- Result table
- Interactive tree visualization

## Complexity

- **Time:** O(N)
- **Space:** O(N)

## Project Structure

```text
Problem-1-Tree-of-Trusted-Servers/
├── index.html
├── style.css
├── script.js
└── README.md