export function lineParser(string) {
  let [id, connections] = string.split(" <-> ");
  id = Number(id);
  connections = connections.split(/,\s+/).map(c => Number(c));

  return {
    id,
    connections,
    visited: false
  };
}

export function inputParser(input) {
  return input
    .split("\n")
    .filter(n => n)
    .map(lineParser);
}

export function connectionWalker(connections, startNodeId, visited = []) {
  visited.push(startNodeId);
  let node = connections[startNodeId];

  return node.connections
    .reduce((acc, curr) => {
      if (visited.includes(curr)) {
        return acc;
      }
      return connectionWalker(connections, curr, visited);
    }, visited)
    .sort();
}

export function groupFinder(pipes) {
  debugger;
  let visited = [];
  let groups = [];
  for (var i = 0; i < pipes.length; i++) {
    if (visited.includes(i)) {
      continue;
    }

    let group = connectionWalker(pipes, i);

    visited = visited.concat(group);
    groups.push(group);
  }
  return groups;
}
